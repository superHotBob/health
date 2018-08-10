import React from 'react'
import {Layout} from 'antd';
import {Switch} from 'react-router-dom'
import LayoutHeader from '../../components/Header';
import {BasicRoutes} from '../../routes';
import {PatientRoutes} from './routes';

const {Header, Content, Footer} = Layout;

const PatientLayout = ({loading, store, location}) =>  {
    //console.log('Loaded Patient layout');
    //console.log(location);
    const {pathname} = location;
    if (pathname === '/logout') {
        return <BasicRoutes store={store} />;
    }
    return (
        <React.Fragment>
            <div style={{height:'100%', display: 'flex',
                'minHeight': '100vh',
                'flexDirection':'column'}}>

                <Header style={{background:'#fff'}}>
                    <LayoutHeader loading={loading} location={location} patientLayout  />
                </Header>
                <Content style={{ padding: '24px 50px', flex: '1' }}>
                        <BasicRoutes store={store} />
                        <PatientRoutes store={store} />
                </Content>
                <Footer>
                    Copyright © 2010-2018 Fitango Inc. All rights reserved
                </Footer>

            </div>
        </React.Fragment>
    )}

export default PatientLayout;
