import React, {
	memo,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import styled from 'styled-components';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {ColDiv, RowDiv} from '../../../../../../../styles/components/style';
import Form from '../../../../../../RecycleComponents/New/Form';
import TextBox from '../../../../../../RecycleComponents/New/TextBox';
import ComboBox from '../../../../../../RecycleComponents/New/ComboBox';
import {Icon} from '../../../../../../../styles/components/icons';
import {searchIcon} from '../../../../../../../icons/icons';
import Table from '../../../../../../Table/Table';
import checkboxColumn from '../../../../../../Table/tableCheckboxColumn';
import {AllreplaceStr} from '../../../../../../../utils/dataFitering';
import RRM_RESOURCE from '../../../../../../../reducers/api/PAM/Resource/resource';
import TableCheckBox from '../../../../../../Table/ColumnCells/TableCheckBox';
import {DRAGGABLE_KEY} from '../../../../../../../Constants/Table/keys';

const _TableContainer = styled.div`
	flex: 1;
`;

const _Container = styled(ColDiv)`
	flex: 1;
	margin-right: 16px;
`;

/******************************************************************
 * roberto - 자원목록  컴포넌트
 *****************************************************************/
const Resources = ({
	setIsOpened, //MultiResourceConnectDialogBox.js open 유무 함수 - bool
	setLastClicked, //Resources.js 컴포넌트 마지막으로 클릭된 row정보 - 객체 배열
	setSelect, //Resources.js 컴포넌트 클릭된 row정보 변경 함수
	select, //Resources.js 컴포넌트 클릭된 row정보  - 객체 배열
	setIsFavoriteAddOpened, //TempFavoritesDialogBox.js  open 유무 함수 - bool
	resources, //Resources.js table 데이터 정보 -상위 컴포넌트 Identities.js 에서 호출
	currentProtocolIndex, //Resources.js table 데이터중 콤보박스 Index 정보
	setConnectData, //Resources.js table 데이터중 선택된 데이터 변경 함수
	setSelectProtocol, //콤보박스(프로토콜) 검색 변경 함수
}) => {
	const dispatch = useDispatch();
	const ref = useRef(null);
	//defaultClick: table 특정행을 defaultClick 결정 유무 state
	const [defaultClick, setDefaultClick] = useState(true);
	const [tableData, setTableData] = useState([]);
	const [search, setSearch] = useState('');

	// const resourceData = useMemo(
	//     () =>
	//         resources?.map((v) => ({
	//             id: v.id,
	//             groupName: AllreplaceStr(v.group.namePath),
	//             name: v.name,
	//             address: v.servicePorts[currentProtocolIndex[v.id]].address,
	//             protocol: v.servicePorts[currentProtocolIndex[v.id]].name, // typeCode: favoriteTypeCode[v.computingSystem.osType.name],
	//         })),
	//     [currentProtocolIndex, resources],
	// );

	const columns = useMemo(
		() => [
			// checkboxColumn({tableKey: 'PAM_Resources'}),
			{
				accessor: 'group',
				Header: '그룹',
			},
			{
				accessor: 'name',
				Header: '자원 이름',
			},
			{
				accessor: 'address',
				Header: '주소',
			},
			{
				accessor: 'protocol',
				Header: '프로토콜',
			},
			{
				accessor: 'port',
				Header: '포트',
			},
			{
				accessor: 'allAccount',
				Header: '모든계정',
				Cell: function Component(cell) {
					return <TableCheckBox cell={cell} setData={setTableData} />;
				},
			},
		],
		[],
	);
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
						allAccount: false,
						[DRAGGABLE_KEY]: v.id,
					})),
				);
				// await alert('자원 API완료');
			} catch (err) {
				console.log(err);
				alert('자원 API에러');
			}
		},
		[dispatch],
	);
	/******************************************************************
	 * roberto6385 - 자원 검색 핸들러 - text 검색 , 콤보박스 검색
	 *****************************************************************/
	const handleSubmit = useCallback(
		(data) => {
			setLastClicked(false);
			setDefaultClick(false);
			const {search, protocol} = data;
			console.log('search:', search, 'protocol:', protocol);
			setSearch(search.trim());
			setSelectProtocol(protocol.toUpperCase().trim());
		},
		[setLastClicked, setSearch, setSelectProtocol],
	);

	/******************************************************************
	 * 테이블 클릭 데이터 처리 함수
	 *****************************************************************/
	const onClickSelectResource = useCallback(
		(e, data) => {
			console.log('onClickSelectResource:', data);
			//shift, command를 누르지 않은 상태로 클릭
			if (!e.shiftKey && !e.metaKey) setLastClicked(data);
		},
		[setLastClicked],
	);

	// /******************************************************************
	//  * roberto6385 - '접속 버튼' 핸들러
	//  *****************************************************************/
	// const handleConnect = useCallback(() => {
	//     //테이블 선택된 자원이 있는지
	//     if (select.length) {
	//         //selectIds: 선택된 자원들의 id 정보
	//         const selectIds = select.map((s) => s.id);
	//         //table 데이터중 선택된 자원의 정보 추출후 ConnectData 변경
	//         setConnectData(resources.filter((v) => selectIds.includes(v.id)));
	//         setIsOpened(true);
	//         //테이블 선택된 자원이 없으면 경고창 dispatch
	//     } else {
	//         dispatch(
	//             dialogBoxAction.openAlert({key: alertKey.SELECT_RESOURCES}),
	//         );
	//     }
	// }, [dispatch, resources, select, setConnectData, setIsOpened]);
	/**********************************************************************
	 *
	 **********************************************************************/
	useEffect(() => {
		findAllApi();
	}, [findAllApi]);
	console.log('tableData:', tableData);
	console.log('select:', select);
	return (
		<_Container>
			<RowDiv justifyContent={'space-between'} alignItems={'center'}>
				<div style={{flex: '1'}}>
					<Form
						onSubmit={handleSubmit}
						innerRef={ref}
						initialValues={{search: '', protocol: ''}}
					>
						<RowDiv>
							<TextBox
								placeholder={'hi'}
								width={'100%'}
								front={
									<Icon size={'sm'} margin_right={'0px'}>
										{searchIcon}
									</Icon>
								}
								name={'search'}
							/>
							<ComboBox
								innerRef={ref}
								width={'150px'}
								name='protocol'
								header={'프로토콜 전체'}
								options={[
									{value: '', label: '프로토콜 전체'},
									{value: 'SSH', label: 'SSH'},
									{value: 'SFTP', label: 'SFTP'},
								]}
							/>
						</RowDiv>
					</Form>
				</div>
			</RowDiv>
			<_TableContainer>
				<Table
					tableKey={'PAM_Resources'}
					columns={columns}
					data={tableData}
					rowClick={onClickSelectResource}
					// isPaginable
					optionBarTitle={`자원 목록 : ${resources?.length}건`}
					// isSearchable
					isColumnFilterable
					setSelect={setSelect}
					defaultClick={defaultClick}
					// width={'855px'}
				/>
			</_TableContainer>
		</_Container>
	);
};

Resources.propTypes = {
	setIsOpened: PropTypes.func.isRequired,
	setLastClicked: PropTypes.func.isRequired,
	setSelect: PropTypes.func.isRequired,
	select: PropTypes.array.isRequired,
	resources: PropTypes.array.isRequired,
	setIsFavoriteAddOpened: PropTypes.func.isRequired,
	currentProtocolIndex: PropTypes.object,
	setCurrentProtocolIndex: PropTypes.func,
	currentAccountIndex: PropTypes.object,
	setCurrentAccountIndex: PropTypes.func,
	setConnectData: PropTypes.func,
	setSearch: PropTypes.func,
	setSelectProtocol: PropTypes.func,
};

export default memo(Resources);
