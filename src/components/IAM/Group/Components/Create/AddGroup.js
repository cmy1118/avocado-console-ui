import React, {useCallback, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import IAM_USER_GROUP_TYPE from '../../../../../reducers/api/IAM/User/Group/groupType';
import PropTypes from 'prop-types';
import {
	NormalButton,
	TransparentButton,
} from '../../../../../styles/components/buttons';
import * as yup from 'yup';
import * as Yup from 'yup';
import {
	CreatePageContainer,
	CreatePageContent,
} from '../../../../../styles/components/iam/addPage';
import {
	IamSectionBottomMargin,
	IamSectionTitleBar,
	TitleBarButtons,
	TitleBarText,
} from '../../../../../styles/components/iam/iam';
import IAM_USER_GROUP from '../../../../../reducers/api/IAM/User/Group/group';
import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import RHF_Textbox from '../../../../RecycleComponents/ReactHookForm/RHF_Textbox';
import RHF_Combobox from '../../../../RecycleComponents/ReactHookForm/RHF_Combobox';
import {ColDiv, RowDiv} from '../../../../../styles/components/style';
import useModal from '../../../../../hooks/useModal';
import ParentGroupDialogBox from '../../../../DialogBoxs/Form/ParentGroupDialogBox';
import {getIdFormLocation} from '../../../../../utils/tableDataConverter';
import IAM_ROLES_GRANT_ROLE_GROUP from '../../../../../reducers/api/IAM/User/Role/GrantRole/group';
import IAM_USER_GROUP_TAG from '../../../../../reducers/api/IAM/User/Group/tags';

const AddGroup = ({groupMembers, groupRoles, groupTags}) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [groups, setGroups] = useState([]);
	const [groupTypes, setGroupTypes] = useState([]);
	const [parentGroupId, setParentGroupId] = useState(null);

	console.log(groupMembers);
	console.log(groupRoles);
	console.log(groupTags);

	// 상위그룹 선택하는 모달
	const [ParentGroupModal, showParentGroupModal] = useModal();

	const validationSchema = Yup.object()
		.shape({
			type: yup.string().required('그룹 유형은 필수값입니다.'),
			name: yup.string().required('그룹명은 필수값입니다.'),
			parentGroup: yup.string().required('상위 그룹은 필수값입니다.'),
		})
		.required();

	const methods = useForm({
		// mode: 'onSubmit', // memo 유효성 검사가 trriger되는 시점 => onChange를 사용하면 바로 검사
		mode: 'onChange',
		resolver: yupResolver(validationSchema), // 외부 유효성 검사 라이브러리 사용
	});

	// 그룹의 타입!!
	const type = methods.watch('type');

	const onClickManageGroupType = useCallback(() => {
		history.push('/groups/types');
	}, [history]);

	const onClickCancelAddGroup = useCallback(() => {
		history.push('/groups');
	}, [history]);

	const onSubmitCreateGroup = useCallback(
		async (data) => {
			//	console.log(data);
			try {
				if (parentGroupId) {
					const response = await dispatch(
						IAM_USER_GROUP.asyncAction.createAction({
							userGroupTypeId: data.type,
							parentId: parentGroupId,
							name: data.name,
							members: groupMembers,
						}),
					).unwrap();

					const groupId = getIdFormLocation(
						response.headers.location,
					);

					await dispatch(
						IAM_ROLES_GRANT_ROLE_GROUP.asyncAction.grantAction({
							id: groupId,
							roleId: groupRoles,
						}),
					);

					for await (let v of groupTags) {
						await dispatch(
							IAM_USER_GROUP_TAG.asyncAction.createAction({
								groupId: groupId,
								name: v.name,
								value: v.value,
							}),
						);
					}
				}
			} catch (err) {
				console.error(err);
			}
		},
		[dispatch, groupMembers, groupRoles, groupTags, parentGroupId],
	);

	const handleFocus = useCallback(() => {
		showParentGroupModal({
			show: true,
			element: (
				<ParentGroupDialogBox
					groups={groups}
					{...methods}
					name={'parentGroup'}
					showParentGroupModal={showParentGroupModal}
					setParentGroupId={setParentGroupId}
				/>
			),
		});
	}, [groups, methods, showParentGroupModal]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await dispatch(
					IAM_USER_GROUP_TYPE.asyncAction.findAllAction({
						range: 'elements=0-50',
					}),
				);
				console.log(res.payload.data);
				setGroupTypes(res.payload.data);
			} catch (err) {
				console.log('error => ', err);
				setGroupTypes([]);
			}
		};
		fetchData();

		// dispatch(
		// 	IAM_USER_GROUP_TYPE.asyncAction.findAllAction({
		// 		range: 'elements=0-50',
		// 	}),
		// );
	}, [dispatch]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await dispatch(
					IAM_USER_GROUP.asyncAction.findAllAction({
						range: 'elements=0-50',
						groupTypeId: type,
					}),
				);
				console.log(res.payload.data);
				setGroups(res.payload.data);
			} catch (err) {
				console.log('error => ', err);
				setGroups([]);
			}
		};
		type && fetchData();
	}, [dispatch, methods, type]);

	return (
		<IamSectionBottomMargin>
			<IamSectionTitleBar>
				<TitleBarText>사용자 그룹 이름 지정</TitleBarText>
				<TitleBarButtons>
					<NormalButton onClick={onClickManageGroupType}>
						그룹 유형 관리
					</NormalButton>
					<NormalButton
						type={'button'}
						onClick={methods.handleSubmit(onSubmitCreateGroup)}
					>
						그룹 생성
					</NormalButton>
					<TransparentButton
						margin='0px 0px 0px 5px'
						onClick={onClickCancelAddGroup}
					>
						취소
					</TransparentButton>
				</TitleBarButtons>
			</IamSectionTitleBar>
			<CreatePageContainer>
				<CreatePageContent>
					<FormProvider {...methods}>
						<RowDiv>
							<RHF_Combobox
								name={'type'}
								placeholder={'조직'}
								options={groupTypes.map((v) => {
									return {value: v.id, label: v.name};
								})}
							/>

							{type && (
								<ColDiv>
									<RHF_Textbox
										name={'parentGroup'}
										placeholder={'상위 그룹선택'}
										onFocus={handleFocus}
									/>
									<ParentGroupModal
										hiddenFooter
										width={300}
									/>
								</ColDiv>
							)}
						</RowDiv>
						<RowDiv alignItems={'center'}>
							<RHF_Textbox
								name={'name'}
								placeholder={'그룹 이름작성'}
								description={
									'최대 120자, 영문 숫자 사용 가능합니다.'
								}
							/>
						</RowDiv>
					</FormProvider>
				</CreatePageContent>
			</CreatePageContainer>
		</IamSectionBottomMargin>
	);
};

AddGroup.propTypes = {
	groupMembers: PropTypes.array.isRequired,
	groupRoles: PropTypes.array.isRequired,
	groupTags: PropTypes.array.isRequired,
};

export default AddGroup;
