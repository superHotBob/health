import { connect } from 'react-redux'
import { loginUserRequest, loginUserSuccess, loginUserError} from '../modules/login'
import { setUserToken} from '../modules/user'
/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the counter:   */

import LoginForm from '../components/loginComponent'
import { gql,graphql } from 'react-apollo';


const loginUser = gql`
    mutation loginUser($email: Email! $password: String!){
        login(email: $email, password: $password) {
            user{id}, token
        }
    }
`;



const withMutation = graphql(loginUser, {
    props: ({ mutate }) => ({
        loginUser: input => {
            return mutate({
            variables: { email: input.email, password: input.password },
        })},
    }),
});

const mapStateToProps = (state) => {
    return {
        // view store:
        //currentView:  state.views.currentView,
        // userAuth:
        token: state.user.token
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    onSubmit: ({ email, password }) => {
        dispatch(loginUserRequest({ email }));

        ownProps.loginUser({ email:email, password:password })
            .then(({data}) => {
                const token = data.login.token;
                //console.log(data);
                //console.log(token);
                dispatch(setUserToken({token}));
                dispatch(loginUserSuccess({token}));
            }).catch((error) => {
            dispatch(loginUserError({
                error,
            }));
        });
    },
});


export default withMutation(connect(mapStateToProps, mapDispatchToProps)(LoginForm));
/*
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginFormWithData);*/