import React, {useCallback, useEffect, useMemo, useState} from 'react';
import ModalTableContainer from '../../RecycleComponents/ModalTableContainer';
import {DRAGGABLE_KEY, tableKeys} from '../../../Constants/Table/keys';
import Table from '../../Table/Table';
import {tableColumns} from '../../../Constants/Table/columns';
import {useDispatch, useSelector} from 'react-redux';
import CURRENT_TARGET from '../../../reducers/currentTarget';
import PropTypes from 'prop-types';
import {LiText} from '../../../styles/components/text';
import {
	descriptionConverter,
	descValues,
	rolesConverter,
} from '../../../utils/tableDataConverter';
import {SummaryList} from '../../../styles/components/iam/descriptionPage';
import {TitleBar} from '../../../styles/components/iam/iam';
import {AddPageDialogBoxTitle} from '../../../styles/components/iam/addPage';
import IAM_USER from '../../../reducers/api/IAM/User/User/user';
import IAM_USER_GROUP_MEMBER from '../../../reducers/api/IAM/User/Group/groupMember';
import IAM_ROLES_GRANT_ROLE_USER from '../../../reducers/api/IAM/User/Role/GrantRole/user';
import {useHistory} from 'react-router-dom';
import IAM_USER_TAG from '../../../reducers/api/IAM/User/Tag/tags';
import IAM_GRANT_POLICY_BY_ROLE from '../../../reducers/api/IAM/User/Policy/GrantPolicy/role';
import * as _ from 'lodash';
const UserPreviewDialogBox = ({isOpened, setIsOpened}) => {
	const {readOnlyData} = useSelector(CURRENT_TARGET.selector);
	const dispatch = useDispatch();
	const history = useHistory();
	const [permissions, setPermissions] = useState(null);

	const submitUserInfo = useCallback(() => {
		//	console.log(readOnlyData);
		// 나머지 그룹, 역할, 태그 맵핑은 이후에 처리..
		dispatch(
			IAM_USER.asyncAction.createAction({
				id: readOnlyData['user'].id,
				name: readOnlyData['user'].name,
				password: '12345', // 비밀번호는 생성 규칙에 따라 랜덤생성이며 사용자 이메일로 발송. 현재는 임의값.
				email: readOnlyData['user'].email,
				telephone: readOnlyData['user'].telephone,
				mobile: readOnlyData['user'].mobile,
			}),
		)
			.unwrap()
			.then((user) => {
				if (user.headers.location) {
					const userUid = user.headers.location.split('/').pop();
					readOnlyData[tableKeys.users.add.groups.exclude]
						.map((v) => v.id)
						.forEach((groupId) => {
							dispatch(
								IAM_USER_GROUP_MEMBER.asyncAction.joinAction({
									groupId: groupId,
									userUid: [userUid],
								}),
							);
						});

					dispatch(
						IAM_ROLES_GRANT_ROLE_USER.asyncAction.grantAction({
							roleIds: readOnlyData[
								tableKeys.users.add.roles.exclude
							].map((v) => v.id),
							userUid,
						}),
					);
					readOnlyData[tableKeys.users.add.tag].forEach((tag) => {
						dispatch(
							IAM_USER_TAG.asyncAction.createAction({
								userUid: userUid,
								name: tag.name,
								value: tag.value,
							}),
						);
					});
				}
			})
			.then(() => {
				history.push('/users');
				setIsOpened(false);
			});
	}, [dispatch, history, readOnlyData, setIsOpened]);

	const groupData = useMemo(
		() =>
			readOnlyData[tableKeys.users.add.groups.exclude]?.map((v) => ({
				...v,
				roles: rolesConverter(v.numberOfRoles),
				createdTime: v.createdTag.createdTime,
				[DRAGGABLE_KEY]: v.id,
				// roles: rolesConverter(v.roles),
			})),
		[readOnlyData],
	);

	const roleData = useMemo(() => {
		console.log(
			readOnlyData[tableKeys.users.add.roles.exclude]?.map((v) => v.id),
		);
		return (
			permissions?.map((v) => ({
				name: v.policy.details
					? descValues(v.policy?.details[0]?.policyType)
					: v.policy.name,
				description: v.policy.details
					? `${descriptionConverter(v.policy.details)}`
					: v.policy.description,
				policyName: v.policy.templateName,
				roleName: v.role.name,
				grantUser: v.user,
				id: v.role.id + v.policy.templateId,
				[DRAGGABLE_KEY]: v.role.id + v.policy.templateId,

				// grantTarget:
			})) || []
		);
	}, [permissions, readOnlyData]);

	const tagData = useMemo(
		() =>
			readOnlyData[tableKeys.users.add.tag]?.map((v) => ({
				...v,
				[DRAGGABLE_KEY]: v.id,

				// roles: rolesConverter(v.roles),
			})),
		[readOnlyData],
	);

	useEffect(() => {
		if (readOnlyData[tableKeys.users.add.roles.exclude] && isOpened) {
			const policiesBox = [];
			readOnlyData[tableKeys.users.add.roles.exclude].forEach((role) => {
				dispatch(
					IAM_GRANT_POLICY_BY_ROLE.asyncAction.getsAction({
						roleId: role.id,
						range: `elements=0-50`,
					}),
				)
					.unwrap()
					.then((policies) => {
						if (!policies.data) {
							if (
								readOnlyData[tableKeys.users.add.roles.exclude]
									.map((v) => v.id)
									.includes('KR-2020-0005:00000000002')
							) {
								policiesBox.push(
									[
										{
											user: {
												userUid: 'KR-2020-0005:0000001',
												id: 'jinwoo',
												name: '김진우',
												email: 'jinwoo@kt.com',
												status: {
													code: 0,
													name: 'Actived',
												},
												createdTag: {
													createdTime:
														'2021-11-26T18:24:27.421+09:00',
													actorTag: {
														applicationCode: {
															code: 'open-api',
															description:
																'Open API Server',
														},
														clientId: 'client',
														requestId:
															'41f1b730-8b8e-4185-9386-8456b707ad65',
														userUid:
															'KR-2020-0005:0000001',
													},
												},
											},
											role: {
												name: 'resource-policy',
												id: 'KR-2020-0005:00000000002',
											},
											policy: {
												templateId: 'default',

												id: 'default',
												name: '접근 자원',
												description:
													'avocado-pam-server (ec2-13-124-198-15.ap-northeast-2.compute.amazonaws.com) / SSH / root\navocado-pam-connector (ec2-15-164-22-197.ap-northeast-2.compute.amazonaws.com) / SSH / root\nRabbitMQ (ec2-13-209-99-140.ap-northeast-2.compute.amazonaws.com) / SSH / root\navocado-console-ui (ec2-3-36-98-38.ap-northeast-2.compute.amazonaws.com) / SSH / root',
												type: '접근자원',
												templateName:
													'resource-permission',
												createdTime:
													'2021-11-26T19:13:21.266+09:00',
											},
										},
									],
									[
										{
											user: {
												userUid: 'KR-2020-0005:0000001',
												id: 'jinwoo',
												name: '김진우',
												email: 'jinwoo@kt.com',
												status: {
													code: 0,
													name: 'Actived',
												},
												createdTag: {
													createdTime:
														'2021-11-26T18:24:27.421+09:00',
													actorTag: {
														applicationCode: {
															code: 'open-api',
															description:
																'Open API Server',
														},
														clientId: 'client',
														requestId:
															'41f1b730-8b8e-4185-9386-8456b707ad65',
														userUid:
															'KR-2020-0005:0000001',
													},
												},
											},
											role: {
												name: 'resource-policy',
												id: 'KR-2020-0005:00000000002',
											},
											policy: {
												templateId: 'default2',

												id: 'default',
												name: '명령어',
												description:
													'제어 유형 : Black\n제어 명령어 : kill\n 위반 횟수 : 1회\n 정책 : 세션차단\n초기화 : 10초',
												type: '명령어 제어',
												templateName:
													'commandControl-policy',
												createdTime:
													'2021-11-26T19:13:21.266+09:00',
											},
										},
									],
								);
								if (
									policiesBox.length ===
									readOnlyData[
										tableKeys.users.add.roles.exclude
									].length +
										1
								) {
									console.log(policiesBox);
									const arr = _.flatten(policiesBox);
									console.log(arr);
									setPermissions(arr);
								}
							} else if (
								readOnlyData[tableKeys.users.add.roles.exclude]
									.map((v) => v.id)
									.includes('KR-2020-0006:00000000002')
							) {
								policiesBox.push(
									[
										{
											user: {
												userUid: 'KR-2020-0006:0000001',
												id: 'myhee',
												name: '김미희',
												email: 'myhee@sk.com',
												status: {
													code: 0,
													name: 'Actived',
												},
												createdTag: {
													createdTime:
														'2021-11-26T18:24:27.421+09:00',
													actorTag: {
														applicationCode: {
															code: 'open-api',
															description:
																'Open API Server',
														},
														clientId: 'client',
														requestId:
															'41f1b730-8b8e-4185-9386-8456b707ad65',
														userUid:
															'KR-2020-0005:0000001',
													},
												},
											},
											role: {
												name: 'resource-policy',
												id: 'KR-2020-0006:00000000002',
											},
											policy: {
												templateId: 'default',

												id: 'default',
												name: '접근 자원',
												description:
													'key-server (ec2-13-124-198-15.ap-northeast-2.compute.amazonaws.com) / SSH / root\napp-dev-server (ec2-15-164-22-197.ap-northeast-2.compute.amazonaws.com) / SSH / root\nui-server (ec2-3-36-98-38.ap-northeast-2.compute.amazonaws.com) / SSH / root\nMessage Queue (ec2-13-209-99-140.ap-northeast-2.compute.amazonaws.com) / SSH / root',
												type: '접근자원',
												templateName:
													'resource-permission',
												createdTime:
													'2021-11-26T19:13:21.266+09:00',
											},
										},
									],
									[
										{
											user: {
												userUid: 'KR-2020-0006:0000001',
												id: 'myhee',
												name: '김미희',
												email: 'myhee@sk.com',
												status: {
													code: 0,
													name: 'Actived',
												},
												createdTag: {
													createdTime:
														'2021-11-26T18:24:27.421+09:00',
													actorTag: {
														applicationCode: {
															code: 'open-api',
															description:
																'Open API Server',
														},
														clientId: 'client',
														requestId:
															'41f1b730-8b8e-4185-9386-8456b707ad65',
														userUid:
															'KR-2020-0006:0000001',
													},
												},
											},
											role: {
												name: 'resource-policy',
												id: 'KR-2020-0006:00000000002',
											},
											policy: {
												templateId: 'default2',

												id: 'default',
												name: '명령어',
												description:
													'제어 유형 : Black\n제어 명령어 : kill\n 위반 횟수 : 1회\n 정책 : 세션차단\n초기화 : 10초',
												type: '명령어 제어',
												templateName:
													'commandControl-policy',
												createdTime:
													'2021-11-26T19:13:21.266+09:00',
											},
										},
									],
								);
								if (
									policiesBox.length ===
									readOnlyData[
										tableKeys.users.add.roles.exclude
									].length +
										1
								) {
									console.log(policiesBox);
									const arr = _.flatten(policiesBox);
									console.log(arr);
									setPermissions(arr);
								}
							}
						} else {
							policies.data.forEach((policy) => {
								dispatch(
									IAM_USER.asyncAction.findByUidAction({
										userUid:
											policy.createdTag.actorTag.userUid,
									}),
								)
									.unwrap()
									.then((user) => {
										policiesBox.push(
											policies.data
												? policies.data.map(
														(policy) => ({
															user,
															role,
															policy,
														}),
												  )
												: [],
										);

										if (
											readOnlyData[
												tableKeys.users.add.roles
													.exclude
											]
												.map((v) => v.id)
												.includes(
													'KR-2020-0005:00000000002',
												) ||
											readOnlyData[
												tableKeys.users.add.roles
													.exclude
											]
												.map((v) => v.id)
												.includes(
													'KR-2020-0006:00000000002',
												)
										) {
											if (
												policiesBox.length ===
												readOnlyData[
													tableKeys.users.add.roles
														.exclude
												].length +
													1
											) {
												console.log(policiesBox);
												const arr = _.flatten(
													policiesBox,
												);
												console.log(arr);
												setPermissions(arr);
											}
										} else {
											if (
												policiesBox.length ===
												readOnlyData[
													tableKeys.users.add.roles
														.exclude
												].length
											) {
												console.log(policiesBox);
												const arr = _.flatten(
													policiesBox,
												);
												console.log(arr);
												setPermissions(arr);
											}
										}
									});
							});
						}
					});
			});
		}
	}, [dispatch, isOpened, readOnlyData]);

	return readOnlyData['user'] ? (
		<ModalTableContainer
			title={'사용자 생성 요약보기'}
			isOpened={isOpened}
			setIsOpened={setIsOpened}
			handleSubmit={submitUserInfo}
		>
			<TitleBar>사용자 기본정보</TitleBar>
			<SummaryList>
				<LiText>사용자 계정 : {readOnlyData['user'].id}</LiText>
				<LiText>사용자 이름 : {readOnlyData['user'].name}</LiText>
				<LiText>이메일 주소 : {readOnlyData['user'].email}</LiText>
				<LiText>전화 번호 : {readOnlyData['user'].telephone}</LiText>
				<LiText>
					모바일 전화 번호 : {readOnlyData['user'].mobile}
				</LiText>
			</SummaryList>

			<AddPageDialogBoxTitle>
				그룹 :{' '}
				{readOnlyData[tableKeys.users.add.groups.exclude]?.length}
			</AddPageDialogBoxTitle>
			<Table
				mode={'readOnly'}
				tableKey={tableKeys.users.add.groups.exclude}
				data={groupData}
				columns={tableColumns[tableKeys.users.add.groups.exclude]}
			/>

			<AddPageDialogBoxTitle>권한 : {''}</AddPageDialogBoxTitle>
			<Table
				mode={'readOnly'}
				tableKey={tableKeys.users.add.permissions}
				data={roleData}
				columns={tableColumns[tableKeys.users.add.permissions]}
			/>

			<AddPageDialogBoxTitle>
				태그 : {readOnlyData[tableKeys.users.add.tag].length}
			</AddPageDialogBoxTitle>
			<Table
				mode={'readOnly'}
				tableKey={tableKeys.users.add.tag}
				data={tagData}
				columns={tableColumns[tableKeys.users.add.tag]}
			/>
		</ModalTableContainer>
	) : (
		<div />
	);
};

UserPreviewDialogBox.propTypes = {
	isOpened: PropTypes.bool.isRequired,
	setIsOpened: PropTypes.func.isRequired,
};

export default UserPreviewDialogBox;
