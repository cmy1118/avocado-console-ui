import React, {useEffect, useMemo, useState} from 'react';

import TableContainer from './TableContainer';
import Table from './Table';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import PAM_POLICY from '../../reducers/api/ PAM/Role/policy';
import RRM_RESOURCE from '../../reducers/api/RRM/Resource/resource';

const InnerTableContainer = ({policyId, attributes}) => {
	const dispatch = useDispatch();

	const [pamData, setPamData] = useState([]);

	console.log(attributes);
	const columns = useMemo(() => {
		return attributes
			? attributes.columns
			: [
					{
						Header: '리소스 이름(ID/DNS)',
						accessor: 'resource',
					},
					{
						Header: 'Protocol',
						accessor: 'protocol',
					},
					{
						Header: 'account',
						accessor: 'account',
					},
			  ];
	}, [attributes]);

	const data = useMemo(() => {
		return attributes ? attributes.data : [...pamData];
	}, [attributes, pamData]);

	useEffect(() => {
		if (!attributes) {
			let tempData = [];

			dispatch(
				PAM_POLICY.asyncAction.FindByIdPermissionAction({
					policyId: policyId,
					range: 'elements=0-50',
				}),
			)
				.unwrap()
				.then((res) => {
					res.map((v) => {
						let tempArray = v.split(':');
						let resourceId = '';
						let tempDataObject = new Object();

						tempArray.pop();
						tempArray.pop();

						tempArray.map((v, i) => {
							resourceId += v;
							if (i !== tempArray.length - 1) resourceId += ':';
						});

						dispatch(
							RRM_RESOURCE.asyncAction.findByIdAction({
								id: resourceId,
							}),
						)
							.unwrap()
							.then((r) => {
								tempDataObject.id = r.id;
								tempDataObject.keyId = r.id;
								tempDataObject.resource =
									r.name +
									' (' +
									r.servicePorts[0].address +
									')';
								tempDataObject.protocol =
									r.servicePorts[0].name;

								dispatch(
									RRM_RESOURCE.asyncAction.findAllAccountAction(
										{
											resourceId: resourceId,
										},
									),
								)
									.unwrap()
									.then((val) => {
										tempDataObject.account =
											val[0].accountId.userId;
									})
									.then(() => {
										tempData.push(tempDataObject);
									})
									.then(() => {
										setPamData([...tempData]);
									});
							});
					});
				});
		}
	}, [attributes, dispatch, policyId, setPamData]);

	return (
		<div>
			<TableContainer
				mode={'inner'}
				tableKey={'innerTable'}
				columns={columns}
				data={data}
			>
				<Table />
			</TableContainer>
		</div>
	);
};

InnerTableContainer.propTypes = {
	policyId: PropTypes.string,
	attributes: PropTypes.array,
};

export default InnerTableContainer;
