import React, {useCallback, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import IAM_USER_GROUP_TYPE from '../../../../../reducers/api/IAM/User/Group/groupType';
import PropTypes from 'prop-types';
import {
	NormalButton,
	TransparentButton,
} from '../../../../../styles/components/buttons';
import {ColDiv, RowDiv} from '../../../../../styles/components/style';
import {
	TitleBar,
	TitleBarButtons,
	TitleBarText,
} from '../../../../../styles/components/iam/iam';
import IAM_USER_GROUP from '../../../../../reducers/api/IAM/User/Group/group';
import TemplateElement from '../../../Policy/Components/Templates/Layout/TemplateElement';
import useRadio from '../../../../../hooks/useRadio';
import {usageOptions} from '../../../../../utils/policy/options';
import useTextBox from '../../../../../hooks/useTextBox';
import {FormProvider, useForm} from 'react-hook-form';
import RHF_Textbox from '../../../../RecycleComponents/ReactHookForm/RHF_Textbox';
import RHF_Radio from '../../../../RecycleComponents/ReactHookForm/RHF_Radio';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {CreatePageContent} from '../../../../../styles/components/iam/addPage';

const AddRole = ({values, groupMembers, setValues}) => {
	const dispatch = useDispatch();
	const history = useHistory();

	const constants = {
		title: '사용자 ID 패턴',
		description: [
			'사용자 ID에 특정 패턴을 설정합니다.',
			'패턴 최대 길이는 3~10자 로 제한 하며 특수문자 사용은 할수 없습니다',
		],
		contents: {
			usage: {
				title: '부여 제한',
				options: {use: '제한 없음', nonuse: '제한 함'},
			},
			patternInput: {
				title: '',
			},
		},
	};

	const [usage, usageRadioButton] = useRadio({
		name: 'usage',
		options: usageOptions,
	});

	const [patternInput, patternInputTextBox] = useTextBox({
		name: 'patternInput',
	});

	const validationSchema = yup
		.object()
		.shape({
			name: yup.string().required('역할 이름은 필수입니다.'),
			description: yup.string().required('역할 설명은 필수값입니다.'),
			grantCount: yup
				.number()
				.max(10, '10 이하로 작성 가능합니다.')
				.nullable(),
		})
		.required();

	const onClickCancelAddGroup = useCallback(() => {
		history.push('/roles');
	}, [history]);

	const onSubmitCreateGroup = useCallback((data) => {
		console.log(data);
		dispatch(
			IAM_USER_GROUP.asyncAction.createAction({
				userGroupTypeId: data.type,
				parentId: data.parentId,
				name: data.name,
				members: groupMembers,
			}),
		);
	}, []);

	const methods = useForm({
		defaultValues: {
			usage: 'use',
			grantCount: 0,
		},
		resolver: yupResolver(validationSchema), // 외부 유효성 검사 라이브러리 사용
	});

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
				<TitleBarText>역할 기본 정보</TitleBarText>
				<TitleBarButtons>
					<NormalButton
						type={'button'}
						onClick={methods.handleSubmit(onSubmitCreateGroup)}
					>
						역할 생성
					</NormalButton>
					<TransparentButton
						margin='0px 0px 0px 5px'
						onClick={onClickCancelAddGroup}
					>
						취소
					</TransparentButton>
				</TitleBarButtons>
			</TitleBar>
			<CreatePageContent>
				<FormProvider {...methods}>
					<ColDiv>
						{/*<Label htmlFor={'name'}>그룹 명</Label>*/}
						<RowDiv margin={'0px 0px 12px 0px'}>
							<RHF_Textbox
								name={'name'}
								placeholder={'역할 이름'}
								description={
									'최대 100자, 영문 대소문자로 생성 가능합니다.'
								}
							/>
						</RowDiv>
						<RowDiv margin={'0px 0px 12px 0px'}>
							<RHF_Textbox
								name={'description'}
								placeholder={'역할 설명'}
								description={'최대 200자 가능합니다.'}
							/>
						</RowDiv>
						<RowDiv>
							<TemplateElement
								title={constants.contents.usage.title}
								render={() => (
									<RHF_Radio
										name={'usage'}
										options={usageOptions}
									/>
								)}
							/>
							<TemplateElement
								title={constants.contents.patternInput.title}
								render={() => (
									<RHF_Textbox
										name={'grantCount'}
										description={
											'부여횟수를 제한할 경우 부여 가능 횟수를 입력합니다. (최대10)'
										}
										width={50}
									/>
								)}
							/>
						</RowDiv>
					</ColDiv>
				</FormProvider>
			</CreatePageContent>
		</>
	);
};

AddRole.propTypes = {
	values: PropTypes.object.isRequired,
	setValues: PropTypes.func.isRequired,
	groupMembers: PropTypes.array.isRequired,
};

export default AddRole;
