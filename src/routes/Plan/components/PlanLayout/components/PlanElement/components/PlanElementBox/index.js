import React from 'react';
import { Divider, Modal, Icon, Upload, Alert, Button, Card, Tooltip, Checkbox, Row, Col } from 'antd';
import PlanElementCard from './components/PlanElementCard';
import ReactFitText from 'react-fittext';
import Measurement from '../../../../containers/PlanMeasurement';
import PlanElementActions from '../../containers/PlanElementActions';
import PlanChoice from '../../../../../Plan/containers/PlanChoiceElement';

import PlanInputText from '../../../../../Plan/components/PlanInputText';
import PlanScale from '../../../../../Plan/components/PlanScale';

import PlanMedia from '../../../../../Plan/components/PlanMedia';
import LinkElement from '../../../../../Plan/components/LinkElement';
import AliasElement from '../../../../../Plan/components/AliasElement';
import {PlanAttachmentsElement} from '../../../../../Plan/containers/AttachmentsElement';
import TextElement from '../../../../../Plan/components/TextElement';
import ClinicalNoteElement from '../../../../../Plan/components/ClinicalNoteElement';
import TreatmentElement from '../../../../../Plan/components/TreatmentElement';
import DecisionElement, { FootNoteButton } from '../../../../../Plan/components/DecisionElement';
import ConditionElement from '../../../../../Plan/components/ConditionElement';
import CalculatorElement from '../../../../../Plan/components/CalculatorElement';
import './index.less';
import { FitIcon } from '../../../../../../../../components/FitIcon/index';
import TrackerInput from '../../../../../../containers/Tracker';
import { getTipBoxTypeLabel } from '../../../PlanElementBuilder/components/TipboxElementBuilder';
import AcceptPlanButton from '../../../../../AcceptPlan/components/AcceptPlanButton';
import { BrahmsRulesView } from '../../../../../../../../components/Brahms/components/Manager/components/Field';
import { BrahmsElementOutput } from '../../../../../../../../components/Brahms/components/View/components/Output';
import { possiblePlanElementOptionsFormatter } from '../../../PlanElementBuilder';
import { SideToSide } from '../../../../../../../../components/Layout/Flexbox';
import FootnoteView from '../../../../../../../../components/Footnote/components/View';
import { checkIfPlanElementIsInput } from '../../../../../../../../components/Plan/utils';
import { Attachments } from '../../../../../../../../components/FormCustomFields/components/Attachments';

