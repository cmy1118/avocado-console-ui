import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
	DialogBox,
	DialogBoxFooter,
	DialogBoxHeader,
} from '../../../styles/components/dialogBox';
import {
	NormalButton,
	TransparentButton,
} from '../../../styles/components/buttons';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {tableColumns} from '../../../Constants/Table/columns';
import {tableKeys} from '../../../Constants/Table/keys';
import Table from '../../Table/Table';
import {Icon, IconButton} from '../../../styles/components/icons';
import {closeIcon, searchIcon} from '../../../icons/icons';
import Form from '../../RecycleComponents/New/Form';
import TextBox from '../../RecycleComponents/New/TextBox';
import {useDispatch} from 'react-redux';
import ComboBox from '../../RecycleComponents/New/ComboBox';
import {ColDiv, RowDiv} from '../../../styles/components/style';
import {isFulfilled} from '../../../utils/redux';
import RRM_RESOURCE from '../../../reducers/api/RRM/Resource/resource';

const _DialogBox = styled(DialogBox)`
	display: flex;
	flex-direction: column;
	width: 800px;
	height: 500px;
`;

const _Contents = styled.div`
	flex: 1;
`;

const selectResourceGroupDialogBox = {
	title: '자원 추가',
	searchBar: {
		placeholder: '그룹 이름, 자원 이름, 주소',
	},
	button: {
		confirm: '확인',
		cancel: '취소',
	},
};

const protocolOptions = [
	{value: '', label: '프로토콜 전체'},
	{value: 'SSH', label: 'SSH'},
	{value: 'SFTP', label: 'SFTP'},
];

const SelectResourceDialogBox = ({
	isOpened,
	setIsOpened,
	selected,
	setSelected,
}) => {
	const dispatch = useDispatch();
	const searchRef = useRef(null);
	//resources: 검색된 자원 리스트
	const [resources, setResources] = useState([]);
	//addedSelection: 추가로 선택될 자원
	const [addedSelection, setAddedSelection] = useState([]);

	/**************************************************
	 * ambacc244 - 추가적인 자원 선택 취소
	 **************************************************/
	const onClickCloseDialogBox = useCallback(() => {
		//다이얼로그박스 닫기
		setIsOpened(false);
	}, [setIsOpened]);

	/**************************************************
	 * ambacc244 - 선택한 자원들을 추가
	 **************************************************/
	const onClickAddSelection = useCallback(() => {
		//선택된 자원에 추가로 선택된 자원 추가
		setSelected([
			...selected,
			...addedSelection[tableKeys.policy.add.pamTemplate.resource],
		]);
		//다이얼로그박스 닫기
		setIsOpened(false);
	}, [addedSelection, selected, setIsOpened, setSelected]);

	/**************************************************
	 * ambacc244 - 자원 그룹 검색
	 **************************************************/
	const onSubmitSearchVal = useCallback(async (v) => {
		//검색 입력값의 길이가 2 이상
		if (v?.search.length > 1) {
			const res = await dispatch(
				RRM_RESOURCE.asyncAction.findAllResourceAction({
					serviceType: v?.protocol || '',
					keyword2: v.search.trim(),
				}),
			);
			//요청에 대한 응답 성공
			if (isFulfilled(res))
				setResources(
					res.payload.map((v) => ({
						id: v.id,
						group: v.group.namePath,
						name: v.name,
						address: v.defaultAddress,
						protocol: v.servicePorts[0].serviceType.name,
					})) || [],
				);
		}
	}, []);

	/**************************************************
	 * ambacc244 - 다이얼로그 박스가 열리면
	 **************************************************/
	useEffect(() => {
		//다이얼로그박스가 열리면 자원 리스트를 비워줌
		if (isOpened) {
			setResources([]);
		}
	}, [isOpened]);

	return (
		<_DialogBox
			isOpen={isOpened}
			onRequestClose={onClickCloseDialogBox}
			ariaHideApp={false}
			shouldCloseOnOverlayClick={false}
		>
			<DialogBoxHeader>
				<div>{selectResourceGroupDialogBox.title}</div>
				<IconButton onClick={onClickCloseDialogBox}>
					{closeIcon}
				</IconButton>
			</DialogBoxHeader>

			<_Contents>
				<Form
					onSubmit={onSubmitSearchVal}
					innerRef={searchRef}
					initialValues={{search: ''}}
				>
					<RowDiv>
						<TextBox
							placeholder={
								selectResourceGroupDialogBox.searchBar
									.placeholder
							}
							front={
								<Icon size={'sm'} margin_right={'0px'}>
									{searchIcon}
								</Icon>
							}
							name={'search'}
						/>
						<ComboBox
							innerRef={searchRef}
							width={'150px'}
							name='protocol'
							header={'프로토콜 전체'}
							options={protocolOptions}
						/>
					</RowDiv>
				</Form>

				<Table
					columns={
						tableColumns[tableKeys.policy.add.pamTemplate.resource]
					}
					tableKey={tableKeys.policy.add.pamTemplate.resource}
					data={resources}
					setSelect={setAddedSelection}
					isCheckBox
				/>
			</_Contents>

			<DialogBoxFooter>
				<TransparentButton onClick={onClickAddSelection}>
					{selectResourceGroupDialogBox.button.confirm}
				</TransparentButton>
				<NormalButton onClick={onClickCloseDialogBox}>
					{selectResourceGroupDialogBox.button.cancel}
				</NormalButton>
			</DialogBoxFooter>
		</_DialogBox>
	);
};

SelectResourceDialogBox.propTypes = {
	isOpened: PropTypes.bool.isRequired,
	setIsOpened: PropTypes.func.isRequired,
	selected: PropTypes.array.isRequired,
	setSelected: PropTypes.func.isRequired,
};

export default SelectResourceDialogBox;
