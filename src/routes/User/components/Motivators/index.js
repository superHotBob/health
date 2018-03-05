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
import InfiniteScroll from 'react-infinite-scroller';
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

    handleInfiniteOnLoad = () => {
        this.setState({
            loading: true,
        });
        console.log("asvw=v-wv-w-evw-evw-eb-erberb");
        this.props.loadMore(this.props.endCursor, this.stopLoading);
    }

    render() {

        const  {info,loading,hasMore} = this.props;

        if (loading) {
            return  <Card loading title={<FormattedMessage id="user.motivators.motivators.title" defaultMessage="My Motivators" description="MY MOTIVATORS" />}>
                                 Loading</Card>;
        }
        const  {motivators} = info;
        const  {edges,totalCount} = motivators;
        const { getFieldDecorator } = this.props.form;
        const { intl } = this.props;
        const title = "My Motivators";
        const count = totalCount > 0 ?  " ("+totalCount+")":"";
    return(
                <div style={{height:100}} className="demo-infinite-container">
                    <InfiniteScroll
                        initialLoad={false}
                        pageStart={0}
                        loadMore={this.handleInfiniteOnLoad}
                        hasMore={!this.state.loading && hasMore}
                        useWindow={false}
                    >
                <List
                    split={false}
                    loading={loading}
                    grid={{gutter: 10, xs: 3,   md: 1, lg: 2/*, xl: 4*/}}
                    dataSource={edges}
                    renderItem={person => (
                        <List.Item key={person.id}>
                               <AvatarWithName info={person.user} />
                        </List.Item>
                    )}
                     /></InfiniteScroll>
                </div>


        )
    }
}

const WrappedMotivators= Form.create()(Motivators);
export default withRouter(injectIntl(WrappedMotivators));