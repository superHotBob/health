import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment';

import {AreaChart, Area, LineChart, Line, BarChart, Bar, XAxis, ReferenceLine, CartesianGrid, Tooltip} from 'recharts';


export default class MedicationChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //   tab:''
        };
        this.formatDate = this.formatDate.bind(this);
        this.formatTooltip = this.formatTooltip.bind(this);
        this.getValue = this.getValue.bind(this);
    };

    static propTypes = {
        date: PropTypes.string
    };


    formatDate(value) {
        return moment(value).format('M/D');
    }

    formatTooltip(data) {
        const {payload, label} = data;
        if (payload.length == 0) return null;
        const info = payload[0].payload || {};
        const date = info.date || '';
        const value = this.getValue(info);//console.log(info);
        return (
            <div style={{backgroundColor: '#fff', padding: 5}}>{moment(date).format('M/D')} : {value}</div>
        );
    }

    getValue(info) {
        const {reports, reportsNeeded} = info;
        let reported = 0;
        reports.map((report)=> {
            if (report.isTaken) {
                reported++;
            }
        })

        return Math.round(reported/reportsNeeded*100);//report.value || null;
    }


    render() {
        const {data, item, loading} = this.props;
        const graph = 'area';

        if (loading) {
            return <LineChart width={300} height={100}>
                <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                Loading
            </LineChart>
        }

        if (data.length  === 0) {
            return <div>No Data</div>;
        }
        switch (graph) {
            default:
                return <LineChart width={300} height={100} data={data}>
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                    <Tooltip content={this.formatTooltip}/>
                    <Line type='monotone' dataKey={this.getValue} stroke='#1089ff' activeDot={{r: 4}} strokeWidth={2}
                          connectNulls={true}/>
                </LineChart>
                break;
            case 'area':
                return (<AreaChart width={300} height={100} data={data}
                                   margin={{top: 5, right: 0, left: 0, bottom: 5}}>
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>

                    <Area type='monotone' dataKey={this.getValue} activeDot={{r: 4}} stroke='#1089ff' fill='#d2eaff'
                          connectNulls={true}/>
                    {/*<XAxis dataKey="date"  padding={{left: 10, right: 10}} tickFormatter={this.formatDate} tickCount={7} interval="preserveStartEnd" axisLine={false} tickLine={false} />*/}
                    <Tooltip content={this.formatTooltip}/>


                </AreaChart>)
                break;
            case 'bar':
                return <BarChart width={300} height={100} data={data}>
                    <Bar dataKey={this.getValue} fill='#d2eaff'/>
                    <Tooltip content={this.formatTooltip}/>
                </BarChart>
                break;
        }

    }
}