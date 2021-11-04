import styled from "styled-components";
import {DefaultButton} from "./buttons";


export const TableSpace = styled.div`
    padding: 10px 16px;
    // border-bottom: 3px #e3e5e5 dotted;

display: flex;
    justify-content: space-between;
    align-items: center;
    
    font-size: 16px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.31;
    letter-spacing: 0.1px;
    text-align: left;
    color: #212121;
 

    `
export const TableSpaceButtons = styled.div`
display: flex;
justify-content: space-between;
`

export const BasicTableSpace = styled.div`
    `

export const ReadOnlyTableSpace = styled.div`
    padding-top: 30px;
    margin: 0px 16px;
    font-size: 16px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.31;
    letter-spacing: 0.1px;
    text-align: left;
    color: #212121;

    `

export const TableFold = styled.div`
	 .fold {
	 border-bottom: 0px #e3e5e5 dotted;
	}
	
	.fold.close{
	 border-bottom: 3px #e3e5e5 dotted;
	}
`

