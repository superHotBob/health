import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { UserInfoFragment } from "../../../User/fragments";
import { UserAssessmentReportPureFragment } from "./fragments";

const GET_PATIENT_ASSESSMENT_HISTORY_QUERY = gql`    
    query GET_PATIENT_ASSESSMENT_HISTORY($userId: UID!, $id: UID!) {
        patient(id: $userId) {
            id
            getAssessment (id: $id) {
                id
                getHistory {
                    totalCount
                    edges {
                        ...UserAssessmentReportPure
                    }
                }
            }
        }
    }
    ${UserAssessmentReportPureFragment}
`;

export const withUserAssessmentHistoryQuery = graphql(
    GET_PATIENT_ASSESSMENT_HISTORY_QUERY,
    {
        options: (ownProps) => {
            const {userAssessment} = ownProps;
            const {id} = userAssessment || {};
            return {
                variables: {
                    userId: ownProps.user.id,
                    id,
                },
                fetchPolicy: 'network-only',
            }
        },
        props: ({ ownProps, data }) => {

            const {getAssessment} = data.patient || {};
            const {getHistory} = getAssessment || {};
            const {totalCount, edges} = getHistory || {};
            return {
                history: edges,
                total: totalCount,
                loading: data.loading,
            }
        },
    }
);