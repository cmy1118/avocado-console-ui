import React, {useEffect, useState} from 'react';
import TemplateElementContainer from '../../TemplateElementContainer';
import PropTypes from 'prop-types';
import IAM_RULE_TEMPLATE_DETAIL from '../../../../../../reducers/api/IAM/Policy/RuleManagement/ruleTemplateDetail';
import {useDispatch, useSelector} from 'react-redux';
import TemplateElement from '../../TemplateElement';
import TimeInterval from '../../../../../RecycleComponents/Templates/TimeInterval';
import useRadio from '../../../../../../hooks/useRadio';
import IAM_RULE_MANAGEMENT_TEMPLATE from '../../../../../../reducers/api/IAM/Policy/RuleManagement/ruleTemplate';
import {policyTypes} from '../../../../../../utils/data';
import IAM_POLICY_MANAGEMENT_POLICIES from '../../../../../../reducers/api/IAM/Policy/PolicyManagement/policies';
import {isFulfilled} from '../../../../../../utils/redux';

/**************************************************
 * seob - constant value 작성 (우선 각 컴포넌트 상위에 작성, 이후 별도의 파일로 관리)
 ***************************************************/
const contents = {
	'web-terminal-ui:*': {
		title: 'Web Terminal',
		description: [
			'접근 가능 시간을 제한 하지 않으면 언제든 제한 없이 접근 가능합니다.',
			'접근 가능 시간을 제한할 경우 요일별 시간을 설정합니다. 23:59까지만 설정',
		],
	},
	'console-ui:*': {
		title: 'Management Console',
		description: [
			'접근 가능 시간을 제한 하지 않으면 언제든 제한 없이 접근 가능합니다.',
			'접근 가능 시간을 제한할 경우 요일별 시간을 설정합니다. 23:59까지만 설정',
		],

		// Week: 요일 리스트
	},
	restriction: {
		title: '제한 여부',
		yes: '제한 함',
		no: '제한 안함',
	},
	week: {
		MONDAY: '월',
		TUESDAY: '화',
		WEDNESDAY: '수',
		THURSDAY: '목',
		FRIDAY: '금',
		SATURDAY: '토',
		SUNDAY: '일',
	},
};

/**************************************************
 * seob - 사용자 접근 템플릿
 ***************************************************/
const UserAccessTemplate = ({templateId, name, description}) => {
	const WEEK = [
		'MONDAY',
		'TUESDAY',
		'WEDNESDAY',
		'THURSDAY',
		'FRIDAY',
		'SATURDAY',
		'SUNDAY',
	];
	const {creatingPolicyMode} = useSelector(
		IAM_POLICY_MANAGEMENT_POLICIES.selector,
	);
	const [data, setData] = useState([]);
	const dispatch = useDispatch();
	const CONSOLE_RADIO_NAME = 'console-radio-name';
	const WEBTERM_RADIO_NAME = 'webterm-radio-name';
	// 라디오 버튼 옵션값
	const radioOptions = [
		{label: contents.restriction.yes, key: 'yes'},
		{label: contents.restriction.no, key: 'no'},
	];
	// console 라디오 버튼 hook
	const [consoleRadioValue, consoleRadio, setConsoleRadioValue] = useRadio({
		name: CONSOLE_RADIO_NAME,
		options: radioOptions,
	});

	// webterm 라디오 버튼 hook
	const [webtermRadioValue, webtermRadio, setWebtermRadioValue] = useRadio({
		name: WEBTERM_RADIO_NAME,
		options: radioOptions,
	});

	/**************************************************
	 * seob - 템플릿 id를 통해 detail조회 후 setState
	 ***************************************************/
	useEffect(() => {
		const fetchData = async () => {
			const data = await dispatch(
				IAM_RULE_MANAGEMENT_TEMPLATE.asyncAction.findById({
					templateId,
				}),
			);
			if (isFulfilled(data)) {
				console.log(data.payload);
				for (let v of data.payload) {
					v.resource.includes('console-ui') &&
						setConsoleRadioValue(v.attribute.usage ? 'yes' : 'no');
					v.resource.includes('web-terminal-ui') &&
						setWebtermRadioValue(v.attribute.usage ? 'yes' : 'no');
				}

				setData(data.payload);
			} else {
				console.log(data.error);
			}
		};
		fetchData();
	}, [dispatch, setConsoleRadioValue, setWebtermRadioValue, templateId]);

	/**************************************************
	 * seob - 정보 변경시 setState
	 ***************************************************/
	useEffect(() => {
		setData((data) =>
			data.map((v) => {
				if (v.resource.includes('console-ui')) {
					return {
						...v,
						attribute: {
							...v.attribute,
							usage: consoleRadioValue === 'yes',
						},
					};
				} else if (v.resource.includes('web-terminal-ui')) {
					return {
						...v,
						attribute: {
							...v.attribute,
							usage: webtermRadioValue === 'yes',
						},
					};
					//
				}
			}),
		);
	}, [consoleRadioValue, webtermRadioValue]);

	/**************************************************
	 * seob717 - 정책 생성 액션 요청으로 템플릿 데이터를 redux에 저장
	 **************************************************/
	useEffect(() => {
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

	return (
		<div>
			{data.map((v, i) => (
				<TemplateElementContainer
					key={i}
					title={contents[v.resource].title}
					description={contents[v.resource].description}
					render={() => {
						return (
							<div>
								<TemplateElement
									title={contents[v.resource].title}
									render={
										(v.resource.includes('console-ui') &&
											consoleRadio) ||
										(v.resource.includes(
											'web-terminal-ui',
										) &&
											webtermRadio)
									}
								/>
								{WEEK.map((w) => (
									<TimeInterval
										key={w}
										week={w}
										title={contents.week[w]}
										data={v}
										setData={setData}
									/>
								))}
							</div>
						);
					}}
				/>
			))}
		</div>
	);
};

UserAccessTemplate.propTypes = {
	templateId: PropTypes.string,
	name: PropTypes.string,
	description: PropTypes.string,
};

export default UserAccessTemplate;
