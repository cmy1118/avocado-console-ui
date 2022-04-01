import React, {useCallback, useState} from 'react';
import styled from 'styled-components';
import Resources from '../../IAM/Policy/Components/Templates/PAM/ResourceAccess/Resources';
import Accounts from '../../IAM/Policy/Components/Templates/PAM/ResourceAccess/Accounts';
import PropTypes from 'prop-types';
import {DialogBox} from '../../../styles/components/dialogBox';
import {
	NormalButton,
	TransparentButton,
} from '../../../styles/components/buttons';
import {useDispatch} from 'react-redux';

const _identitiesSpaceContainer = styled.div`
	overflow: auto;
	display: flex;
	flex: 1;
`;

const _DialogBox = styled(DialogBox)`
	border-radius: 4px;
	box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.22);
	border: solid 1px #e3e5e5;
	background-color: #fff;
`;

const _Footer = styled.div`
	display: flex;
	justify-content: flex-end;
	padding: 13px 8px;
`;
const _CancelBtn = styled(TransparentButton)`
	width: 120px;
`;
const _ConfirmBtn = styled(NormalButton)`
	width: 120px;
`;

export const _SettingMainContainer = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
	overflow: scroll;
	padding: 0px 16px;
`;

export const _SettingContentContainer = styled.div`
	padding: 16px 0px;
`;

const AddAcessResourceAccountDialogBox = ({isOpened, setIsOpened, data}) => {
	const dispatch = useDispatch();
	//선택된 자원
	const [select, setSelect] = useState([]);
	//lastClicked: 가장 마지막으로 클릭된 자원
	const [lastClicked, setLastClicked] = useState(null);
	//검색 text 입력 state
	const [search, setSearch] = useState('');
	//검색 combobox 선택 state (프로토콜 정보를 combobox로 선택하여 검색함)
	const [selectProtocol, setSelectProtocol] = useState('');

	const [tableData, setTableData] = useState([]);

	const onClickCloseDialogBox = useCallback(() => {
		setIsOpened(false);
	}, [setIsOpened]);

	const onClickConfirmBtn = useCallback(() => {
		alert('저장되었습니다');
	}, []);

	return (
		<_DialogBox
			isOpen={isOpened}
			onRequestClose={onClickCloseDialogBox}
			ariaHideApp={false}
			shouldCloseOnOverlayClick={false}
		>
			<_SettingMainContainer>
				{/*<_SettingTitle>{t('title')}</_SettingTitle>*/}
				<_SettingContentContainer>
					<_identitiesSpaceContainer>
						<Resources
							// setIsOpened={setIsOpened}
							setLastClicked={setLastClicked}
							setSelect={setSelect}
							select={select}
							resources={data}
							// resources={tableData}
							setResources={setTableData}
							// currentProtocolIndex={currentProtocolIndex}
							// setCurrentProtocolIndex={setCurrentProtocolIndex}
							// currentAccountIndex={currentAccountIndex}
							// setCurrentAccountIndex={setCurrentAccountIndex}
							// setConnectData={setConnectData}
							setSearch={setSearch}
							setSelectProtocol={setSelectProtocol}
						/>
						<Accounts lastClicked={lastClicked} />
					</_identitiesSpaceContainer>
				</_SettingContentContainer>
			</_SettingMainContainer>
			<_Footer>
				<_CancelBtn onClick={onClickCloseDialogBox}>취소</_CancelBtn>
				<_ConfirmBtn onClick={onClickConfirmBtn}>저장</_ConfirmBtn>
			</_Footer>
		</_DialogBox>
	);
};

AddAcessResourceAccountDialogBox.propTypes = {
	isOpened: PropTypes.bool.isRequired,
	setIsOpened: PropTypes.func.isRequired,
	data: PropTypes.array.isRequired,
};
export default AddAcessResourceAccountDialogBox;
