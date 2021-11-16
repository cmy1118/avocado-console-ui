import React from 'react';
import {AsideContainer} from '../../styles/components/aside';

export const onClickCloseAside = () => {
	document.querySelector('.aside-bar').classList.toggle('close');
};

const Aside = () => {
	return (
		<AsideContainer className={'aside-bar'}>
			<div> Aside : click ⚠️ button </div>
		</AsideContainer>
	);
};

export default Aside;
