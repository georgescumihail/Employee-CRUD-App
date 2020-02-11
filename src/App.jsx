import React from 'react';
import './App.css';
import MainPage from './Components/MainPage';
import EmployeePage from './Components/EmployeePage'
import AddEmployee from './Components/AddEmployee';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const App = () => {

  return (
    <div id="app-container">
      <Router>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/employees/:id" component={EmployeePage} />
          <Route path="/add-employee" component={AddEmployee} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
