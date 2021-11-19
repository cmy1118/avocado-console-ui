import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {useHistory} from 'react-router-dom';
import IAM_USER_GROUP from '../../../../reducers/api/IAM/User/Group/group';
import IAM_USER_GROUP_TYPE from '../../../../reducers/api/IAM/User/Group/groupType';
import Table from '../../../Table/Table';
import {tableKeys} from '../../../../Constants/Table/keys';
import {tableColumns} from '../../../../Constants/Table/columns';
import {
	NormalButton,
	TransparentButton,
} from '../../../../styles/components/buttons';
import {
	CurrentPathBarLink,
	CurrentPathBar,
	NextPath,
} from '../../../../styles/components/currentPathBar';
import TableOptionText from '../../../Table/Options/TableOptionText';
import TableContainer from '../../../Table/TableContainer';
import {
	IamContainer,
	TitleBar,
	TitleBarButtons,
} from '../../../../styles/components/iam/iam';

const GroupTypeSpace = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const {groups} = useSelector(IAM_USER_GROUP.selector);
	const {groupTypes} = useSelector(IAM_USER_GROUP_TYPE.selector);
	const [initialGroupTypes, setInitialGroupTypes] = useState([]);
	const [select, setSelect] = useState({});
	const [data, setData] = useState(
		groupTypes.map((v) => ({
			...v,
		})),
	);

	const onClickAddGroups = useCallback(() => {
		history.push('/groups/add');
	}, [history]);

	const onClickOpenAddGroupTypeDialogBox = useCallback(() => {
		setData([
			...data,
			{
				name: '',
				numberOfGroups: 0,
				description: '',
				creationDate: new Date().toLocaleString(),
				new: true,
			},
		]);
	}, [data]);

	const onClickSaveGroupTypes = useCallback(() => {
		data.forEach((v) => {
			console.log(v);
			if (v.new) {
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
		console.log(select);
		if (select[tableKeys.groups.type][0]) {
			select[tableKeys.groups.type].forEach((v) => {
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
			<CurrentPathBar>
				<CurrentPathBarLink to='/iam'>IAM</CurrentPathBarLink>
				<NextPath>{' > '}</NextPath>
				<CurrentPathBarLink to='/groups'>
					사용자 그룹
				</CurrentPathBarLink>
				<NextPath>{' > '}</NextPath>
				<CurrentPathBarLink to='/groups/types'>
					그룹 유형 관리
				</CurrentPathBarLink>
			</CurrentPathBar>

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
			<TableContainer
				tableKey={tableKeys.groups.type}
				columns={tableColumns[tableKeys.groups.type]}
				data={data}
				setData={setData}
			>
				<Table setSelect={setSelect} />
			</TableContainer>
		</IamContainer>
	);
};

export default GroupTypeSpace;
