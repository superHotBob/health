import React from 'react'
import {NavLink, Route, Switch} from 'react-router-dom';
import {Layout, Menu, Steps, Icon} from 'antd';
import BuildHeader from '../../containers/BuildHeader';
import BuildHeaderPathway from '../../containers/BuildHeaderPathway';
import BuildBody from '../../containers/BuildBody';
import BuildOptions from '../../containers/BuildOptions';
import Preview from '../../components/Preview';
import Publish from '../../containers/Publish';
import BuildBodyPathway from '../../containers/BuildBodyPathway';
import {Loading} from "../../../../../../components/Loading";

const Build = (props) => {
    // console.log(props);
    const { routes } = props;
    return (<Switch>
        {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
    </Switch>);
};


export const RouteWithSubRoutes = route => {
    return (
        <Route
            path={route.path}
            render={props => {
                // pass the sub-routes down to keep nesting
                //console.log(props);
                return (<route.component {...props} {...route.params} routes={route.routes}/>)
            }}
        />)
};



const PlanbuilderContent = props => {
        // console.log(props);
        const {plan={}, loading, type, mainUrl} = props;

        if (loading) {
            return <Loading/>
        }

        // const {id, tab = 'build', subtab = 'header'} = match.params;
        // const {pathname} = location;

        // const selectedItem = subtab || tab;
        // const openItem = tab;


        // let mainUrl = mainUrl;
        // if (id) {
        //     //mainUrl += '/' + id;
        // }
        const isPathway = type === 'pathway';

        // console.log(plan,'planplanplan');
        const params = {plan, type};
        const routes = [

            {
                path: mainUrl + "/preview",
                component: Preview,
                params: {plan, type}
            },
            {
                path: mainUrl + "/publish",
                component: Publish,
                params
            },
            {
                path: mainUrl,
                component: Build,
                routes: [
                    {
                        path: mainUrl + "/header",
                        component: isPathway ? BuildHeaderPathway : BuildHeader,
                        params
                    },
                    {
                        path: mainUrl + "/body",
                        component: isPathway ? BuildBodyPathway : BuildBody,
                        params
                    },
                    {
                        path: mainUrl + "/options",
                        component: BuildOptions,
                        params: { ...params, mainUrl:mainUrl + "/options"}
                    },
                    {
                        path: mainUrl,
                        component: isPathway ? BuildHeaderPathway : BuildHeader,
                        params
                    },
                ]
            }


        ];

        // console.log(routes);
        return (
            <Switch>
                {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route}  />)}
            </Switch>
        )
}

export default PlanbuilderContent;
