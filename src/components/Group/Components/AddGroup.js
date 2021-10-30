import React, {useCallback, useState} from 'react';
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
import NewForm from '../../RecycleComponents/New/newForm';
import {RowDiv} from '../../../styles/components/div';

const AddGroup = () => {
	const history = useHistory();
	const {groups} = useSelector(IAM_USER_GROUP.selector);
	const {groupTypes} = useSelector(IAM_USER_GROUP_TYPE.selector);

	const [groupTypesId, setGroupTypesId] = useState('');

	/***********************************************************************/
	const onClickManageGroupType = useCallback(() => {
		history.push('/groups/types');
	}, [history]);

	const onClickCancelAddGroup = useCallback(() => {
		history.push('/groups');
	}, [history]);

	const onSubmitAddGroup = useCallback((data) => {
		console.log(data);
		setGroupTypesId(data.type);
	}, []);

	return (
		<>
			<SubTitle>
				<div>사용자 그룹 이름 지정</div>

				<div>
					<NormalButton onClick={onClickManageGroupType}>
						그룹 유형 관리
					</NormalButton>
					<NormalButton form={'AddGroupKey'} type={'submit'}>
						그룹 생성
					</NormalButton>
					<TransparentButton onClick={onClickCancelAddGroup}>
						취소
					</TransparentButton>
				</div>
			</SubTitle>
			<NewForm
				submitKey={'AddGroupKey'}
				initialValues={{
					type: '그룹 유형 선택',
					id: '',
					name: '',
				}}
				onSubmit={onSubmitAddGroup}
			>
				<RowDiv>
					<NewComboBox
						label='그룹 유형 선택'
						name='type'
						options={groupTypes.map((v) => {
							return {value: v.id, label: v.name};
						})}
						submitKey={'AddGroupKey'}
					/>
					{groupTypesId === 'groupType1' && (
						<NewInput label={'상위 그룹 선택'} name={'id'} />
					)}
				</RowDiv>
				<NewInput
					label={'그룹 명'}
					name={'name'}
					placeholder={'그룹명을 입력하세요'}
				/>
			</NewForm>
		</>
	);
};

AddGroup.propTypes = {
	setIsOpened: PropTypes.func.isRequired,
};

export default AddGroup;
