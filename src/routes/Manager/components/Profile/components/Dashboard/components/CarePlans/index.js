import React from 'react';
import {Card, Table, Progress} from 'antd';
import Truncate from 'react-truncate';
import SettingsDropdown from '../../../../../../../../components/UI/SettingsDropdown';
import { UserPlanDeleteButton } from '../../../../../../../Plan/components/Buttons/containers/UserPlanDeleteButton';
import CardExtras from '../../../../../../../../components/Card';
import { getTableDateProps } from '../../../../../../../../components/Tables/TableColumn';
import { PlanLink } from '../../../../../../../../components/Plan/components/Link';

export const UserActionPlansTable = props => {

    const {plans=[], refetch, loading=false} = props;
    const total = plans.length;
    const columns = [{
        title: 'Title',
        // dataIndex: 'title',
        key: 'title',
        render: (info) => {
            const {plan} = info || {};
            const {title} = plan || {};
            return <PlanLink plan={plan} userPlan={info} label={title}  style={{width:'100%', display:'inline-block'}}/>
        },
    },
        {
            title: 'Start',
            key: 'startDate',
            className: 'd-none d-lg-table-cell ',
            ...getTableDateProps('startDate'),
        },
        {
            title: 'End',
            key: 'endDate',
            className: 'd-none d-lg-table-cell ',
            ...getTableDateProps('endDate'),
        },
        {
            title: 'Engagement',
            dataIndex: 'adherence',
            width:100,
            // className: 'd-md-none',
            key: 'adherence',
            render: (adherence={}) => {
                const {level} = adherence;
                return level && <Progress percent={level} />;
            },
        },
        {
            title: '',
            key: 'actions',
            width:50,
            render: (info) => {
                const {id, plan} = info;
                let items = [];
                //items.push({key:'edit', content: <Link to={'/pb/'+plan.id}>Edit</Link>});
                items.push( {key:'delete', content: <UserPlanDeleteButton asMenuItem userPlan={info} refetch={refetch} />});
    
                return <SettingsDropdown items={items}  />
            },
        },
    ];
    const dataSource = plans
    // plans.map((info, i) => {
    //     const {id, plan} = info;

    //     return {id, title: plan.title, key:i};
    // });
    const pageOpts = {
        //onChange: changePage,
        pageSize:5,
        total: total,
        hideOnSinglePage: true
    };

    const filters = [
		{ value: 'active', label: 'Active' },
		// { value: 'completed', label: 'Completed' },
		{ value: 'pending', label: 'Pending' },
		{ value: 'archived', label: 'Archived' }
	];
 
 
    const extra = <React.Fragment>
        <CardExtras.Split>
            <CardExtras.Filters filters={filters} value={props.status} onChange={props.loadByStatus} />
        </CardExtras.Split>
    </React.Fragment>;


    return (<Card type="table" title={'Plans Of Care '+ (total > 0 ? ' ('+total+')' : '')} extra={extra} >
            <Table size="middle" dataSource={dataSource} rowKey={'id'} columns={columns} pagination={pageOpts} loading={loading} />
        </Card>)
}

export default UserActionPlansTable;