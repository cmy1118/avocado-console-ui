import React, {useCallback} from 'react';
import PropTypes from "prop-types";
import AssignRoleToUser from "../IAM/User/Components/AssignRoleToUser";
import styled from "styled-components";

const _Container = styled.div`

`
const _imgContainer = styled.div`
position: relative;
width:252px;
height:240px;
`
const _textContents = styled.div`
position: absolute;
      top: 50%;
    left: 50%;
transform: translate( -50%, 100% );
`
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
  margin-bottom:5px;
   text-shadow: 0.5px 0.5px 0.5px black;
  
`
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
     text-shadow: 0.5px 0.5px 0.5px black;

`


const ContentsButton = ({img, title, text}) => {
    console.log('img:',img);
    console.log('title:',title);
    console.log('text:',text);
    const onClickMove = useCallback(() => {
        history.push('/iam');
    }, [history]);

    return (
        <_Container>
            <_imgContainer>
            <img style={{width:"252px",height:"240px"}} src={img}  />
            {/*<img style={{width:"252px",height:"240px"}} src={img} onClick={onClickMove} />*/}
                <_textContents>
                    <_title>
                        {title}
                    </_title>
                   <_text>
                       {text}
                   </_text>
                </_textContents>
            </_imgContainer>

        </_Container>
    );
};
ContentsButton.propTypes = {
    img: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
};

export default ContentsButton;