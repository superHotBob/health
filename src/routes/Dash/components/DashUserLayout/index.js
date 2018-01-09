import React from 'react';
import PropTypes from 'prop-types';
import ReactPlaceholder from 'react-placeholder';
import PlanWidget from '../../../Plan/components/Plan';
import PlansList from 'routes/Plan/containers/PlansList';
import MedicationPlan from 'routes/Plan/components/MedicationPlan/containers';
import BiometricPlan from 'routes/Plan/components/BiometricPlan/containers';
import Motivators from '../../../User/containers/motivatorsContainer';
import CareTeam from '../../../User/containers/careTeamContainer';

import { Icon, Alert, Row, Col, Calendar, List,Card } from 'antd';
import {
    FormattedMessage,
    FormattedNumber,
    FormattedPlural,
} from 'react-intl';


export class DashUserLayout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: true
        };

        this.onDismiss = this.onDismiss.bind(this);
    }
    static propTypes = {
        user_id: PropTypes.string,
    }
    onDismiss() {
        this.setState({ visible: false });
    }
    render () {
        const {
            plans, loading, medicationPlan, date, user_id
        } = this.props;

      //console.log(user);
        /*if (loading) {
            //return (<div>Loading...</div>);
            return (
                <center>
                    <div  className='my-awesome-placeholder'>
                        <ReactPlaceholder type='text'  rows={6} color='#E0E0E0'>
                        </ReactPlaceholder>
                    </div>
                </center>
            );
        }*/
        //onsole.log("Logkout");
        //console.log(date);

        return (
           <Row gutter={15}>
               <Col>
                   <Alert
                       style={{marginBottom:24}}
                       message="WELCOME TO YOUR PERSONAL HEALTH DASHBOARD"
                       description="To start reaching your health goals, visit the Planstore to get an ActionPlan or add medications or trackers."
                       type="info"
                       showIcon
                       closeText={<Icon type="close" />}
                   />
               </Col>
               <Col xs={24} md={16} lg={18}>
                   <PlansList loading={loading} date={date} user_id={user_id} />
                   <MedicationPlan loading={loading} date={date} user_id={user_id} />
                   <BiometricPlan loading={loading} date={date} user_id={user_id} />
               </Col>
               <Col xs={24} md={8} lg={6}>



                         <Card title="Health Calendar"
                         extra={<div><Icon type="calendar" /> <Icon type="plus" /></div>}
                         >
                             <Calendar fullscreen={false}  />
                         </Card>
                       {/*<CareTeam />*/}
                   <Motivators user_id={user_id} />
               </Col>
           </Row>
            // <Form onSubmit={this.handleSubmit}>
            //     <Button type="primary" htmlType="submit" className="logout-form-button">Logout</Button>
            // </Form>
        );
    }
}

export default DashUserLayout;


