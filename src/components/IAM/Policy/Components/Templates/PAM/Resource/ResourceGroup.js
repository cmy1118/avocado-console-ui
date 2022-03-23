import React, {useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import {arrowDownIcon, arrowRightIcon} from '../../../../../../../icons/icons';
import {HoverIconButton} from '../../../../../../../styles/components/icons';
import styled from 'styled-components';
import {useDispatch} from 'react-redux';
import RRM_GROUP from '../../../../../../../reducers/api/RRM/Group/group';
import {isFulfilled} from '../../../../../../../utils/redux';
import CheckBox from '../../../../../../RecycleComponents/Form/CheckBox';

const _Container = styled.div`
	display: flex;
	padding-left: ${(props) => props?.left};
`;

const checkDeeps = (path) => {
	return path.split('/').length;
};

const ResourceGroup = ({data, selected, setSelect, disabledGroups}) => {
	const dispatch = useDispatch();
	//isOpened: 그룹 하위 자식들이 로드된 상태
	const [isOpened, setIsOpened] = useState(false);
	//children: 자원 그룹의 자식 그룹s
	const [children, setChildern] = useState([]);
	//isChecked: 체크박스 체크 유무
	const [isChecked, setIsChecked] = useState(
		selected.filter((v) => v.id === data.id).length > 0,
	);
	const [disabled] = useState(
		disabledGroups.filter((v) => v.id === data.id).length > 0,
	);
	/**************************************************
	 * ambacc244 - 자원 그룹을 접고 펼쳐 하위 자원
	 **************************************************/
	const onClickFoldResourceGroup = useCallback(async () => {
		//그룹이 접힌 상태
		if (!isOpened) {
			//그룹의 하위 자식들을 로드를 위한 api 호출
			const res = await dispatch(
				RRM_GROUP.asyncAction.findAllGroupAction({
					parentId: data.id,
				}),
			);
			//api 호출 성공
			if (isFulfilled(res)) setChildern(res.payload.data || []);
			//그룹이 열린 상태
		} else {
			//그룹의 하위 자식들을 비워줌
			setChildern([]);
		}
		//그룹이 열림 유무를 변경
		setIsOpened(!isOpened);
	}, [isOpened, dispatch, data.id]);

	/**************************************************
	 * ambacc244 - 자원 그룹의 체크박스 변경
	 **************************************************/
	const onClickSelectResourceGroup = useCallback(() => {
		if (!disabled) {
			//체크박스 변경 요청 이전의 체크 상태가 false
			if (!isChecked) {
				//현재 데이터 선택
				setSelect([...selected, data]);
				//체크박스 변경 요청 이전의 체크 상태가 true
			} else {
				//현대 데이터 선택 해제
				setSelect(selected.filter((v) => v.id === data.id));
			}
			//체크박스 상태 변경
			setIsChecked(!isChecked);
		}
	}, [isChecked, setSelect, selected, data, disabled]);

	return (
		<div>
			<_Container left={checkDeeps(data.path) * 10 + 'px'}>
				<HoverIconButton
					color={'font'}
					size={'m'}
					margin={'0px'}
					onClick={onClickFoldResourceGroup}
				>
					{isOpened ? arrowDownIcon : arrowRightIcon}
				</HoverIconButton>

				<CheckBox
					checkKey={data.id}
					checked={isChecked}
					label={data.name}
					onCheck={onClickSelectResourceGroup}
					disabled={disabled}
				/>
			</_Container>

			{children.map((v) => (
				<ResourceGroup
					key={v.id}
					selected={selected}
					setSelect={setSelect}
					disabledGroups={disabledGroups}
					data={v}
				/>
			))}
		</div>
	);
};

ResourceGroup.propTypes = {
	data: PropTypes.object,
	selected: PropTypes.array,
	setSelect: PropTypes.func,
	disabledGroups: PropTypes.array,
};

export default ResourceGroup;
