import styled from 'styled-components';

export const IamContainer = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
`;

export const NavContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 255px;
	transition: margin 0.5s ease-in-out;

	&.close {
		display: none;
		transform: translateX(-255px);
	}
`;

export const NavItemList = styled.div`
	display: flex;
	flex-direction: column;
`;

export const PathContainer = styled.div`
	display: flex;
`;

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

export const MainContainer = styled.div`
	flex: 1;
`;

export const SubTitle = styled.div`
	display: flex;
	justify-content: space-between;
`;
