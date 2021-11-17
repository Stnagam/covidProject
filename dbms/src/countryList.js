import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

export default class CountryListClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = { countries2: [], selectedCountry: ''};
    this.countryChange = this.countryChange.bind(this);
  }

  countryChange(e){
    console.log(e.target.value);
    this.setState({selectedCountry: e.target.value});
  }
  
  async componentDidMount() {
      await fetch('/query?sql=SELECT DISTINCT NAME FROM COUNTRY',
    {
      method: 'GET',
      mode: 'cors',
      header:{
        'Accept': 'application/json, text/plain, */*'
      }
    }).then(response => response.json())
  .then(data => {
    var countryList = data.rows;
    countryList.forEach(country => {
        this.state.countries2.push({value: country[0], label: country[0]});
    });
    this.forceUpdate();
    });

      var SQL = "\
  SELECT DATE_REPORT2+1, NEW_CASES1 - NEW_CASES2 AS CASE_DIFFER \
  FROM \
(SELECT G2.NEW_CASES AS NEW_CASES1, G3.NEW_CASES AS NEW_CASES2, G4.DATE_REPORT2 \
      FROM GLOBAL_CASES_DEATHS_OVER_TIME G2, \
  GLOBAL_CASES_DEATHS_OVER_TIME G3, \
  (SELECT DATE_REPORT AS DATE_REPORT1, (DATE_REPORT - 1) AS DATE_REPORT2 \
    FROM GLOBAL_CASES_DEATHS_OVER_TIME \
    WHERE DATE_REPORT >= '01-JAN-21' AND DATE_REPORT <= '01-AUG-21' \
          AND COUNTRY = " + this.state.selectedCountry + ") G4 \
    WHERE G2.DATE_REPORT = G4.DATE_REPORT1 AND G3.DATE_REPORT = G4.DATE_REPORT2 \
    AND G2.COUNTRY = G4.COUNTRY AND G3.COUNTRY = G4.COUNTRY) \
  ";

    console.log(123333);
    await fetch('/query?sql=' + SQL,
    {
      method: 'GET',
      mode: 'cors',
      header:{
        'Accept': 'application/json, text/plain, */*'
      }
    }).then(response => response.json())
  .then(data => {
      console.log(data)
      });
  }

  async componentDidUpdate(){
      var SQL = 
  "SELECT DATE_REPORT2 + 1, NEW_CASES1 - NEW_CASES2 AS CASE_DIFFER " +
  "FROM " +
  "(SELECT G2.NEW_CASES AS NEW_CASES1, G3.NEW_CASES AS NEW_CASES2, G4.DATE_REPORT2 " +
      "FROM GLOBAL_CASES_DEATHS_OVER_TIME G2, " +
  "GLOBAL_CASES_DEATHS_OVER_TIME G3, " +
  "(SELECT DATE_REPORT AS DATE_REPORT1, (DATE_REPORT - 1) AS DATE_REPORT2 " +
    "FROM GLOBAL_CASES_DEATHS_OVER_TIME " +
    "WHERE DATE_REPORT >= '01-JAN-21' AND DATE_REPORT <= '01-AUG-21' " +
          "AND COUNTRY = '" + this.state.selectedCountry + "') G4 " +
    "WHERE G2.DATE_REPORT = G4.DATE_REPORT1 AND G3.DATE_REPORT = G4.DATE_REPORT2 " +
    "AND G2.COUNTRY = '" + this.state.selectedCountry + "' AND G3.COUNTRY = '" + this.state.selectedCountry + "')";

    console.log(123333);
    console.log(SQL);
    await fetch('/query?sql=' + SQL.replaceAll('+', '%2b'),
    {
      method: 'GET',
      mode: 'cors',
      header:{
        'Accept': 'application/json, text/plain, */*'
      }
    }).then(response => response.json())
  .then(data => {
      console.log(data)
      });
  }

  CountryListClass() {
	
  }

  render() {
    return (
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Country</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={this.state.selectedCountry}
          label="Country"
          onChange={this.countryChange}
        >
          {
           this.state.countries2.map(({ value, label }, index2) => <MenuItem value={value}>{label}</MenuItem>)
          }
        </Select>
      </FormControl>
    );
  }
}