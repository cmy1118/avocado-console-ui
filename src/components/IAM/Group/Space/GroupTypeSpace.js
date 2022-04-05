import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {useHistory} from 'react-router-dom';
import IAM_USER_GROUP from '../../../../reducers/api/IAM/User/Group/group';
import IAM_USER_GROUP_TYPE from '../../../../reducers/api/IAM/User/Group/groupType';
import Table from '../../../Table/Table';
import {DRAGGABLE_KEY, tableKeys} from '../../../../Constants/Table/keys';
import {tableColumns} from '../../../../Constants/Table/columns';
import {
	NormalButton,
	TransparentButton,
} from '../../../../styles/components/buttons';
import TableOptionText from '../../../Table/Options/TableOptionText';
import {
	IamContainer,
	TitleBar,
	TitleBarButtons,
} from '../../../../styles/components/iam/iam';
import CurrentPathBar from '../../../Header/CurrentPathBar';
import useSelectColumn from '../../../../hooks/table/useSelectColumn';

const paths = [
	{url: '/iam', label: 'IAM'},
	{url: '/groups', label: '사용자 그룹'},
	{url: '/groups/types', label: '그룹 유형 관리'},
];

const GroupTypeSpace = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [select, columns] = useSelectColumn(
		tableColumns[tableKeys.groups.type],
	);
	const {groups} = useSelector(IAM_USER_GROUP.selector);
	const {groupTypes} = useSelector(IAM_USER_GROUP_TYPE.selector);
	const [initialGroupTypes, setInitialGroupTypes] = useState([]);
	console.log('groups => ', groups);
	console.log('groupTypes => ', groupTypes);
	const [data, setData] = useState(groupTypes);
	const tableData = useMemo(
		() =>
			data.map((v) => ({
				...v,
				[DRAGGABLE_KEY]: v.id,
			})),
		[data],
	);

	const onClickAddGroups = useCallback(() => {
		history.push('/groups/add');
	}, [history]);

	const onClickOpenAddGroupTypeDialogBox = useCallback(() => {
		setData([
			...data,
			{
				id: tableKeys.groups.type + data.length,
				[DRAGGABLE_KEY]: tableKeys.groups.type + data.length,
				name: '',
				numberOfGroups: 0,
				description: '',
				createdTime: new Date().toLocaleString(),
				new: true,
			},
		]);
	}, [data]);

	const onClickSaveGroupTypes = useCallback(() => {
		data.forEach((v) => {
			//	console.log(v);
			if (v.new) {
				console.log(v);
				dispatch(
					IAM_USER_GROUP_TYPE.asyncAction.createAction({
						name: v.name,
						description: v.description,
					}),
				);
			} else {
				if (
					JSON.stringify(
						initialGroupTypes.find((x) => x.id === v.id),
					) !== JSON.stringify(v)
				) {
					dispatch(
						IAM_USER_GROUP_TYPE.asyncAction.updateAction({
							id: v.id,
							name: v.name,
							description: v.description,
						}),
					);
				}
			}
		});
	}, [data, dispatch, initialGroupTypes]);

	const onClickDeleteGroupTypes = useCallback(() => {
		//	console.log(select);
		if (select.length) {
			select.forEach((v) => {
				dispatch(
					IAM_USER_GROUP_TYPE.asyncAction.deleteAction({
						id: v.id,
					}),
				);
			});
		} else {
			alert('선택된 값이 없습니다.');
		}
	}, [dispatch, select]);

	useEffect(() => {
		dispatch(
			IAM_USER_GROUP_TYPE.asyncAction.findAllAction({
				range: 'elements=0-50',
			}),
		);
	}, [dispatch]);
	//
	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		try {
	// 			const res = await dispatch(
	// 				IAM_USER_GROUP_TYPE.asyncAction.findAllAction({
	// 					range: 'elements=0-50',
	// 				}),
	// 			);
	// 			console.log(res);
	// 		} catch (err) {
	// 			console.log('error => ', err);
	// 		}
	// 	};
	// 	fetchData();
	// }, [dispatch]);

	useEffect(() => {
		if (groupTypes) {
			setData(
				groupTypes.map((v) => ({
					...v,
				})),
			);
			setInitialGroupTypes(
				groupTypes.map((v) => ({
					...v,
				})),
			);
		}
	}, [groupTypes]);

	return (
		<IamContainer>
			<CurrentPathBar paths={paths} />

			<TitleBar>
				<div>그룹 유형 관리</div>
				<TitleBarButtons>
					<NormalButton onClick={onClickOpenAddGroupTypeDialogBox}>
						그룹유형 추가 생성
					</NormalButton>
					<NormalButton onClick={onClickSaveGroupTypes}>
						그룹유형 저장
					</NormalButton>
					<TransparentButton onClick={onClickDeleteGroupTypes}>
						그룹유형 삭제
					</TransparentButton>
					<TransparentButton onClick={onClickAddGroups}>
						취소
					</TransparentButton>
				</TitleBarButtons>
			</TitleBar>

			<TableOptionText data={'groupsType'} />
			<Table
				tableKey={tableKeys.groups.type}
				columns={columns}
				data={tableData}
				setData={setData}
			/>
		</IamContainer>
	);
};

export default GroupTypeSpace;
