
import React from 'react';
import Loadable from '../../../components/Loadable';
import {Breadcrumb,Alert ,Row } from 'antd';
import { Router, Route, Link } from 'react-router-dom';

let Crumb = [];

const AsyncCategoryView = (props) => {
    return (
        Loadable({
            loader: () => import('../../../routes/Community/containers/view.js'),
            modules: ['../../../routes/Community/containers/view.js'],
        webpack: () => [require.resolveWeak('../../../routes/Community/containers/view.js')],
},undefined, props)
    );
}

const AsyncCategoryDash = (props) => {
    return (
        Loadable({
            loader: () => import('../../../routes/Community/containers/mainCategories.js'),

}, undefined, props
    )
    );
}
const AsyncCommynityDiscussion = () => {
    return (
        Loadable({
            loader: () => import('../../../routes/Community/containers/discussions.js')
})
    );
}

class CommunityLayout extends React.Component {

    constructor(props){
        super(props);
        this.handleBreadcrumbChange = this.handleBreadcrumbChange.bind(this);
        this.state = {breadcrumbitem: ''};
    }

    handleBreadcrumbChange(breadcrumbitem) {
        console.log(breadcrumbitem,"-------breadcrumbitem-------");

        this.setState({ breadcrumbitem});
    }

    render() {
        const {loading, loadMoreEntries} = this.props;
        if(this.state.breadcrumbitem) {
            Crumb.push(
                <Breadcrumb.Item><Link to="/community">{this.state.breadcrumbitem}</Link></Breadcrumb.Item>
            )
        }
        return (
            <div>
                <Row style={{marginBottom: 10}}>
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item><Link to="/community">Community</Link></Breadcrumb.Item>
                        {Crumb}
                    </Breadcrumb>
                </Row>
                <Route exact path='/community' component={AsyncCategoryDash()} />
                <Route exact path="/community/discussion/:id" component={AsyncCommynityDiscussion()} />
                <Route exact path="/community/:id" component={AsyncCategoryView({handleBreadcrumbChange:this.handleBreadcrumbChange})}/>
            </div>


        )
    }
}

export default CommunityLayout
