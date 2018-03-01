/**
 * Created by Pavel on 08.01.2018.
 */
import React from 'react';
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom';
import {
    injectIntl,
    FormattedMessage
} from 'react-intl';
import messages from './messages';
import { Form,  List, Card,Modal,Input,Button, Tooltip, Icon } from 'antd';
import AvatarWithName from '../AvatarWithName';
const FormItem = Form.Item;
const { TextArea } = Input;
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

class Motivators extends React.Component {
    state = { visible: false }


    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }
    handleSubmit = (e) => {

        e.preventDefault();
        const { onSubmit } = this.props;
        this.props.form.validateFields((err, values) => {
            return onSubmit(values, this.handleCancel);
        });

    }

    render() {

        const  {info,loading} = this.props;

        if (loading) {
            return  <Card loading title={<FormattedMessage id="user.motivators.motivators.title" defaultMessage="My Motivators" description="MY MOTIVATORS" />}>
                                 Loading</Card>;
        }
        const  {motivators} = info;
        const  {edges} = motivators;
        const { getFieldDecorator } = this.props.form;
        const { intl } = this.props;
        const text = "My Motivators"+" ("+info.length+")";
        return(


        <Card  title={"My Motivators"+" ("+this.props.info.motivators.totalCount+")"}
               extra={<Tooltip title="Add Motivators"><Button size={"small"} onClick={this.showModal} ><Icon type="plus"/></Button></Tooltip>}

        >

            {edges.length > 0 ?
                <div className="demo-infinite-container">
                <List
                    split={false}
                    loading={loading}
                    grid={{gutter: 10, xs: 3,   md: 1, lg: 2/*, xl: 4*/}}
                    dataSource={edges}
                    renderItem={person => (

                        <List.Item key={person.id}>
                            <AvatarWithName align="v" info={person.user} />
                        </List.Item>
                    )}
            /> </div>: <div className="ant-list-empty-text">No Motivators</div>}

            <Modal
                title="Invite motivators"
                visible={this.state.visible}
                onCancel={this.handleCancel}
                okText="Submit"
                onOk={this.handleSubmit}
            >
                <Form onSubmit={this.handleSubmit} >
                    <FormItem
                        {...formItemLayout}
                        label="Email"
                    >
                        {getFieldDecorator('email', {
                            rules: [{
                                type: 'email', message:intl.formatMessage(messages.email_rule_type),
                            }, {
                                required: true,  message: intl.formatMessage(messages.email_rule_required),
                            }],
                        })(
                            <Input
                                style={{ width: '100%' }}
                            />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Text message"
                    >
                        {getFieldDecorator('text')(
                            <TextArea autosize />
                        )}
                    </FormItem>
                </Form>

            </Modal>

            </Card>
        )
    }
}

const WrappedMotivators= Form.create()(Motivators);
export default withRouter(injectIntl(WrappedMotivators));