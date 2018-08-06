/**
 * Created by Pavel on 06.12.2017.
 */
import React from 'react';

import { Input, Form } from 'antd';
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};
const EmailForm = props => {
    const { getFieldDecorator } = props;
    const { label } = props;
    return (

        <FormItem
            {...formItemLayout}
            label={label}

        >
            {getFieldDecorator('email', {
                initialValue:props.email
            })(
                <Input />
            )}
        </FormItem>

    );
}

export default EmailForm;
