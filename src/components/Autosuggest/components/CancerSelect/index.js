import React from 'react'
import {compose, withProps} from 'recompose';
import Select from '../Select';

const CancerSelect  = ({loading, items, doSearch, onChange, value=undefined, ...otherProps}) => {
    return <Select value={value} i18n={{placeholder:"Select Cancer"}} loading={loading} items={items} doSearch={doSearch} onChange={onChange} getFullInfo {...otherProps} />;
};



const enhance = compose(
    withProps(props => {
        // format value
        const { value, mode  } = props;
        // console.log(props);
        if (value) {
            if (mode === 'multiple') {

                const values = value.map(val => {
                    const { id, title } = val || {};
                    return { key: id, label: title };
                })
                //console.log(values);
                return {value: values};
            }
            //return value;
            const { id, title = '' } = value || {};
            return { value: { key: id, label: title } };
        }
    }),
)

// const enhance = compose(
//     withHandlers({
//         onChange: props => value => {
//             let option = props.items.filter(item => item.id === value);
//             if(option.length > 0) {
//                 option = option[0];
//             }
//             props.onChange(value, option);
//         }
//     })
// );

export default enhance(CancerSelect);