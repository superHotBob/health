/**
 * Created by Pavel on 06.12.2017.
 */
import React, { PropTypes } from 'react';
import { withApollo, gql } from 'react-apollo'
import {Tabs, Card} from 'antd';
import Loadable from '../../../components/Loadable';
import { Route } from 'react-router-dom'


const TabPane = Tabs.TabPane;



 const AsyncBasic = () => {
    return (
        Loadable({
            loader: () => import('../../../routes/Setting/components/Basic/containers/index.js'),
        })
    );
}



class SettingForm extends React.Component{
    state = {
        tabPosition: 'top',
    }
    handleChange = (tabKey) => {
        const match = this.props.match;
        //console.log(match.url+'/'+tabKey);
        this.props.history.push(tabKey)
        //return true;
    }
    render() {
        const match = this.props.match;
        return (
            <Card>
                <Tabs tabPosition="left"  defaultActiveKey={this.props.location.pathname} onChange={this.handleChange}>
                    <TabPane tab="Basic" key={match.url}><Route exact path={match.url} component={AsyncBasic()} /></TabPane>
                    <TabPane tab="Password" key={match.url+'/password'} >Password</TabPane>
                    <TabPane tab="Picture" key={match.url+'/picture'} >Picture</TabPane>
                </Tabs>
            </Card>
        );
    }
}

export default withApollo(SettingForm);