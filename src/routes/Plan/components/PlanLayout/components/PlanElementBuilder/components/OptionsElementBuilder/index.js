import React from 'react';
import {Form, Select, Input, Checkbox, Tooltip, Icon} from 'antd';
import { compose, withHandlers, withState} from 'recompose';
import ScaleElementOptions from './options';
import messages from './messages';
import {injectIntl} from 'react-intl';
import Options from '../../../../../../../../components/FormCustomFields/components/Options';
import PlanElementBrahmsFormField from '../../_brahms';

const Option = Select.Option;
const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20},
};
const formTailLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20, offset: 4},
};

const OptionsElementBuilder = (props) => {
    // console.log(props);
    const {form, type, intl, scales=[], details, plan, mode, element} = props;
    const {getFieldDecorator, getFieldValue} = form;
    const {id, label, options=[], isDropdown=false, isMultiple=false, isVertical=false, hasLine=false} = details || {};
    const showBrahms = plan;// && id;
    // const formItemLayout=formItemLayoutDefault, formTailLayout=formTailLayoutDefault,
    return (
        <React.Fragment>
            <FormItem
                {...formItemLayout}
                label={intl.formatMessage(messages.title)}
            >
                {getFieldDecorator('title', {
                        initialValue:label,
                        rules: [{required: true, message: "Enter Title", whitespace: true}],
                    }
                )(
                    <Input/>
                )}
            </FormItem>

            <Options form={form} options={options} formItemLayout={formItemLayout} />

            {/* <ScaleElementOptions options={options} form={form} /> */}

            {/* <FormItem {...formTailLayout} className={'single-line'} >
                {getFieldDecorator('isDropdown', {
                    initialValue: isDropdown,
                    valuePropName: 'checked'
                })(
                    <Checkbox>
                        Show as Dropdown  <Tooltip title="Show options as dropdown">
                        <Icon type="question-circle-o"/>
                    </Tooltip>
                    </Checkbox>
                )}
            </FormItem> */}
            {/* {type !== 'dropdown' &&
            <React.Fragment>
                <FormItem {...formTailLayout}  className={'single-line'}>
                    {getFieldDecorator('isMultiple', {
                        initialValue: isMultiple,
                        valuePropName: 'checked'
                    })(
                        <Checkbox>
                            Is Multiple <Tooltip title="Multiple options can be selected">
                            <Icon type="question-circle-o"/>
                        </Tooltip>
                        </Checkbox>
                    )}
                </FormItem>

                <FormItem {...formTailLayout}  className={'single-line'}>
                    {getFieldDecorator('isVertical', {
                            initialValue: isVertical,
                            valuePropName: 'checked'
                        }
                    )(
                        <Checkbox>
                            Display Vertically <Tooltip title="Show options vertically">
                            <Icon type="question-circle-o"/>
                        </Tooltip>
                        </Checkbox>
                    )}
                </FormItem>
                {getFieldValue('isVertical') &&
                <FormItem {...formTailLayout}  className={'single-line'}>
                    {getFieldDecorator('hasLine', {
                        initialValue: hasLine,
                        valuePropName: 'checked'
                    })(
                        <Checkbox>
                            Add Separation Line <Tooltip title="Add separation Line between options">
                            <Icon type="question-circle-o"/>
                        </Tooltip>
                        </Checkbox>
                    )}
                </FormItem>} */}
            {/* </React.Fragment> */}
            {/* } */}
            {showBrahms && <PlanElementBrahmsFormField form={form} type={'optionId'} formItemLayout={formItemLayout}  possibleOptions={getFieldValue('options') || options} element={{type, ...element}} plan={plan} mode={mode} GoToComponent={props.GoToComponent} formatGoToElement={props.formatGoToElement} />}
   
        </React.Fragment>
    );
};

export default OptionsElementBuilder;