import React, {useEffect} from 'react';
import ModalTableContainer from '../../RecycleComponents/ModalTableContainer';
import {useSelector} from "react-redux";
import PropTypes from "prop-types";

import CURRENT_TARGET from "../../../reducers/currentTarget";

import {TitleBar} from "../../../styles/components/iam/iam";
import {SummaryList} from "../../../styles/components/iam/descriptionPage";
import {LiText} from "../../../styles/components/text";



const RolePreviewDialogBox = ({isOpened, setIsOpened}) => {
    const {readOnlyData} = useSelector(CURRENT_TARGET.selector);
    useEffect(() => {
        console.log(readOnlyData)
    })

    return readOnlyData['role'] ? (
        <ModalTableContainer
            title={'역할 생성 요약보기'}
            isOpened={isOpened}
            setIsOpened={setIsOpened}
        >
            <TitleBar>역할 기본정보</TitleBar>
            <SummaryList>
                <LiText>역할 이름 : {readOnlyData['role'].name}</LiText>
                <LiText>역할 설명 : {readOnlyData['role'].description}</LiText>
                <LiText>부여 제한 : {readOnlyData['role'].maxGrants}</LiText>
            </SummaryList>
        </ModalTableContainer>
    ) : (<div></div>)
};

RolePreviewDialogBox.propTypes = {
    isOpened: PropTypes.bool.isRequired,
    setIsOpened: PropTypes.func.isRequired,
}

export default RolePreviewDialogBox;

