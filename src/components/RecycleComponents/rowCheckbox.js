import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from "prop-types";
import {ColDiv, RowDiv} from "../../styles/components/style";
import IAM_ACTION_MANAGEMENT_TEMPLATE from "../../reducers/api/IAM/Policy/ActionManagement/template";
import {useDispatch} from "react-redux";

//dataLists : 행데이터
//title : 항목
const RowCheckbox = ({dataLists,title}) => {
    const dispatch = useDispatch();
    // console.log('dataLists:',dataLists)
    //현재 체크된 체크박스 state
    const [checkedList, setCheckedLists] = useState([]);
    //데이터가 있는 체크박스 state
    const [tempDataLists, setTempDataLists] = useState([]);
    //체크박스 체크가 시작했는지 state
    const [startCheck,setStartCheck]=useState(false);

    // 전체체크 핸들링 함수
    const onCheckedAll = useCallback(
        (checked) => {
            setStartCheck(true)
            if(dataLists[0]) {
                dispatch(
                    IAM_ACTION_MANAGEMENT_TEMPLATE.action.setActionTemplates({
                        allCheck: true,
                        singleCheck: false,
                        templateId: dataLists[0].templateId,
                        resource: dataLists[0].resource,
                        action: dataLists[0].action,
                        effect: dataLists[0].effect,
                        setChecked: checked
                    }),
                )
                if (checked) {
                    const checkedListArray = [];
                    dataLists.forEach((list) => {
                        if (list.templateId) {
                            checkedListArray.push(list)
                        }
                    })
                    setCheckedLists(checkedListArray);
                } else {
                    setCheckedLists([]);
                }
            }
        },
        [dataLists, dispatch]
    );

    //단일체크 핸들링 함수
    const onCheckedElement = useCallback(
        (checked, list) => {
            console.log(`단일체크 핸들링 함수`)
            setStartCheck(true)
            dispatch(
                IAM_ACTION_MANAGEMENT_TEMPLATE.action.setActionTemplates({
                    allCheck : false,
                    singleCheck: true,
                    templateId: list.templateId,
                    resource: list.resource,
                    action: list.action,
                    effect: list.effect,
                }),
            )
            if (checked) {
                if(list.templateId) {
                    setCheckedLists([...checkedList, list]);
                }
            }else {
                setCheckedLists(checkedList.filter((el) => el !== list));
            }
        },
        [checkedList, dispatch]
    );

    //체크박스 체크 상태 표시를 위한 함수
    const isChecked  = useCallback(
        (list) => {
            if(startCheck){
                const isChecked =checkedList.includes(list) ? true : false
                return isChecked
            }else{
                return list.effect
            }
            
        },
        [checkedList, startCheck]
    );

    //렌더링시 데이터가 없는 체크박스 처리
    useEffect(()=>{
        let data=[]
        let defaultCheckedData=[]
        dataLists.map(item =>{
            if(item.templateId){
                data.push(item)
                if(item.effect){
                    defaultCheckedData.push(item)
                }
            }
        })
        //데이터가 있는 체크박스 추가
        setTempDataLists(data)
        //default 체크상테 체크state에 추가
        setCheckedLists(defaultCheckedData)
    },[dataLists])

    return (
        <RowDiv>
            <ColDiv width={'25%'}>
          {title}
            </ColDiv>
            {dataLists?
                <div>
                <input
                    type="checkbox"
                    onChange={(e) => onCheckedAll(e.target.checked)}
                    checked={
                        checkedList.length === 0
                            ? false : checkedList.length === tempDataLists.length ? true : false
                            // ? false : checkedList.length === dataLists.length ? true : false
                    }
                />
            {dataLists.map((list) => (
                <input
                    disabled={list.templateId?false:true}
                key={list.id}
                type="checkbox"
                onChange={(e) => onCheckedElement(e.target.checked, list)}
                checked={isChecked(list)}
                // checked={checkedList.includes(list) ? true : false}
                // checked={list.effect ||   checkedList.includes(list) ? true : false}
                />
                ))}
                    </div>
                :true
            }
      </RowDiv>

    );
};
RowCheckbox.propTypes = {
    dataLists: PropTypes.array,
    title: PropTypes.string,
}
export default RowCheckbox;