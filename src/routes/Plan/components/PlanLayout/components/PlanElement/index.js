import React from 'react'
import PropTypes from 'prop-types'
import Measurement from '../Measurement';

import { Icon, Upload, Alert, Button, Card } from 'antd';
import PlanChecklist from "../../../Plan/components/Checklist";
import PlanRadio from "../../../Plan/components/Radio";
import PlanInputText from "../../../Plan/components/PlanInputText";
import PlanScale from "../../../Plan/components/PlanScale";
import PlanDropdown from "../../../Plan/components/PlanDropdown";




export class PlanElement extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
         //   tab:''
        };
        this.onChange = this.onChange.bind(this);
    };
    static propTypes = {

    };

    onChange(value, type) {
        //console.log(value);
        //console.log(this.props);
        const {upid, element, date} = this.props;
        this.props.makeReport(upid, element.id, date, value);
    }

    render() {

       const {element} = this.props;
       const {itemType, itemInfo, reports} = element;
       const item = itemInfo;

       let field = itemType;
       //field = item_type;
       let fieldTitle = '';
       switch(itemType) {
           case 'measurement_input':
               field = <Measurement item={item} onChange={this.onChange} />
               break;
           case 'choice_input':
           case 'checklist':

               let reportValues = reports && reports.map((report) => (report.value));
               reportValues = reportValues && reportValues[0];
               field = <PlanChecklist item={item} reports={reportValues} onChange={this.onChange} />
               //const vertically = item.is_vertically;
               fieldTitle = item.label;
               break;
           case 'radio_input':
               field = <PlanRadio item={item} reports={reports} onChange={this.onChange} />
               fieldTitle = item.label;

               break;
           case 'text_input':
               fieldTitle = item.label;
               field = <PlanInputText item={item} reports={reports} onChange={this.onChange} />

               break;
           case 'dropdown_input':
               fieldTitle = item.label;
               field = <PlanDropdown item={item}  reports={reports} onChange={this.onChange} />

               break;
           case 'scale_input':
               fieldTitle = item.label;
               field = <PlanScale item={item}  reports={reports} onChange={this.onChange} />

               break;
           case 'file_input':
               fieldTitle = item.label;
                field = <Upload>
                    <Button>
                        <Icon type="upload" /> Upload
                    </Button>
                </Upload>
               break;
           case 'exam_input':
               fieldTitle = item.label;
               field = <Button>{fieldTitle}</Button>;
               break;
           case 'instruction':
               fieldTitle = '';
               field = <div dangerouslySetInnerHTML={{__html: item.instruction}}></div>;
               break;
           case 'line':
               return ('');
               break;
           case 'instruction_tipbox':
               fieldTitle = '';
               field = <Alert message="Tipbox" description={<div dangerouslySetInnerHTML={{__html: item.instruction}}></div>} type="info" showIcon />;
               break;
           case 'link':
               field = <Card hoverable><a href={item.url}><Card.Meta
                   title={item.label}
                   description={item.description}
               /></a></Card>
               //link_path":"https://ya.ru","label":"Yandex","description":"search engine"
               break;
       }
        return (<div>{fieldTitle && <h4>{fieldTitle}</h4>}
           <div>{field}</div></div>)
    }
}



export default PlanElement
