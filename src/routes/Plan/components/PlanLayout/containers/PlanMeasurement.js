import React from 'react'
import { connect } from 'react-redux'

import PlanMeasurement from '../components/PlanMeasurement'
import { message } from 'antd';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {reportOnTracker} from '../../../components/BiometricPlan/components/Biometric/components/TrackerField/containers/index.js';





const withMutation = graphql(reportOnTracker, {
    props: ({ ownProps, mutate }) => ({

        onChange: (value, time, comments) => {

            const input = {value:value, time:time, date:ownProps.date, reportKey:ownProps.reportKey, comments:comments};
            //console.log(ownProps);
            //console.log(input);
            //return false;
            return mutate({
                variables: { input: input, id: ownProps.item.id },
            }).then(({data}) => {

                message.success('Reported');

            }).catch((error) => {
                message.error(error.message);
            });
        },
    }),
});

export default withMutation(PlanMeasurement);





