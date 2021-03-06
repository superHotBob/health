import React from 'react'
import {Row, Col, Button, Card, List, Input } from 'antd';
import { message, Modal, Divider, Tooltip, Icon, Affix} from 'antd';
import {PlanElementListItem} from '../../containers/PlanElement';
import PlanElementsSelectbox from '../../components/PlanElementsSelectbox';
import {EmptyList} from "../../../../../../components/Loading/index";
import {SortableElement} from 'react-sortable-hoc';

import {branch, compose, withHandlers, withProps, withState, renderComponent} from 'recompose';
import { PlanElementManagerButton } from '../../../../../../components/Plan/components/Builder/components/Buttons/components/ElementManager';
import PlanBuilderElementSelect from '../../../../../../components/Plan/components/Builder/components/SelectElementType/inline';
import { PlanElementsList } from '../../../../../../components/Plan/components/Body/containers/ElementsList';


export class PlanIntroduction extends React.Component {

    static propTypes = {

    };

    static defaultProps = {
        isBuilderMode:false,
        elements:[]
    }

    render() {

        const {elements, ...otherProps} = this.props;

        return (<Card title={'Introduction'} bordered={false} type={'pure'}>

            <PlanElementsList {...otherProps} mode="introduction" elements={elements} />
{/* 
            {(isBuilderMode && !isPreviewMode) && <Affix>
				<PlanBuilderElementSelect {...this.props} />
			</Affix>}
            {1==5 && isBuilderMode && !isPreviewMode && <PlanElementsSelectbox mode="introduction" plan={plan} />}
            {elements.length > 0 ? <List
            size="large"
            itemLayout="vertical"
            className="plan-elements"
            split={false}
            dataSource={elements}
            renderItem={(item, i) => {
                return  <PlanElementEnhanced item={item} key={'item' + item.id} index={i} i={i} isBuilderMode={isBuilderMode} mode="introduction"  isPreviewMode={isPreviewMode} plan={plan}  element={item} />
            }}
            />:  <EmptyResults {...this.props} />} */}
        </Card>)
    }
}


// /**
//  * Enhance Plan element
//  */
// const PlanElementEnhanced = compose(
//     branch(props => props.isBuilderMode, SortableElement)
// )(PlanElementListItem);

// const EmptyResultsPure = (props) => {
//     return <EmptyList>No elements have been added yet</EmptyList>;
// }

// const PlanElementAddLine = (props) => {

//     return <Divider className="element-actions">
//         <div>Welcome to Introduction</div>
//         <PlanElementManagerButton mode="introduction" type={'green'} shape={'round'} plan={props.plan} />
//         {/* {props.modalAdd && <Modal title="Select Element" visible={true} footer={false} onCancel={props.openHideElement}><PlanElementsSelectbox mode="introduction" plan={props.plan} /></Modal>}
//         <Tooltip title="Add Element" onClick={props.openAddElement} ><Icon type="plus-circle-o" style={{cursor:'pointer'}} /> Add First Element</Tooltip> */}
//     </Divider>;
// }

// // const PlanElementAddLine = compose(
// //     withState('modalAdd', 'setModal', false),
// //     withHandlers({
// //         openAddElement: props => () => {
// //             props.setModal(true);
// //         },
// //         openHideElement: props => () => {
// //             props.setModal(false);
// //         }
// //     }),
// // )(PlanElementAddLinePure);

// const EmptyResults = compose(
//     branch(props => props.isBuilderMode === true, renderComponent(PlanElementAddLine))
// )(EmptyResultsPure);



export default PlanIntroduction;
