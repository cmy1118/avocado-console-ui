import React, {useCallback, useState} from 'react';
import {SubTitle} from '../../../styles/components/style';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import useInput from '../../../hooks/useInput';
import IAM_USER_GROUP from '../../../reducers/api/IAM/User/Group/group';
import IAM_USER_GROUP_TYPE from '../../../reducers/api/IAM/User/Group/groupType';
import FormSelectBox from '../../RecycleComponents/FormSelectBox';
import Form from '../../RecycleComponents/Form';
import FormTextBox from '../../RecycleComponents/FormTextBox';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {formKeys} from '../../../utils/data';

const AddGroup = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	/***********************************************************************
	 * roberto: userGroup_update
	 *
	 ***********************************************************************/
	const {groups} = useSelector(IAM_USER_GROUP.selector);
	const {groupTypes} = useSelector(IAM_USER_GROUP_TYPE.selector);

	const [groupTypesId, setGroupTypesId] = useState('');
	const [selectedGroupName, setSelectedGroupName] = useState('');
	const [type, setType] = useState([]);
	const [selectedParentGroup, setSelectedParentGroup] = useState('');
	const [groupName, onChangeGroupName, setGroupName] = useInput('test');

	const ComboGroupTypes = (e) => {
		const selectedId = e.target.value.split('**')[0];
		const selected = e.target.value.split('**')[1];
		setGroupTypesId(selectedId);
		setSelectedGroupName(selected);
		// setSelectedParentGroup('');
		setType(groups.filter((x) => x.clientGroupTypeId === selectedId));
	};

	const ComboGroups = (e) => {
		const selected = e.target.value;
		setSelectedParentGroup(selected);
	};

	/***********************************************************************/
	const onClickManageGroupType = useCallback(() => {
		history.push('/groups/types');
	}, [history]);

	const onClickCancelAddGroup = useCallback(() => {
		history.push('/groups');
	}, [history]);

	const onSubmitAddGroup = useCallback((data) => {
		console.log(data);
		// dispatch(
		// 	IAM_USER_GROUP_TYPE.action.addGroupType({
		// 		name: groupName,
		// 		parentId: selectedParentGroup,
		// 		description: null,
		// 	}),
		// );
	}, []);

	const schema = {
		groupType: yup.string().required(),
		groupId: yup.string().required(),
		name: yup.string().max(120).required(),
	};

	const watcher = (data) => {
		setGroupTypesId(data.groupType);
		setType(groups.filter((x) => x.clientGroupTypeId === data.groupType));
	};

	return (
		<>
			<SubTitle>
				<div>사용자 그룹 이름 지정</div>

				<div>
					<button onClick={onClickManageGroupType}>
						그룹 유형 관리
					</button>
					<button form={formKeys.addGroupForm} type={'submit'}>
						그룹 생성
					</button>
					<button onClick={onClickCancelAddGroup}>취소</button>
				</div>
			</SubTitle>

			<Form
				id={formKeys.addGroupForm}
				onSubmit={onSubmitAddGroup}
				schema={schema}
				watcher={watcher}
			>
				{/*예시로 생성한 SelectBox 입니다.*/}
				<FormSelectBox
					placeholder='그룹 유형 선택'
					name={'groupType'}
					options={groupTypes.map((v) => {
						return {value: v.id, name: v.name};
					})}
				/>
				{groupTypesId ? (
					<FormSelectBox
						placeholder={'상위 그룹 선택'}
						name={'groupId'}
						options={type.map((v) => {
							return {value: v.id, name: v.name};
						})}
					/>
				) : (
					''
				)}
				{/*예시로 생성한 SelectBox 입니다.*/}
				<FormTextBox name={'name'} placeholder={'group name'} />
			</Form>
		</>
	);
};

export default AddGroup;
