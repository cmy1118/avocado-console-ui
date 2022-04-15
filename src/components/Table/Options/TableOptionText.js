import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const USERS_GROUPS = ['아래의 사용자를 선택하여 이그룹에 추가 할 수 있습니다.'];
const USERS_ROLES = ['아래의 사용자를 선택하여 이역할에 추가 할 수 있습니다.'];
const USERS_INFO = [
	'비밀번호는 생성 규칙에 따라 랜덤 생성이며 사용자 이메일로 발송 됩니다.',
];
const GROUPS = [
	'그룹 유형별 1개의 그룹만 추가 가능합니다.',
	'최대 10개까지만 추가 가능합니다.',
];
const GROUPS_TYPE = [
	'그룹 유형명은 최대100자까지 입력 가능합니다.',
	'그룹 유형 설명은 최대 300자 까지 입력 가능합니다.',
];
const ROLES = [
	'Private 유형은 한 사용자에게만 부여 가능합니다.',
	'최대 10개까지만 부여 가능합니다.',
];
const POLIICIES = [
	'아래의 정책을 선택하여 이 역할과 연결 할 수 있습니다.',
	'최대 10개 까지만 연결 가능합니다.',
];
const TAGS = [
	'IAM 태그는 사용자에 추가할 수 있는 키-값 페어입니다.',
	'태그는 이메일 주소와 같은 사용자 정보를 포함하거나 직책과 같은 내용일 수 있습니다.',
	'key(태그명)는 최대 100자, 값(태그)는 최대 250자 영문숫자만 가능합니다.',
	'태그는 사용자별 최대 10개까지만 등록 가능합니다.',
];

const ROLE_POLICY = ['유형별 5개까지만 연결 가능합니다'];

const _TableOptionTextContainer = styled.div`
	padding: 0px 0px 16px 0px;
`;
const _TableOptionTextContants = styled.div`
	padding: 0px 4px;
	display: flex;
	align-items: center;
	font-size: 13px;
	line-height: 1.8;
	letter-spacing: -0.25px;
	text-align: left;
	color: #343f55;
`;

const TableOptionText = ({data}) => {
	const optionText = (data) => {
		switch (data) {
			case 'usersGroups':
				return USERS_GROUPS;
			case 'usersRoles':
				return USERS_ROLES;
			case 'usersInfo':
				return USERS_INFO;
			case 'groups':
				return GROUPS;
			case 'groupsType':
				return GROUPS_TYPE;
			case 'roles':
				return ROLES;
			case 'policies':
				return POLIICIES;
			case 'tags':
				return TAGS;
			case 'rolePolicy':
				return ROLE_POLICY;
			default:
				return '';
		}
	};
	return (
		<_TableOptionTextContainer>
			{optionText(data).map((v, index) => {
				return (
					<div key={index}>
						<_TableOptionTextContants key={index}>
							<li style={{paddingLeft: '5px'}}> {v}</li>
						</_TableOptionTextContants>
					</div>
				);
			})}
		</_TableOptionTextContainer>
	);
};
TableOptionText.propTypes = {
	data: PropTypes.string.isRequired,
};
export default TableOptionText;
