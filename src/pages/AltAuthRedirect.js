import React from 'react';
import PropTypes from 'prop-types';

import Google from '../components/Redirect/Google';
import Naver from '../components/Redirect/Naver';
import Kakao from '../components/Redirect/Kakao';

const AltAuthRedirect = ({match}) => {
	console.log(match.path);
	return match.path === '/altauthredirect/google' ? (
		<Google />
	) : match.path === '/altauthredirect/naver' ? (
		<Naver />
	) : (
		match.path === '/altauthredirect/kakao' && <Kakao />
	);
};

AltAuthRedirect.propTypes = {
	match: PropTypes.shape({
		path: PropTypes.string.isRequired,
	}),
};

export default AltAuthRedirect;
