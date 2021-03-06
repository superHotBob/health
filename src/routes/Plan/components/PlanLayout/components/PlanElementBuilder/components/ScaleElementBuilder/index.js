import React from 'react';
import {Form, Select, Input, Icon, Tooltip, Button} from 'antd';
import { compose, withHandlers, withState, withProps, branch, withStateHandlers} from 'recompose';
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


const ScaleElementOptionsPure = (props) => {
    const {form, options=[], keys=[], add, remove} = props;

    //console.log(props);
    return <React.Fragment>
        {keys.map((k, index) => {
            const block = options[k] || {};
            form.getFieldDecorator(`ids[${k}]`, {initialValue: block.value});
            form.getFieldDecorator(`keys[${index}]`, {initialValue: k});
            return (
                <FormItem
                    {...(index === 0 ? formItemLayout : formTailLayout)}
                    label={index === 0 ? 'Options' : ''}
                    required={true}
                    key={index}
                >
                    {form.getFieldDecorator(`options[${k}]`, {
                        initialValue: block.label || '',
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{
                            required: true,
                            message: "Please enter option "+((index+1))+" or delete this line.",
                        }],
                    })(
                        <Input placeholder={"Option "+(index+1)} addonAfter={keys.length > 2 ? (
                            <Tooltip title="Remove Option"><Icon
                                className="dynamic-delete-button"
                                style={{marginLeft:5, color:'red'}}
                                type="minus-circle-o"
                                disabled={keys.length <=2}
                                onClick={() => remove(k)}
                            /></Tooltip>
                        ) : null}/>
                    )}
                </FormItem>
            );
        })}

        <FormItem {...formTailLayout}>
            <Button type="dashed" onClick={add} style={{width: '60%'}}>
                <Icon type="plus"/> Add Option
            </Button>
        </FormItem>
    </React.Fragment>
}


const enhance = compose(

    withHandlers({
        add: props => event => {
            console.log(props);
            const keys = props.keys;
            let uuid = props.uuid;
            const nextKeys = keys.concat(uuid);
            uuid++;
            props.setUUID(uuid);
            props.setKeys(nextKeys);
        },
        remove: props => k => {
            const {keys} = props;
            // can use data-binding to get
            //const keys = form.getFieldValue('keys');
            // We need at least one passenger
            if (keys.length <= 2) {
                return;
            }

            // remove option by key
            //options

            props.setKeys(keys.filter(key => key !== k));
            /*// can use data-binding to set
            form.setFieldsValue({
                keys: k,
            });*/
        }
    })
);




const ScaleElementOptions = enhance(ScaleElementOptionsPure);


const ScaleElementBuilder = (props) => {
    const {form, loading, intl, scales=[], details={}, element, options=[], keys=[], uuid=0, plan, mode, type /*options=[]*/} = props;
    const {getFieldDecorator, getFieldValue} = form;
    const {scaleId='', label=''/*, options:options = []*/} = details || {};

    const showBrahms = plan;// && id;
    //console.log(form.getFieldValue('options'));
    //console.log(keys);//
    //const options = form.getFieldValue('options') || optionsInit;
    // console.log(props);
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

            {/* <FormItem
                {...formItemLayout}
                label={intl.formatMessage(messages.scale)}
            >
                {getFieldDecorator('scaleId', {
                        initialValue: scaleId,
                        rules: [{required: true, message: "Select Scale", whitespace: true}],
                    }
                )(
                    <Select onSelect={updateOptions} style={{width:'100%'}}>
                        {scales.map(scale => <Option key={scale.id} value={scale.id}>{scale.name}</Option>)}
                    </Select>
                )}
            </FormItem> */}


            <Options form={form} options={options} formItemLayout={formItemLayout} />
            {/* <ScaleElementOptions options={options} setUUID={props.setUUID} setKeys={props.setKeys} keys={keys} uuid={uuid} form={form} /> */}
            {showBrahms && <PlanElementBrahmsFormField form={form} type={'optionId'} formItemLayout={formItemLayout}  possibleOptions={getFieldValue('options') || options} element={{type, ...element}} plan={plan} mode={mode} GoToComponent={props.GoToComponent} formatGoToElement={props.formatGoToElement} />}
   
        </React.Fragment>
    );
};



const enhaceWithState = compose(
    withState('options', 'setOptions', props=>props.options),
    withState('uuid', 'setUUID', props => props.uuid),
    withState('keys', 'setKeys', props=> props.keys),
);

const enhanceScale = compose(
    withStateHandlers(props => {
        const {details} = props;
        const{options=[]} = details || {};
        //console.log(options);
        return {
            options,
            // keys: Object.keys(options),
            // uuid: options.length
        }
    }, {
        updateOptions: (state, props) => (value) => {
            let {options=[]} = state;
            const {scales} = props;
            const selectedScale = scales.filter(scale => {
                return scale.id === value;
            });
            //console.log(scales);
            //console.log(selectedScale);
            if (selectedScale.length > 0) {
                const {options:scaleOptions=[]} = selectedScale[0];
                //console.log(props);
               // props.setKeys(Object.keys(options));
               // props.setUUID(options.length);
                 /*form.setFieldsValue({
                     options: options,
                 });*/
                 options = scaleOptions.map(option => {
                         return {id:'', label:option};
                     })
                //  props.setOptions(options.map(option => {
                //      return {value:'', label:option};
                //  }));
                // props.setKeys(Object.keys(options));
                // props.setUUID(options.length);
            }
            console.log(options);
            return {options}
        }
    })
)


// export default (ScaleElementBuilder);
export default enhanceScale(ScaleElementBuilder);


