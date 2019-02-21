import TrackerSelectPure from '../components/TrackerSelect';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const TRACKERS_LIST_QUERY = gql`
   query GET_TRACKERS_LIST ($userId: UID, $search: String)  {
            trackersList (userId: $userId, search: $search) {
                id
                label
                units {
                    id
                    name
                }
                        
        }
    }
`;

const withQuery = graphql(TRACKERS_LIST_QUERY,
    {
        options: (ownProps) => {
            const {user} = ownProps;
            const {id:userId} = user || {}
            return {
                variables: {
                    userId
                },
                fetchPolicy: 'network-only'
            }},
        props: ({ data }) => {
            if (!data.loading) {
                return {
                    items: data.trackersList,
                    loading: data.loading,

                    doSearch(search) {
                        return data.fetchMore({
                            variables: {
                                search: search,
                            },
                            updateQuery: (previousResult, {fetchMoreResult}) => {
                                if (!fetchMoreResult) { return previousResult; }
                                return (fetchMoreResult);
                            },
                        });
                    }
                }
            } else {
                return {loading: data.loading}
            }
        },

    }
)

export const TrackerSelect = withQuery(TrackerSelectPure);
export default TrackerSelect;