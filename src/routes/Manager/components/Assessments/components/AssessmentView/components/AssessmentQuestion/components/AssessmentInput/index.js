import React from 'react';
// import { Input } from 'antd';
import { TimeField } from '../../../../../../../../../../components/FormCustomFields';
import { getMomentFromUTCTime } from '../../../../../../../../../../utils/datetime';
import InputField from '../../../../../../../../../../components/FormCustomFields/components/InputField';
import {TrackerInput} from '../../../../../../../../../Plan/components/Tracker';

const AssessmentInput = props => {
    const {onChange, reports, disabled=false, isTime=false, isTracker=false, isNumber} = props;
    console.log(props, 'props');
    let {value} = props;
    // let value = reports.map(report => report.value);
    // value = value[0] || null;


    if (isTracker) {
        return <TrackerInput onChange={onChange} disabled={disabled} value={value} measurement={props.tracker} />;
    }
    
    if (isTime) {

        if (value !== '') {
            value = value && getMomentFromUTCTime(value);
        } else {
            value = null;
        }
        console.log(props);
        console.log(value);
        return <TimeField onChange={onChange} disabled={disabled} value={value} />
    }
    return <InputField onChange={onChange} isNumber={isNumber} asTextArea disabled={disabled} value={value} />
}

export default AssessmentInput;