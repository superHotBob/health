import React from 'react';
import {withToggleModal } from '../../../../../../../../../components/Modal';
import { TrialViewText } from '../../../../../containers/View';




const ClinicalButton = props =>{
    const { showModal, toggleModal, label} = props;

    const { clinicalTrial} = props;
    const { nctId } = clinicalTrial || {};
    
    return  <>
    {showModal && <TrialViewText {...props} onHide={toggleModal} />}
        <a onClick={toggleModal}>{label || nctId}</a> 
   
    </>

}
const ClinicalTrialViewButton = withToggleModal(ClinicalButton);
export default ClinicalTrialViewButton;
