import React from 'react'
import PropTypes from 'prop-types';
import VMasker from 'vanilla-masker';
import { InputNumber } from 'antd';

export class TrackerField extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isReported: false,
        };
    };
    static propTypes = {
        id: PropTypes.number,
        date: PropTypes.string,
        info: PropTypes.object.isRequired,
        list_id: PropTypes.string,
        reportKey: PropTypes.number,
        column: PropTypes.number,
        report: PropTypes.object,
    };

    toggleReported = () => {
        //console.log(this.state.isClicked);
        if (this.state.isReported) {
            this.setState({isReported:false});
        } else {
            this.setState({isReported:true});
        }
        //console.log(this.state.isClicked);
    }

    componentWillMount = () => {
        /*const {id, quantity, report} = this.props;
        const report_id = report.id || 0;
        if (report_id) {
            this.setState({isReported: true});
        }*/
    }

    handleChange = (value) => {
        //e.preventDefault();
        //console.log(value);
        const { onChange, info, report, date, list_id, reportKey, column } = this.props;
        const {id} = info.measurement;
        let report_input = {id:(report && report.id ? report.id : 0), value:value, date:date, reportKey:reportKey, column:column};

        return onChange(id, report_input, list_id);
    }

    render() {
        //console.log(this.props);
        const {info, report} = this.props;
        //console.log(info);
        const {id, label, units, inputMask} = info.measurement;
        const unit_id = units.id;
        const unit_name = units.name;
        const report_value = report && report.value || '';
        //const pattern = '/(\\d{3})(?=\\d)/g';
        //let inputMask = '999/999';
        //console.log(inputMask);
        //console.log(report_value);
        //let outputMask = '999/999';
        //console.log(report_value);
        //console.log(inputMask);
        //console.log(VMasker.toPattern(report_value, inputMask));
        //const hasReport = this.state.isClicked;
        //console.log(inputMaskRegex);
        return (<InputNumber
            defaultValue={report_value}
            //formatter={value => value.replace(/\B(?=(\d{3})+(?!\d))/g, '/')}
            formatter={value => {
                //console.log();
                //console.log(value);
                if (inputMask != '') {
                    //console.log(inputMask);
                    //console.log(value);
                    return VMasker.toPattern(value, inputMask)
                } else {

                    return VMasker.toNumber(value);
                }

            }}
            //parser={value => VMasker.toPattern(value, inputMask)}
            //parser={value => value.replace(/\$\s?|(,*)/g, '')}

            onChange={this.handleChange}
        />)
    }
}



export default TrackerField