import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {useHistory} from 'react-router-dom';
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
	// const {groups} = useSelector(IAM_USER_GROUP.selector);
	// const {groupTypes} = useSelector(IAM_USER_GROUP_TYPE.selector);
	const [initialGroupTypes, setInitialGroupTypes] = useState([]);
	const [deleteList, setDeleteList] = useState([]);

	const [data, setData] = useState([]);
	const tableData = useMemo(
		() =>
			data.map((v) => ({
				...v,
				createdTime: v.createdTag.createdTime,
				[DRAGGABLE_KEY]: v.id,
			})),
		[data],
	);

	const [select, columns] = useSelectColumn(
		tableColumns[tableKeys.groups.type],
		tableData,
	);

	const onClickAddGroups = useCallback(() => {
		history.push('/groups/add');
	}, [history]);

	const onClickOpenAddGroupTypeDialogBox = useCallback(() => {
		const now = new Date(); // Fri Feb 20 2015 19:29:31 GMT+0530 (India Standard Time)
		const isoDate = new Date(
			now.getTime() - now.getTimezoneOffset() * 60000,
		).toISOString(); //OUTPUT : 2015-02-20T19:29:31.238Z

		setData([
			...data,
			{
				id: tableKeys.groups.type + data.length,
				[DRAGGABLE_KEY]: tableKeys.groups.type + data.length,
				name: '',
				groupCount: 0,
				description: '',
				createdTag: {createdTime: isoDate},
				new: true,
			},
		]);
	}, [data]);

	const fetchData = useCallback(async () => {
		try {
			const res = await dispatch(
				IAM_USER_GROUP_TYPE.asyncAction.findAllAction({
					range: 'elements=0-50',
				}),
			).unwrap();
			console.log(res);
			setData(res.data);
			setInitialGroupTypes(res.data);
		} catch (err) {
			console.error(err);
		}
	}, [dispatch]);

	const onClickSaveGroupTypes = useCallback(async () => {
		for await (let v of data) {
			if (v.new) {
				console.log(v);
				await dispatch(
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
					await dispatch(
						IAM_USER_GROUP_TYPE.asyncAction.updateAction({
							id: v.id,
							name: v.name,
							description: v.description,
						}),
					);
				}
			}
		}
		for await (let v of deleteList) {
			dispatch(
				IAM_USER_GROUP_TYPE.asyncAction.deleteAction({
					id: v.id,
				}),
			);
		}

		await setData((prev) =>
			prev.map((v) => {
				delete v.new;
				return v;
			}),
		);

		await setDeleteList([]);
		await fetchData();
	}, [data, deleteList, dispatch, fetchData, initialGroupTypes]);

	const onClickDeleteGroupTypes = useCallback(async () => {
		//	console.log(select);
		if (select.length) {
			for await (let v of select) {
				setData((prev) => prev.filter((x) => x.id !== v.id));
			}
			setDeleteList((prev) => [...prev, ...select.filter((v) => !v.new)]);
		} else {
			alert('선택된 값이 없습니다.');
		}
	}, [select]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

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

	// useEffect(() => {
	// 	console.log(groupTypes);
	// 	if (groupTypes) {
	// 		setData(
	// 			groupTypes.map((v) => ({
	// 				...v,
	// 			})),
	// 		);
	// 		setInitialGroupTypes(
	// 			groupTypes.map((v) => ({
	// 				...v,
	// 			})),
	// 		);
	// 	}
	// }, [groupTypes]);

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
