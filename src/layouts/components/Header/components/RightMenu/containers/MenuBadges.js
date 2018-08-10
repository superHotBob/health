import { connect } from 'react-redux'
import MenuBadges from '../components/MenuBadges/index.js';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const NOTIFICATIONS_POOL_QUERY  = gql`
   query NOTIFICATIONS_POOL ($cursors: CursorInput!) {
      account {
        getNotifications (cursors:$cursors, unread:true) @connection(key: "notificationPool") {
            totalCount
            pageInfo {
              endCursor
            }
        }
        unreadMessages
      }
    }
`;
// currentToken {
//     token
//     isExpired
// }
const withQuery = graphql(NOTIFICATIONS_POOL_QUERY, {
    options: (ownProps) => {

        return {
            //forceFetch: true,
            variables: {
                cursors: {first:1, after:ownProps.lastNotificationCursor},// last cursor for notifications
            },
            //pollInterval: 5000,
            fetchPolicy: 'network-only',
            //notifyOnNetworkStatusChange: true// adding loading placeholder
        }
        },
    props: ({ ownProps, data }) => {


        const {account={}} = data;
        const {getNotifications={}, unreadMessages} = account;

       // const lastCursor = !data.loading && user.notifications.pageInfo.endCursor !== '' ?  user.notifications.pageInfo.endCursor : ownProps.lastNotificationCursor;
        const {totalCount, pageInfo={}} = getNotifications || {};
        const {endCursor=''} = pageInfo || {};
        let lastCursor = endCursor;
        if (endCursor === '') {
            lastCursor = ownProps.lastNotificationCursor
        }
        // let {token, isExpired} = currentToken;
        // if (isExpired) {
        //     token = '';
        // }

        return {loading: data.loading, /*token:token,*/ unreadMessages:unreadMessages, newCursor:lastCursor, newNotificationsNum: totalCount}

    },
});

export default withQuery(MenuBadges);