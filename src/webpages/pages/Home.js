'use strict';

import './css/home.less'
import React from 'react';
import {FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap'

class Home extends React.Component{

    state = {
        value : '',
        from : '',
        to : ''
    }

    getValidationState = () => {
        const length = this.state.value.length;
        const num = "WMEFJ4DA7GK084402".length;
        if (length == num) return 'success';
        else return 'error';
        return null;
    }

    handleChange = (e) => {
        let value = e.target.value;
        this.setState({value});
    }

    handleFromChange = (e) => {
        let from = e.target.value;
        this.setState({from});
    }

    handleToChange = (e) => {
        let to = e.target.value;
        this.setState({to});
    }

    submit = () => {
        let url = "/v1/monitor?thing_id="+this.state.value+"&from="+this.state.from+"&to="+this.state.to;
        $.ajax({
            url,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: result => {
                this.drawPolyline(result.hits.hits);
            }
        })
    }

    drawPolyline = (result) => {
        this.refs.container.innerHTML = "";
        let center = new qq.maps.LatLng(29.57029528892167,106.58908623843418);
        window.map = new qq.maps.Map(this.refs.container,{
            center: center,
            zoom: 14
        });
        let data = [];
        result.forEach(x => {
            data.push(x._source);
        });
        this.sortData(data);
        var polyline = new qq.maps.Polyline({
            path: this.loadData(data),
            strokeColor: '#FF0000',
            strokeWeight: 2,
            editable:false,
            map: map
        });
    }

    sortData = (data) => {
        for(var i = 0; i < data.length ; i++){
            for(var j = i; j < data.length; j++ ){
                if(data[j].connection.since < data[i].connection.since) {
                    var temp = data[i];
                    data[i] = data[j];
                    data[j] = temp;
                }
            }
        }
    }

    loadData = (data) => {
        var d = data;
        var arr = [];
        d.forEach(i => {
            arr.push(new qq.maps.LatLng(i.location.lat, i.location.lon));
        })
        return arr;
    }

    componentDidMount() {
        const qq = window.qq;
        if(qq){
            let center = new qq.maps.LatLng(29.57029528892167,106.58908623843418);
            window.map = new qq.maps.Map(this.refs.container,{
                center: center,
                zoom: 14
            });
        }
    }

    render() {
        return (<div className={"home"} id={"home"}>
            <div className={"banner container-fluid"}>
                <FormGroup
                    controlId="formBasicText"
                    validationState={this.getValidationState()}
                >
                    <div className={"row-fluid"}>
                        <div className={"span3"}>
                    <ControlLabel>Please specify the vin id</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.value}
                        placeholder="Enter Vin ID"
                        onChange={this.handleChange}
                    />
                        </div>
                        <div className={"span3"}>
                    <ControlLabel>From: </ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.from}
                        placeholder="Enter from timestamp"
                        onChange={this.handleFromChange}
                    />
                        </div>
                        <div className={"span3"}>
                    <ControlLabel>To: </ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.to}
                        placeholder="Enter to timestamp"
                        onChange={this.handleToChange}
                    />
                        </div>
                        <div className={"span3"}>
                        <Button onClick={this.submit}>RENDER</Button>
                        </div>
                    </div>
                </FormGroup>
            </div>
            <div ref="container" className={"mapContainer"}>

            </div>
        </div>);
    }

}

export default Home;
