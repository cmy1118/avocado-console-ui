import React, {useEffect, useMemo, useRef, useState} from 'react';
import TemplateElement from '../../TemplateElement';
import TemplateElementContainer from '../../TemplateElementContainer';
import useRadio from '../../../../../../hooks/useRadio';
import {DRAGGABLE_KEY} from '../../../../../../Constants/Table/keys';
import Table from '../../../../../Table/Table';
import TableComboBox from '../../../../../Table/ColumnCells/TableComboBox';
import TableTextBox from '../../../../../Table/ColumnCells/TableTextBox';
import {RowDiv} from '../../../../../../styles/components/style';
import useTextBox from '../../../../../../hooks/useTextBox';
import PropTypes from 'prop-types';
import IAM_RULE_TEMPLATE_DETAIL from '../../../../../../reducers/api/IAM/Policy/RuleManagement/templateDetail';
import {useDispatch, useSelector} from 'react-redux';
import IAM_RULE_MANAGEMENT_TEMPLATE from '../../../../../../reducers/api/IAM/Policy/RuleManagement/template';
import {policyTypes} from '../../../../../../utils/data';
import IAM_POLICY_MANAGEMENT_POLICIES from '../../../../../../reducers/api/IAM/Policy/PolicyManagement/policies';
import CheckBox from '../../../../../RecycleComponents/New/CheckBox';
import TableCheckBox from '../../../../../Table/ColumnCells/TableCheckBox';

/**************************************************
 * seob - constant value 작성 (우선 각 컴포넌트 상위에 작성, 이후 별도의 파일로 관리)
 ***************************************************/
const contents = {
	common: {
		isLimited: {
			title: '제한 여부',
			true: '제한 함',
			false: '제한 안함',
		},
	},
	sessionTimeout: {
		title: '세션 타임 아웃',
		description: [
			'사용자 세션 제어를 위한  세션 유지 시간, 보존 시간, 타임아웃 처리등의 정책을 설정합니다',
			"세션 연결 보존 시간 설정은 '화면 잠금'시에만 해당되며, '로그아웃'일때는 세션은 바로 끊기게 됩니다",
		],
		'console-ui': 'Management Console',
		'web-terminal': 'Web Terminal',
	},
	screenSaver: {
		title: '화면 보호기',
		description: [
			'화면을 잠금 유휴 시간을 설정 합니다.',
			'최대 유휴 시간은 1800초(30분)를 초과 설정할 수 없습니다.',
		],
	},
	ruleType: 'ruleType',
};

/**************************************************
 * seob - IAM의 사용자 세션 규칙 템플릿
 *
 * templateId : 해당 템플릿의 id
 ***************************************************/
