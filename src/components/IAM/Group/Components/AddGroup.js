import React, {useCallback, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import IAM_USER_GROUP_TYPE from '../../../../reducers/api/IAM/User/Group/groupType';
import PropTypes from 'prop-types';
import {
	NormalButton,
	TransparentButton,
} from '../../../../styles/components/buttons';
import * as yup from 'yup';
import * as Yup from 'yup';
import {AddPageContent} from '../../../../styles/components/iam/addPage';
import {
	TitleBar,
	TitleBarButtons,
	TitleBarText,
} from '../../../../styles/components/iam/iam';
import IAM_USER_GROUP from '../../../../reducers/api/IAM/User/Group/group';
import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import RHF_Textbox from '../../../RecycleComponents/ReactHookForm/RHF_Textbox';
import RHF_Combobox from '../../../RecycleComponents/ReactHookForm/RHF_Combobox';
import {RowDiv} from '../../../../styles/components/style';

const AddGroup = ({groupMembers}) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const {groupTypes} = useSelector(IAM_USER_GROUP_TYPE.selector);
	const {groups} = useSelector(IAM_USER_GROUP.selector);

	const validationSchema = Yup.object()
		.shape({
			type: yup.string().required('그룹 유형은 필수값입니다.'),
			name: yup.string().required('그룹명은 필수값입니다.'),
		})
		.required();

	const methods = useForm({
		// mode: 'onSubmit', // memo 유효성 검사가 trriger되는 시점 => onChange를 사용하면 바로 검사
		resolver: yupResolver(validationSchema), // 외부 유효성 검사 라이브러리 사용
	});

	const onClickManageGroupType = useCallback(() => {
		history.push('/groups/types');
	}, [history]);

	const onClickCancelAddGroup = useCallback(() => {
		history.push('/groups');
	}, [history]);

	const onSubmitCreateGroup = useCallback(
		(data) => {
			//	console.log(data);
			dispatch(
				IAM_USER_GROUP.asyncAction.createAction({
					userGroupTypeId: data.type,
					parentId: data.parentId,
					name: data.name,
					members: groupMembers,
				}),
			);
		},
		[dispatch, groupMembers],
	);

	useEffect(() => {
		dispatch(
			IAM_USER_GROUP_TYPE.asyncAction.findAllAction({
				range: 'elements=0-50',
			}),
		);
	}, [dispatch]);

	useEffect(() => {
		dispatch(
			IAM_USER_GROUP.asyncAction.findAllAction({
				range: 'elements=0-50',
			}),
		);
	}, [dispatch]);

	return (
		<>
			<TitleBar>
				<TitleBarText>사용자 그룹 이름 지정</TitleBarText>
				<TitleBarButtons>
					<NormalButton onClick={onClickManageGroupType}>
						그룹 유형 관리
					</NormalButton>
					<NormalButton
						type={'button'}
						onClick={methods.handleSubmit((data) =>
							console.log(data),
						)}
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
			</TitleBar>
			<AddPageContent>
				<FormProvider {...methods}>
					<RowDiv>
						<RHF_Combobox
							name={'type'}
							placeholder={'조직'}
							options={groupTypes.map((v) => {
								return {value: v.id, label: v.name};
							})}
						/>
						<RHF_Combobox
							name={'color'}
							placeholder={'상위 그룹선택'}
							options={groups.map((v) => {
								return {value: v.id, label: v.name};
							})}
						/>
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
			</AddPageContent>
		</>
	);
};

AddGroup.propTypes = {
	groupMembers: PropTypes.array.isRequired,
};

export default AddGroup;
