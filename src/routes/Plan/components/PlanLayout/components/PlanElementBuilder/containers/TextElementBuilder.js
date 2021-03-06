import React from 'react';
import {compose, withHandlers} from 'recompose';
import TextElementBuilderPure from '../components/TextElementBuilder';
import {modalHOC} from "../modal";


export const TextElementBuilder = TextElementBuilderPure;

// export const enhance = compose(
//     withHandlers({
//         onSubmit: props => callback => {
//             if (1===1 || !props.id || props.form.isFieldsTouched()) {
//                 props.handleSave({prepareInput:prepareInput, callback:props.onHide} );
//             } else {
//                 props.onHide();
//             }
//         },
//     }),
// );

// const enhanceWithModal = compose(
//     enhance,
//     withHandlers({
//         modalTitle: props => values => {
//             return props.id ? 'Edit Text' : 'Add Text';
//         },
//     }),
//     modalHOC,
// );

export default (TextElementBuilderPure);


export const preparePlanElementTextInput = (values) => {
    const {text, icon} = values;
    //console.log(values);
    return {
            text,
            icon
    }
}