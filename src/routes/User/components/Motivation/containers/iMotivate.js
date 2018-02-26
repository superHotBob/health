/**
 * Created by Павел on 12.02.2018.
 */
import React from 'react'
import { connect } from 'react-redux'

import iMotivate from '../components/IMotivate';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


const IMOTIVATE  = gql`
  query GET_IMOTIVATE($cursors: CursorInput) {
  account {
    user {
      id
      motivation {
        iMotivate(cursors: $cursors) {
          totalCount
          edges {
            id
            user {
              id
              fullName
               thumb {
                original
                small
                large
                medium
                wide
              }
            }
            email
          }
        }
      }
    }
  }
}


`;

const withMutation = graphql(IMOTIVATE, {
    props: ({ ownProps, data }) => {
        console.log(data);
        if (!data.loading) {
            return {
                info: data.account.user.motivation,
                loading: data.loading
            }
        }
        else {
            return {loading: data.loading}
        }
    },
});

const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({

});

export default withMutation(connect(mapStateToProps, mapDispatchToProps)(iMotivate));