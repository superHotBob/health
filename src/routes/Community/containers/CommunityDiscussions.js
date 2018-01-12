
/**
 * Created by Pavel on 10.01.2018.
 */
import React from 'react'
import { connect } from 'react-redux'


import DiscussionsForm from '../components/MainCategories/components/View';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


const CATEGORY  = gql`
query GET_CATEGORIES($id:ID) {

       category(id:$id) {
         id
         name
         thumb {
           original
           small
           large
           medium
           wide
         }
    		 canJoin
    		 isJoined
         articles {
           id
          title
          titleShort
          text
          category {
            id
            name
          }
          thumbs {
            original
            small
            large
            medium
            wide
          }
          views
         }
        discussions {
          id
          title
          text
          createdAt
          lastReplyAt
          category {
            id
          }
          views
        }
    categories {
      id
      name
        description
        thumb {
          original
          small
          large
          medium
          wide
        }
    }
       }
}
`;

const withMutation = graphql(CATEGORY, {

        options: (ownProps) => ({
        variables: {
            id: ownProps.match.params.id
        },
    }),
        props: ({ ownProps, data }) => {

        if (!data.loading) {
            return {
                info: data.category
                ,
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

export default withMutation(connect(mapStateToProps, mapDispatchToProps)(DiscussionsForm));
