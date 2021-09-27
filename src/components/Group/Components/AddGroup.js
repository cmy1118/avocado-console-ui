import React, {useCallback, useState} from 'react';
import {SubTitle} from '../../../styles/components/style';
import {useHistory} from 'react-router-dom';
import {Form} from '../../../styles/components/form';
import {usersAction} from '../../../reducers/users';
import {useDispatch, useSelector} from 'react-redux';
import {groupsSelector, groupsAction} from '../../../reducers/groups';
import useInput from '../../../hooks/useInput';

const AddGroup = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	/***********************************************************************
	 * roberto: userGroup_update
	 *
	 ***********************************************************************/
	const {groupTypes, groups} = useSelector(groupsSelector.all);

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
		setSelectedParentGroup('');
		setType(groups.filter((x) => x.clientGroupTypeId == selectedId));
	};

	const ComboGroups = (e) => {
		const selected = e.target.value;
		setSelectedParentGroup(selected);
	};

	/***********************************************************************/
	const onClickManageGroupType = useCallback(() => {
		history.push('/group/type');
	}, [history]);

	const onClickCancelAddGroup = useCallback(() => {
		history.push('/group');
	}, [history]);

	const onSubmitAddGroup = useCallback(
		(e) => {
			e.preventDefault();

			dispatch(
				groupsAction.addGroupType({
					name: groupName,
					parentId: selectedParentGroup,
					description: null,
				}),
			);
		},
		[dispatch, groupName, selectedParentGroup],
	);

	return (
		<>
			<SubTitle>
				<div>사용자 그룹 이름 지정</div>

				<div>
					<button onClick={onClickManageGroupType}>
						그룹 유형 관리
					</button>
					<button form={'add-group-form'} type={'submit'}>
						그룹 생성
					</button>
					<button onClick={onClickCancelAddGroup}>취소</button>
				</div>
			</SubTitle>

			<div className='selectOption'>
				<select onChange={ComboGroupTypes}>
					<option value=''>그룹유형선택</option>
					{groupTypes.map((item) => (
						<option
							key={item.id}
							value={item.id + '**' + item.name}
						>
							{item.name}
						</option>
					))}
				</select>
				{groupTypesId ? (
					<select onChange={ComboGroups}>
						<option value=''>상위그룹 선택</option>
						{type.map((item) => (
							<option key={item.id}>{item.name}</option>
						))}
					</select>
				) : (
					''
				)}
			</div>

			<Form id={'add-group-form'} onSubmit={onSubmitAddGroup}>
				<input
					type='text'
					// value={id}
					onChange={onChangeGroupName}
					placeholder={'그룹 명'}
					required
				/>
			</Form>
		</>
	);
};

export default AddGroup;
