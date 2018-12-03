import express from 'express';
import path from 'path';
import {AuthUrl, jwtStr} from '../server/config';
import jwt from 'jwt-simple';
import moment from 'moment';

const swaggerTools = require('swagger-tools');
const swaggerParser = require('swagger-parser');
const swaggerPath = path.resolve(`${__dirname}/../server/api/swagger/index.yaml`);


let constructSwaggerYaml = callback => {
    swaggerParser.validate(swaggerPath, (err, api) => {
        console.log('Using swagger parser to validate');
        if (err) {
            console.error(err);
            console.error('Please fix the swagger yamls.');
        } else {
            callback(api);
        }
    });
};

exports.start = (app, port) => {
    constructSwaggerYaml(swaggerDoc => {
        const options = {
            controllers: path.join(`${__dirname}/../server/controllers`),
            useStubs: process.env.NODE_ENV === 'development' // Conditionally turn on stubs (mock mode)
        };

        swaggerTools.initializeMiddleware(swaggerDoc, middleware => {
            const appRouter = express.Router();
            // TODO: Access control origin should not be enabled for '*'
            // give a list of sources for which this should be enabled
            appRouter.use((req, res, next) => {
                let isAuthUrl = true;
                AuthUrl.forEach( url => {if(url === req.originalUrl){console.log("url match");isAuthUrl = true;}});
                if(!isAuthUrl){
                    try {
                        let token = req.header('Authorization');
                        if(token.startsWith("Bearer")) {
                            token = token.replace(/Bearer\ /, "");
                            let decoded = jwt.decode(token, jwtStr);
                            let {iss, exp} = decoded;
                            if (!(iss && exp && moment().valueOf() < exp)) {
                                res.send(401);
                            }
                        }
                        else {
                            res.send(401);
                        }
                    } catch (err) {
                        res.send(401);
                    }
                }
                next();
            });
            appRouter.use(express.static('public'));
            app.set('view engine', 'ejs');

            app.get('/', (req, res) => {
                res.render('pages/index', { title : '' });
            });

            app.use('/', appRouter);

            app.listen(port, () => {
                console.log(`Listening on port ${port}`);
            });

            // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
            app.use(middleware.swaggerMetadata());

            // Validate Swagger requests
            app.use(middleware.swaggerValidator());

            // Route validated requests to appropriate controller
            app.use(middleware.swaggerRouter(options));

            // Serve the Swagger documents and Swagger UI
            // Commented out for production
            app.use(middleware.swaggerUi());

        });
    })
}
