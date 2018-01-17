import React from 'react';
import {
    FormattedMessage,
    FormattedDate,
} from 'react-intl';

import TrackerSelect from './Biometric/components/TrackerSelect/containers';
import TrackerField from  './Biometric/components/TrackerField/containers';
import {TrackerAddForm, TrackerEditForm} from '../../BiometricPlan/components/Biometric/components/TrackerModal/containers'
import {  Popover,Table, List,Icon,Button, Card, Tooltip, Popconfirm } from 'antd';
import moment from "moment/moment";

export class BiometricPlanBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isBuilderMode: false,// if this is a builder mode
            visible: false,
            addModal: false,
            amid: 0,
            date: props.date,
        };
        this.editClick = this.editClick.bind(this);
        this.deleteClick = this.deleteClick.bind(this);
        this.addTracker = this.addTracker.bind(this);
    };
    static propTypes = {
    };
    static defaultProps = {
        date:  moment().format('YYYY-MM-DD')
    }
    editClick = (e, info) => {
        this.setState({visible: true, amid:info.key});
    }
    deleteClick = (e, item) => {
        const {user_id, trackerDelete } = this.props;
        const {date} = this.state;
        return trackerDelete(item.key, user_id, date);//, !this.state.isClicked, this.toggleCoin);
    }
    closeClick = () => {
        this.setState({visible: false});
    }
    addTracker = (id) => {
        // create a new medication
        //console.log(id);
        this.setState({
            addModal:true,
            amid:id
        });
    }

    showDate = (type) => {
        var dateTime = new Date(this.state.date);
        let date = '';
        if (type === 'prev') {
            date = moment(dateTime).add(-1, 'days').format("YYYY-MM-DD");
        } else {
            date = moment(dateTime).add(1, 'days').format("YYYY-MM-DD");
        }
        this.setState({date:date});
        this.props.loadDate(date, this.props.user_id);
    };

    hideAddTracker = () => {
        // create a new medication
        //console.log(id);
        this.setState({
            addModal:false,
            amid:0
        });
    }
    render() {
        const {info, loading, user_id} = this.props;
        if (loading) {
            return (
                <Card loading>
                Loading...
                </Card>
            );
        }
        const {date} = this.state;

        const {columns, trackers} = info;
        const listColumns = [
            { title: '', dataIndex: 'name', key: 'name', render: (text, item) =>  <div>{text}<Icon onClick={(e)=> this.editClick(e, item)} type="edit" /> <Popconfirm title="Are you sure you want to delete this tracker?" onConfirm={(e)=> this.deleteClick(e, item)}  okText="Yes" cancelText="No"><Icon type="delete" /></Popconfirm></div>},
           //
            { title: '', dataIndex: 'input', key: 'input', width: 150  },
            //{ title: '', dataIndex: 'icon', key: 'acts', width: 50}
        ];

        const tableColumns = [
            { title: '', dataIndex: 'name', key: 'name', render: (text, item) =>  <div>{text}<Icon onClick={(e)=> this.editClick(e, item)} type="edit" /> <Popconfirm title="Are you sure you want to delete this tracker?" onConfirm={(e)=> this.deleteClick(e, item)}  okText="Yes" cancelText="No"><Icon type="delete" /></Popconfirm></div> },
        ];
        // adding columns
        columns.map(column => {
            tableColumns.push({ title: column.name, dataIndex: 'col_'+column.id, key: column.id, width: 150 },)
        });

        const data = []
        const dataList = []

        // normalize trackers
        trackers.map(tracker => {
            const tracker_columns = tracker.columns;
            const timesToReport = tracker.timesToReport;
            const measurement = tracker.measurement;
            const reports = measurement.reports;
            //console.log(measurement);
            // if we have columns - put it into columns table
            if (tracker_columns.length > 0) {
                let tracker_column_info = { key: tracker.id, name: measurement.label, input: <TrackerField info={tracker} date={date} list_id={info.id} />};
                tracker_columns.map(column_id => {
                    //console.log(column_id);
                    let inputFields = [];
                    for (var i=0;i<timesToReport;i++) {
                        let report = null;
                        if (reports) {
                            const report_arr = reports.filter((e) => {
                                return e.reportKey === i && e.columnId === column_id
                            });

                            //console.log(report_arr);
                            if (report_arr.length > 0) {
                                report = report_arr[0];
                            }
                        }
                        //console.log(report);
                        inputFields.push(<TrackerField info={tracker} date={date} column={column_id} report={report} reportKey={i} list_id={info.id} />);
                    }

                    tracker_column_info['col_'+column_id] = <List
                        size="small"
                        dataSource={inputFields}
                        renderItem={item => (<List.Item>{item}</List.Item>)}
                    />});

                data.push(tracker_column_info);
            } else {
                // if not -  just to table
                let inputFields = [];
                for (var i=0;i<timesToReport;i++) {
                    let report = null;
                    //console.log(reports);
                    if (reports) {
                        const report_arr = reports.filter((e) => e.reportKey === i);
                        if (report_arr.length > 0) {
                            report = report_arr[0];
                        }
                    }
                   // console.log(report);
                    inputFields.push(<TrackerField info={tracker} date={date} report={report} reportKey={i} list_id={info.id} />);
                }
                //
                let trackerName = measurement.label;

                dataList.push({ key: tracker.id, name: trackerName, input: <List
                    size="small"
                    dataSource={inputFields}
                    renderItem={item => (<List.Item>{item}</List.Item>)}
                />});
            }

        });



        return (

            <Card title={<FormattedMessage id="plan.trackers.medication.card.title2" defaultMessage="Trackers for {date}" values={{
                date: <FormattedDate
                    value={new Date(date)}
                    year='numeric'
                    month='long'
                    day='2-digit'
                />
            }} description="Trackers for Today" />}
                  extra={<div><Button.Group><Tooltip title={<FormattedMessage id="plan.prev_day" defaultMessage="Previous day" />}><Button size="small" onClick={() => this.showDate('prev')}><Icon type="left" /></Button></Tooltip><Tooltip title={<FormattedMessage id="plan.next_day" defaultMessage="Next day" />}><Button size="small" onClick={() => this.showDate('next')}><Icon type="right" /></Button></Tooltip></Button.Group>
                      <Tooltip title={<FormattedMessage id="trsvker.add" defaultMessage="Add Tracker" />} placement={'bottom'}><Popover content={<TrackerSelect userId={user_id} onSelect={this.addTracker} />} title="Add Tracker" trigger="click"><Button size="small" style={{marginLeft:10}} /*onClick={()=>this.addMedication()}*/><Icon type="plus" /></Button></Popover></Tooltip>
                  </div>}>
                    <Table size="middle"  columns={listColumns} dataSource={dataList} scroll={{x: 600}} showHeader={false} pagination={false} />
                    <Table size="middle" columns={tableColumns} dataSource={data} scroll={{x: 600}} pagination={false} />



                {this.state.addModal &&
                <TrackerAddForm amid={this.state.amid}
                                    userId={user_id}
                                    date={date}
                                    title={<FormattedMessage id="plan.tracker.add" defaultMessage="Add Tracker" description="Add Tracker" />}
                                    onCancel={this.hideAddTracker} />}

                {this.state.visible &&
                <TrackerEditForm id={this.state.amid}
                              userId={user_id}
                              date={date}
                              title={<FormattedMessage id="plan.biometricplan.biometric.trackermodal.modal.title" defaultMessage="Edit Tracker " description="Edit Tracker" />}
                              onCancel={this.closeClick} />}

            </Card>
            )
    }
}



export default BiometricPlanBody
