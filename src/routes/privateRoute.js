import React from 'react'
import {
    Route,
    Redirect,
} from 'react-router-dom'
import { connect } from 'react-redux'

var token = localStorage.getItem('token');
const PrivateRoute = ({dispatch, component: Component, ...rest }) => (

    <Route {...rest} render={props => (
        token !='' ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
    }}/>
        )
    )}/>
)

const mapStateToProps = (state,ownProps) => {
    return {
        token: state.user.token
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({

});


export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);