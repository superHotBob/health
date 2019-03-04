import AssessmentQuestionManagerPure from '../components/Question';
import AssessmentQuestionSelect from '../components/Question/select';
import AssessmentQuestionExistingQuestionManager from '../components/Question/existing';
import AssessmentQuestionYesNoManager from '../components/Question/yes_no';
import AssessmentQuestionRadioManager from '../components/Question/options';
import {injectIntl} from 'react-intl';
import {Form, message} from 'antd';
import {compose, branch, renderComponent, withState, withProps, withHandlers} from 'recompose';
import { withDrawer } from '../../../../Modal';
import DefaultI18nEn from '../../../../../i18n/en';
import { withCreateOrUpdateAssessmentQuestion } from '../../../mutations';
import { prepareBrahmsInput } from '../../../../Brahms/components/Manager/containers/Field';
import { formatAssessmentGoToElement } from '../../../../../routes/Manager/components/Assessments/components/AssessmentView/containers/AssessmentQuestion';

const enhance = compose(
    injectIntl,
    Form.create(),
    withCreateOrUpdateAssessmentQuestion,
    withState('type', 'setType', props => {
        const {question} = props;
        const {type} = question || {};
        return type
    }),
    branch(props => {
        const {type} = props;
        return !type;
    }, renderComponent(AssessmentQuestionSelect)),
    withHandlers({
        onSubmit: props => () => {
            const {form, question, type:typeInit} = props;
            console.log('Submit');
            form.validateFields((err, values) => {
                if (!err) {
                    console.log(props);
                    console.log(values);
                    const {type=typeInit} = question || {};
                    const input = prepareAssessmentQuestionInput(values, type);
                    // submit the section
                    let finish =  question ? props.updateAssessmentQuestion(input) : props.createAssessmentQuestion(input);
                    
                    finish.then(() => {
                        message.success(props.intl.formatMessage(DefaultI18nEn.saved));
                        if (props.onHide) {
                            props.onHide();
                        }
                        if (props.refetch) {
                            props.refetch();
                        }
                    });
                }
            });
        },
        formatGoToElement: props => element => {
            return formatAssessmentGoToElement(element, props);
        }
    }),
    withProps(props => {

        const { intl, question } = props;
        const { id } = question || {};
        const title = intl.formatMessage(DefaultI18nEn.createUpdateSomething, { isUpdate: (id && id !== ''), title: 'Question' })
        return {
            modalTitle: title
        }
    }),
    withDrawer,
    branch(({question,type}) => !question && type === 'question', renderComponent(AssessmentQuestionExistingQuestionManager)),
    branch(({type}) => type === 'yes_no', renderComponent(AssessmentQuestionYesNoManager)),
    branch(({type}) => (type === 'radio' || type === 'dropdown' || type === 'list' || type === 'range'), renderComponent(AssessmentQuestionRadioManager)),
);
export const AssessmentQuestionManager = enhance(AssessmentQuestionManagerPure);


const prepareAssessmentQuestionInput = (values, type) => {
    console.log(values,'valuesvaluesvalues');
    const {title, description, answers=[], brahms} = values;

    const brahmsInput = prepareBrahmsInput(brahms);
    let input = {title, description, type, brahms:brahmsInput};
    if (type === 'input') {
        const {isNumeric} = values;
        input.openEndedInput = {isNumeric};
    } else if (type === 'time') {
    } else if (type === 'question') {
    } else if (type === 'yes_no') {
        const {yes, no} = values;
        input.yesNoInput = {yes, no};
        //input.parentQuestionId = quest
    } else {
        const {isMultiple, numberAsPrefix} = values;
        input.optionsInput = {isMultiple, numberAsPrefix, answers};
    }
    return input;
}