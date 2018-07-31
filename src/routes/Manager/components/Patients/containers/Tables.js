import Tables from '../components/Tables';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import React from 'react';
import {compose,withStateHandlers} from 'recompose';
export const GET_PATIENTS_TABLE_COLUMNS = gql`    
query GET_PATIENTS_TABLE_COLUMNS  {
    network {
        id
        tables {
          getPatientsTable {
            id
            fields {
              id
              field
              label
            }
          }
        }
      }
}
`;

const withQuery = graphql(GET_PATIENTS_TABLE_COLUMNS, {
    props: ({data, ownProps}) => {       
         const {network={}} = data;
         const {tables={}} = network;
         const {getPatientsTable={}} = tables;
        return {loading: data.loading,getPatientsTable}
    },
});

const enhance = compose(
    withQuery)
export default enhance(Tables);