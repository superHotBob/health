import { connect } from 'react-redux'
import MedicationPlanBody from '../components';
import Medication from '../components/Medication/components';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
// Query for grabbing everything for the dashboard items
export const MedicationPlan = gql`
    query GET_MEDICATION_PLAN ($user_id: ID!, $date: Date)  {
            medicationPlan (userId: $user_id, date: $date) {
                id
                upid
                isPersonal
                medicationsByType (date: $date) {
                    takeAtTimes {
                        ...MedicationCardInfo
                        timesPerHour {
                            id
                            time
                            quantity
                        }
                    }
                    takeDaily {
                        ...MedicationCardInfo
                    }
                    takeAsNeeded {
                        ...MedicationCardInfo
                    }
                }
                textBefore
                textAfter
        }
    }


    ${Medication.fragments.medication}
`;

const MedicationPlanBodyWithQuery = graphql(
    MedicationPlan,
    {
        props: ({ ownProps, data }) => {
            if (!data.loading) {
                //console.log(ownProps);
                //console.log(data);
                //console.log(data);
                return {
                    info: data.medicationPlan,
                    loading: data.loading,
                    //date: 'asd',


                    loadDate(date, user_id) {
                        //console.log(date);
                        return data.fetchMore({
                            // query: ... (you can specify a different query. FEED_QUERY is used by default)
                            variables: {
                                // We are able to figure out which offset to use because it matches
                                // the feed length, but we could also use state, or the previous
                                // variables to calculate this (see the cursor example below)
                                date: date,
                                user_id: user_id,
                            },
                            updateQuery: (previousResult, {fetchMoreResult}) => {
                                //return {medicationPlan:{id:29}};
                                //console.log(fetchMoreResult);
                                //fetchMoreResult.date = date;
                                console.log(fetchMoreResult);
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
        options: (ownProps) => ({
            variables: {
                user_id:ownProps.user_id,
                date:ownProps.date,
            },
            fetchPolicy: 'cache-and-network'//'cache-only'//'cache-and-network'
        }),
    }
)(MedicationPlanBody);

/* -----------------------------------------
  Redux
 ------------------------------------------*/

const mapStateToProps = (state, ownProps) => {
    //console.log(ownProps);
    return {
        //date: moment().format('YYYY-MM-DD'),
    };
};

const mapDispatchToProps = (dispatch) => {
    //console.log(1);
    return {
        /*increment: (info) => {dispatch(increment(info))},
        doubleAsync*/
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MedicationPlanBodyWithQuery);