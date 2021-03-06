import React from 'react'
import {compose, withHandlers} from 'recompose';
import Select from '../Select';

// const formatTitle = item => {
//     return <React.Fragment>{item.code} <div style={{fontSize:'0.8em',color:'grey'}}>{item.name}</div></React.Fragment>;
// }

const ClinicalTrialSelect = ({loading, items, doSearch, onChange, value=undefined, ...otherProps}) => {
    return <Select {...otherProps}  
    value={value} i18n={{placeholder:"Select Clinical Trial"}} loading={loading} items={items} doSearch={doSearch} onChange={onChange}  />;
};


const enhance = compose(
    // withHandlers({
    //     onChange: props => value => {
    //         let option = props.items.filter(item => item.id === value);
    //         if(option.length > 0) {
    //             option = option[0];
    //         }
    //         props.onChange(value, option);
    //     }
    // })
);

export default enhance(ClinicalTrialSelect);