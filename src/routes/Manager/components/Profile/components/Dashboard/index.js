import React from 'react';
import {Row, Col, Card} from 'antd';
import {EmptyList} from "../../../../../../components/Loading";
import {DiagnosesList} from "../../../../../Health/containers/Diagnoses";
import Vitals from "./containers/Vitals";
import Stages from "./containers/Stages";
import ActionPlans from "./containers/ActionPlans";
import HealthItems from "./containers/HealthItems";
import Tumorboards from "./containers/Tumorboards";
import News from "./containers/News";
import Timeline from "./containers/Timeline";
import Genomics from "./components/Genomics";
import FamilyHistory from "./containers/FamilyHistory";
import Tasks from "./containers/Tasks";


const Overview = props => {
    console.log(props);
    const {user={}} = props;
    const {id:userId} = user;
    return <React.Fragment>
        <Row gutter={16}>
            <Col xl={17}>
                       
                <Row  style={{marginBottom:16}}>
                    <Col>
                    <Tasks user={user} hideOnEmpty />
                        <Stages userId={userId} />
                        <Vitals userId={userId} user={user} />
                    </Col>
                </Row>

                <Row gutter={16} style={{marginBottom:16}}>
                    <Col lg={12}>
                        <HealthItems userId={userId} title="Diagnosis" type="diagnosis" />
                        <Genomics userId={userId} />
                        <HealthItems userId={userId} title="Clinical Trials" type="clinical_trial" />
                    </Col>
                    <Col lg={12}>
                        <HealthItems userId={userId} title="Treatments" type="treatment" />
                        <Tumorboards userId={userId} />
                        <HealthItems userId={userId}  title="Medications" type="medication" />
                        <FamilyHistory user={user} />
                    </Col>
                </Row>
                 
            </Col>
            <Col xl={7}>
                <Timeline userId={userId} />
                <News userId={userId} />
            </Col>
        </Row>
    </React.Fragment>
}

export default Overview;