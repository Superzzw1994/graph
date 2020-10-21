import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import CLayout from 'SRC_COMP/basic/Layout';
import Data from "@/pages/Data";
import Flow from "@/pages/Data/components/Flow";

const PATH_PREFIX = window.DATACENTERAPP.PATH_PREFIX;
const App = props => {
  return <Switch>
    <Redirect
      exact
      push
      from={`${PATH_PREFIX}`}
      to={`${PATH_PREFIX}/data`}
    />
    <Redirect
      exact
      push
      from={'/'}
      to={`${PATH_PREFIX}/data`}
    />
    <Route path={`${PATH_PREFIX}/data`} render={(routeProps) => <CLayout> <Data {...routeProps}/></CLayout>}/>
    <Route exact path={`${PATH_PREFIX}/flow`} render={routeProps => <Flow {...routeProps}/>}/>
    <Redirect
      to={`${PATH_PREFIX}/data`}
    />
  </Switch>
    ;
};

export default App;
