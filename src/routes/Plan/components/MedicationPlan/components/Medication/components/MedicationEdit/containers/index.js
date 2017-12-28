/**
 * Created by Pavel on 26.12.2017.
 */
import { connect } from 'react-redux'


import MedicationEditForm from '../components'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
//import { compose } from 'react-apollo';

const medication = gql`
query GET_MEDICATION($user_id: ID! $id: ID!) {
   account {
  		medicationPlan(user_id: $user_id) {
   medication(id: $id) {
    id,
    startDate,
    endDate,
    sideEffects,
    purpose,
    directions,
    timesPerDay,
    timesPerHour {
      id
    },
    type,
    drug {
      id
    },
    quantity

  }
  }
}
}
`;
const settingUserMutate=gql`
 mutation settingUser( $input:AccountInput!){
        account(input:$input) {
          user {
            first_name
          }
        }
    }
`;

const MedicationEditWithQuery = graphql(medication,
    {
        options: (ownProps) => ({
            variables: {
                user_id: ownProps.user_id,
                id: ownProps.id
            }
        }),
        props: ({ ownProps, data }) => {
            if (!data.loading) {
              //  console.log(data.loading);//false
                return {
                    info: data.account,
                    loading: data.loading
                }
            }
             else {
                return {loading: data.loading,info:12}
            }
        },
    }
)(MedicationEditForm);

const withMutation = graphql(settingUserMutate, {
    props: ({ mutate }) => ({
        updateInfo: input => {
            return mutate({
                variables: {input: {user:input}},
            })},
    }),
});
const mapStateToProps = (state) => {

    return {

    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    // onSubmit: (values) => {
    //     values.birthday = values.birthday.format("YYYY-MM-DD")
    //     values.phone = [values.prefix, values.phone];
    //     delete values.prefix;
    //     console.log(values);
    //     ownProps.updateInfo(values).then(({data}) => {
    //         console.log("----settings----");
    //         console.log(data);
    //     })
    // },
});



export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MedicationEditWithQuery);