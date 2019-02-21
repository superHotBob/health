import Assessments from '../components/Assessments';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import React from 'react';
import {compose,withStateHandlers} from 'recompose';
const GET_ASSESSMENTS_QUERY = gql`    
query GET_ASSESSMENTS ($status: AssessmentStatusEnum) {
    management {
        getAssessments (status: $status) {
            totalCount
            edges {
                id
                name
                isForm
                status
                isPatientReport
                getTotalAssigns
                createdDate
            }
        }
    }
}
`;

// 1- add queries:
const withQuery = graphql(
    GET_ASSESSMENTS_QUERY,
    {
        options: (ownProps) => {
            return {
                // variables: {
                //     status: null
                // },
                fetchPolicy: 'network-only'
            }
        },
        props: ({ ownProps, data }) => {
            const {getAssessments} = data.management || {};
            const {status} = data.variables || {};
            const {edges=[], totalCount=0} = getAssessments || {};
            return {
                status,
                assessments: edges,
                total: totalCount,
                loading: data.loading,
                loadByStatus(status) {
                    if (status === 'all') {
                        status = null;
                    }
                    return data.refetch({
                        status: status
                    });
                },
                // loadMoreEntries() {

                //     return data.fetchMore({
                //         // query: ... (you can specify a different query. FEED_QUERY is used by default)
                //         variables: {
                //             // We are able to figure out which offset to use because it matches
                //             // the feed length, but we could also use state, or the previous
                //             // variables to calculate this (see the cursor example below)
                //             page: ownProps.page+1,
                //         },
                //         updateQuery: (previousResult, {fetchMoreResult}) => {
                //             if (!fetchMoreResult) { return previousResult; }

                //             return fetchMoreResult;
                //             return Object.assign({}, previousResult, {
                //                 // Append the new feed results to the old one
                //                 planstore: {plans: [...previousResult.planstore.plans, ...fetchMoreResult.planstore.plans]},
                //             });
                //         },
                //     });
                // }
            }
        },
    }
);

const enhance = compose(
   withQuery,
    withStateHandlers(
        (props) => (
            {
            searchText: '',
            searchTextCode: '',
        }),
        {        
            onSearch: ({searchText},props) =>(value) => (
                {
                    searchText: value.target.value,
                    getAssessments: props.getAssessments.map((record) => {
                        const match = record.name.match(new RegExp(value.target.value, 'gi'));
                        if (!match) {
                            return null;
                        }                        
                        return {
                            ...record,
                            name: (
                                <span>
                      {record.name.split( new RegExp(value.target.value, 'gi')).map((text, i) => (
                      i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
                      ))}
                    </span>
                            ),
                        };
                    }).filter(record => !!record),
            }),
            emitEmpty: ({searchText},props) =>(value) => (
                {
                    searchText: '',
                    getAssessments: props.getAssessments
                     }),
            onSearchCode: ({searchTextCode},props) =>(value) => (
                        {
                            searchTextCode: value.target.value,
                            getPayers: props.getPayers.map((record) => {
                                const match = record.code.match(new RegExp(value.target.value, 'gi'));
                                if (!match) {
                                    return null;
                                }                        
                                return {
                                    ...record,
                                    code: (
                                        <span>
                              {record.code.split( new RegExp(value.target.value, 'gi')).map((text, i) => (
                              i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
                              ))}
                            </span>
                                    ),
                                };
                            }).filter(record => !!record),
                    }),
            emitEmptyCode: ({searchTextCode},props) =>(value) => (
                        {
                            searchTextCode: '',
                            getPayers: props.getPayers
                             })
            })        

);
export default enhance(Assessments);