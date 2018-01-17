import React from 'react'
import { Button, message } from 'antd';

export class MedicationCoin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isClicked: false,
        };
    };
    static propTypes = {
    };

    toggleCoin = () => {
        //console.log(this.state.isClicked);
        if (this.state.isClicked) {
            //this.setState({isClicked:false});
            message.success('Untaken');
        } else {
            //this.setState({isClicked:true});
            message.success('Taken');
        }

    }

    /*componentWillMount = () => {
        const {report, date} = this.props;

        const {isTaken} = report;
        console.log('WillMount', date);
        console.log(report);
        if (isTaken) {
            this.setState({isClicked: true});
        } else {
            this.setState({isClicked: false});
        }
    }
    /*componentWillReceiveProps = (nextProps) => {
        const {report} = this.props;

        const {id} = report;


        if (id) {
            this.setState({isClicked: true});
        } else {
            this.setState({isClicked: false});
        }
    }*/

    handleClick = (e) => {
        e.preventDefault();


        const { onClick,  med_id, report } = this.props;
        return onClick(med_id,  report, !report.isTaken, this.toggleCoin);

    }

    render() {

        const {report} = this.props;
        let {quantity} = this.props;
        const {isTaken} = report;

        // format quantity
        const qs = quantity % 1;//.split('.');
        let q = Math.floor(quantity);
        q = q > 0 ? q : '';
        //console.log(qs);
        //const qs = qInfo[1];
        switch (qs) {
            case 0.25:
                quantity = q+'&frac14';
                break;
            case 0.50:
                quantity = q+'&frac12';
                break;
            case 0.75:
                quantity = q+'&frac34';
                break;
        }
        //const hasReport = this.state.isClicked;
        //console.log(this.props);
        //console.log(hasReport);
        if (isTaken) {
            return (<Button type="primary" shape="circle" onClick={this.handleClick} >
                <div  dangerouslySetInnerHTML={{__html: quantity}}></div>
            </Button>)
        }
        return (<Button shape="circle" onClick={this.handleClick} >
            <div  dangerouslySetInnerHTML={{__html: quantity}}></div>
        </Button>)
    }
}



export default MedicationCoin
