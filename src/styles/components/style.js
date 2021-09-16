import styled from 'styled-components';

export const _IamContainer = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
`;

export const _NavContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 255px;
	transition: margin 0.5s ease-in-out;

	&.close {
		display: none;
		transform: translateX(-255px);
	}
`;

export const _NavItemList = styled.div`
	display: flex;
	flex-direction: column;
`;

export const _PathContainer = styled.div`
	display: flex;
`;

export const _AsideContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 255px;
	transition: margin 0.5s ease-in-out;
	&.close {
		display: none;
		transform: translateX(255px);
	}
`;

export const _MainContainer = styled.div`
	flex: 1;
`;
