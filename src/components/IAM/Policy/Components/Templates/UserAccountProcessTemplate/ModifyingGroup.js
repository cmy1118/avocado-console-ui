import React, {useEffect} from 'react';
import TemplateElementContainer from '../../TemplateElementContainer';
import TemplateElement from '../../TemplateElement';
import {
	accountStatus2Options,
	groupPrivilegesOptions,
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
		accountStatus: {
			title: '계정 처리 방법',
		},
		groupPrivileges: {
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
	const [
		accountStatus,
		accountStatusRadioButton,
		setAccountStatus,
	] = useRadio({
		name: 'accountStatus',
		options: accountStatus2Options,
	});
	const [
		groupPrivileges,
		groupPrivilegesRadioButton,
		setGroupPrivileges,
	] = useRadio({
		name: 'groupPrivileges',
		options: groupPrivilegesOptions,
	});

	const [group1, group1ComboBox] = useComboBox({
		options: tempOption,
	});
	const [group2, group2ComboBox] = useComboBox({
		options: tempOption,
	});
	const [group3, group3ComboBox] = useComboBox({
		options: tempOption,
	});

	/**************************************************
	 * ambacc244 - 서버로 부터 받아온 default 값 세팅
	 **************************************************/
	useEffect(() => {
		if (data?.attribute?.blockingType) {
			setAccountStatus(data.attribute.blockingType);
		}
		if (data?.attribute?.unconnectedDays) {
			setGroupPrivileges(data.attribute.unconnectedDays);
		}
	}, [data]);

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
							title={modifyingGroup.contents.accountStatus.title}
							render={accountStatusRadioButton}
						/>
						<TemplateElement
							title={
								modifyingGroup.contents.groupPrivileges.title
							}
							render={groupPrivilegesRadioButton}
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