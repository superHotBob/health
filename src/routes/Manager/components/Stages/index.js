import React from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';
import {Input, Card,Table,Radio,  Button, Icon, Tooltip} from 'antd';
import StageManager from './containers/StageManager';
import {PageHeaderLayout} from "../../../../components/Layout/PageHeaderLayout/index";
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

export default class Stages extends React.Component {
    state = {
        addStage:false,
        editStageId:'',
        // for search
        filterDropdownVisible: false,
        searchText: '',
        filtered: false,
        //
        data:this.props.stages,
        filteredInfo: null,
        sortedInfo: {},
    };

    static defaultProps = {
        pathways:[],
        total:0
    }

    addStage = () => {
        this.setState({addStage:true});
    }

    openEdit = (id) => {
        this.setState({addStage:true, editStageId:id});
    }

    hideManager = () => {
        this.setState({addStage:false, editStageId:''});
    }

    handleChange = (pagination, filters, sorter) => {

        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    }
  

    render() {
        const {loading} = this.props;
        let { sortedInfo } = this.state;
        const suffix = this.props.searchText ? <Icon type="close-circle-o" onClick={this.props.emitEmpty}/> : <Icon type="search"/>

        const columns = [{
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            sorter: (a, b) => a.title.length - b.title.length,
            render: (title, info) => {
                return <span onClick={() => this.openEdit(info.id)}>{title}</span>
            },
            // search
            filterDropdown: (
                    <Input
                        suffix={suffix}
                        ref={ele => this.searchInput = ele}
                        placeholder="Search name"
                        value={this.props.searchText}
                        onChange={this.props.onSearch}
                        onPressEnter={this.props.onSearch}
                    />
            ),
            filterIcon: <Icon type="search"/>,
        }/*, {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text, info) => {
                return info.isActive ? 'Active' : 'Inactive'
            },
            filters: [
                {text: 'Active', value: true},
                {text: 'InActive', value: false},
            ],
            onFilter: (value, record) => record.isActive.includes(value),
            sorter: (a, b) => a.isActive - b.isActive,
            sortOrder: sortedInfo.columnKey === 'isActive' && sortedInfo.order,
        }, {
            title: 'Date',
            dataIndex: 'createdAt',
            key: 'date',
            render: (info) => moment(info).format('L'),
        }*/];

        const { total} = this.props;
        const stages = this.state.data;
        console.log(this.props.stages,stages);
        const actions = <React.Fragment>
        <RadioGroup defaultValue="all" style={{marginRight:10}} >
            <RadioButton value="all">All</RadioButton>
            <RadioButton value="open">Open</RadioButton>
            <RadioButton value="past">Past</RadioButton>
        </RadioGroup>
        <Tooltip title="Add New Stages"><Button type="primary" onClick={this.addStage}><Icon type="plus"  /></Button></Tooltip>
    </React.Fragment>;

      
        return (
            <PageHeaderLayout title={'Stages'+ (total > 0 ? ' ('+total+')' : '')}
                          content=""
                          // extraContent={<Input.Search style={{width:200}} />}
                          action={actions}
                          >
            <Card type="table" >
                {this.state.addStage && <StageManager id={this.state.editStageId} onCancel={this.hideManager}/>}
                <Table dataSource={stages} columns={columns} pagination={false} onChange={this.handleChange}
                       ref={(input) => {
                           this.table = input;
                       }}/>
            </Card>
            </PageHeaderLayout>);
    }
}