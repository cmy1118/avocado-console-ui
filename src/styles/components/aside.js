import styled from 'styled-components';

export const AsideContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 255px;
	transition: margin 0.5s ease-in-out;
	&.close {
		display: none;
		transform: translateX(255px);
	}
`;
