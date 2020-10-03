import React, { Component, Fragment }from 'react';
import { BrowserRouter,  Route, Switch, Redirect } from 'react-router-dom';
import './scss/style.scss';
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./components/login/Login'));;
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const PrivateRoute = ({ component: Component, ...rest }) => {
      return (
        <Fragment>
          <Route
            {...rest}
            render={(props) =>
              (this.props.isAuthenticated && jwt_decode(this.props.access_token)["role"]=== "Manager") ||
              (this.props.isAuthenticated && jwt_decode(this.props.access_token)["role"] === "Attendant") ? (
                <Component {...props} />
              ) : (
                <Redirect to={{ pathname: "/login" }} />
              )
            }
          />
        </Fragment>
      );
    };
    return (
      <BrowserRouter>
          <React.Suspense fallback={loading}>
            <Switch>
              <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />             
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
              <PrivateRoute path="/" component={DefaultLayout} />
            </Switch>
          </React.Suspense>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  access_token: state.auth.access_token,
});

export default connect(mapStateToProps)(App);
