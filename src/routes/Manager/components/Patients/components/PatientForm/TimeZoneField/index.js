/**
 * Created by Pavel on 06.12.2017.
 */
import React from 'react';

import {Select,Form} from 'antd';
const Option = Select.Option;
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
const TimeZoneForm = props => {
     const {getFieldDecorator} = props;
      

     
        return(
          
            <FormItem
            {...formItemLayout}
            label="Time zone"

        > {getFieldDecorator('timezone', {
        })(
            <Select >
                {/* {timezones.map(timezone => <Option key={timezone.id} value={timezone.id}>{timezone.name}</Option>)} */}
            </Select>
        )}
        </FormItem>

              );
    }

    export default TimeZoneForm;