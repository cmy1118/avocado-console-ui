import React from 'react';
import TemplateElementContainer from '../../TemplateElementContainer';
import TemplateElement from '../../TemplateElement';
import {
	accountNormalization2Options,
	accountStatus2Options,
	groupPrivilegesOptions,
} from '../../../../../../utils/options';
import useRadio from '../../../../../../hooks/useRadio';
import useComboBox from '../../../../../../hooks/useComboBox';
import {RowDiv} from '../../../../../../styles/components/style';

const changeGroup = {
	title: '본인 확인 인증',
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
			options: {
				lock: '잠금',
				delete: '삭제',
				no: '안함',
			},
		},
		groupPrivileges: {
			title: '그룹 권한 처리',
			options: {
				revoke: '회수',
				grant: '부여(변경후 그룹의 권한)',
				remain: '유지(기존 권한 유지)',
			},
		},
		accountNormalization: {
			title: '계정 정상화',
			options: {
				revoke: '회수',
				grant: '부여(변경후 그룹의 권한)',
			},
		},
	},
};

const tempOption = [{key: 'select', label: '선택'}];

/**************************************************
 * ambacc244 - 사용자 계정 처리(그룹 변경) 폼
 **************************************************/
const ChangeGroup = () => {
	const [accountStatus, accountStatusRadioButton] = useRadio({
		name: 'accountStatus',
		options: accountStatus2Options,
	});
	const [groupPrivileges, groupPrivilegesRadioButton] = useRadio({
		name: 'groupPrivileges',
		options: groupPrivilegesOptions,
	});
	const [accountNormalization, accountNormalizationRadioButton] = useRadio({
		name: 'accountNormalization',
		options: accountNormalization2Options,
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

	return (
		<TemplateElementContainer
			title={changeGroup.title}
			description={changeGroup.description}
			render={() => {
				return (
					<div>
						<TemplateElement
							title={changeGroup.contents.controlGroupType.title}
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
							title={changeGroup.contents.accountStatus.title}
							render={accountStatusRadioButton}
						/>
						<TemplateElement
							title={changeGroup.contents.groupPrivileges.title}
							render={groupPrivilegesRadioButton}
						/>
						<TemplateElement
							title={
								changeGroup.contents.accountNormalization.title
							}
							render={accountNormalizationRadioButton}
						/>
					</div>
				);
			}}
		/>
	);
};

export default ChangeGroup;
