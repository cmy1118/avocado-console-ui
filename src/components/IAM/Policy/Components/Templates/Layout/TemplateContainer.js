import React, {useState} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {arrowDownIcon, arrowRightIcon} from '../../../../../../icons/icons';
import {HoverIconButton} from '../../../../../../styles/components/icons';
import {TransparentButton} from '../../../../../../styles/components/buttons';

const Container = styled.div`
	.fold-title {
		border-bottom: 2px transparent dotted;
	}

	.fold-title.close {
		border-bottom: 2px #e3e5e5 dotted;
	}
`;

const Title = styled.div`
	display: flex;
	align-items: center;
`;

const Header = styled.div`
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

const Body = styled.div`
	display: ${(props) => (props.isOpened ? 'block' : 'none')};
	padding: 8px;
`;

/**************************************************
 * seob - constant value 작성 (우선 각 컴포넌트 상위에 작성, 이후 별도의 파일로 관리)
 ***************************************************/
const contents = {
	isFold: '열기',
	isUnfold: '닫기',
	delete: '삭제',
};

/**************************************************
 * seob - 템플릿 리스트 개별 아이템의 컨테이너 (foldable 기능, 템플릿 리스트에서 아이템 제거 기능)
 *
 * template: 템플릿
 * setTemplateList: 템플릿 리스트 set 함수
 * render: 각각의 템플릿 컴포넌트 렌더 프로퍼티
 ***************************************************/
const TemplateContainer = ({template, setTemplateList, render}) => {
	// fold 상태
	const [isOpened, setIsOpened] = useState(true);

	/**************************************************
	 * seob - templateList에서 현재 템플릿을 제거하는 함수
	 ***************************************************/
	const deleteTemplate = () => {
		setTemplateList((prev) =>
			prev.filter((item) => item.template !== template),
		);
	};

	return (
		<Container>
			<Header className={isOpened ? 'fold-title' : 'fold-title close'}>
				<Title>
					<HoverIconButton
						color={'font'}
						size={'m'}
						margin={'0px'}
						onClick={() => setIsOpened(!isOpened)}
					>
						{isOpened ? arrowDownIcon : arrowRightIcon}
					</HoverIconButton>
					<span>{template.name}</span>
				</Title>
				<div>
					<TransparentButton
						type={'button'}
						margin='0px 0px 0px 5px'
						onClick={deleteTemplate}
					>
						{contents.delete}
					</TransparentButton>
				</div>
			</Header>
			<Body isOpened={isOpened}>{render}</Body>
		</Container>
	);
};

TemplateContainer.propTypes = {
	template: PropTypes.object,
	setTemplateList: PropTypes.func,
	render: PropTypes.object,
};

export default TemplateContainer;
