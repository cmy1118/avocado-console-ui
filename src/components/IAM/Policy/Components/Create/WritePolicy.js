import React, {useState} from 'react';
import Templates from '../Templates/Layout/Templates';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {NormalButton} from '../../../../../styles/components/buttons';
import {
	IamSectionBottomMargin,
	IamSectionTitleBar,
	TitleBar,
	TitleBarButtons,
	TitleBarText,
} from '../../../../../styles/components/iam/iam';
import {TextBoxDescription} from '../../../../../styles/components/iam/addPage';

const Container = styled.div``;

const Body = styled.div`
	display: flex;
`;

/**************************************************
 * seob - constant value 작성 (우선 각 컴포넌트 상위에 작성, 이후 별도의 파일로 관리)
 ***************************************************/
const contents = {
	openManagedPolicy: '관리형 정책 가져오기',
	add: '추가',
};

/**************************************************
 * seob - 정책 생성시 정책 템플릿을 작성하는 컴포넌트
 ***************************************************/
const WritePolicy = ({title, description, policyType}) => {
	// 정책 추가 사이드바 open 상태
	const [isOpened, setIsOpened] = useState(false);

	return (
		<IamSectionBottomMargin>
			<IamSectionTitleBar>
				<TitleBarText>
					{title}
					<TextBoxDescription>{description}</TextBoxDescription>
				</TitleBarText>
				<TitleBarButtons>
					<NormalButton
						onClick={() => console.log(contents.openManagedPolicy)}
					>
						{contents.openManagedPolicy}
					</NormalButton>
					<NormalButton onClick={() => setIsOpened(true)}>
						{contents.add}
					</NormalButton>
				</TitleBarButtons>
			</IamSectionTitleBar>
			<Body>
				<Templates
					isOpened={isOpened}
					setIsOpened={setIsOpened}
					policyType={policyType}
				/>
			</Body>
		</IamSectionBottomMargin>
	);
};

WritePolicy.propTypes = {
	title: PropTypes.string,
	description: PropTypes.string,
	policyType: PropTypes.string,
};

export default WritePolicy;
