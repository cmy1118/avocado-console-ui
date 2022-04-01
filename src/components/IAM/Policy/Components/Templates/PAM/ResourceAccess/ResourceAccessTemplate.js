import React, {useCallback, useEffect, useState} from 'react';
import {RowDiv} from '../../../../../../../styles/components/style';
import Table from '../../../../../../Table/Table';
import {tableKeys} from '../../../../../../../Constants/Table/keys';
import {tableColumns} from '../../../../../../../Constants/Table/columns';
import AddAcessResourceAccountDialogBox from '../../../../../../DialogBoxs/Form/AddAcessResourceAccountDialogBox';
import RRM_RESOURCE from '../../../../../../../reducers/api/PAM/Resource/resource';
import {AllreplaceStr} from '../../../../../../../utils/dataFitering';
import {useDispatch} from 'react-redux';
import useRadio from '../../../../../../../hooks/useRadio';
import {resourceOptions} from '../../../../../../../utils/policyOptions';
import PropTypes from 'prop-types';
import ResourceSelectionContainer from '../Resource/ResourceSelectionContainer';
import TableFold from '../../../../../../Table/Options/TableFold';

/********************************************************************************************
 * 자원 접근 권한 하위 접근 목록 테이블 컴포넌트
 *
 * disabled : 현재 컴포넌트 노출 여부
 ********************************************************************************************/
const ResourceAccessTemplate = ({isShow}) => {
	const dispatch = useDispatch();
	const [tableData, setTableData] = useState([]);
	const [select, setSelect] = useState([]);
	//접근 자원 계정 추가 오픈
	const [openDialogBox, setOpenDialogBox] = useState(false);
	//lastClicked: 가장 마지막으로 클릭된 자원
	const [lastClicked, setLastClicked] = useState(null);
	const [isFold, setIsFold] = useState(false);

	/******************************************************************
	 *
	 ******************************************************************/
	const findAllApi = useCallback(
		async (search, selectProtocol) => {
			try {
				const response = await dispatch(
					RRM_RESOURCE.asyncAction.findAllResourceAction({
						keyword2: search ? search : '',
						serviceType: selectProtocol ? selectProtocol : '',
					}),
				);
				console.log('조회목록:', response);
				await setTableData(
					response.payload.map((v) => ({
						id: v.id,
						group: AllreplaceStr(v.group.namePath),
						name: v.name,
						address: v.defaultAddress,
						protocol: v.servicePorts[0].serviceType.name,
					})),
				);
				// await alert('조회완료')
			} catch (err) {
				console.log(err);
				alert('조회오류');
			}
		},
		[dispatch],
	);
	/******************************************************************
	 * 테이블 자원 선택 이벤트 핸들러
	 *****************************************************************/
	const onClickSelectResource = useCallback(
		(e, data) => {
			//shift, command를 누르지 않은 상태로 클릭
			if (!e.shiftKey && !e.metaKey) setLastClicked(data);
		},
		[setLastClicked],
	);
	/******************************************************************
	 * 자원삭제 이벤트 핸들러
	 *****************************************************************/
	const onClickDeleteReosource = useCallback(
		(e) => {
			console.log('현재 선택된자원 :', select);
			alert('삭제되었습니다');
		},
		[select],
	);
	/******************************************************************
	 * 자원 추가를 위한 모달 이벤트 핸들러
	 *****************************************************************/
	const onClickAddReosource = useCallback((e) => {
		setOpenDialogBox(true);
	}, []);
	/**********************************************************************
	 *
	 **********************************************************************/
	useEffect(() => {
		//모든 자원 조회시
		if (!isShow) {
			setIsFold(false);
		}
		if (isShow) {
			findAllApi();
		}
	}, [findAllApi, isFold, isShow]);
	return (
		<div>
			<TableFold
				title={isShow ? `접근목록 : ${tableData.length}` : `접근목록: `}
				space={'ResourceAcessTemplate'}
				isFold={isFold}
				setIsFold={setIsFold}
				disabled={!isShow}
				// setIsFold={setIsFold}
			/>
			{isFold['ResourceAcessTemplate'] ? (
				<div>
					{/*유섭님 컴포넌트 뺀다고 하심*/}
					<RowDiv>
						<button onClick={(e) => onClickAddReosource(e)}>
							추가
						</button>
						<button onClick={(e) => onClickDeleteReosource(e)}>
							삭제
						</button>
					</RowDiv>
					{/*접근목록 테이블*/}
					<Table
						tableKey={
							tableKeys.policy.add.pamTemplate.accessResource
						}
						columns={
							tableColumns[
								tableKeys.policy.add.pamTemplate.accessResource
							]
						}
						data={tableData}
						rowClick={onClickSelectResource}
						// isPaginable
						// optionBarTitle={`자원 목록 : ${resources?.length}건`}
						// isSearchable
						isColumnFilterable
						setSelect={setSelect}
						// defaultClick={defaultClick}
						// width={'855px'}
					/>

					{/*접근 자원 계정 추가 모달*/}
					<AddAcessResourceAccountDialogBox
						isOpened={openDialogBox}
						setIsOpened={setOpenDialogBox}
						data={tableData}
						// setResources={setConnectData}
						select={select}
						type={'resource'}
						// currentProtocolIndex={currentProtocolIndex}
						// setCurrentProtocolIndex={setCurrentProtocolIndex}
						// currentAccountIndex={currentAccountIndex}
						// setCurrentAccountIndex={setCurrentAccountIndex}
						// setConnectData={setConnectData}
					/>
				</div>
			) : (
				''
			)}
		</div>
	);
};

ResourceAccessTemplate.propTypes = {
	isShow: PropTypes.bool.isRequired,
};

export default ResourceAccessTemplate;
