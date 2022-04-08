import React, {useCallback, useEffect, useRef} from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import IAM_USER_GROUP_TYPE from '../../../../../reducers/api/IAM/User/Group/groupType';
import PropTypes from 'prop-types';
import {
	NormalButton,
	TransparentButton,
} from '../../../../../styles/components/buttons';
import ComboBox from '../../../../RecycleComponents/New/ComboBox';
import TextBox from '../../../../RecycleComponents/New/TextBox';
import Form from '../../../../RecycleComponents/New/Form';
import {ColDiv, Label, RowDiv} from '../../../../../styles/components/style';
import * as yup from 'yup';
import {
	AddPageContent,
	TextBoxDescription,
} from '../../../../../styles/components/iam/addPage';
import {
	TitleBar,
	TitleBarButtons,
	TitleBarText,
} from '../../../../../styles/components/iam/iam';
import IAM_USER_GROUP from '../../../../../reducers/api/IAM/User/Group/group';
import TemplateElement from '../../../Policy/Components/Templates/Layout/TemplateElement';
import useRadio from '../../../../../hooks/useRadio';
import {
	patternTypeOptions,
	usageOptions,
} from '../../../../../utils/policy/options';
import useTextBox from '../../../../../hooks/useTextBox';

const AddRole = ({values, groupMembers, setValues}) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const {groupTypes} = useSelector(IAM_USER_GROUP_TYPE.selector);
	const {groups} = useSelector(IAM_USER_GROUP.selector);
	const formRef = useRef(null);

	const constants = {
		title: '사용자 ID 패턴',
		description: [
			'사용자 ID에 특정 패턴을 설정합니다.',
			'패턴 최대 길이는 3~10자 로 제한 하며 특수문자 사용은 할수 없습니다',
		],
		contents: {
			usage: {
				title: '부여 제한',
				options: {use: '제한 없음', nonuse: '제앟ㄴ 함'},
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

	const validation = {
		type: yup.string().required('역할 이름은 필수값입니다.'),
		name: yup.string().required('열할 설명은 필수값입니다.'),
	};

	const onClickCancelAddGroup = useCallback(() => {
		history.push('/roles');
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
				<TitleBarText>역할 기본 정보</TitleBarText>
				<TitleBarButtons>
					<NormalButton
						type={'button'}
						onClick={() => formRef.current.handleSubmit()}
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
			<AddPageContent>
				<Form
					initialValues={values}
					setValues={setValues}
					onSubmit={onSubmitCreateGroup}
					innerRef={formRef}
					validation={validation}
				>
					<ColDiv>
						{/*<Label htmlFor={'name'}>그룹 명</Label>*/}
						<RowDiv margin={'0px 0px 12px 0px'}>
							<TextBox name={'name'} placeholder={'역할 이름'} />
							<TextBoxDescription>
								최대 100자, 영문 대소문자로 생성 가능합니다.
							</TextBoxDescription>
						</RowDiv>
						<RowDiv margin={'0px 0px 12px 0px'}>
							<TextBox name={'name'} placeholder={'설명'} />
							<TextBoxDescription>
								최대 200자 가능합니다.
							</TextBoxDescription>
						</RowDiv>
						<RowDiv>
							<TemplateElement
								title={constants.contents.usage.title}
								render={usageRadioButton}
							/>
							<TemplateElement
								title={constants.contents.patternInput.title}
								render={patternInputTextBox}
							/>
							<TextBoxDescription>
								부여횟수를 제한할 경우 부여 가능 횟수를 입력
								합니다. (최대10)
							</TextBoxDescription>
						</RowDiv>
					</ColDiv>
				</Form>
			</AddPageContent>
		</>
	);
};

AddRole.propTypes = {
	values: PropTypes.object.isRequired,
	setValues: PropTypes.func.isRequired,
	groupMembers: PropTypes.array.isRequired,
};

export default AddRole;
