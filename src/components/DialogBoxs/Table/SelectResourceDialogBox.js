import React, {useCallback, useEffect, useState} from 'react';
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
import {useDispatch} from 'react-redux';
import {RowDiv} from '../../../styles/components/style';
import RRM_RESOURCE from '../../../reducers/api/PAM/Resource/resource';
import useSelectColumn from '../../../hooks/table/useSelectColumn';
import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import RHF_Textbox from '../../RecycleComponents/ReactHookForm/RHF_Textbox';
import RHF_Combobox from '../../RecycleComponents/ReactHookForm/RHF_Combobox';
import * as yup from 'yup';

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
	{value: null, label: '프로토콜 전체'},
	{value: 'SSH', label: 'SSH'},
	{value: 'SFTP', label: 'SFTP'},
];

const SelectResourceDialogBox = ({isOpened, setIsOpened, setSelected}) => {
	const dispatch = useDispatch();
	//resources: 검색된 자원 리스트
	const [resources, setResources] = useState([]);
	//addedSelection: 추가로 선택될 자원
	const [addedSelection, columns] = useSelectColumn(
		tableColumns[tableKeys.policy.add.pamTemplate.resource],
	);

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
		setSelected((prev) => [...prev, ...addedSelection]);
		//다이얼로그박스 닫기
		setIsOpened(false);
	}, [addedSelection, setIsOpened, setSelected]);

	/**************************************************
	 * ambacc244 - 자원 그룹 검색
	 **************************************************/
	const onSubmitSearchVal = useCallback(
		async (data) => {
			try {
				const res = await dispatch(
					RRM_RESOURCE.asyncAction.findAllResourcebByUserUidAction({
						serviceType: data.protocol,
						keyword2: data.search.trim(),
					}),
				);
				//요청에 대한 응답 성공
				console.log(res.payload);
				// setResources(
				// 	res.payload.map((v) => ({
				// 		id: v.id,
				// 		[DRAGGABLE_KEY]: v.id,
				// 		group: v.group.namePath,
				// 		name: v.name,
				// 		address: v.defaultAddress,
				// 		protocol: v.servicePorts[0].serviceType.name,
				// 	})) || [],
				// );
			} catch (err) {
				console.error(err);
			}
		},
		[dispatch],
	);

	const validationSchema = yup
		.object()
		.shape({
			// search: yup.string().matches('정규식'),
			// .min(2, '2자 이상 입력하셔야 합니다.')
			// .notRequired(),
			// .required('name값은 필수입니다.'),
			// protocol: yup.string().nullable(true),
		})
		.required();

	const methods = useForm({
		resolver: yupResolver(validationSchema), // 외부 유효성 검사 라이브러리 사용
	});

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
				<FormProvider {...methods}>
					<RowDiv>
						<RHF_Textbox
							name={'search'}
							placeholder={
								selectResourceGroupDialogBox.searchBar
									.placeholder
							}
							front={
								<Icon size={'sm'} margin_right={'0px'}>
									{searchIcon}
								</Icon>
							}
							onSubmit={methods.handleSubmit(onSubmitSearchVal)}
						/>
						<RHF_Combobox
							name={'protocol'}
							placeholder={'프로토콜'}
							options={protocolOptions}
							width={150}
						/>
					</RowDiv>
				</FormProvider>

				{/*<Form*/}
				{/*	onSubmit={onSubmitSearchVal}*/}
				{/*	innerRef={searchRef}*/}
				{/*	initialValues={{search: ''}}*/}
				{/*>*/}
				{/*	<RowDiv>*/}
				{/*		<TextBox*/}
				{/*			placeholder={*/}
				{/*				selectResourceGroupDialogBox.searchBar*/}
				{/*					.placeholder*/}
				{/*			}*/}
				{/*			front={*/}
				{/*				<Icon size={'sm'} margin_right={'0px'}>*/}
				{/*					{searchIcon}*/}
				{/*				</Icon>*/}
				{/*			}*/}
				{/*			name={'search'}*/}
				{/*		/>*/}
				{/*		<ComboBox*/}
				{/*			innerRef={searchRef}*/}
				{/*			width={'150px'}*/}
				{/*			name='protocol'*/}
				{/*			header={'프로토콜 전체'}*/}
				{/*			options={protocolOptions}*/}
				{/*		/>*/}
				{/*	</RowDiv>*/}
				{/*</Form>*/}

				<Table
					columns={columns}
					tableKey={tableKeys.policy.add.pamTemplate.resource}
					data={resources}
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
	setSelected: PropTypes.func.isRequired,
};

export default SelectResourceDialogBox;
