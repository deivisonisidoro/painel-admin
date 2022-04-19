import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { isAuthenticated } from "./services/Authentication/auth";

import SignIn from './pages/SingIn';
import Dashboard from "./pages/Dashboard";
import User from "./pages/User";
import Technician from "./pages/Technician";
import Client from "./pages/Client";
import Company from "./pages/Company";
import OS from "./pages/OS";
import Budget from "./pages/Budget";
import Pmoc from "./pages/Pmoc";
import PmocModel from "./pages/PmocModel";
import Engineer from "./pages/Engineer";


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route  path="/login" component={SignIn} />
      <PrivateRoute exact path="/" component={Dashboard} />
      <PrivateRoute path="/usuario" component={User} />
      <PrivateRoute path="/cliente" component={Client} />
      <PrivateRoute path="/tecnico" component={Technician} />
      <PrivateRoute path="/empresa" component={Company} />
      <PrivateRoute path="/ordem-de-servico" component={OS} />
      <PrivateRoute path="/orcamento" component={Budget} />
      <PrivateRoute path="/pmoc" component={Pmoc} />
      <PrivateRoute path="/modelo-de-pmoc" component={PmocModel} />
      <PrivateRoute path="/engenheiro" component={Engineer} />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;