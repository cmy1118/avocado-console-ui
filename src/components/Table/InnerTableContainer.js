import React from 'react';
import Table from './Table';
import PropTypes from 'prop-types';

const InnerTableContainer = ({data, column, onClick, tableKey, origin}) => {
	console.log(data);
	console.log(column);
	console.log(onClick);
	console.log(tableKey);
	console.log(origin);
	// const dispatch = useDispatch();
	//
	// const [pamData, setPamData] = useState([]);
	//
	// const columns = useMemo(() => {
	// 	return attributes
	// 		? attributes.columns
	// 		: [
	// 				{
	// 					Header: '리소스 이름(ID/DNS)',
	// 					accessor: 'resource',
	// 				},
	// 				{
	// 					Header: 'Protocol',
	// 					accessor: 'protocol',
	// 				},
	// 				{
	// 					Header: 'account',
	// 					accessor: 'account',
	// 				},
	// 		  ];
	// }, [attributes]);
	//
	// const columns2 = useMemo(() => {
	// 	return attributes
	// 		? attributes.columns
	// 		: [
	// 				{
	// 					Header: '제어 유형',
	// 					accessor: 'type',
	// 				},
	// 				{
	// 					Header: '명령어',
	// 					accessor: 'command',
	// 				},
	// 				{
	// 					Header: '위반 정책',
	// 					accessor: 'violentPolicy',
	// 				},
	// 				{
	// 					Header: '초기화',
	// 					accessor: 'reset',
	// 				},
	// 		  ];
	// }, [attributes]);

	// const data = useMemo(() => {
	// 	return attributes ? attributes.data : [...pamData];
	// }, [attributes, pamData]);

	// useEffect(() => {
	// 	if (!attributes) {
	// 		let tempData = [];
	// 		if (policyId === 'tempId') {
	// 			setPamData([
	// 				{
	// 					id: 'control-type',
	// 					[DRAGGABLE_KEY]: 'control-type',
	// 					type: 'Black',
	// 					command: 'kill',
	// 					violentPolicy: '위반 횟수: 1회\n정책: 세션차단',
	// 					reset: '10(초)',
	// 				},
	// 			]);
	// 		} else {
	// 			dispatch(
	// 				PAM_POLICY.asyncAction.FindByIdPermissionAction({
	// 					policyId: policyId,
	// 					range: 'elements=0-50',
	// 				}),
	// 			)
	// 				.unwrap()
	// 				.then((res) => {
	// 					res.map((v) => {
	// 						let tempArray = v.split(':');
	// 						let resourceId = '';
	// 						let tempDataObject = new Object();
	//
	// 						tempArray.pop();
	// 						tempArray.pop();
	//
	// 						tempArray.map((v, i) => {
	// 							resourceId += v;
	// 							if (i !== tempArray.length - 1)
	// 								resourceId += ':';
	// 						});
	//
	// 						dispatch(
	// 							RRM_RESOURCE.asyncAction.findByIdAction({
	// 								id: resourceId,
	// 							}),
	// 						)
	// 							.unwrap()
	// 							.then((r) => {
	// 								tempDataObject.id = r.id;
	// 								tempDataObject[DRAGGABLE_KEY] = r.id;
	// 								tempDataObject.resource =
	// 									r.name +
	// 									' (' +
	// 									r.servicePorts[0].address +
	// 									')';
	// 								tempDataObject.protocol =
	// 									r.servicePorts[0].name;
	//
	// 								dispatch(
	// 									RRM_RESOURCE.asyncAction.findAllAccountAction(
	// 										{
	// 											resourceId: resourceId,
	// 										},
	// 									),
	// 								)
	// 									.unwrap()
	// 									.then((val) => {
	// 										tempDataObject.account =
	// 											val[0].accountId.userId;
	// 									})
	// 									.then(() => {
	// 										tempData.push(tempDataObject);
	// 									})
	// 									.then(() => {
	// 										//						console.log(tempData);
	// 										setPamData([...tempData]);
	// 									});
	// 							});
	// 					});
	// 				});
	// 		}
	// 	}
	// }, [attributes, dispatch, policyId, setPamData]);

	return (
		<Table
			mode={'inner'}
			tableKey={tableKey}
			columns={column}
			data={data}
		/>
	);
};

InnerTableContainer.propTypes = {
	// policyId: PropTypes.string,
	// attributes: PropTypes.array,
	data: PropTypes.array,
	column: PropTypes.array,
	onClick: PropTypes.func,
	tableKey: PropTypes.string,
	origin: PropTypes.object,
};

export default InnerTableContainer;
