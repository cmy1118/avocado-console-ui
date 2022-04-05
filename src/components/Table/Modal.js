import React from 'react';
import styled from 'styled-components';
import * as PropTypes from "prop-types";
import TableOptionsBar from "./TableOptionsBar";
import {NormalBorderButton, TransparentBorderButton} from "../../styles/components/buttons";

const Modal = ({ modalOption }) => {
    return (
        <>
            {
                modalOption?.show && (
                    <Wrapper>
                        {/*<Background onClick={() => modalOption.onClose()}/>*/}

                        <Contents>
                            <Content>
                                <h2>{modalOption?.title}</h2>
                                {modalOption?.element}
                                <ButtonBox>
                                    <TransparentBorderButton onClick={() => modalOption.onSubmit()}>확인</TransparentBorderButton>
                                    <NormalBorderButton onClick={() => modalOption.onClose()}>닫기</NormalBorderButton>
                                </ButtonBox>
                            </Content>
                            {/*<ButtonBox>*/}
                            {/*    <button onClick={() => modalOption.onSubmit()}>확인</button>*/}
                            {/*    <button onClick={() => modalOption.onClose()}>닫기</button>*/}
                            {/*</ButtonBox>*/}
                        </Contents>
                    </Wrapper>
                )
            }
        </>
    )
}
Modal.propTypes = {
    modalOption: PropTypes.object.isRequired
};

export default Modal;

const Wrapper = styled.div`
    position: relative;
    // position: fixed;
    // left:0;
    // top:0;
    // right:0;
    // bottom:0;    
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    overflow:visible; 
`

const Background = styled.div`
    position: absolute;
    left:0;
    top:0;
    z-index: 200;
    // width: 100%;
    // height: 100%;
    // background-color: rgba(0,0,0,0.3);
`
const Contents = styled.div`
   // width: 100%;
   // padding: 15px 40px;
   background-color: #fff;
`
const Content = styled.div`
   // width: 100%;
   // height: 100%;
`
const ButtonBox = styled.div`
position: absolute;
	top: 80px;
//    justify-content: center;
//    align-items: center;
   z-index: 200;
//    gap: 10px;
//    background-color: red;
//    z-index: 200;
	height: 60px;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	border-top: 1px solid #e3e5e5;

`