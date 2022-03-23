import React, {useCallback, useMemo} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {useHistory, useLocation} from 'react-router-dom';
import qs from 'qs';
import DIALOG_BOX from '../../reducers/dialogBoxs';
import {confirmAlertMessages} from '../../utils/alertMessage';
import {useDispatch} from 'react-redux';

const _TabContainer = styled.div`
	width: 100%;
	box-shadow: 0 -4px 9px 0 rgba(0, 0, 0, 0.05);
	background: #ffffff;
	// padding: 10px 0px;
`;
const _TabSpace = styled.div`
	width: 100%;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	height: 50px;
	background: #fff;
`;
const _Tabs = styled.div`
	display: flex;
	flex-warp: nowrap;
	align-items: center;
	justify-content: space-between;
	height: 100%;
	width: fit-content;
`;

const _TabItem = styled.div`
	display: flex;
	cursor: pointer;
	justify-content: center;
	align-items: center;
	height: 100%;
	font-size: 14px;
	line-height: 1.43;
	letter-spacing: 0.25px;
	text-align: center;
	color: ${(props) => (props.selected ? '#178082' : '#212121')};
	margin: 0px 16px;
	border-bottom: ${(props) => (props.isfold ? '4px solid' : '2px solid')};
	border-color: ${(props) => (props.selected ? '#178082' : '#ffffff')};
	width: 100%;
`;

const TabBar = ({Tabs}) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const {search} = useLocation();

	const isTabOpened = useMemo(() => {
		if (location.search) return false;
		else return true;
	}, [location.search]);

	const onClickChangeTab = useCallback(
		(v) => () => {
			history.push({
				pathname: location.pathname,
				search: `tabs=${v}`,
			});
		},
		[dispatch, history],
	);
	return (
		<_TabContainer>
			<_TabSpace>
				{Tabs.map((v, i) => {
					return (
						<_Tabs key={i}>
							<_TabItem
								isfold={isTabOpened}
								selected={
									qs.parse(search, {ignoreQueryPrefix: true})
										.tabs === v.href
								}
								onClick={onClickChangeTab(v.href)}
							>
								{v.name}
							</_TabItem>
						</_Tabs>
					);
				})}
			</_TabSpace>
		</_TabContainer>
	);
};
TabBar.propTypes = {
	Tabs: PropTypes.array.isRequired,
	isOpened: PropTypes.bool.isRequired,
	setIsOpened: PropTypes.func.isRequired,
};
export default TabBar;
