import React, {useEffect} from 'react';
import TemplateLayout from '../../Layout/TemplateLayout';
import TemplateElement from '../../Layout/TemplateElement';
import {
	blockingTypeOptions,
	groupPermissionTypeOptions,
	policyOption,
	setUsageOptionByAttribute,
	usageOptions,
} from '../../../../../../../utils/policy/options';
import useRadio from '../../../../../../../hooks/useRadio';
import useComboBox from '../../../../../../../hooks/useComboBox';
import {RowDiv} from '../../../../../../../styles/components/style';
import PropTypes from 'prop-types';
import IAM_USER_GROUP_TYPE from '../../../../../../../reducers/api/IAM/User/Group/groupType';
import {useDispatch} from 'react-redux';

const modifyingGroup = {
	title: '그룹 변경',
	description: [
		'사용자의 그룹이 변경으로 인한 권한 변경을 제어하기 위한 정책을 설정합니다.',
		'그룹 유형은 최대 3개까지만 설정 가능합니다.',
	],
	contents: {
		usage: {
			title: '사용 여부',
		},
		controlGroupType: {
			title: '제어 그룹 유형',
			placeholder: '선택',
		},
		blockingType: {
			title: '계정 처리 방법',
		},
		permissionType: {
			title: '그룹 권한 처리',
		},
		accountNormalization: {
			title: '계정 정상화',
			message: '관리자 해제',
		},
	},
};

const tempOption = [{value: 'select', label: '선택'}];

/**************************************************
 * ambacc244 - 사용자 계정 처리(그룹 변경) 폼
 **************************************************/
const ModifyingGroup = ({data, setTemplateData}) => {
	const dispatch = useDispatch();
	//usage : 그룹 변경 사용 여부
	const [usage, usageRadioButton, setUsage] = useRadio({
		name: 'modifyingGroupUsage',
		options: usageOptions,
	});
	//group1: 제어 그룹 유형1
	const [group1, group1ComboBox] = useComboBox({
		options: tempOption,
		disabled: usage === policyOption.usage.none.value,
	});
	//group2: 제어 그룹 유형2
	const [group2, group2ComboBox] = useComboBox({
		options: tempOption,
		disabled: usage === policyOption.usage.none.value,
	});
	//group3: 제어 그룹 유형3
	const [group3, group3ComboBox] = useComboBox({
		options: tempOption,
		disabled: usage === policyOption.usage.none.value,
	});
	//blockingType: 계정 처리 방법
	const [blockingType, blockingTypeRadioButton, setBlockingType] = useRadio({
		name: 'modifyingGroupBlockingType',
		options: blockingTypeOptions,
		disabled: usage === policyOption.usage.none.value,
	});
	//permissionType: 그룹 권한 처리
	const [
		permissionType,
		permissionTypeRadioButton,
		setPermissionType,
	] = useRadio({
		name: 'groupPermissionType',
		options: groupPermissionTypeOptions,
		disabled: usage === policyOption.usage.none.value,
	});

	/**************************************************
	 * ambacc244 - 그룹 변경 데이터가 바뀌면 정책 생성을 위한 값을 변경
	 **************************************************/
	useEffect(() => {
		if (data?.attribute?.ruleType) {
			let attributes = {usage: usage === policyOption.usage.use.value};
			//사용 여부 true
			if (usage === policyOption.usage.use.value) {
				attributes.blockingType = blockingType;
				attributes.permissionType = permissionType;
			}
			setTemplateData({
				resource: data?.resource,
				attribute: {ruleType: data?.attribute.ruleType, ...attributes},
			});
		}
	}, [blockingType, data, permissionType, setTemplateData, usage]);

	/**************************************************
	 * ambacc244 - 서버로 부터 받아온 default 값 세팅
	 **************************************************/
	useEffect(() => {
		console.log(data?.attribute);
		setUsage(
			setUsageOptionByAttribute(
				data?.attribute,
				'usage',
				policyOption.usage.use.value,
				policyOption.usage.none.value,
			),
		);
		//TODO: 제어 그룹 유형

		//계정 처리 방법 default value 있음
		if (data?.attribute?.blockingType) {
			//계정 처리 방법 세팅
			setBlockingType(data?.attribute.blockingType);
		}
		//그룹 권한 처리 default value 있음
		if (data?.attribute?.permissionType) {
			//그룹 권한 처리 세팅
			setPermissionType(data?.attribute?.permissionType);
		}
	}, [data, setBlockingType, setPermissionType, setUsage]);

	// useEffect(() => {
	// 	const getGroupTypes = async () => {
	// 		try {
	// 			const res = await dispatch(
	// 				IAM_USER_GROUP_TYPE.asyncAction.findAllAction({
	// 					range: 'elements=0-50',
	// 				}),
	// 			);
	// 			console.log(res);
	// 		} catch (err) {
	// 			console.log(err);
	// 		}
	// 	};
	//
	// 	getGroupTypes();
	// }, []);

	return (
		<TemplateLayout
			title={modifyingGroup.title}
			description={modifyingGroup.description}
			render={() => {
				return (
					<div>
						<TemplateElement
							title={modifyingGroup.contents.usage.title}
							render={usageRadioButton}
						/>
						<TemplateElement
							title={
								modifyingGroup.contents.controlGroupType.title
							}
							render={() => {
								return (
									<RowDiv>
										{group1ComboBox()}
										{group2ComboBox()}
										{group3ComboBox()}
									</RowDiv>
								);
							}}
						/>

						<TemplateElement
							title={modifyingGroup.contents.blockingType.title}
							render={blockingTypeRadioButton}
						/>
						<TemplateElement
							title={modifyingGroup.contents.permissionType.title}
							render={permissionTypeRadioButton}
						/>
						<TemplateElement
							title={
								modifyingGroup.contents.accountNormalization
									.title
							}
							render={() => {
								return (
									<RowDiv>
										{
											modifyingGroup.contents
												.accountNormalization.message
										}
									</RowDiv>
								);
							}}
						/>
					</div>
				);
			}}
		/>
	);
};

ModifyingGroup.propTypes = {
	data: PropTypes.object,
	setTemplateData: PropTypes.func,
};

export default ModifyingGroup;
