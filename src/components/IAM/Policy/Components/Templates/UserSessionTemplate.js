import React from 'react';
import TemplateElement from '../TemplateElement';
import TemplateElementContainer from '../TemplateElementContainer';
import useRadio from '../../../../../hooks/useRadio';
import useTemplateInput from '../../../../../hooks/useTemplateInput';
import useCheckBox from '../../../../../hooks/useCheckBox';
import useComboBox from '../../../../../hooks/useComboBox';

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
};

const UserSessionTemplate = () => {
	const [value, Radio] = useRadio({
		name: 'isUsed',
		options: [
			{label: '잠금', key: 'lock'},
			{label: '삭제', key: 'delete'},
		],
	});

	// const [value, Radio] = useRadio({
	// 	name: 'isUsed',
	// 	options: [
	// 		{label: '사용 함', key: 'use'},
	// 		{label: '사용 안함', key: 'unuse'},
	// 	],
	// });

	const [comboValue, ComboBox] = useComboBox({
		header: '사용 여부',
		options: [
			{label: '사용 함', key: 'use'},
			{label: '사용 안함', key: 'unuse'},
		],
	});

	const [unConnectedPeriod, unConnectedPeriodInput] = useTemplateInput({
		unitName: '일',
	});

	const [idleTime, idleTimeInput] = useTemplateInput({
		unitName: '초',
		initialValue: 30,
	});

	const [checkedValue, CheckBox] = useCheckBox({
		options: [
			{label: 'A', key: 'a'},
			{label: 'B', key: 'b'},
			{label: 'C', key: 'c'},
		],
		disabled: true,
		initialValues: ['a', 'c'],
	});

	return (
		<div>
			<TemplateElementContainer
				title={contents.sessionTimeout.title}
				description={contents.sessionTimeout.description}
				render={
					ComboBox
					// return <div>테이블</div>;
				}
			/>
			<TemplateElementContainer
				title={contents.dormant.title}
				description={contents.dormant.description}
				render={() => {
					return (
						<div>
							<TemplateElement
								title={'연속 미접속 기간'}
								render={unConnectedPeriodInput}
							/>
							<TemplateElement
								title={'계정 처리 방법'}
								render={Radio}
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
								render={Radio}
							/>
							<TemplateElement
								title={'유휴 시간'}
								render={idleTimeInput}
							/>
						</div>
					);
				}}
			/>
		</div>
	);
};

export default UserSessionTemplate;
