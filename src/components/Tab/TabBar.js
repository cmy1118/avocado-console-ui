import React, {useCallback} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import TableOptionsBar from '../Table/TableOptionsBar';
import {Tab, TabItem} from '../../styles/components/tab';
import {useHistory, useLocation} from 'react-router-dom';
import qs from 'qs';
const _TabContainer = styled.div`
	display: block;
	// position: fixed;
	// bottom: 0;
	// width: 100%;
	// z-index: 75;
	background: #ffffff;
`;
const _TabSpace = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 50px;
	box-shadow: 0 -4px 9px 0 rgba(0, 0, 0, 0.05);
	border-bottom: 1px solid #e3e5e5;
	background: #fff;
`;
const _Tabs = styled.div`
	display: flex;
	flex-warp: nowrap;
	align-items: center;
	justify-content: space-between;
	height: 100%;
	width: 127px;
`;

const _TabItem = styled.div`
	display: flex;
	cursor: pointer;
	justify-content: center;
	align-items: center;
	height: 100%;
	font-weight: bold;
	color: ${(props) => (props.selected ? '#178082' : '#212121')};
	margin: 0px 16px;
	border-bottom: 2px solid;
	border-color: ${(props) => (props.selected ? '#178082' : '#ffffff')};
	width: 100%;
`;
const TabBar = ({Tabs, userId, isOpened, setIsOpened}) => {
	const history = useHistory();
	const {search} = useLocation();

	const onClickChangeTab = useCallback(
		(v) => () => {
			setIsOpened(false);
			history.push({
				pathname: `/users/${userId}`,
				search: `tabs=${v}`,
			});
		},
		[history, setIsOpened, userId],
	);
	console.log('isOpened:', isOpened);
	return (
		<_TabContainer>
			<_TabSpace>
				{Tabs.map((v) => {
					return (
						// eslint-disable-next-line react/jsx-key
						<_Tabs>
							<_TabItem
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
	userId: PropTypes.string.isRequired,
	isOpened: PropTypes.bool.isRequired,
	setIsOpened: PropTypes.func.isRequired,
};
export default TabBar;
