import React, {useState} from 'react';
import Templates from './Templates';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {NormalButton} from '../../../../styles/components/buttons';
import {
	TitleBar,
	TitleBarButtons,
	TitleBarText,
} from '../../../../styles/components/iam/iam';
import {TextBoxDescription} from '../../../../styles/components/iam/addPage';

const Container = styled.div``;

const Header = styled.div`
	display: flex;
	justify-content: space-between;
`;
const Body = styled.div`
	display: flex;
`;

const Title = styled.div`
	display: flex;
	h3,
	h5 {
		margin: 0px;
		padding: 4px;
	}
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
const WritePolicy = ({title, description}) => {
	// 정책 추가 사이드바 open 상태
	const [isOpened, setIsOpened] = useState(false);

	return (
		<Container>
			<TitleBar>
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
			</TitleBar>
			<Body>
				<Templates isOpened={isOpened} />
			</Body>
		</Container>
	);
};

WritePolicy.propTypes = {
	title: PropTypes.string,
	description: PropTypes.string,
};

export default WritePolicy;
