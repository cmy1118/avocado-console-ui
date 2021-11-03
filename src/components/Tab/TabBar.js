import React, {useCallback} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import TableOptionsBar from '../Table/TableOptionsBar';
import {Tab, TabItem} from '../../styles/components/tab';
import {useHistory, useLocation} from 'react-router-dom';
import qs from 'qs';
const _TabContainer = styled.div`
	display: block;
	width: 100%;
	// position: fixed;
	// bottom: 0;
	// width: 100%;
	// z-index: 75;
	background: #ffffff;
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
	box-shadow: 0 -4px 9px 0 rgba(0, 0, 0, 0.05);
	display: flex;
	flex-warp: nowrap;
	align-items: center;
	justify-content: space-between;
	height: 100%;
	width: fit-content;
	// width: 60px;
`;

const _TabItem = styled.div`
	display: flex;
	cursor: pointer;
	justify-content: center;
	align-items: center;
	height: 100%;
	font-size: 14px;
	font-weight: bold;
	font-style: normal;
	line-height: 1.43;
	letter-spacing: 0.25px;
	text-align: center;
	color: #178082;
	color: ${(props) => (props.selected ? '#178082' : '#212121')};
	margin: 0px 16px;
	border-bottom: ${(props) => (props.isfold ? '4px solid' : '2px solid')};
	// border-bottom: 5px solid;
	border-color: ${(props) => (props.selected ? '#178082' : '#ffffff')};
	width: 100%;
`;
const TabBar = ({Tabs, param, Id, isOpened, setIsOpened}) => {
	const history = useHistory();
	const {search} = useLocation();

	const onClickChangeTab = useCallback(
		(v) => () => {
			setIsOpened(false);
			history.push({
				pathname: `/${param}/${Id}`,
				search: `tabs=${v}`,
			});
		},
		[history, setIsOpened, Id],
	);
	return (
		<_TabContainer>
			<_TabSpace>
				{Tabs.map((v) => {
					return (
						// eslint-disable-next-line react/jsx-key
						<_Tabs>
							<_TabItem
								isfold={isOpened}
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
	Id: PropTypes.string.isRequired,
	param: PropTypes.string.isRequired,
	isOpened: PropTypes.bool.isRequired,
	setIsOpened: PropTypes.func.isRequired,
};
export default TabBar;
