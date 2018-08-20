import React from 'react'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom';
import ReactPlaceholder from 'react-placeholder';
import RightMenu from './components/RightMenu';
import { Row, Col, Menu, Card} from 'antd';
import {GetGlobalLabel} from "../../../components/App/app-context";
import { withCurrentUser } from '../../../queries/user';
import { withCurrentNetwork } from '../../../queries/network';



class Header extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.toggleUser = this.toggleUser.bind(this);
        this.state = {
            isOpen: false,
            isOpenUser: false,
            loading: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    toggleUser() {
        this.setState({
            isOpenUser: !this.state.isOpenUser
        });
    }
    render() {
        const loading = this.props.loading;
        const {currentUser={}, updateCurrentUserInfo} = this.props;
        const {token} = currentUser;
        const location = this.props.location;

        const {currentNetwork:network={}} = this.props;
        const menu_items = [
            ['Dashboard', '/', 'dashboard'],
            ['Planstore', '/planstore', 'planstore'],
            ['Community', '/community', 'community'],
        ];

        const menuHtml = menu_items.map((item) => {

            if (item[1] ) {
                /*<HaveModule module={item[2]}>*/

                return (
                    <Menu.Item  key={item[1]}>
                        <NavLink to={item[1]}><GetGlobalLabel type={item[2]} defaultValue={item[0]} /></NavLink>
                    </Menu.Item>
                )
            }

            return (
                <Menu.Item key={item.toString()}>
                    <NavLink  to={item[1]}>{item[0]}</NavLink>
                </Menu.Item>)

        });

        const locationPath = '/'+location.pathname.split('/')[1];

        console.log('Loading Header', this.props);
//{/*customPlaceholder={HeaderPlaceholder}*/}
    //console.log(this.props, 'Loading header');
    if (loading) {
        return <Card loading  bordered={false} />
    }
        if (!token) {
            return (
                <div style={{'textAlign':'center'}}>
                    <NavLink to="/"><img alt="" className="logo" style={{height:'50px'}} src={network.logo} /></NavLink>
                </div>
            )
        }
        return (
                <Row type="flex" justify="space-between" align="middle">
                    <Col md={5}><Link to={'/'}><img alt="" className="logo" style={{height:'50px', marginRight:'5px'}} src={network.logo} /></Link></Col>
                    <Col>
                        <Menu
                            onClick={this.handleClick}
                            selectedKeys={[locationPath]}
                            mode="horizontal"
                            style={{'borderBottom':'none'}}
                        >
                            {menuHtml}
                        </Menu>
                    </Col>

                    <Col md={9}>
                        <RightMenu currentUser={currentUser} updateCurrentUserInfo={updateCurrentUserInfo} />
                    </Col>

                </Row>
        );
    }
}

 

 export default  withCurrentUser(withCurrentNetwork(Header));