import React from 'react';
import {Card, Tooltip, Input, Button, Icon, Radio, Table} from 'antd';
import {compose, withState, withHandlers, withStateHandlers} from 'recompose';

import Truncate from 'react-truncate';
import moment from 'moment';
import {AvatarWithName} from "../../../../../User/components/AvatarWithName/index";
import {PageHeaderLayout} from "../../../../../../components/Layout/PageHeaderLayout/index";
import sort from '../../../../../../components/Tables/sort';
import TeamManager from './containers/TeamManager';
import { PhoneFieldView } from '../../../../../../components/FormCustomFields/components/Phone/view';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
export const UserTeamTable = props => {

    const {members = [], openModal, searchText, emitEmpty, onSearch, visibleModal, hideModal, loading = false, user} = props;
    const total = members.length;
    const suffix = searchText ? <Icon type="close-circle" onClick={emitEmpty}/> : null
    const columns = [{
        title: 'Name',
        dataIndex: 'user',
        key: 'name',
        render: (user) => {
            return <AvatarWithName user={user}/>
        },
        // sorter: (a, b) => sort(a, b, "name"),
        // filterDropdown: (
        //     <div className="custom-filter-dropdown">
        //         <Input
        //             suffix={suffix}
        //             ref={ele => this.searchInput = ele}
        //             placeholder="Search name"
        //             value={searchText}
        //             onChange={onSearch}
        //             onPressEnter={onSearch}
        //         />
        //     </div>
        // ),
        // filterIcon: <Icon type="search"/>,
    },
        {
            title: 'Role',
            dataIndex: 'roleText',
            key: 'role',
            // render: (info) => {
            //     return info;
            // },
        },
        {
            title: 'On',
            dataIndex: 'joinedDate',
            key: 'joinedDate',
            render: (date) => {
                return moment(date).format('L')
            },
            // sorter: (a, b) => a.joinedDate - b.joinedDate,
        },
        {
            title: 'Phone',
            key: 'phone',
            render: (info) => {
                const {user} = info || {};
                const {phone} = user || {};
                return <PhoneFieldView phone={phone} withType={false} />;
            },
        },

    ];
    const dataSource = members;
    const pageOpts = {
        //onChange: changePage,
        pageSize: 20,
        total: total,
        hideOnSinglePage: true
    };
    const actions = <React.Fragment>
        <RadioGroup defaultValue="active" style={{marginRight: 10}} defaultValue="active" onChange={props.handleStatus}>
            <RadioButton value="active">Active</RadioButton>
            <RadioButton value="inactive">Inactive</RadioButton>
        </RadioGroup>
        <Tooltip title="Manage Care Team"><Button onClick={openModal}><Icon type="edit"/></Button></Tooltip>

    </React.Fragment>;


    return (<PageHeaderLayout title={'Care Team Members' + (total > 0 ? ' (' + total + ')' : '')}
                              content=""
                              action={actions}
    >
        <Card type="table">
            <Table size="middle" dataSource={dataSource} rowKey={'id'} columns={columns} pagination={pageOpts}
                   loading={loading}/>
        </Card>
        {visibleModal && <TeamManager onHide={hideModal} user={user}/>}
    </PageHeaderLayout>)
}
const enhance = compose(
    withState('visibleModal', 'setOpenManager', false),
    withHandlers({
        openModal: props => () => {
            props.setOpenManager(true);
        },
        hideModal: props => () => {
            props.setOpenManager(false);
            props.refetch();
        }
    })
);

export default enhance(UserTeamTable);