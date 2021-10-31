import React, {useCallback, useRef, useState} from 'react';
import {SubTitle} from '../../../styles/components/style';
import {useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';
import IAM_USER_GROUP from '../../../reducers/api/IAM/User/Group/group';
import IAM_USER_GROUP_TYPE from '../../../reducers/api/IAM/User/Group/groupType';
import PropTypes from 'prop-types';
import {
	NormalButton,
	TransparentButton,
} from '../../../styles/components/buttons';
import NewComboBox from '../../RecycleComponents/New/NewComboBox';
import NewInput from '../../RecycleComponents/New/NewInput';
import NewForm from '../../RecycleComponents/New/NewForm';
import {ColDiv, RowDiv} from '../../../styles/components/div';
import {Label} from '../../../styles/components/text';

const AddGroup = () => {
	const history = useHistory();
	const {groups} = useSelector(IAM_USER_GROUP.selector);
	const {groupTypes} = useSelector(IAM_USER_GROUP_TYPE.selector);
	const formRef = useRef(null);

	const [values, setValues] = useState({
		type: '그룹 유형 선택',
		id: '',
		name: '',
	});

	/***********************************************************************/
	const onClickManageGroupType = useCallback(() => {
		history.push('/groups/types');
	}, [history]);

	const onClickCancelAddGroup = useCallback(() => {
		history.push('/groups');
	}, [history]);

	return (
		<>
			<SubTitle>
				<div>사용자 그룹 이름 지정</div>

				<div>
					<NormalButton onClick={onClickManageGroupType}>
						그룹 유형 관리
					</NormalButton>
					<NormalButton
						type={'button'}
						onClick={() => formRef.current.handleSubmit()}
					>
						그룹 생성
					</NormalButton>
					<TransparentButton onClick={onClickCancelAddGroup}>
						취소
					</TransparentButton>
				</div>
			</SubTitle>
			<NewForm
				initialValues={values}
				setValues={setValues}
				onSubmit={(data) => console.log(data)}
				innerRef={formRef}
			>
				<RowDiv>
					<ColDiv>
						<Label htmlFor='type'>그룹 유형 선택</Label>
						<NewComboBox
							name='type'
							options={groupTypes.map((v) => {
								return {value: v.id, label: v.name};
							})}
						/>
					</ColDiv>
					{values.type === 'groupType1' && (
						<ColDiv>
							<Label htmlFor={'id'}>상위 그룹 선택</Label>
							<NewInput name={'id'} />
						</ColDiv>
					)}
				</RowDiv>
				<ColDiv>
					<Label htmlFor={'name'}>그룹 명</Label>
					<NewInput
						name={'name'}
						placeholder={'그룹명을 입력하세요'}
					/>
				</ColDiv>
			</NewForm>
		</>
	);
};

AddGroup.propTypes = {
	setIsOpened: PropTypes.func.isRequired,
};

export default AddGroup;
