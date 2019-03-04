import React from 'react';
import {Form, Input, Select} from 'antd';
import {BrahmsRuleActions} from './containers/RuleActions';
import { InputWithConditionField } from '../../../../../FormCustomFields/components/InputWithCondition';
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

const formItemLayout = {
    labelCol: {
        xs: {span: 20},
        sm: {span: 5},

    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 19},
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 14,
            offset: 6,
        },
    },
};

const OPTIONS = [
    {key: 'output', label: 'Output'},
    {key: 'ap', label: 'Suggest ActionPlan'},
    {key: 'goto', label: 'Go To'},
];

export const OPTIONS_CONDITIONAL = [
    {key: 'equal', label: 'Equal'},
    {key: 'less_than', label: 'Less Than'},
    {key: 'less_eq_than', label: 'Less/Equal Than'},
    {key: 'more_than', label: 'More Than'},
    {key: 'more_eq_than', label: 'More/Equal Than'},
    {key: 'between', label: 'Between'},
]


const BrahmsRuleManager = props => {
        console.log(props, 'BrahmsRuleManager');
        const {label, rule, form, possibleOptions=[], onSubmit, assessment, ...otherProps } = props;
        const {excludeActions=[]} = otherProps;
        const {getFieldDecorator, getFieldValue} = form;

        const {ruleType, ruleValue,ruleValueEnd, ruleValueId,ruleActionType, ruleAction} = rule || {};

        const isValueType = possibleOptions.length === 0;
        return <>

            {isValueType &&  <FormItem
                {...formItemLayout}
                label={label}
            >
            <InputWithConditionField form={form} value={{condition:ruleType, min:ruleValue, max:ruleValueEnd}} conditionKey={'ruleType'} />
            </FormItem>}
                {/* <FormItem
                {...formItemLayout}
                label={'Condition'}
            >
                {getFieldDecorator('ruleType', {
                    })(
                        <Select style={{width:'100%'}} >
                            {OPTIONS_CONDITIONAL.map(option => <Option key={option.key} value={option.key}>{option.label}</Option>)}
                        </Select>
                    )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label={'Value'}
            >
                {getFieldDecorator('ruleValue', {
                    })(
                        <Input />
                    )}
            </FormItem>
            </>} */}
            {possibleOptions.length > 0 && <FormItem
                {...formItemLayout}
                label={'If'}
            >
                {getFieldDecorator('ruleValueId', {
                    initialValue:ruleValueId
                    })(
                        <Select style={{width:'100%'}} >
                        {possibleOptions.map(option => <Option key={option.id} value={option.id}>{option.label}</Option>)}
                    </Select>
                    )}
            </FormItem>}

            <FormItem
                {...formItemLayout}
                label={'Then'}
            >
                {getFieldDecorator('ruleActionType', {
                    initialValue:ruleActionType
                    })(
                        <Select style={{width:'100%'}} >
                            {OPTIONS.filter(o=> !excludeActions.includes(o.key)).map(option => <Option key={option.key} value={option.key}>{option.label}</Option>)}
                        </Select>
                    )}
            </FormItem>

            {getFieldValue('ruleActionType') && <FormItem
                {...formItemLayout}
                label={'Action'}
            >
                {getFieldDecorator('ruleAction', {
                    initialValue: ruleAction
                })(
                    <BrahmsRuleActions rule={rule} assessment={assessment} type={getFieldValue('ruleActionType')} />
                )}
            </FormItem>}
        </>
}

export default BrahmsRuleManager;

export const formatAssessmentRuleCondition = rule => {
    const {ruleType='equal'} = rule || {};

    const item = OPTIONS_CONDITIONAL.find(o=>o.key == ruleType);
    console.log(rule);
    console.log(OPTIONS_CONDITIONAL);
    console.log(item);
    const {label} = item || {};
    return label
}