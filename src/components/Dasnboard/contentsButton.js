import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import AssignRoleToUser from '../IAM/User/Components/AssignRoleToUser';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';

const _Container = styled.div``;
const _imgContainer = styled.div`
	position: relative;
	width: 252px;
	height: 240px;
	cursor: pointer;
	transform: 2s;
	transition: 0.4s;
	:hover {
		transform: translate(0, -5px);
		opacity: 0.9;
	}
`;
const _textContents = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, 100%);
`;
const _title = styled.div`
	font-family: NotoSansCJKKR;
	font-size: 18px;
	font-weight: bold;
	font-stretch: normal;
	font-style: normal;
	line-height: 1.11;
	letter-spacing: 0.25px;
	text-align: center;
	color: #fff;
	margin-bottom: 5px;
	// text-shadow: 0.5px 0.5px 0.5px black;
`;
const _text = styled.div`
	font-family: NotoSansCJKKR;
	font-size: 12px;
	font-weight: normal;
	font-stretch: normal;
	font-style: normal;
	line-height: 1.67;
	letter-spacing: 0.25px;
	text-align: center;
	color: #fff;
	// text-shadow: 0.5px 0.5px 0.5px black;
`;

const ContentsButton = ({url, href, img, title, text}) => {
	const history = useHistory();

	const onClickMove = useCallback(() => {
		// history.push('');
		console.log('href:', href);
		console.log('href:', url);
		history.push(url);
	}, [history, href, url]);

	return (
		<_Container>
			{href === 'ssh://' ? (
				<a href={'ssh://'}>
					<_imgContainer>
						<img
							style={{width: '252px', height: '240px'}}
							src={img}
						/>
						{/*<img style={{width:"252px",height:"240px"}} src={img} onClick={onClickMove} />*/}
						<_textContents>
							<_title>{title}</_title>
							<_text>{text}</_text>
						</_textContents>
					</_imgContainer>
				</a>
			) : (
				<_imgContainer>
					{/*<img style={{width: '252px', height: '240px'}} src={img} />*/}
					<img
						style={{width: '252px', height: '240px'}}
						src={img}
						onClick={onClickMove}
					/>
					<_textContents>
						<_title>{title}</_title>
						<_text>{text}</_text>
					</_textContents>
				</_imgContainer>
			)}
		</_Container>
	);
};
ContentsButton.propTypes = {
	url: PropTypes.string,
	href: PropTypes.string,
	img: PropTypes.string,
	title: PropTypes.string,
	text: PropTypes.string,
};

export default ContentsButton;
