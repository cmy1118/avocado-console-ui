import React, {useCallback, useMemo} from 'react';
import ModalTableContainer from '../../RecycleComponents/ModalTableContainer';
import {useDispatch, useSelector} from "react-redux";
import PropTypes from "prop-types";
import {CreatePageDialogBoxTitle} from '../../../styles/components/iam/addPage';

import CURRENT_TARGET from "../../../reducers/currentTarget";

import {TitleBar} from "../../../styles/components/iam/iam";
import {SummaryList} from "../../../styles/components/iam/descriptionPage";
import {LiText} from "../../../styles/components/text";
import {tableKeys} from "../../../Constants/Table/keys";
import {tableColumns} from "../../../Constants/Table/columns";
import Table from "../../Table/Table";
import IAM_ROLES from "../../../reducers/api/IAM/User/Role/roles";
import {isFulfilled} from "@reduxjs/toolkit";
import IAM_POLICY_MANAGEMENT_GRANT_REVOKE from "../../../reducers/api/IAM/Policy/PolicyManagement/GrantRevoke/role";
import IAM_ROLES_GRANT_ROLE_USER from "../../../reducers/api/IAM/User/Role/GrantRole/user";
import IAM_ROLES_GRANT_ROLE_GROUP from "../../../reducers/api/IAM/User/Role/GrantRole/group";

const RolePreviewDialogBox = ({isOpened, setIsOpened}) => {
    const {readOnlyData} = useSelector(CURRENT_TARGET.selector);
    const dispatch = useDispatch();

    const submitRoleInfo = useCallback(async() => {
        const roles = await dispatch( IAM_ROLES.asyncAction.createAction({
            name: readOnlyData['role'].name,
            description: readOnlyData['role'].description,
            maxGrants: readOnlyData['role'].maxGrants, //최대 승인 수 0 : 제한없음 N: 부여 가능 수
            parentIds: [],
            typeCode: 1
        }))

        if(isFulfilled(roles)){
            const roleId = roles.payload.headers.location.split('/').pop();

            let policyFlags = true;
            let userFlags = true;
            let userGroupFlags = true;

            // 역할에 정책 연결
            readOnlyData[tableKeys.roles.add.policies.exclude].map(async (v) => {
                const res = await dispatch(
                    IAM_POLICY_MANAGEMENT_GRANT_REVOKE.asyncAction.grantAction({
                        roleId : roleId,
                        policyId : v.id,
                        order: 0
                    })
                )

                if(!isFulfilled(res)){
                    policyFlags = false;
                    return;
                }
            })

            // 역할에 사용자 연결
            const roleIdArr = [];
            roleIdArr.push(roleId);
            if(policyFlags){
                readOnlyData[tableKeys.roles.add.users.exclude].map(async (v) => {
                    const res = await dispatch(
                        IAM_ROLES_GRANT_ROLE_USER.asyncAction.grantAction({
                            userUid: v.userUid,
                            roleIds :roleIdArr
                        })
                    )

                    if(!isFulfilled(res)){
                        userFlags = false;
                        return;
                    }
                })
            }


            // 역할에 사용자 그룹 연결
            if(userFlags){
                readOnlyData[tableKeys.roles.add.groups.exclude].map(async (v) => {
                    const res = await dispatch(
                        IAM_ROLES_GRANT_ROLE_GROUP.asyncAction.grantAction({
                            id : v.id,
                            roleIds : roleIdArr
                        })
                    );

                    if(!isFulfilled(res)){
                        userGroupFlags = false;
                        return;
                    }
                })
            }
        }
    },[dispatch,readOnlyData,])

    const policyData = useMemo(() => readOnlyData[tableKeys.roles.add.policies.exclude]?.map((v) => ({
            ...v
        }))
    ,[readOnlyData])

    const usersData = useMemo(() => readOnlyData[tableKeys.roles.add.users.exclude]?.map((v) => ({
            ...v
        }))
        ,[readOnlyData])

    const groupsData = useMemo(() => readOnlyData[tableKeys.roles.add.groups.exclude]?.map((v) => ({
            ...v
        }))
        ,[readOnlyData])



    return readOnlyData['role'] ? (
        <ModalTableContainer
            title={'역할 생성 요약보기'}
            isOpened={isOpened}
            setIsOpened={setIsOpened}
            handleSubmit={submitRoleInfo}
        >

            <TitleBar>역할 기본정보</TitleBar>

            <SummaryList>
                <LiText>역할 이름 : {readOnlyData['role'].name}</LiText>
                <LiText>역할 설명 : {readOnlyData['role'].description}</LiText>
                <LiText>부여 제한 : {(readOnlyData['role'].usage === 'restrict') ? readOnlyData['role'].maxGrants : '제한안함'}</LiText>
            </SummaryList>

            <CreatePageDialogBoxTitle>
                역할에 정책 연결 : {readOnlyData[tableKeys.roles.add.policies.exclude]?.length}
            </CreatePageDialogBoxTitle>

            <Table
                readOnly
                tableKey={tableKeys.roles.add.policies.exclude}
                data={policyData}
                columns={tableColumns[tableKeys.roles.add.policies.exclude]}
            />

            <CreatePageDialogBoxTitle>
                역할에 사용자 연결 : {readOnlyData[tableKeys.roles.add.users.exclude]?.length}
            </CreatePageDialogBoxTitle>

            <Table
                readOnly
                tableKey={tableKeys.roles.add.users.exclude}
                data={usersData}
                columns={tableColumns[tableKeys.roles.add.users.exclude]}
            />

            <CreatePageDialogBoxTitle>
                역할에 사용자 그룹 연결 : {readOnlyData[tableKeys.roles.add.groups.exclude]?.length}
            </CreatePageDialogBoxTitle>

            <Table
                readOnly
                tableKey={tableKeys.roles.add.groups.exclude}
                data={groupsData}
                columns={tableColumns[tableKeys.roles.add.groups.exclude]}
            />
        </ModalTableContainer>
    ) : (<div></div>)
};

RolePreviewDialogBox.propTypes = {
    isOpened: PropTypes.bool.isRequired,
    setIsOpened: PropTypes.func.isRequired,
}

export default RolePreviewDialogBox;

