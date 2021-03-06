import React from 'react';
import {Link} from 'react-router-dom';
import {Table, Button} from 'antd';
import { withToggleModal } from '../../../../../../../../components/Modal';
// import { AssessementManager } from '../../../../containers/AssessmentManager';

const AssessmentManagerButtonPure = props => {
    const {showModal, toggleModal, label, asButton=true, ...otherProps} = props;
    // console.log(userAssessment);
    const {assessment} = props;
    return <React.Fragment>
        {/* {showModal && <AssessementManager  {...otherProps}  onHide={toggleModal} />} */}
        {assessment ? <Link to={'/builder/assessment/'+assessment.id} >{label ? label : 'Edit'}</Link> : <Link to={'/builder/assessment/'} ><Button type={'primary'} icon={'plus'} /></Link>}
        {/* {assessment ? <span   onClick={toggleModal}>{label ? label : 'Edit'}</span> : <Button onClick={toggleModal} type={'primary'} icon={'plus'} />} */}
    </React.Fragment>
}

export const AssessmentManagerButton = withToggleModal(AssessmentManagerButtonPure);