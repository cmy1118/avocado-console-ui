import React, {useCallback} from 'react';
import {SubTitle} from '../../../styles/components/style';
import {useHistory} from 'react-router-dom';

const AddGroup = () => {
	const history = useHistory();

	const onClickManageGroupType = useCallback(() => {
		history.push('/group/type');
	}, [history]);

	const onClickCancelAddGroup = useCallback(() => {
		history.push('/group');
	}, [history]);

	return (
		<>
			<SubTitle>
				<div>사용자 그룹 이름 지정</div>

				<div>
					<button onClick={onClickManageGroupType}>
						그룹 유형 관리
					</button>
					<button form={'add-group-form'} type={'submit'}>
						그룹 생성
					</button>
					<button onClick={onClickCancelAddGroup}>취소</button>
				</div>
			</SubTitle>

			{/*	TODO: form*/}
		</>
	);
};

export default AddGroup;
