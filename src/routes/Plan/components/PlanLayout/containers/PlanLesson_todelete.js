import PlanLesson from '../components/PlanLesson'
import {arrayMove, SortableContainer} from 'react-sortable-hoc';
import {branch, compose, withHandlers, withProps, withState} from 'recompose';
import { withUpdatePlanElementsOrderMutation } from '../../../../../components/Plan/components/Builder/mutations';
import { withPlanElementsSelectorEnhancer } from '../../../../../components/Plan/components/Body/containers/ElementsList';

/**
 * Enhance Body
 */
const builderEnhance = compose(
    // withState('elements', 'setElements', props => {
    //     const {elements=[]} = props;
    //     return elements;
    // }),
    withProps(props => {
        let propsUpdated = {
            mode:'lesson'
        };
        if (props.isBuilderMode && !props.isPreviewMode) {
            propsUpdated = {...propsUpdated, ...{
                useDragHandle: true,
                    lockAxis: 'y',
                    onSortEnd: props.onSortEnd,
                    useWindowAsScrollContainer: true
            }}
        }
        return propsUpdated;
    }),

    withUpdatePlanElementsOrderMutation,
    withHandlers({
        updateOrder: props => elements => {
            const ids = elements.map(element => element.id);
            props.updateElementsOrder(ids, elements);

        }
    }),
    withHandlers({
        onSortEnd: props => ({oldIndex, newIndex}) => {
            const newElements = arrayMove(props.elements, oldIndex, newIndex);
            props.updateOrder(newElements);
        }
    }),
    SortableContainer,
);

const enhance = compose(
    //withMutation,
    withProps(props => {
        const {item} = props;
        const {elements=[]} = item || {};
        return {
            elements
        }
    }),
    branch(props => props.isBuilderMode && !props.isPreviewrMode, builderEnhance),
    withPlanElementsSelectorEnhancer
)


export default enhance(PlanLesson);
