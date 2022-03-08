import React, {useEffect} from 'react';
import TemplateElementContainer from '../../TemplateElementContainer';
import TemplateElement from '../../TemplateElement';
import {
	accountBlockingType2Options,
	groupPermissionTypeOptions,
} from '../../../../../../utils/options';
import useRadio from '../../../../../../hooks/useRadio';
import useComboBox from '../../../../../../hooks/useComboBox';
import {RowDiv} from '../../../../../../styles/components/style';
import PropTypes from 'prop-types';

const modifyingGroup = {
	title: '그룹 변경',
	description: [
		'사용자의 그룹이 변경으로 인한 권한 변경을 제어하기 위한 정책을 설정합니다.',
		'그룹 유형은 최대 3개까지만 설정 가능합니다.',
	],
	contents: {
		controlGroupType: {
			title: '제어 그룹 유형',
			placeholder: '선택',
		},
		blockingType: {
			title: '계정 처리 방법',
		},
		groupPermissionType: {
			title: '그룹 권한 처리',
		},
		accountNormalization: {
			title: '계정 정상화',
			message: '관리자 해제',
		},
	},
};

const tempOption = [{key: 'select', label: '선택'}];

/**************************************************
 * ambacc244 - 사용자 계정 처리(그룹 변경) 폼
 **************************************************/
const ModifyingGroup = ({data}) => {
	//group1: 제어 그룹 유형1
	const [group1, group1ComboBox] = useComboBox({
		options: tempOption,
	});
	//group2: 제어 그룹 유형2
	const [group2, group2ComboBox] = useComboBox({
		options: tempOption,
	});
	//group3: 제어 그룹 유형3
	const [group3, group3ComboBox] = useComboBox({
		options: tempOption,
	});
	//blockingType: 계정 처리 방법
	const [blockingType, blockingTypeRadioButton, setBlockingType] = useRadio({
		name: 'modifyingGroupBlockingType',
		options: accountBlockingType2Options,
	});
	//groupPermissionType: 그룹 권한 처리
	const [
		groupPermissionType,
		groupPermissionTypeRadioButton,
		setGroupPermissionType,
	] = useRadio({
		name: 'groupPermissionType',
		options: groupPermissionTypeOptions,
	});

	/**************************************************
	 * ambacc244 - 서버로 부터 받아온 default 값 세팅
	 **************************************************/
	useEffect(() => {
		//TODO: 제어 그룹 유형

		//계정 처리 방법 default value 있음
		if (data?.blockingType) {
			//계정 처리 방법 세팅
			setBlockingType(data.blockingType);
		}
		//그룹 권한 처리 default value 있음
		if (data?.permissionType) {
			//그룹 권한 처리 세팅
			setGroupPermissionType(data?.permissionType);
		}
	}, [data, setBlockingType, setGroupPermissionType]);

	return (
		<TemplateElementContainer
			title={modifyingGroup.title}
			description={modifyingGroup.description}
			render={() => {
				return (
					<div>
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
							title={
								modifyingGroup.contents.groupPermissionType
									.title
							}
							render={groupPermissionTypeRadioButton}
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
};

export default ModifyingGroup;
