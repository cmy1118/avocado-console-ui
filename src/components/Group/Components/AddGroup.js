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

const AddGroup = ({setIsOpened}) => {
	const history = useHistory();
	const dispatch = useDispatch();
	/***********************************************************************
	 * roberto: userGroup_update
	 *
	 ***********************************************************************/
	const {groups} = useSelector(IAM_USER_GROUP.selector);
	const {groupTypes} = useSelector(IAM_USER_GROUP_TYPE.selector);

	const [groupTypesId, setGroupTypesId] = useState('');

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
			console.log(data);
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
				{/*예시로 생성한 SelectBox 입니다.*/}
				<FormComboBox
					placeholder='그룹 유형 선택'
					name={'groupType'}
					options={groupTypes.map((v) => {
						return {value: v.id, name: v.name};
					})}
					setValue={setGroupTypesId}
				/>
				{groupTypesId === 'groupType1' ? (
					<FormComboBox
						placeholder={'상위 그룹 선택'}
						name={'groupId'}
						options={groups
							.filter((x) => x.clientGroupTypeId === groupTypesId)
							.map((v) => {
								return {value: v.id, name: v.name};
							})}
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
