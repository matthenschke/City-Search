import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

let url = "http://ctp-zip-api.herokuapp.com/city/"; //url to fetch api

 /*<div className = "area-info border rounded">
    <div className = "area-info-header">
    {props.area.LocationText}
    </div>
    <ul style = {{top : "40px"}}>
      <li>{"State: " + props.area.State}</li>
      <li>{"Location: (" + props.area.Lat + ", " + props.area.Long + ")"}</li>
      <li>{"Population(estimated): " + props.area.EstimatedPopulation}</li>
      <li>{"Total Wages: " + props.area.TotalWages}</li>
    </ul>
    </div>*/

//Component that will display the zips for each city
function ZipCode(props) {
  return (
    <li className = "zip">{props.zip}</li>
 );
}

//component that contains text field that will contain the query for the API call
function CitySearchField(props) {
  return (<div>
    <div className = " top-buffer col-sm-4 col-sm-offset-4">
    <form className = "form-inline">
    <div className="form-group">
    <label>
      City:
      </label>
      <input type="text"  className="form-control" 
      id="city" placeholder= {props.placeholder} onChange = {props.onChange} /> 
  </div>
  </form>
  </div>
  </div>);
}

//main component
class App extends Component {
  constructor(props){
    super(props);
    //state only has one property, data which is the api data from each api call as the textfield is updated
    this.state = {
      data : null,

    }
  }

  //as text is altered make an updated api call and change the state of data
 onChange = event => {
   var text = event.target.value.toUpperCase();
  
   //fetching data from api everytime we render
   fetch(url + text)
   .then((response) =>{ 
     return response.json();
   })
   .then((data) => this.setState({data : data,}))

   //if api request failed, set the data back to null
   .catch(error => this.setState({data : null, }));
   
 };
 


 
  render() {
    let results = "No results"; //start off with no results shown since by default text field is empty
   
    //if there is api data, then map each entry to a city component that will be rendered
    if (this.state.data !== null)
     results = this.state.data.map(zip => {
       return (
         <ZipCode zip = {zip} />
       )
     })
      
    return (
      <div className="App">
        <div className="App-header">
          <h1>City Search</h1>
        </div>
        <div>
        <CitySearchField onChange = {this.onChange} placeholder = {"Try New York"}  />
        </div>
        {/*display api data*/}                     
        <div className = "results col-sm-4 col-sm-offset-4">
        <div className = "area-info-header">
        {results !== "No results" ? "Zip Codes": ""} </div> 
        <ul>
        {results}
        </ul>
        </div>
      </div>
    );
  }
}

export default App;
