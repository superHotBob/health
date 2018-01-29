import React from 'react'

import PlanElement from '../components/PlanElement'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


import Plan from '../../../../Plan/components/Plan';

/*
const GET_ELEMENT = gql`
    query GET_ELEMENT ($id: ID!, $date: Date) {
        PlanElement (id: $id, date:$date) {
        ...PlanElement
        }
    }
    ${Plan.fragments.element}
`;

// 1- add queries:
const PlanElementWithQuery = graphql(
    GET_ELEMENT,
    {
        options: (ownProps) => {
            //console.log(ownProps);
            return {
                variables: {
                    id: ownProps.element.id,
                    date: ownProps.date,
                },
                fetchPolicy: 'cache-only'
            }

        },
        props: ({ ownProps, data }) => {
            console.log(data);


            return data;
            //console.log(CURRENT_PLANSTORE_PLAN);
            if (!data.loading) {
                const plan = data.plan;
                const body = plan.body;
                const lessons = body.lessons || [];
                const activities = body.activities || [];
                const intro = body.intro || [];

                return {
                    //upid: data.plan.upid,
                    //modules: data.network.modules,
                    loading: data.loading,
                    lessons: lessons,
                    activities: activities,
                    intro: intro,

                    loadDate(date) {
                        console.log(date);
                        return data.fetchMore({
                            // query: ... (you can specify a different query. FEED_QUERY is used by default)
                            variables: {
                                // We are able to figure out which offset to use because it matches
                                // the feed length, but we could also use state, or the previous
                                // variables to calculate this (see the cursor example below)
                                date: date,
                            },
                            updateQuery: (previousResult, {fetchMoreResult}) => {
                                //return {medicationPlan:{id:29}};
                                //console.log(fetchMoreResult);
                                //fetchMoreResult.date = date;
                                if (!fetchMoreResult) { return previousResult; }
                                return fetchMoreResult;
                                return Object.assign({}, previousResult, {
                                    medicationPlan: fetchMoreResult.medicationPlan,
                                });
                            },
                        });
                    }
                }

            } else {
                return {loading: data.loading}
            }
        },
    }
)(PlanElement);*/

const reportOnField = gql`
    mutation planFieldReport($id: ID!, $date: Date!, $value: [String], $upid: ID!) {
        planElementReport(id:$id, upid: $upid, date: $date, value: $value) {
                ...PlanElement
        }
    }
    ${Plan.fragments.element}
`;




export const PlanElementWithMutation = graphql(reportOnField, {
    props: ({ mutate }) => ({
        makeReport: (upid, id, date, value) => {
            return mutate({
                variables: { upid:upid, id: id, date: date, value:value},
                update: (store, { data: { planElementReport } }) => {


                    /*console.log(store);
                    console.log(planElementReport);
                    console.log(Plan.fragments.element);*/

                    /*const element = store.readFragment({
                        id: id, // `id` is any id that could be returned by `dataIdFromObject`.
                        fragment: Plan.fragments.element
                    });
                    console.log(element);*/


                    /*store.writeFragment({
                        id: 'PlanBodyElement:'+id,
                        fragment: Plan.fragments.element,
                        data: {
                            reports: planElementReport.reports,
                        },
                    });*/

                    // find ins PlanBodyElement:178368. and replace reports date
                    /*// Read the data from our cache for this query.
                    const data = store.readQuery({
                        query: medication,
                        variables: {
                            id: id,
                            user_id: uid
                        }
                    });
                    if (id) {
                        // add new to the list
                    }

                    // console.log(data);
                    // Add our comment from the mutation to the end.
                    //data = medicationUpdate;
                    // Write our data back to the cache.
                    store.writeQuery({
                        query: medication,
                        data: {medication: medicationUpdate},
                        variables: {
                            id: id,
                            user_id: uid
                        }});*/
                },
            })
        },

    }),
});


export default PlanElementWithMutation(PlanElement);