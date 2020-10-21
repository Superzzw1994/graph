import React from 'react'
import {Switch, Route, Redirect} from "react-router";
import Operation from "@/pages/Data/components/Operation";
import Task from "@/pages/Data/components/Task";
import CustomOperator from "@/pages/Data/components/CustomOperator";
import Flow from "@/pages/Data/components/Flow";
import './assets/index.less'
const {PATH_PREFIX} = window.DATACENTERAPP
const Data = props => {
  return <div className='data' id='data'>
    <Switch>
      <Route exact path={`${PATH_PREFIX}/data/task`} render={routeProps => <Task {...routeProps}/>}/>
      <Route exact path={`${PATH_PREFIX}/data/operation`} render={routeProps => <Operation {...routeProps}/>}/>
      <Route exact path={`${PATH_PREFIX}/data/customOperator`}
             render={routeProps => <CustomOperator {...routeProps}/>}/>
      <Redirect to={`${PATH_PREFIX}/data/task`}/>
    </Switch>
  </div>
}

export default Data
