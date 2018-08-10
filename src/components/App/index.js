import React from 'react';
// adding proptypes
import PropTypes from 'prop-types'
import {CustomizedLabelsProvider} from "./app-context";
import {compose} from 'recompose';
// adding router
import {BrowserRouter} from 'react-router-dom'

import apolloClient from '../../clients/apolloClient';
import {ApolloProvider} from 'react-apollo';
import {Provider} from 'react-redux'
import gql from 'graphql-tag';
import Core from '../../layouts'
import {addLocaleData, IntlProvider} from 'react-intl';
import en from 'react-intl/locale-data/en';
import ru from 'react-intl/locale-data/ru';
import es from 'react-intl/locale-data/es';
import localeData from '../../locales/translations';


/**
 * Creating a browser history
 */
import {createBrowserHistory} from 'history'
// locale
import {LocaleProvider} from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import LoginForm from "../../routes/User/components/Login";
import { CurrentUserInfoFragment } from '../../routes/User/fragments';

var history = createBrowserHistory();
// Adding Locale data
addLocaleData([...en, ...ru, ...es]);


/**
 * Preparing query to grab the main info
 */
export const NETWORK_INFO_QUERY = gql`
    query NETWORK_INFO {
        network {
            id,
            name,
            description,
            logo,
            modules {
                id,
                name,
                placeholder
            }
            allowSignUp
            colors {
                primary
                brand
                headerBg
                headerText
                footerBg
                footerText
            }
            labels {
                key
                label
            }
        },
       
    }
`;

// const queryOptions = {
//     query: NETWORK_INFO_QUERY,
//     fetchPolicy: 'cache-first'
// }

const language = "en";
const messages = localeData[language] || localeData.en;
const App = props => {
    // load network and token info
    // componentWillMount() {
    //     //this.setState({loading:true})
    //     apolloClient.query(queryOptions)
    //         .then(({data: {network, account: {user, currentToken}}}) => {
    //         //this.setState({loading:false})
    //         let {token, isExpired} = currentToken;
    //         if (isExpired) {
    //             token = '';
    //         }
    //         localStorage.setItem('token', token);
    //             if (token) {
    //                 this.props.store.dispatch(loadUser(user));
                    

    //             } else {
    //                 this.props.store.dispatch(loadUserFAIL(user));
    //             }
    //             this.props.store.dispatch(loadNetwork(network));
    //         })
    // }

    // shouldComponentUpdate() {
    //     return false
    // }

        const basename = "/static/myapp";
        console.log('App init');
        return (
            <ApolloProvider client={apolloClient}>
                <IntlProvider locale={language} messages={messages}>
                    <Provider store={props.store}>
                        <BrowserRouter history={history} basename={basename}>
                            <LocaleProvider locale={enUS}>
                                <Core store={props.store} initialLoad />
                            </LocaleProvider>
                        </BrowserRouter>
                    </Provider>
                </IntlProvider>
            </ApolloProvider>
        );
}

export default App;

 