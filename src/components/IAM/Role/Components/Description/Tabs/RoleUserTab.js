import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {NormalBorderButton, NormalButton,} from '../../../../../../styles/components/buttons';
import Table from '../../../../../Table/Table';
import {DRAGGABLE_KEY, tableKeys} from '../../../../../../Constants/Table/keys';
import {tableColumns} from '../../../../../../Constants/Table/columns';
import DragContainer from '../../../../../Table/DragContainer';
import {TableTitle} from '../../../../../../styles/components/table';
import FoldableContainer from '../../../../../Table/Options/FoldableContainer';
import TableOptionText from '../../../../../Table/Options/TableOptionText';
import {TabContentContainer} from '../../../../../../styles/components/iam/iamTab';
import {TitleBarButtons} from '../../../../../../styles/components/iam/iam';
import useSelectColumn from '../../../../../../hooks/table/useSelectColumn';
import IAM_ROLES_GRANT_ROLE_USER from '../../../../../../reducers/api/IAM/User/Role/GrantRole/user';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import useModal from "../../../../../../hooks/useModal";

const roleUserTab = {
	include: {title: '이 역할의 사용자 : ', button: {delete: '연결 해제'}},
	exclude: {
		title: '이 역할의 다른 사용자 : ',
		button: {create: '사용자 생성', add: '사용자 연결'},
	},
};
// IAM_ROLES_GRANT_ROLE_USER
const RoleUserTab = ({roleId, isSummaryOpened,setGrantUser,grantUser,validRestrict}) => {
	const dispatch = useDispatch();
	const history = useHistory();

	const [includeSelect, includeColumns] = useSelectColumn(
		tableColumns[tableKeys.roles.summary.tabs.users.include],
	);
	const [excludeSelect, excludeColumns] = useSelectColumn(
		tableColumns[tableKeys.roles.summary.tabs.users.exclude],
	);
	const [selected, setSelected] = useState({});
	const [includedDataIds, setIncludedDataIds] = useState([]);
	const [excludedDataIds, setExcludedDataIds] = useState([]);
	const [MaxRestrictModal, showMaxRestrictModal] = useModal();

/*******************************************************************************
 *  역할에 대한 사용자 데이터 추가시 데이터 처리에 따른 모달기능
 *******************************************************************************/
	const isValidRestrict = useCallback((data) => {
		const maxRestrict=10;
		const validText=(data)=>{
			let isValid;
			if (data=== "true"){
				isValid = data
			}else if (data === "false"){
				isValid = data
			}else if(!validRestrict){
				isValid ='inputValid';
			}else if (data && data.length && data.length + includedDataIds.length > maxRestrict ) {
				isValid = 'maxRestrict';
			}else if (data && data.length && data.length + includedDataIds.length > validRestrict ) {
				isValid = 'isRestrict';
			}
			switch (isValid) {
				//사용자 상세
				case 'true':
					return `추가 되었습니다`;
				case 'false':
					return `추가 오류`;
				case 'inputValid':
					return  `올바른 부여 제한수를 입력해 주세요`;
				case 'maxRestrict':
					return ` 권한 부여 최대수를 초과 하였습니다`;
				case 'isRestrict':
					return ` 입력한 부여 제한수를 초과할수 없습니다 (입력 부여 권환 횟수:${validRestrict})`;
				default:
					return `예상치 못한 오류 발생`;
			}
		};
				showMaxRestrictModal({
			show: true,
			title: '',
			onSubmitCallback: () => console.log('모달 on'),
			onCloseCallback: () => console.log('모달 off'),
			element:validText(data),
		});

	}, [includedDataIds.length, showMaxRestrictModal, validRestrict]);

	//includedData : 이 역할을 할당받은 사용자
	const includedData = useMemo(() => {
		return includedDataIds
			? includedDataIds.map((v) => ({
					...v,
					id: v.userId ? v.userId : '',
					name: v.userName ? v.userName : '',
					createdTime: v.createdTime ? v.createdTime : '',
					grantUser: v.grantedCreateUserId
						? `${v.grantedCreateUserId}(${v.grantedCreateUserName})`
						: '',
					numberOfGroups: v.groupCount ? v.groupCount : '',
					lastConsoleLogin: v.lastConsoleLogin
						? v.lastConsoleLogin
						: '',
					[DRAGGABLE_KEY]: v.userUid,
			  }))
			: [];
	}, [includedDataIds]);
	//excludedData : 이 역할을 할당받지 않은 사용자
	const excludedData = useMemo(() => {
		return excludedDataIds
			? excludedDataIds.map((v) => ({
					...v,
					name: v.userName ? v.userName : '',
					createdTime: v.createdTime ? v.createdTime : '',
					grantUser: v.grantedCreateUserId
						? `${v.grantedCreateUserId}(${v.grantedCreateUserName})`
						: '',
					numberOfGroups: v.groupCount ? v.groupCount : '',
					lastConsoleLogin: v.lastConsoleLogin
						? v.lastConsoleLogin
						: '',
					[DRAGGABLE_KEY]: v.userUid,
			  }))
			: [];
	}, [excludedDataIds]);

	const onClickDeleteData = useCallback(
		async (data) => {
			try {
				if (data.length) {
					await Promise.all([
						data.forEach((userUid) => {
							dispatch(
								IAM_ROLES_GRANT_ROLE_USER.asyncAction.revokeAction(
									{
										roleIds: [roleId],
										userUid: userUid,
									},
								),
							).unwrap();
						}),
					]);
					await setIncludedDataIds(
						includedDataIds.filter(
							(v) => !data.includes(v.userUid),
						),
					);
					await setExcludedDataIds([
						...includedDataIds.filter((v) =>
							data.includes(v.userUid),
						),
						...excludedData,
					]);
					await setGrantUser(includedDataIds.length - data.length)
					await alert('삭제 완료');
				}
			} catch (err) {
				alert('삭제 오류');
				console.log(err);
			}
		},
		[dispatch, excludedData, includedDataIds, roleId],
	);

	const onClickAddData = useCallback(
		async (data) => {
			try {
				if (validRestrict && data && data.length && data.length + includedDataIds.length <= validRestrict) {
					await Promise.all([
						data.forEach((userUid) => {
							dispatch(
								IAM_ROLES_GRANT_ROLE_USER.asyncAction.grantAction(
									{
										roleIds: [roleId],
										userUid: userUid,
									},
								),
							).unwrap();
						}),
					]);
					await setIncludedDataIds([
						...excludedDataIds.filter((v) =>
							data.includes(v.userUid),
						),
						...includedDataIds,
					]);
					await setExcludedDataIds(
						excludedDataIds.filter(
							(v) => !data.includes(v.userUid),
						),
					);
					await setGrantUser(data.length + includedDataIds.length)
					await isValidRestrict('true');
				}else{
					isValidRestrict(data);
				}
			} catch (err) {
				alert('추가 오류');
				isValidRestrict('false');
				console.log(err);
			}
		},
		[includedDataIds, validRestrict, excludedDataIds, setGrantUser, isValidRestrict, dispatch, roleId],
	);

	const getApi = useCallback(async () => {
		try {
			//포함
			const includeData = await dispatch(
				IAM_ROLES_GRANT_ROLE_USER.asyncAction.findUsersByIdAction({
					roleId: roleId,
					range: `elements=0-50`,
					// range: page[tableKeys.users.summary.tabs.groups.include],
				}),
			).unwrap();
			//포함안함
			const excludeData = await dispatch(
				IAM_ROLES_GRANT_ROLE_USER.asyncAction.findUsersByIdAction({
					roleId: roleId,
					exclude: true,
					range: `elements=0-50`,
					// range: page[tableKeys.users.summary.tabs.groups.include],
				}),
			).unwrap();
			//api 요청 데이터 (포함/비포함)테이블 삽입
			await setIncludedDataIds(includeData);
			await setExcludedDataIds(excludeData);
			//부여제한 초기화 
			await setGrantUser(includeData.length?includeData.length:0)
		} catch (err) {
			alert('조회 오류');
			console.log(err);
		}
	}, [dispatch, roleId, setGrantUser]);

	//테이블 데이터 api 호출 (포함/비포함)
	useEffect(() => {
		if (!isSummaryOpened) {
			getApi();
		}
	}, [getApi, isSummaryOpened]);

	useEffect(() => {
		setSelected({
			[tableKeys.roles.summary.tabs.users.include]: includeSelect,
			[tableKeys.roles.summary.tabs.users.exclude]: excludeSelect,
		});
	}, [excludeSelect, includeSelect]);


	return (
		<TabContentContainer>
			<TableTitle>
				{roleUserTab.include.title}
				{includedData.length}
				<NormalBorderButton
					margin={'0px 0px 0px 5px'}
					onClick={() =>
						onClickDeleteData(includeSelect.map((v) => v.userUid))
					}
				>
					{roleUserTab.include.button.delete}
				</NormalBorderButton>
			</TableTitle>
			<DragContainer
				selected={selected}
				data={includedDataIds}
				setData={setIncludedDataIds}
				includedKey={tableKeys.roles.summary.tabs.users.include}
				excludedData={excludedData}
				includedData={includedData}
				joinFunction={onClickAddData}
				disjointFunction={onClickDeleteData}
			>
				<Table
					isDraggable
					data={includedData}
					tableKey={tableKeys.roles.summary.tabs.users.include}
					columns={includeColumns}
					isPaginable
					isSearchable
					isSearchFilterable
					isColumnFilterable
				/>
				<MaxRestrictModal />
				<FoldableContainer
					title={roleUserTab.include.title + excludedData.length}
					buttons={(isDisabled) => (
						<TitleBarButtons>
							<NormalButton
								disabled={isDisabled}
								onClick={() => history.push('/users/add')}
							>
								{roleUserTab.exclude.button.create}
							</NormalButton>
							<NormalButton
								margin={'0px 0px 0px 5px'}
								disabled={isDisabled}
								onClick={() =>
									onClickAddData(
										excludeSelect.map((v) => v.userUid),
									)
								}
							>
								{roleUserTab.exclude.button.add}
							</NormalButton>
						</TitleBarButtons>
					)}
				>
					<TableOptionText data={'usersRoles'} />
					<Table
						isDraggable
						data={excludedData}
						tableKey={tableKeys.roles.summary.tabs.users.exclude}
						columns={excludeColumns}
						isPaginable
						isSearchable
						isSearchFilterable
						isColumnFilterable
					/>
				</FoldableContainer>
			</DragContainer>
		</TabContentContainer>
	);
};

RoleUserTab.propTypes = {
	roleId: PropTypes.string.isRequired,
	isFold: PropTypes.object,
	setIsFold: PropTypes.func,
	space: PropTypes.string,
	isSummaryOpened: PropTypes.bool,
	grantUser: PropTypes.number,
	setGrantUser: PropTypes.func,
	validRestrict: PropTypes.string,

};

export default RoleUserTab;
