import {
	AppBarButtons,
	InputDescriptionText,
	SubHeader,
	SubHeaderText,
} from '../../../styles/components/style';
import React, {useCallback, useRef, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';
import IAM_USER_GROUP from '../../../reducers/api/IAM/User/Group/group';
import IAM_USER_GROUP_TYPE from '../../../reducers/api/IAM/User/Group/groupType';
import PropTypes from 'prop-types';
import {
	NormalButton,
	TransparentButton,
} from '../../../styles/components/buttons';
import ComboBox from '../../RecycleComponents/New/ComboBox';
import TextBox from '../../RecycleComponents/New/TextBox';
import Form from '../../RecycleComponents/New/Form';
import {
	AddPageContentsContainer,
	ColDiv,
	RowDiv,
} from '../../../styles/components/div';
import {Label} from '../../../styles/components/text';
import * as yup from 'yup';

const AddGroup = () => {
	const history = useHistory();
	const {groupTypes} = useSelector(IAM_USER_GROUP_TYPE.selector);
	const formRef = useRef(null);

	const [values, setValues] = useState({
		type: '',
		id: '',
		name: '',
	});

	const validation = {
		type: yup.string().required('타입은 필수값입니다.'),
		name: yup.string().required('이름은 필수값입니다.'),
	};

	const onClickManageGroupType = useCallback(() => {
		history.push('/groups/types');
	}, [history]);

	const onClickCancelAddGroup = useCallback(() => {
		history.push('/groups');
	}, [history]);

	return (
		<>
			<SubHeader>
				<SubHeaderText>사용자 그룹 이름 지정</SubHeaderText>
				<AppBarButtons>
					<NormalButton onClick={onClickManageGroupType}>
						그룹 유형 관리
					</NormalButton>
					<NormalButton
						type={'button'}
						onClick={() => formRef.current.handleSubmit()}
					>
						그룹 생성
					</NormalButton>
					<TransparentButton
						margin='0px 0px 0px 5px'
						onClick={onClickCancelAddGroup}
					>
						취소
					</TransparentButton>
				</AppBarButtons>
			</SubHeader>
			<AddPageContentsContainer>
				<Form
					initialValues={values}
					setValues={setValues}
					onSubmit={(data) => console.log(data)}
					innerRef={formRef}
					validation={validation}
				>
					<RowDiv style={{marginBottom: '16px'}}>
						<ColDiv style={{marginRight: '10px'}}>
							<Label htmlFor='type'>그룹 유형 선택</Label>
							<ComboBox
								name='type'
								header={'그룹 유형 선택'}
								options={groupTypes.map((v) => {
									return {value: v.id, label: v.name};
								})}
							/>
						</ColDiv>
						{values.type === 'groupType1' && (
							<ColDiv>
								<Label htmlFor={'id'}>상위 그룹 선택</Label>
								<TextBox name={'id'} />
							</ColDiv>
						)}
					</RowDiv>
					<ColDiv>
						<Label htmlFor={'name'}>그룹 명</Label>
						<RowDiv margin={'0px 0px 12px 0px'}>
							<TextBox
								name={'name'}
								placeholder={'그룹명을 입력하세요'}
							/>
							<InputDescriptionText>
								최대 120자, 영문 숫자 사용 가능합니다.
							</InputDescriptionText>
						</RowDiv>
					</ColDiv>
				</Form>
			</AddPageContentsContainer>
		</>
	);
};

AddGroup.propTypes = {
	setIsOpened: PropTypes.func.isRequired,
};

export default AddGroup;
