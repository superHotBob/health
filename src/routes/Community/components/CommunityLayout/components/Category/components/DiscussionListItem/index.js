/**
 * Created by Pavel on 10.01.2018.
 */
import React, { PropTypes } from 'react';
import { Icon,List,Avatar } from 'antd';
import moment from 'moment';
import { withApollo, gql } from 'react-apollo'
import {withRouter} from "react-router-dom";
import { Link } from 'react-router-dom'
const IconText = ({ type, text }) => (
    <span>
    <Icon type={type} style={{ marginRight: 8 }} />
        {text}
  </span>
);

class DiscussionListItem extends React.PureComponent{
    constructor(props){
        super(props);
    }

    render(){
        const {item} = this.props;

        return(
                            <List.Item key={item.id}
                                       actions={[<IconText type="clock-circle-o" text={moment(item.lastReply.createdAt || item.createdAt).format('LLL')} />,<IconText type="eye-o" text={item.views} />, <IconText type="like-o" text="0" />, <Link to={'/discussion/' + item.id} style={{color: 'inherit'}}><IconText type="message" text={item.replies.totalCount} /></Link>]}
                            >

                                <List.Item.Meta
                                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title={<Link to={'discussion/' + item.id} style={{color: 'inherit'}}>{item.title}</Link>}
                                    description={item.lastReply.text || item.text}
                                />
                            </List.Item>

        );
    }

}

export default withApollo(withRouter(DiscussionListItem));
