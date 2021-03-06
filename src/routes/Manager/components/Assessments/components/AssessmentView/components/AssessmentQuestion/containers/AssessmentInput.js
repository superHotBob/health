import AssessmentInputPure from '../components/AssessmentInput';
import {withHandlers} from 'recompose';
import moment from 'moment';
import { prepareTimeInput } from '../../../../../../../../../utils/datetime';
const enhance = withHandlers(({onChange}) => {
    let timer = null;

    return {
        onChange: props => (e) => {
            const {onChangeReport, onChange, isTime=false} = props;
            // console.log(e);
            let value;
            if (isTime) {
                // console.log(moment.utc(e).format('HH:mm:ss'));
                value = e && prepareTimeInput(e);
            } else {
                value = e && e.toString();//.target.value;
                console.log(value, 'valuevaluevalue')
                onChange(value);
                onChangeReport({value});
                return;
            }
            console.log(value);
            onChange(value);
            clearTimeout(timer);
            timer = setTimeout(function () {
                let reports = null;
                if (isTime) {
                    // reports = {time: value};
                    reports = {value: value};
                } else {
                    reports = {value};
                }
            
                onChangeReport(reports);
            }, 500);
        }
    }
});

const AssessmentInput = enhance(AssessmentInputPure);
export default AssessmentInput;