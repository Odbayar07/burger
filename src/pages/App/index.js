import React,{ Component } from 'react';
import css from './style.module.css';
import { Redirect } from 'react-router-dom/cjs/react-router-dom';
import Toolbar from '../../components/Toolbar';
import BurgerPage from '../BurgerPage';
import SideBar from '../../components/SideBar';
import OrderPage from '../OrderPage';
import { Route, Switch } from 'react-router-dom';
import  ShippingPage  from '../ShippingPage';
import LoginPage from '../LoginPage';
import SignupPage from '../SignupPage';
import { connect } from 'react-redux';
import Logout from "../../components/Logout";
import * as actions from "../../redux/actions/loginActions"
import * as signupActions from "../../redux/actions/signupActions"

class App extends Component {
  state = {
    showSidebar: false
  };

  toggleSideBar = () => {
    this.setState(prevState => {
      return {showSidebar: !prevState.showSidebar};
    });
  };

  componentDidMount = () => {
    const token = localStorage.getItem( 'token' );
    const userId = localStorage.getItem( 'userId' );
    const expiresDate = new Date(localStorage.getItem( 'expiresDate' ));
    const refreshToken = localStorage.getItem( 'refreshToken' );

    if ( token )
    {
      if ( expiresDate > new Date() )
      {
        this.props.autoLogin( token, userId );
        this.props.autoLogoutAfterMillisec( expiresDate.getTime() - new Date().getTime() );
      } else
      {
        this.props.logout();
      }
    }
  }

  render() {
    return (
      <div>
        <Toolbar toggleSideBar={this.toggleSideBar} />
        <SideBar 
          showSidebar={this.state.showSidebar} 
          toggleSideBar={this.toggleSideBar} 
        />
        <main className={css.Content}>
          {this.props.userId ? (
            <Switch>
              <Route path='/logout' component={ Logout } />
              <Route path='/orders' component={OrderPage} />
              <Route path='/ship' component={ShippingPage} />
              <Route path='/' component={BurgerPage} />
            </Switch>
          ) : (
            <Switch>
              <Route path='/signup' component={SignupPage} />
                <Route path='/login' component={ LoginPage } />
                <Redirect to="/login" />
            </Switch>
          )}
        </main>
      </div>
    );
  }
}

const mapStateToProps = state =>
{
  return {
    userId : state.signupReducer.userId
  };
};

const mapDispatchToProps = dispatch =>
{
  return {
    autoLogin: ( token, userId ) => dispatch( actions.loginUserSuccess( token, userId ) ),
    logout: () => dispatch( signupActions.logout() ),
    autoLogoutAfterMillisec: () => dispatch( signupActions.logout() )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
