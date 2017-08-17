import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Stat from './Stat';
import Twitter from './Twitter';
import './App.css';

function onTimelineLoad() {
  window.$('.main-content').css('max-width', 1200);
  window.$('.container-fluid').css('max-width', 1200);
}

const App = location => (
  <div className="App">
    <Navbar location={location} />
    <div className="main-content">
      <Switch>
        <Route
          path="/(|about|news|tips)"
          render={() =>
            <Home onTimelineLoad={() => onTimelineLoad()} />
        }
        />
        <Route path="/twitter" component={Twitter} />
        <Route path="/stat" component={Stat} />
      </Switch>
    </div>
  </div>
);
export default App;
