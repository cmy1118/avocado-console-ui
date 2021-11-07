import React from 'react';
import styled from "styled-components";
import {HoverIconButton} from "../../styles/components/icons";
import {errorIcon} from "../../icons/icons";

export const AppBarNavi = styled.div`
	box-sizing: border-box;
	display: flex;
	align-items: center;
    justify-content: space-between; 
	padding: 16px 15px 16px 15px;
	height: 50px;
	border-bottom: 1px solid;
	border-color:#e3e5e5;
	background: #fffff;

`


 const IAM_LINk = ['users','groups','roles','policies']
const AppBar = () => {
    return (
        <>
            <AppBarNavi/>
            <HoverIconButton onClick={onClickCloseAside}>{errorIcon}</HoverIconButton>

            <AppBarNavi/>
           </>

                );
};

export default AppBar;
