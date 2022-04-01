import React, {useEffect, useState} from 'react';
import TemplateContainer from './TemplateContainer';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TemplateListAside from './TemplateListAside';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
`;

/**************************************************
 * seob - 정책 작성 페이지의 템플릿 리스트
 *
 * isOpened: 추가할 템플릿 리스트 사이드의 open 상태
 * setIsOpened: 추가할 템플릿 리스트 사이드의 setOpen
 * policyType: iam, pam 유형 중 현재 정책유형
 ***************************************************/
const Templates = ({isOpened, setIsOpened, policyType}) => {
	// 정책 작성 페이지에 추가된 템플릿 리스트
	const [templateList, setTemplateList] = useState([]);

	/**************************************************
	 * seob - 정책 타입이 변경되는 경우 리스트 초기화
	 ***************************************************/
	useEffect(() => {
		setTemplateList([]);
	}, [policyType]);

	return (
		<>
			<Container>
				{templateList.map((v, i) => (
					<TemplateContainer
						key={i}
						template={v.template}
						render={v.component}
						setTemplateList={setTemplateList}
					/>
				))}
			</Container>

			{isOpened && (
				<TemplateListAside
					setTemplateList={setTemplateList}
					templateList={templateList}
					setIsOpened={setIsOpened}
					policyType={policyType}
				/>
			)}
		</>
	);
};

Templates.propTypes = {
	isOpened: PropTypes.bool,
	setIsOpened: PropTypes.func,
	policyType: PropTypes.string,
};

export default Templates;
