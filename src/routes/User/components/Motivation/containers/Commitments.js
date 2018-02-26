/**
 * Created by Павел on 12.02.2018.
 */
import React from 'react'
import { connect } from 'react-redux'

import Commitments from '../components/Commitments';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


const COMMITMENTS  = gql`
<<<<<<< HEAD
 query GET_COMMITMENTS($cursors: CursorInput,$userId: UID) {
=======
 query GET_COMMITMENTS($cursors: CursorInput,$userId:UID) {
>>>>>>> 527d3bff2ce86ef8ab529d164b43aec0e8901e04

    user (id: $userId) {
      id
      motivation {
        motivators {
          totalCount
          edges {
            id
            user {
              id
              firstName
              email
            }
          }
        }
        commitments(cursors: $cursors) {
          totalCount
          edges {
            id
            motivators {
              id
              user {
                id
                firstName
              }
              email
            }
            date
            donate
            payment
            url
            description
          }
        }
      }
    }
  }


`;

const withMutation = graphql(COMMITMENTS, {
    options: (ownProps) => ({

        variables: {
            user_id: ownProps.userId
        }

    }),
    props: ({ ownProps, data }) => {
        if (!data.loading) {
            return {
                info: data.user.motivation,
                motivators: data.user.motivation.motivators,
                loading: data.loading
            }
        }
        else {
            return {loading: data.loading}
        }
    },
});

const mapStateToProps = (state) => {
    return{
        userId:state.user.info.id
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({

});

export default withMutation(connect(mapStateToProps, mapDispatchToProps)(Commitments));