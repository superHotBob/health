import React from 'react';
import { compose, withState, withProps, withHandlers, defaultProps, mapProps} from 'recompose';
import {injectIntl} from 'react-intl';
import {Form, Input, Select, Row, Col} from 'antd';
import TrackerSelect from "../../../../../../../../components/Autosuggest/containers/TrackerSelect";
import TrackerUnitsSelect from "../../../../../../../../components/Autosuggest/containers/TrackerUnitsSelect";
import TrackerAdvanced from './components/TrackerAdvanced';

const FormItem = Form.Item;
const { TextArea } = Input;

const formItemLayout = {
    labelCol: {span: 5},
    wrapperCol: {span: 19},
};
const formTailLayout = {
    labelCol: {span: 5},
    wrapperCol: {span: 19, offset: 5},
};

const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
};

const customUnitId = process.env.NODE_ENV === 'production' ? 'MQ' : 'a1';

const TrackerElementBuilder = (props) => {
    const {selectTracker, advanced, toggleAdvanced, measurement={}, customTracker=false, toggleCustom} = props;

    const {form, intl,  details} = props;

    const {getFieldDecorator, getFieldValue} = form;
    //console.log(details);
    const {parentId, textBefore='', description='', label='', units={}} = details || {};
    // console.log(units);
    return (
        <React.Fragment>

            {customTracker ?

                <React.Fragment>

                    <FormItem
                        {...formItemLayout}
                        label="Tracker name"
                        help={<div style={{marginBottom:5}}>Or <a onClick={toggleCustom}>Select from global trackers</a></div>}
                    >
                        <Row gutter={5}>
                            <Col lg={10}>
                                {getFieldDecorator('label', {
                                    initialValue: label,
                                    rules: [{required: true, message: "Enter Title", whitespace: true}],
                                    }
                                )(
                                    <Input />
                                )}
                            </Col>
                            <Col lg={9}>
                                {getFieldDecorator('unitId', {
                                        initialValue: units.id || '',
                                        rules: [{required: true, message: "Select Unit"}],
                                    }
                                )(
                                    <TrackerUnitsSelect />
                                )}
                            </Col>
                            {getFieldValue('unitId') === customUnitId &&
                            <Col lg={5}>
                                {getFieldDecorator('unitName', {
                                        initialValue: units.name || '',
                                        rules: [{required: true, message: "Enter Unit Name", whitespace: true}],
                                    }
                                )(
                                    <Input />
                                )}
                            </Col>}
                        </Row>
                    </FormItem>
                </React.Fragment>
                :
                <FormItem
                    {...formItemLayout}
                    label="Select Tracker"
                    help={<div style={{marginBottom:5}}>Or <a onClick={toggleCustom}>Create your own</a></div>}
                >
                    {getFieldDecorator('parentId', {
                            initialValue: parentId,
                            rules: [{required: true, message: "Select Tracker"}],
                        }
                    )(
                        <TrackerSelect /*selectInfo={selectTracker}*/ />
                    )}
                    
                </FormItem>

            }

            <FormItem
                {...formItemLayout}
                label="Text before"
            >
                {getFieldDecorator('textBefore', {
                        initialValue:textBefore,
                    }
                )(
                    <TextArea autosize={{ minRows: 2, maxRows: 6 }} />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="Text after"
            >
                {getFieldDecorator('textAfter', {
                        initialValue:description,
                    }
                )(
                    <TextArea autosize={{ minRows: 2, maxRows: 6 }} />
                )}
            </FormItem>

            {/* {advanced ?  <TrackerAdvanced form={form} measurement={measurement} details={details} /> : <a onClick={toggleAdvanced}>Show Advanced</a> } */}
            <TrackerAdvanced form={form} measurement={measurement} details={details} />
            {/*<FormItem {...formTailLayout}>
                {getFieldDecorator('isBlog')(
                    <Checkbox>
                        Use as Blog
                    </Checkbox>
                )}
            </FormItem>*/}
        </React.Fragment>
    );
}

const enhance = compose(
    injectIntl,
    withState('customTracker', 'setCustomTracker', props => {
        const {details={}} = props;
        const {parentId=''} = details;
        return parentId === '';
    }),
    withState('advanced', 'setAdvanced', false),
    withState('measurement', 'setMeasurement', props => {
        // get measurement from details
        return props.details || {};
    }),
    withHandlers({
        toggleAdvanced: props => () => {
            props.setAdvanced(!props.advanced);
        },
        toggleCustom: props => () => {
            props.setCustomTracker(!props.customTracker);
        },
        selectTracker: props => measurement => {
            if (measurement) {
                props.setMeasurement(measurement);
            }
        }
    })
);


export default enhance(TrackerElementBuilder);