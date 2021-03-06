import PeoplePure from '../components/PeopleSelect';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {UserInfoFragment} from "../../../routes/User/fragments";

const PEOPLE_LIST_QUERY = gql`
    query GET_PEOPLE_LIST ($search: String, $role: String, $userId: UID) {
        getPeople (search:$search, role:$role, userId:$userId) {
            totalCount
            edges {
                ...UserInfo
            }
        }
    }
    ${UserInfoFragment}
`;

export const withPeopleSearchQuery = graphql(PEOPLE_LIST_QUERY,
    {
        options: (props) => {
            const {role, user} = props;
            const {id} = user || {};
            return {
                variables: {role, userId: id},
                //fetchPolicy: 'no-cache'
                //fetchPolicy: 'cache-only'
            }
        },
        props: ({ data }) => {
            const {getPeople} = data || {};
            const {edges} = getPeople || {};
            return {
                items: edges,
                loading: data.loading,

                doSearch(search) {
                    return data.refetch({search});
                }
            }
        },

    }
);


export const PeopleSelect = withPeopleSearchQuery(PeoplePure);
export default PeopleSelect;