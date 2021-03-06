import React from 'react';
import {injectIntl} from 'react-intl';
import {Form, Input} from 'antd';
import messages from './messages';
const FormItem = Form.Item;
const TextArea = Input.TextArea;

const formItemLayout = {
    labelCol: {span: 5},
    wrapperCol: {span: 19},
};
const formTailLayout = {
    labelCol: {span: 5},
    wrapperCol: {span: 19, offset: 5},
};

const TextElementBuilder = (props) => {
    const {form, intl,  details={}} = props;
    const {getFieldDecorator} = form;
    const {text=''} = details || {};
    return (
        <React.Fragment>
            <FormItem
                {...formItemLayout}
                label={intl.formatMessage(messages.title)}
            >
                {getFieldDecorator('text', {
                        initialValue:text,
                        rules: [{required: true, message: "Enter Text", whitespace: true}],
                    }
                )(
                    <TextArea autosize={{ minRows: 2}} />
                )}
            </FormItem>
        </React.Fragment>
    );
}

export default injectIntl(TextElementBuilder);

export const prepareInput = (values) => {
    const {text, icon} = values;

    return {
        textElement: {
            text,
            icon
        }
    }
}