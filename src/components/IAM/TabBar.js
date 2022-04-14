import React, {useCallback, useMemo} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {useHistory, useLocation} from 'react-router-dom';
import qs from 'qs';
import {useDispatch} from 'react-redux';

const _TabContainer = styled.div`
	width: fit-content;
	box-shadow: 0 -4px 9px 0 rgba(0, 0, 0, 0.05);
	// padding: 10px 0px;
	font-family: NotoSansCJKKR;
	font-size: 13px;
	font-weight: normal;
	font-stretch: normal;
	font-style: normal;
	line-height: 1.62;
	letter-spacing: -0.25px;
	text-align: center;
	color: #343f55;
`;
const _TabSpace = styled.div`
	width: 100%;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	height: 50px;
	border-radius: 4px 4px 0px 0px;
`;
const _Tabs = styled.div`
	z-index: 100;
	display: flex;
	flex-warp: nowrap;
	align-items: center;
	justify-content: space-between;
	height: 100%;
	width: fit-content;
	padding: 8px 24px;
	box-shadow: ${(props) =>
		props.selected ? 'none' : 'inset 2px -2px 4px 0 rgb(0 0 0 / 4%)'};

	border: ${(props) => (props.selected ? 'none' : 'solid 1px #e1e7eb')};
	background-color: ${(props) => (props.selected ? '#ffffff' : '#fbfbfc')};
	&: first-child {
		border-radius: 4px 0px 0px 0px;
	}
	&: last-child {
		border-radius: 0px 4px 0px 0px;
	}
`;

const _TabItem = styled.div`
	display: flex;
	cursor: pointer;
	justify-content: center;
	align-items: center;
	height: 100%;
	text-align: center;
	color: ${(props) => (props.selected ? '#178082' : '#212121')};
	margin: 0px 16px;
	// border-top: ${(props) => (props.isfold ? '4px solid' : '2px solid')};
	// border-color: ${(props) => (props.selected ? '#178082' : '#ffffff')};
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
						<_Tabs
							selected={
								qs.parse(search, {ignoreQueryPrefix: true})
									.tabs === v.href
							}
							key={i}
						>
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
};
export default TabBar;
