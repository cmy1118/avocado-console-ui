import ResourceGrooupTableContainer from './ResourceGrooupTableContainer';
import ResourceTableContainer from './ResourceTableContainer';
import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components';
import {HoverIconButton} from '../../../../../../../styles/components/icons';
import {arrowDownIcon, arrowRightIcon} from '../../../../../../../icons/icons';
import PropTypes from 'prop-types';

const _Container = styled.div``;

const _Header = styled.div`
	box-sizing: border-box;
	padding: 0px 16px;
	height: 54px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 16px;
	font-weight: 500;
	font-stretch: normal;
	font-style: normal;
	letter-spacing: 0.1px;
	text-align: left;
	color: #212121;
`;

const _Body = styled.div`
	display: ${(props) => (props.isOpened ? 'block' : 'none')};
	padding: 8px;
`;

const resourceSelectionContainer = {
	resourceGroup: {title: '자원그룹'},
	resource: {title: '자원'},
};

const ResourceSelectionContainer = ({disabled = false, setSelected}) => {
	//isResourceGroupOpened: 선택된 자원 그룹 펼치기
	const [isResourceGroupOpened, setIsResourceGroupOpened] = useState(false);
	//isResourceOpened: 선택된 자원  펼치기
	const [isResourceOpened, setIsResourceOpened] = useState(false);
	//selectedResourceGroup: 선택된 자원 그룹
	const [selectedResourceGroup, setSelectedResourceGroup] = useState([]);
	//selectedResource: 선택된 자원
	const [selectedResource, setSelectedResource] = useState([]);

	/**************************************************
	 * ambacc244 - 자원 테이블 접고 펼치기
	 **************************************************/
	const onClickFoldResourceGroupTable = useCallback(() => {
		if (!disabled) {
			setIsResourceGroupOpened(!isResourceGroupOpened);
		}
	}, [disabled, isResourceGroupOpened]);

	/**************************************************
	 * ambacc244 - 자원 그룹 테이블 접고 펼치기
	 **************************************************/
	const onClickFoldResourceTable = useCallback(() => {
		if (!disabled) {
			setIsResourceOpened(!isResourceOpened);
		}
	}, [disabled, isResourceOpened]);

	/**************************************************
	 * ambacc244 -선택된 자원, 자원 그룹이 변경을 감짙
	 **************************************************/
	useEffect(() => {
		setSelected({group: selectedResourceGroup, resource: selectedResource});
	}, [selectedResourceGroup, selectedResource]);

	/**************************************************
	 * ambacc244 - 모든 자원을 선택 했을때 선택된 자원과, 그룹 해제
	 **************************************************/
	useEffect(() => {
		//모든 자원 선택
		if (disabled) {
			//선택된 그룹을 비워줌
			setSelectedResourceGroup([]);
			//선택된 자원을 비워줌
			setSelectedResource([]);
			//그룹 테이블 닫기
			setIsResourceGroupOpened(false);
			//자원 테이블 닫기
			setIsResourceOpened(false);
		}
	}, [disabled]);

	return (
		<_Container>
			<_Header
				className={
					isResourceGroupOpened ? 'fold-title' : 'fold-title close'
				}
			>
				{resourceSelectionContainer.resourceGroup.title}
				{!disabled && ' : ' + selectedResourceGroup.length}
				<HoverIconButton
					color={'font'}
					size={'m'}
					margin={'0px'}
					onClick={onClickFoldResourceGroupTable}
				>
					{isResourceGroupOpened ? arrowDownIcon : arrowRightIcon}
				</HoverIconButton>
			</_Header>
			<_Body isOpened={isResourceGroupOpened}>
				<ResourceGrooupTableContainer
					selected={selectedResourceGroup}
					setSelected={setSelectedResourceGroup}
				/>
			</_Body>

			<_Header
				className={isResourceOpened ? 'fold-title' : 'fold-title close'}
			>
				{resourceSelectionContainer.resource.title}
				{!disabled && ' : ' + selectedResource.length}
				<HoverIconButton
					color={'font'}
					size={'m'}
					margin={'0px'}
					onClick={onClickFoldResourceTable}
				>
					{isResourceOpened ? arrowDownIcon : arrowRightIcon}
				</HoverIconButton>
			</_Header>
			<_Body isOpened={isResourceOpened}>
				<ResourceTableContainer
					selected={selectedResource}
					setSelected={setSelectedResource}
				/>
			</_Body>
		</_Container>
	);
};

ResourceSelectionContainer.propTypes = {
	disabled: PropTypes.bool.isRequired,
	setSelected: PropTypes.func.isRequired,
};

export default ResourceSelectionContainer;
