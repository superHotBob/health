import ProvidersManager from '../components/Providers';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {compose, branch, withStateHandlers, withState, withProps} from 'recompose';

const GET_PROVIDERSa  = gql`
query GET_PROVIDERS {
  network {
    getProviders(status: active) {
      totalCount
      edges {
        id
        name
      }
    }
  }
}
 `;

const withQuery = graphql(GET_PROVIDERSa, {
    props: ({ data }) => {
        if (!data.loading) {
            console.log(data);
            return {
                getProviders: data.network.getProviders,
                loading: data.loading
            }
        }
        else {
            return {loading: data.loading}
        }
    },
});

const enhance = compose(
    withQuery,
    withStateHandlers(
        (props) => ({
        showButton: false,
        selectedCount:0
        }),
        {
            openShowButton: ({ counter }) => (value) => ({
                showButton: true,
                selectedCount:value
            }),
            hideShowButton: ({ counter }) => (value) => ({
                showButton: false
            }),
        }
        )
);

export default enhance(ProvidersManager);