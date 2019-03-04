import AssessementViewPure from '../components/Page';
import {compose, withProps, withState, withHandlers} from 'recompose';
import { withUserAssessmentQuery } from '../queries';
 

const enhance = compose(
    withProps(props => {
        console.log(props);
        const {params} = props.match || {};
        const {id} = params || {};
        // match.params.id,
        return {userAssessment: {id}, asPage:true}
    }),
    withUserAssessmentQuery
)

const AssessementPage = enhance(AssessementViewPure);

export default AssessementPage;