// todo : TableTextBox의 invalid 검사 기능 추가해야함.
const UserSessionTemplate = ({templateId, name, description}) => {
	const dispatch = useDispatch();
	const {creatingPolicyMode} = useSelector(
		IAM_POLICY_MANAGEMENT_POLICIES.selector,
	);
	const [data, setData] = useState([]);

	const [tableData, setTableData] = useState([]);
	const [sessionTimeout, setSessionTimeout] = useState([]);
	const [screenSaver, setScreenSaver] = useState([]);

	const [screenSaverValue, screenSaverRadio, setScreenSaverValue] = useRadio({
		name: 'sessionTemplate-screenSaver-radio',
		options: [
			{label: '사용 함', key: 'yes'},
			{label: '사용 안함', key: 'no'},
		],
	});

	const [idleTime, idleTimeTextBox, setIdleTime] = useTextBox({
		name: 'idleTime',
		disabled: screenSaverValue === 'no',
	});

	// 세션 타임아웃 테이블 컬럼
	const columns = useMemo(
		() => [
			{
				Header: '사용여부',
				accessor: 'usage',
				Cell: function Component(cell) {
					return (
						<TableComboBox
							cell={cell}
							options={[
								{label: '사용 함', key: 'yes'},
								{label: '사용 안함', key: 'no'},
							]}
							setData={setTableData}
						/>
					);
				},
				width: 200,
			},
			{
				Header: '어플리케이션',
				accessor: 'application', //has to be changed
			},
			{
				Header: '세션 유지시간(초)',
				accessor: 'sessionTimeSeconds', //has to be changed
				Cell: function Component(cell) {
					return <TableTextBox cell={cell} />;
				},
			},
			{
				Header: '연결 보존 시간(초)',
				accessor: 'keepAliveTimeSeconds', //has to be changed
				Cell: function Component(cell) {
					return <TableTextBox cell={cell} />;
				},
			},
			{
				Header: '타임아웃 처리',
				accessor: 'blockingType', //has to be changed
				Cell: function Component(cell) {
					return (
						<TableComboBox
							cell={cell}
							options={[
								{label: '로그아웃', key: 'logout'},
								{label: '화면잠금', key: 'lock'},
							]}
							setData={setTableData}
						/>
					);
				},
				width: 200,
			},
		],
		[],
	);

	/**************************************************
	 * seob - 규칙 템플릿 id에 해당하는 detail 정보 findAll
	 ***************************************************/
	useEffect(() => {
		dispatch(
			IAM_RULE_TEMPLATE_DETAIL.asyncAction.findAllRuleTemplateDetailAction(
				{
					id: templateId,
				},
			),
		)
			.unwrap()
			.then((res) => {
				// console.log(res);
				for (let v of res) {
					// 속성의 규칙 타입이 screen_saver(화면보호기)인 경우
					if (v.attribute.ruleType === 'screen_saver') {
						setScreenSaver(v);
						setScreenSaverValue(v.attribute.usage ? 'yes' : 'no');
						setIdleTime(v.attribute.timeToIdle);
					}
					// 속성의 규칙 타입이 session_timeout(세션타임아웃)인 경우
					else if (v.attribute.ruleType === 'session_timeout') {
						setSessionTimeout(v);

						const data = Object.entries(v.attribute.policies).map(
							(x) => ({
								...x[1],
								id: x[0],
								[DRAGGABLE_KEY]: x[0],
								usage: x[1].usage ? 'yes' : 'no',
								application: contents.sessionTimeout[x[0]],
							}),
						);
						setTableData(data);
					}
				}
			});
	}, [dispatch, setIdleTime, setScreenSaverValue, templateId]);

	/**************************************************
	 * seob - 화면 보호기 데이터 변경시 setScreenSaver로 반영
	 ***************************************************/
	useEffect(() => {
		setScreenSaver((data) => ({
			...data,
			attribute: {
				...data.attribute,
				usage: screenSaverValue === 'yes',
				timeToIdle: parseInt(idleTime),
			},
		}));
	}, [idleTime, screenSaverValue]);

	/**************************************************
	 * seob - 세션 타임아웃 데이터 변경시 setSessionTimeout로 반영
	 ***************************************************/
	useEffect(() => {
		const policies = {};
		tableData.forEach((v) => {
			policies[v.id] = {
				usage: v.usage === 'yes',
				sessionTimeSeconds: parseInt(v.sessionTimeout),
				keepAliveTimeSeconds: parseInt(v.keepAliveTimeSeconds),
				blockingType: v.blockingType,
			};
		});

		setSessionTimeout((prev) => ({
			...prev,
			attribute: {
				...prev.attribute,
				policies: policies,
			},
		}));
	}, [tableData]);

	/**************************************************
	 * seob - 화면보호기, 세션타임아웃 데이터 변경시 setData로 전체 data 저장
	 ***************************************************/
	useEffect(() => {
		setData([screenSaver, sessionTimeout]);
	}, [screenSaver, sessionTimeout]);

	/**************************************************
	 * seob717 - 정책 생성 액션 요청으로 템플릿 데이터를 redux에 저장
	 **************************************************/
	useEffect(() => {
		// console.log(data);
		if (creatingPolicyMode) {
			dispatch(
				IAM_RULE_MANAGEMENT_TEMPLATE.action.gatherRulteTemplate({
					id: templateId,
					data: {
						name: name,
						resource: policyTypes.iam,
						description: description,
						attributes: data.map((v) => v.attribute),
					},
				}),
			);
		}
	}, [creatingPolicyMode, data, description, dispatch, name, templateId]);

	useEffect(() => {
		console.log(tableData);
	}, [tableData]);

	return (
		<div>
			<TemplateElementContainer
				title={contents.sessionTimeout.title}
				description={contents.sessionTimeout.description}
				render={() => (
					<Table
						tableKey={'session'}
						data={tableData}
						columns={columns}
						isCheckBox={false}
						setData={setTableData}
					/>
				)}
			/>
			<TemplateElementContainer
				title={contents.screenSaver.title}
				description={contents.screenSaver.description}
				render={() => {
					return (
						<div>
							<TemplateElement
								title={'사용 여부'}
								render={screenSaverRadio}
							/>
							<TemplateElement
								title={'유휴 시간'}
								render={() => (
									<RowDiv>
										{idleTimeTextBox()}
										{'초'}
									</RowDiv>
								)}
							/>
						</div>
					);
				}}
			/>
		</div>
	);
};

UserSessionTemplate.propTypes = {
	templateId: PropTypes.string,
	name: PropTypes.string,
	description: PropTypes.string,
};

export default UserSessionTemplate;
