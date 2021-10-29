import React, {useCallback, useState} from 'react';
import {SubTitle} from '../../../styles/components/style';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import IAM_USER_GROUP from '../../../reducers/api/IAM/User/Group/group';
import IAM_USER_GROUP_TYPE from '../../../reducers/api/IAM/User/Group/groupType';
import FormComboBox from '../../RecycleComponents/FormComboBox';
import Form from '../../RecycleComponents/Form';
import FormTextBox from '../../RecycleComponents/FormTextBox';
import * as yup from 'yup';
import {formKeys} from '../../../utils/data';
import PropTypes from 'prop-types';
import {
	NormalButton,
	TransparentButton,
} from '../../../styles/components/buttons';
import CURRENT_TARGET from '../../../reducers/currentTarget';
import ComboBox from '../../RecycleComponents/ComboBox';

const AddGroup = ({setIsOpened}) => {
	const history = useHistory();
	const dispatch = useDispatch();
	/***********************************************************************
	 * roberto: userGroup_update
	 *
	 ***********************************************************************/
	const {groups} = useSelector(IAM_USER_GROUP.selector);
	const {groupTypes} = useSelector(IAM_USER_GROUP_TYPE.selector);

	const [groupTypesId, setGroupTypesId] = useState({
		value: null,
		label: '그룹 유형 선택',
	});
	const [groupId, setGroupId] = useState({
		value: null,
		label: '상위 그룹 선택',
	});

	const [groupTypeIsOpened, setGroupTypeIsOpened] = useState(false);
	const [groupIdIsOpened, setGroupIdIsOpened] = useState(false);

	/***********************************************************************/
	const onClickManageGroupType = useCallback(() => {
		history.push('/groups/types');
	}, [history]);

	const onClickCancelAddGroup = useCallback(() => {
		history.push('/groups');
	}, [history]);

	const onSubmitAddGroup = useCallback(
		(data) => {
			console.log(data);
			dispatch(
				CURRENT_TARGET.action.addReadOnlyData({
					title: 'group',
					data: data,
				}),
			);
			setIsOpened(true);
		},
		[dispatch, setIsOpened],
	);

	const schema = {
		groupType: yup.string().required(),
		groupId:
			groupTypesId === 'groupType1'
				? yup.string().required()
				: yup.string(),
		name: yup.string().max(120).required(),
	};

	return (
		<>
			<SubTitle>
				<div>사용자 그룹 이름 지정</div>

				<div>
					<NormalButton onClick={onClickManageGroupType}>
						그룹 유형 관리
					</NormalButton>
					<NormalButton form={formKeys.addGroupForm} type={'submit'}>
						그룹 생성
					</NormalButton>
					<TransparentButton onClick={onClickCancelAddGroup}>
						취소
					</TransparentButton>
				</div>
			</SubTitle>

			<Form
				id={formKeys.addGroupForm}
				onSubmit={onSubmitAddGroup}
				schema={schema}
			>
				<ComboBox
					label={'그룹 유형 선택'}
					name={'groupType'}
					isOpened={groupTypeIsOpened}
					setIsOpened={setGroupTypeIsOpened}
					title={groupTypesId.label}
					value={groupTypesId.value}
					setValue={setGroupTypesId}
					options={groupTypes.map((v) => {
						return {value: v.id, label: v.name};
					})}
					width={'120px'}
				/>
				{groupTypesId.value === 'groupType1' ? (
					<ComboBox
						label={'상위 그룹 선택'}
						name={'groupId'}
						isOpened={groupIdIsOpened}
						setIsOpened={setGroupIdIsOpened}
						title={groupId.label}
						value={groupId.value}
						setValue={setGroupId}
						options={groups
							.filter(
								(x) =>
									x.clientGroupTypeId === groupTypesId.value,
							)
							.map((v) => {
								return {value: v.id, label: v.name};
							})}
						width={'120px'}
					/>
				) : (
					<></>
				)}
				<FormTextBox name={'name'} placeholder={'group name'} />
			</Form>
		</>
	);
};

AddGroup.propTypes = {
	setIsOpened: PropTypes.func.isRequired,
};

export default AddGroup;
