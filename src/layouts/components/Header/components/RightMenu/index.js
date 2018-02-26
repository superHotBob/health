import React from 'react'
import { Link } from 'react-router-dom';
import Notification from '../../containers/Notifications'
import MenuBadges from './containers/MenuBadges';
import ChangeRoleModal from './containers/ChangeRole';
import {Menu, Avatar, Row, Col } from 'antd';
import UserWidget from '../../../../../routes/User/components/UserWidget';
const SubMenu = Menu.SubMenu;


export default class RightMenu extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.toggleUser = this.toggleUser.bind(this);
        this.state = {
            isOpen: false,
            isOpenUser: false,
            openChangeRole:false,
            loading: false,
            notificationsLastCursor: props.lastCursor
        };
    }
    updateLastNotification = (cursor) => {

        this.setState({notificationsLastCursor: cursor});
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


    toggleRole = () => {
        this.setState({openChangeRole: !this.state.openChangeRole})
    };

    handleClick = ({key}) => {
       // if (key == 'onclick')

    }

    render() {

        const {account, user} = this.props;

        // check if we have other roles - add switcher
        const {possibleNetworkRoles, possibleProviderRoles, currentRole} = account;
        const haveOtherRoles = possibleNetworkRoles.length > 0 || possibleProviderRoles.length > 0;
        const roles = possibleNetworkRoles;
        let user_menu_items = [];
        let defaultMenu = [];
        if (haveOtherRoles) {
            user_menu_items.push(['Change Role', 'onclick',this.toggleRole]);
        }

        if (currentRole == 'patient') {
            defaultMenu = [
                ['Settings', '/settings'],
                ['Calendar', '/calendar', 'calendar'],
                ['Health', '/health', 'health'],
                ['Help Center', '/help', 'help'],
            ];
        }
        user_menu_items = [...user_menu_items, ...defaultMenu];

        user_menu_items.push([1]);
        user_menu_items.push(['Logout', '/logout']);


        return (
            <Row type="flex" justify="end" align="middle">
                <Col>
                    <Menu
                        /*onClick={this.handleClick}*/
                        selectedKeys={['1']}
                        mode="horizontal"
                        style={{'borderBottom':'none', 'float':'right'}}
                    >
                        <SubMenu key="sub1" title={<UserWidget user={user} onlyFirst={true} />}>

                            {user_menu_items.map((item) => {
                                if (item.length == 1) {
                                    return (<Menu.Divider key={'div'} />)
                                }
                                return (
                                    <Menu.Item key={item[1]}>

                                        {item[1] === 'onclick' ?
                                            <a onClick={item[2]}>{item[0]}</a>
                                        : <Link to={item[1]}>{item[0]}</Link>}
                                    </Menu.Item>)

                            })}
                        </SubMenu>

                    </Menu>
                    <MenuBadges lastNotificationCursor={this.state.notificationsLastCursor} updateLastNotification={this.updateLastNotification} />
                    {this.state.openChangeRole && <ChangeRoleModal roles={roles} currentRole={currentRole} onHide={this.toggleRole} />}

                </Col>
            </Row>
        );
    }
}