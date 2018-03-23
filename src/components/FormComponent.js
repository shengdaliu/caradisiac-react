'use strict';

import React from 'react';
import axios from 'axios';
import {FormGroup,FormControl,ControlLabel, Button} from 'react-bootstrap';

class FormComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        brand: '',
        minVolume: 0,
        maxVolume: 900,
        brandsList: [],
        volumeList: [ 0, 100, 200, 300, 400, 500, 600, 700, 800, 900 ]
      };
  
      this.handleBrandChange = this.handleBrandChange.bind(this);
      this.handleMinVolumeChange = this.handleMinVolumeChange.bind(this);
      this.handleMaxVolumeChange = this.handleMaxVolumeChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
      this.FormComponent();
    }
    
    FormComponent() {
      const brands_url = 'http://localhost:9292/caradisiac/suv/distinct/brands';
      // const volume_url = 'http://localhost:9292/caradisiac/suv/distinct/volume';
      axios.get(brands_url)
        .then(res => {
          const brandsList = res.data;
          this.setState({ brandsList });
        });
      // axios.get(volume_url)
      //   .then(res => {
      //     const volumeList = res.data;
      //     this.setState({ volumeList });
      //   });
    }
  
    handleBrandChange(event) {
      this.setState({brand: event.target.value});
      // this.props.handlerFromParent(this.state);
    }
    handleMinVolumeChange(event) {
      this.setState({minVolume: event.target.value});
      // this.props.handlerFromParent(this.state);
    }
    handleMaxVolumeChange(event) {
      this.setState({maxVolume: event.target.value});
      // this.props.handlerFromParent(this.state);
    }

    handleSubmit(event) {
      event.preventDefault();
      // pass the input field value to the event handler passed
      // as a prop by the parent (App)
      this.props.handlerFromParent(this.state);
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Brand :</ControlLabel>
            <FormControl componentClass="select" placeholder="select" value={this.state.brand} onChange={this.handleBrandChange}>
              <option value="">All</option>
              {this.state.brandsList.map((brand) => {
                return <option key={brand} value={brand}>{brand}</option>
              })}
            </FormControl>
          </FormGroup>
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Min Volume :</ControlLabel>
            <FormControl componentClass="select" placeholder="select" value={this.state.minVolume} onChange={this.handleMinVolumeChange}>
              {this.state.volumeList.map((volume) => {
                return <option key={volume} value={volume}>{volume}</option>
              })}
            </FormControl>
          </FormGroup>
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Max Volume :</ControlLabel>
            <FormControl componentClass="select" placeholder="select" value={this.state.maxVolume} onChange={this.handleMaxVolumeChange}>
              {this.state.volumeList.map((volume) => {
                return <option key={volume} value={volume}>{volume}</option>
              })}
            </FormControl>
          </FormGroup>
          
          <p/>
          <Button type="submit">Submit</Button>
          <p/>
        </form>
      )
    }
  }
  
FormComponent.displayName = 'FormComponent';
export default FormComponent;
  