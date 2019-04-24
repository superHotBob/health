import React from 'react'
import {Card, Affix, message, Modal, Divider, Tooltip, Icon} from 'antd';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import {PlanElement} from '../../containers/Element';
import { ListWithMessage } from '../../../../../UI/List';
import { PlanElementManagerButton } from '../../../Builder/components/Buttons/components/ElementManager';
import PlanbuilderElementSelect from '../../../Builder/components/SelectElementType/inline';
// import { PlanElementManagerButton } from '../../../../../../routes/Manager/components/Planbuilder/components/Buttons/components/PlanElementManager';
// // import {EmptyList} from "../../../../../../components/Loading/index";
// import {PlanElementListItem} from '../../containers/PlanElement';
// import {branch, compose, withHandlers, withProps, withState, renderComponent} from 'recompose';
// import {arrayMove, SortableContainer, SortableElement,} from 'react-sortable-hoc';
// import {PlanElementPureFragment} from "../../../Plan/fragments";
// import {withSpinnerWhileLoading} from "../../../../../Modal/components/index";
// // import { withToggleModal } from '../../../../../../components/Modal';
// import { ListWithMessage } from '../../../../../../components/UI/List';
// import { PlanElementManagerButton } from '../../../../../Manager/components/Planbuilder/components/Buttons/components/PlanElementManager';
// import { PlanElementBuilderView } from '../../../../../../components/Plan/components/Builder/containers/ElementView';


const PlanElementsList = (props) => {
    const {elements=[], isBuilderMode, plan, updateSkippedElements, updateBrahmRules, brahmRules, isPreviewMode, isDraggable, date, ...otherProps} = props;
    // console.log(props, 'propspropspropsprops');
    return (<>
     <Affix>
        <PlanbuilderElementSelect {...props} />
    </Affix>
    <Card bordered={false}>
    <ListWithMessage
        emptyMessage={<EmptyResultsPure plan={plan} isPreviewMode={isPreviewMode} />}
        itemLayout="vertical"
        className="plan-elements"
        split={false}
        dataSource={elements}
        renderItem={(element, i) => <PlanElement 
            {...otherProps}
            key={'item' + i} 
            mode="pathway" 
            i={i}
            plan={plan} 
            element={element} 
            elements={elements}
            updateSkippedElements={updateSkippedElements}
            date={date}
            isDraggable={isDraggable}
            isPreviewMode={isPreviewMode} 
            isBuilderMode={isBuilderMode}
            brahmRules={brahmRules}
            updateBrahmRules={updateBrahmRules}
            />
    }
    />
    </Card></>)
}

export default PlanElementsList;


const EmptyResultsPure = ({plan, isPreviewMode}) => {
    if (isPreviewMode) {
        return 'No elements have been added yet';
    }
    const {type} = plan;
    if (type === 'pathway') {
        return 'To Begin building your Pathway, select from one of the elements above.';
    }
    return <>{/*<div>No elements have been added yet</div>*/} <PlanElementManagerButton plan={plan} buttonType={'primary'} mode={'pathway'} shape={'round'} label={'Add First Element'} /></>;
}

