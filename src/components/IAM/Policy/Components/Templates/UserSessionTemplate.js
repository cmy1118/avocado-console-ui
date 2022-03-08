import React, {useEffect, useMemo, useState} from 'react';
import TemplateElement from '../TemplateElement';
import TemplateElementContainer from '../TemplateElementContainer';
import useRadio from '../../../../../hooks/useRadio';
import {DRAGGABLE_KEY} from '../../../../../Constants/Table/keys';
import Table from '../../../../Table/Table';
import TableComboBox from '../../../../Table/ColumnCells/TableComboBox';
import TableTextBox from '../../../../Table/ColumnCells/TableTextBox';
import {RowDiv} from '../../../../../styles/components/style';
import useTextBox from '../../../../../hooks/useTextBox';
import PropTypes from 'prop-types';
import IAM_RULE_TEMPLATE_DETAILE from '../../../../../reducers/api/IAM/Rule/templateDetail';
import {useDispatch} from 'react-redux';

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
	},
	dormant: {
		title: '휴면',
		description: [
			'일정 기간동안 미접속 사용자의 계정을 처리하기 위해 정책을 설정합니다.',
			'정상화 후 재로그인 시에 패스워드를 변경해야 합니다.',
		],
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

const UserSessionTemplate = ({templateId}) => {
	const dispatch = useDispatch();

	// const [data, setData] = useState([]);

	const [maxSession, setMaxSession] = useState([]);
	const [sessionTimeout, setSessionTimeout] = useState([]);
	const [screenSaver, setScreenSaver] = useState([]);

	const [screenSaverValue, screenSaverRadio, setScreenSaverValue] = useRadio({
		name: 'sessionTemplate-screenSaver-radio',
		options: [
			{label: '사용 함', key: 'yes'},
			{label: '사용 안함', key: 'no'},
		],
	});

	const [dormantValue, dormantRadio, setDormantValue] = useRadio({
		header: '사용 여부',
		options: [
			{label: '잠금', key: 'lock'},
			{label: '삭제', key: 'delete'},
		],
	});

	const [
		unConnectedPeriod,
		unConnectedPeriodTextBox,
		setUnConnectPeriod,
	] = useTextBox({
		name: 'unConnectPeriod',
	});

	const [idleTime, idleTimeTextBox, setIdleTime] = useTextBox({
		name: 'idleTime',
		disabled: screenSaverValue === 'no',
	});

	// const [data, setData] = useState([
	// 	{
	// 		id: 'data0',
	// 		isUsed: 'use',
	// 		application: 'Management Console',
	// 		MaintenanceTime: '14400',
	// 		PreservationTime: '0',
	// 		timeout: 'timeout',
	//
	// 		[DRAGGABLE_KEY]: 'data0',
	//
	// 		// inner table key가 있으면, 버튼이 생기고, 버튼을 클릭했을 때, 해당 row값을 읽어와 처리하는 함수가 필요.
	// 	},
	// 	{
	// 		id: 'data1',
	// 		isUsed: 'not use',
	// 		application: 'Web Terminal',
	// 		MaintenanceTime: '3600',
	// 		PreservationTime: '0',
	// 		timeout: 'timeout',
	// 		[DRAGGABLE_KEY]: 'data1',
	// 	},
	// ]);

	const columns = useMemo(
		() => [
			{
				Header: '사용여부',
				accessor: 'isUsed',
				Cell: function Component(cell) {
					return (
						<TableComboBox
							cell={cell}
							options={[
								{label: '사용 함', key: 'use'},
								{label: '사용 안함', key: 'not use'},
							]}
							// setData={setData}
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
				accessor: 'MaintenanceTime', //has to be changed
				Cell: function Component(cell) {
					return <TableTextBox cell={cell} />;
				},
			},
			{
				Header: '연결 보존 시간(초)',
				accessor: 'PreservationTime', //has to be changed
				Cell: function Component(cell) {
					return <TableTextBox cell={cell} />;
				},
			},
			{
				Header: '타임아웃 처리',
				accessor: 'timeout', //has to be changed
			},
		],
		[],
	);

	useEffect(() => {
		dispatch(
			IAM_RULE_TEMPLATE_DETAILE.asyncAction.findAllRuleTemplateDetailAction(
				{
					id: templateId,
				},
			),
		)
			.unwrap()
			.then((res) => {
				console.log(res.data);
				res.data.forEach((v) => {
					if (v[contents.ruleType] === 'MaxSession') {
						setMaxSession(v);
					} else if (v[contents.ruleType] === 'ScreenSaver') {
						setScreenSaver(v);
						setScreenSaverValue(v.attribute.usage ? 'yes' : 'no');
						setIdleTime(v.attribute.timeToIdle);
					} else if (v[[contents.ruleType]] === 'SessionTimeout') {
						setSessionTimeout(v);
					}
				});
			});
	}, [dispatch, setIdleTime, setScreenSaverValue, templateId]);

	useEffect(() => {
		// console.log(maxSession);
		console.log(screenSaver);
		// console.log(sessionTimeout);
	}, [maxSession, screenSaver, sessionTimeout]);

	return (
		<div>
			<TemplateElementContainer
				title={contents.sessionTimeout.title}
				description={contents.sessionTimeout.description}
				render={() => (
					<div>테이블</div>

					// <Table tableKey={'session'} data={data} columns={columns} />
				)}
			/>
			<TemplateElementContainer
				title={contents.dormant.title}
				description={contents.dormant.description}
				render={() => {
					return (
						<div>
							<TemplateElement
								title={'연속 미접속 기간'}
								render={() => (
									<RowDiv>
										{unConnectedPeriodTextBox()}
										{'일'}
									</RowDiv>
								)}
							/>
							<TemplateElement
								title={'계정 처리 방법'}
								render={dormantRadio}
							/>
							<TemplateElement
								title={'계정 정상화'}
								render={() => <div>본인 확인 인증</div>}
							/>
						</div>
					);
				}}
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
};

export default UserSessionTemplate;
