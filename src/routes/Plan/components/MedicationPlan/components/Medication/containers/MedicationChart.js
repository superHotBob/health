import { connect } from 'react-redux'
import MedicationChart from '../components/MedicationChart';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const MedicationSummaryQuery = gql`    
    query GetMedicationSummary ($id: ID!, $userId:ID!, $date: Date!)  {
        medication(id: $id, userId:$userId) {
            id
            summary (date:$date, userId:$userId)  {
                date
                reportsNeeded
                reports {
                    id
                    isTaken
                }
            }
        }
    }
`;

const MedicationChartWithQuery = graphql(
    MedicationSummaryQuery,
    {
        //name: 'PlanstorePlans',
        options: (ownProps) => ({
            variables: {
                id:ownProps.item.id,
                userId:ownProps.userId,
                date:ownProps.date
            },
             fetchPolicy: 'network-only'

        }),
        props: ({ ownProps, data }) => {
            if (!data.loading) {
                //console.log(ownProps);
                //console.log(data);
                const medication = data.medication;
                return {
                    data: medication.summary,
                    loading: data.loading,
                }

            } else {
                return {loading: data.loading}
            }
        },
    }
)(MedicationChart);

/* -----------------------------------------
  Redux
 ------------------------------------------*/

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MedicationChartWithQuery);