const PlanElementBox = (props) => {
	let {
		currentInOrder = null,
		element,
		elements,
		date,
		isDraggable,
		onDrop,
		isBuilderMode,
		isPreviewMode,
		plan,
		user,
		upid,
		schedule,
		mode,
		i = 0,
		lesson,
		section,
		parentId,
		parentValue,
		showElementsAsCard = false,
		withCompleteCheckmark = false,
		notClickable = false,
		checkOnBrahmsExecution,
		// currentInOrder:0}
		updateCurrentElement
	} = props;

	const { id, itemType, type, itemInfo, reports, hasChildren = false, getBrahmsRules } = element || {};
	const item = itemInfo;

	let field = itemType;
	let { showAdd = isBuilderMode && !isPreviewMode } = props;
	let addAfter = true;
	//field = item_type;
	let fieldTitle = '';
	let reportValues = [];
	let showTitle = true;
	let titleExtra = false;
	//console.log(props);
	const { type: planType } = plan;
	const isPathway = planType === 'pathway';
	let defaultProps = { item, disabled: notClickable, date, user, onChange: props.onChange, isBuilderMode, isPreviewMode }
	const { brahmRules = [] } = props;
	const { rules: brahms } = brahmRules.find(report => report.element.id === element.id) || {};
	const hasReports = reports && reports.length > 0;
	let possibleOptions;
	switch (itemType) {
		default:
			break;
		case 'measurement_input':
			// const {reports:trackerReports=[]} = item;
			// console.log(reports);
			//showTitle = false;
			const { description, textBefore } = item || {};
			field = <>
				{textBefore && <div style={{ marginBottom: 5 }}>{textBefore}</div>}
				<TrackerInput {...defaultProps} measurement={item} />
				{description && <div style={{ marginTop: 5 }}>{description}</div>}
			</>;
			break;
		case 'choice_input':
		case 'checklist':

			if (itemType === 'checklist' && isPathway) {
				// if it's pathway and the checklist - always disabled
				defaultProps.disabled = true;
			}
			// reportValues = reports && reports.map((report) => report.value);
			// reportValues = reportValues && reportValues[0];
			//console.log(reports);
			field = (
				<PlanChoice
					reports={reports}
					{...defaultProps}
					isMultiple
					idInsteadValue
				/>
			);
			//const vertically = item.is_vertically;
			fieldTitle = item.label;
			const { options } = item;
			possibleOptions = options;

			break;
		case 'radio_input':
			// reportValues = reports && reports.map((report) => report.value);
			// reportValues = reportValues && reportValues[0];
			// reportValues = reportValues && reportValues[0];
			field = (
				<PlanChoice
					reports={reports}
					{...defaultProps}
					idInsteadValue
				/>
				// <PlanRadio reports={reportValues} {...defaultProps} />
			);

			fieldTitle = item.label;
			const { options: radioOptions } = item;
			possibleOptions = radioOptions;

			break;
		case 'dropdown_input':
			// reportValues = reports && reports.map((report) => report.value);
			// reportValues = reportValues && reportValues[0];
			// reportValues = reportValues && reportValues[0];
			fieldTitle = item.label;
			if (itemType === 'condition') {
				//addAfter = false;
			}
			field = (
				<PlanChoice
					reports={reports}
					{...defaultProps}
					isDropdown
					idInsteadValue
				/>
				// <PlanDropdown
				// 	showChildren={props.showChildren}
				// 	hasChildren={hasChildren}
				// 	reports={reportValues}
				// 	{...defaultProps}
				// />
			);
			const { options: dropdownOptions } = item;
			possibleOptions = dropdownOptions;

			break;
		case 'text_input':
			reportValues = reports && reports.map((report) => report.value);
			reportValues = reportValues && reportValues[0];

			fieldTitle = item.label;
			field = (
				<PlanInputText
					reports={reportValues}
					{...defaultProps}
				/>
			);

			break;

		case 'condition':
			reportValues = reports && reports.map((report) => report.valueId);
			reportValues = reportValues && reportValues[0];
			// console.log(reportValues, 'CONDIreportValues');
			// need the second as well
			reportValues = reportValues && reportValues[0];
			fieldTitle = item.label;
			if (itemType === 'condition') {
				//addAfter = false;
			}
			field = (
				<ConditionElement
					showChildren={props.showChildren}
					hasChildren={hasChildren}
					reports={reportValues}
					{...defaultProps}
				/>
			);
			const { options: condiOptions } = item;
			possibleOptions = condiOptions;
			break;
		case 'decision':
			const { updateSkippedElements,
				updateBrahmRules,
				brahmRules } = props;
			reportValues = reports && reports.map((report) => report.valueId);
			reportValues = reportValues && reportValues[0];
			reportValues = reportValues && reportValues[0];

			// const { footnote } = item;
			// console.log(footnote, 'footnotefootnotefootnote');
			// if (footnote) {
			// 	titleExtra = <FootnoteView footnote={footnote} />;
			// }
			//fieldTitle = item.label;
			field = (
				<DecisionElement
					id={id}
					plan={plan}
					mode={mode}
					element={element}
					elements={elements}
					isDraggable={isDraggable}
					onDrop={onDrop}
					showChildren={props.showChildren}
					hasChildren={hasChildren}
					reports={reportValues}
					updateSkippedElements={updateSkippedElements}
					updateBrahmRules={updateBrahmRules}
					brahmRules={brahmRules}
					checkOnBrahmsExecution={checkOnBrahmsExecution}
					{...defaultProps}
				/>
			);
			break;
		case 'scale_input':
			reportValues = reports && reports.map((report) => report.valueId);
			reportValues = reportValues && reportValues[0];
			reportValues = reportValues && reportValues[0];

			fieldTitle = item.label;

			field = (
				<PlanScale reports={reportValues} {...defaultProps} />
			);

			break;
		case 'file_input':
			fieldTitle = item.label;
			reportValues = reports && reports.map((report) => report.attachments);
			reportValues = reportValues && reportValues[0];
			field = (
				<PlanAttachmentsElement reports={reportValues} {...defaultProps} />
				// <Upload>
				// 	<Button disabled>
				// 		<Icon type="upload" /> Upload
				// 	</Button>
				// </Upload>
			);
			break;
		case 'exam_input':
			fieldTitle = item.name;
			field = <Button disabled>{fieldTitle}</Button>;
			break;
		case 'instruction':

		case 'instruction_embed':
			fieldTitle = '';
			field = <TextElement {...defaultProps} />;
			break;
		case 'clinical_note':
			fieldTitle = null;
			//showTitle = false;
			//console.log(item);
			const { title, note = '' } = item;
			field = (
				<ClinicalNoteElement
					mode={mode}
					plan={plan}
					{...defaultProps}
				/>
			); //
			break;
		case 'line':
			const { height, color } = item;
			let opts = { height: height };
			if (color !== '') {
				opts.background = color;
			}
			field = <Divider style={opts} />;
			break;
		case 'instruction_tipbox':
			// console.log(item);
			const { icon, tipType, color: bgColor, iconAlign } = item;
			const { id: iconId, url: iconUrl } = icon;
			let text = '';
			let tipboxIcon = null;
			if (iconId) {
				const tipStyle = {
					fontWeight: 'bold',
					textTransform: 'uppercase',
					fontSize: '0.7em'
				}
				const textLength = item.text.length;
				//tipboxIcon = <img src={iconUrl} style={{maxWidth:80}} />;
				if (iconAlign === 'right') {
					// text = <div className={'clearfix'}>
					// 	<div style={{float: 'right', textAlign: 'center', marginLeft:20}}>
					// 	<img src={iconUrl} style={{maxWidth:80}} /> 
					// 	<div style={tipStyle}>{getTipBoxTypeLabel(tipType)}</div>
					// 	</div>
					// 	<ReactFitText compressor={10.5} minFontSize={16} maxFontSize={18}><div style={{marginRight:100}} dangerouslySetInnerHTML={{ __html: item.text }} /></ReactFitText>
					// </div>

					text = <SideToSide>
						<ReactFitText compressor={3.5} minFontSize={16} maxFontSize={18}><div className={'redactor-styles'} dangerouslySetInnerHTML={{ __html: item.text }} /></ReactFitText>
						<div style={{ textAlign: 'center', paddingLeft: 10 }}>
							<img src={iconUrl} style={{ maxWidth: 80 }} />
							{/* <div style={tipStyle}>{getTipBoxTypeLabel(tipType)}</div> */}
						</div>
					</SideToSide>
					// 	<Col sm={4} style={{paddingRight:10, textAlign:'center'}}>

					// 	</Col>
					// 	<Col sm={20}></Col>
					// </Row>;

					// text = <Row>
					// 	<Col sm={4} style={{paddingRight:10, textAlign:'center'}}>
					// 	<div style={tipStyle}>{getTipBoxTypeLabel(tipType)}</div>
					// 	<img src={iconUrl} style={{maxWidth:80}} /> 
					// 	</Col>
					// 	<Col sm={20}><div dangerouslySetInnerHTML={{ __html: item.text }} /></Col>
					// </Row>;
				} else {
					// text = <div className={'clearfix'}>
					// 	<div style={{float: 'left', textAlign: 'center', marginRight:20}}>
					// 	<img src={iconUrl} style={{maxWidth:80}} /> 
					// 	<div style={tipStyle}>{getTipBoxTypeLabel(tipType)}</div>
					// 	</div>
					// 	<ReactFitText compressor={3.5} minFontSize={16} maxFontSize={18}><div style={{marginLeft:100}} dangerouslySetInnerHTML={{ __html: item.text }} /></ReactFitText>
					// </div>

					text = <SideToSide>
						<div style={{ textAlign: 'center', paddingRight: 10 }}>
							<img src={iconUrl} style={{ maxWidth: 80 }} />
							{/* <div style={tipStyle}>{getTipBoxTypeLabel(tipType)}</div> */}
						</div>
						<ReactFitText compressor={3.5} minFontSize={16} maxFontSize={18}><div className={'redactor-styles'} dangerouslySetInnerHTML={{ __html: item.text }} /></ReactFitText>
					</SideToSide>

				}

			} else {
				text = <div dangerouslySetInnerHTML={{ __html: item.text }} />;
			}
			// console.log(bgColor, 'bgColor');
			// text = <div dangerouslySetInnerHTML={{ __html: item.text }} />;
			fieldTitle = '';
			field = (
				<div style={{ background1: bgColor, marginBottom: 10 }}>
					{text}
				</div>
				// 	// message={getTipBoxTypeLabel(tipType)}
				// 	description={text}
				// 	// icon={<img src={iconUrl} style={{maxWidth:80}} />}
				// 	// showIcon = {true}
				// 	type="info"
				// />
			);
			break;
		case 'link':
			field = <LinkElement item={item} />;
			//link_path":"https://ya.ru","label":"Yandex","description":"search engine"
			break;
		case 'media':
			//fieldTitle = item.label;
			field = <PlanMedia item={item} />;
			break;

		case 'treatment':
			fieldTitle = item.title;
			field = <TreatmentElement plan={plan} disabled={notClickable} isPreviewMode={isPreviewMode} mode={mode} item={item} />;
			break;
		case 'diagnosis':
			//fieldTitle = 'Diagnosis';
			field = 'Set patient diagnoses';
			break;
		case 'cancer_stage':
			fieldTitle = 'Stage';
			field = 'Set patient stage';
			break;
		case 'alias':
			field = (
				<AliasElement
					onDrop={onDrop}
					isBuilderMode={isBuilderMode}
					showChildren={props.showChildren}
					plan={plan}
					upid={upid}
					i={i}
					element={element}
				/>
			);
			break;
		case 'ap':
			const { thumb, title: planTitle } = itemInfo || {};
			const { medium = '' } = thumb || {};
			fieldTitle = planTitle;

			const planActions = [];
			if (!isPathway) {
				planActions.push(<AcceptPlanButton disabled={isBuilderMode || isPreviewMode} plan={itemInfo} label={<Button type={'orange'}>Assign ActionPlan</Button>} />);
			}
			// return <div key={title}>  <AcceptPlanButton plan={plan} label={<Card cover={medium} ><Avatar shape="square" src={medium} /> {title}</>} /> </div>;
			field = <Row gutter={16}>
				<Col span={8} key={title}>
					<Card cover={<img src={medium} />} actions={planActions} >
						<Card.Meta title={planTitle} />
					</Card>
				</Col>
			</Row>;

			// field = <AcceptPlanButton disabled={isBuilderMode || isPreviewMode} plan={itemInfo} label={<Card cover={<img src={medium} />} hoverable>
			// <Card.Meta title={planTitle} /> 
			// </Card>} />;

			break;
		case 'calculator':
			const {connectDragSource} = props;
			//fieldTitle = itemInfo.title;
			//console.log(element);
			//console.log(itemInfo);
			field = (
				<CalculatorElement
					plan={plan}
					upid={upid}
					actFieldId={id}
					element={itemInfo}
					connectDragSource={connectDragSource}
					isDraggable={isDraggable}
					onDrop={onDrop}
					{...defaultProps}
				/>
			);
			break;
	}

	let className = isBuilderMode ? 'element' : '';
	//onsole.log(currentInOrder);
	//console.log(i);
	if (isBuilderMode && !isPreviewMode) {
		if (currentInOrder === i) {
			className += ' active-element';
		}
	}
	//console.log(props);
	let addBeforeEl = null;
	let addAfterEl = null;
	showAdd = false;
	if (parentId) {
		showAdd = true;
	}
	if (isBuilderMode && !isPreviewMode) {
		if (props.element) {
			// showAdd = true;
			//console.log(parentId);
			//console.log(parentValue);
			// if we have elemnent - add as parent
			addBeforeEl = (
				<PlanElementActions
					element={element}
					// id={id}
					i={i}
					lesson={lesson}
					section={section}
					plan={plan}
					type=""
					//view="decision"
					mode={mode}
					schedule={schedule}
					buttons={['addBefore']}
					parentId={parentId}
					parentValue={parentValue}
				/>
			);
			addAfterEl = (
				<PlanElementActions
					element={element}
					// id={id}
					i={i}
					lesson={lesson}
					section={section}
					plan={plan}
					type=""
					//view="decision"
					mode={mode}
					schedule={schedule}
					buttons={['addAfter']}
					parentId={parentId}
					parentValue={parentValue}
				/>
			);
		} else {
			addBeforeEl = (
				<PlanElementActions
					id={id}
					i={i}
					lesson={lesson}
					section={section}
					plan={plan}
					type=""
					mode={mode}
					schedule={schedule}
					buttons={['addBefore']}
					parentId={parentId}
					parentValue={parentValue}
				/>
			);
			addAfterEl = (
				<PlanElementActions
					id={id}
					i={i}
					lesson={lesson}
					section={section}
					plan={plan}
					type=""
					mode={mode}
					schedule={schedule}
					buttons={['addAfter']}
					parentId={parentId}
					parentValue={parentValue}
				/>
			);
		}
	} else {
		showAdd = false;
	}

	let onClick;
	// update current element only on click
	if (isBuilderMode && !isPreviewMode) {
		onClick = updateCurrentElement;
	// } else if (isPathway) {
	// 	// probably this better to listed onchange for the input. if we've changed - then update currentElement 
	// 	const isInputType = checkIfPlanElementIsInput({element});
	// 	if (isInputType) {
	// 		onClick = updateCurrentElement;
	// 	}
	}
	// showAdd = false;
	return (
		<div className={className} style={{ position: 'relative', width: '100%' }} onClick={onClick}>

			{/* {(isPathway && hasReports) && <div className={'dimmed-block'}></div>} */}
			{showAdd &&
				i === 0 && (
					<Divider className="element-actions" style={{ marginTop: -10 }}>
						{addBeforeEl}
					</Divider>
				)}

			<PlanElementCard
				showTitle={showTitle}
				element={element}
				isBuilderMode={isBuilderMode}
				isPreviewMode={isPreviewMode}
				withCompleteCheckmark={withCompleteCheckmark}
				plan={plan}
				extra={
					isBuilderMode && !isPreviewMode ? (
						<PlanElementActions
							element={element}
							id={id}
							i={i}
							lesson={lesson}
							section={section}
							plan={plan}
							type=""
							mode={mode}
							schedule={schedule}
							parentId={parentId}
							parentValue={parentValue}
						/>
					) : (
							titleExtra
						)
				}
			>
				{field}

				{(!isPreviewMode && isBuilderMode && getBrahmsRules && getBrahmsRules.length > 0) && <BrahmsRulesView rules={getBrahmsRules} possibleOptions={possibleOptions} possibleOptionsFormatted={possiblePlanElementOptionsFormatter} /*renderRule={questionBrahmItem} possibleOptions={getAnswers}*/ formatGoToElement={props.formatGoToElement} />}
				{(brahms && brahms.length > 0) && <BrahmsElementOutput rules={brahms} />}

			</PlanElementCard>
			{showAdd &&
				addAfter && (
					<Divider className="element-actions" style={{ marginBottom: mode !== 'diagnosis' ? 10 : -15 }}>
						{addAfterEl}
					</Divider>
				)}
		</div>
	);
};

export default PlanElementBox;