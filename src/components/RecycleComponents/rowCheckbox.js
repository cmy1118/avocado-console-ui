import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from "prop-types";
import {ColDiv, RowDiv} from "../../styles/components/style";

const RowCheckbox = ({dataLists,title}) => {
    //현재 체크된 체크박스 state
    const [checkedList, setCheckedLists] = useState([]);
    //데이터가 있는 체크박스 staet
    const [tempDataLists, setTempDataLists] = useState([]);

    // 전체체크
    const onCheckedAll = useCallback(
        (checked) => {
            if (checked) {
                console.log('전체선택')
                const checkedListArray = [];
                dataLists.forEach((list) =>{
                    if(list.templateId) {
                        checkedListArray.push(list)
                    }
                })
                setCheckedLists(checkedListArray);
            } else {
                setCheckedLists([]);
            }
        },
        [dataLists]
    );

    //단일체크
    const onCheckedElement = useCallback(
        (checked, list) => {
            if (checked) {
                console.log('check 된 정보:',list)
                console.log('check 된 checkedList정보:',...checkedList)
                if(list.templateId) {
                    setCheckedLists([...checkedList, list]);
                }
            }else {
                setCheckedLists(checkedList.filter((el) => el !== list));
            }
        },
        [checkedList]
    );
    console.log('부모에서 넘어온 체크박스 정보:',dataLists)
    console.log('현재 체크된 정보 :',checkedList)
    console.log('데이터가 있는 체크박스 정보:',tempDataLists)
    console.log('-------------------------------------')

    //렌더링시 데이터가 없는 체크박스 처리
    useEffect(()=>{
        let data=[]
        dataLists.map(item =>{
            if(item.data){
                data.push(item)
            }
        })
        setTempDataLists(data)
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
                checked={list.effect || checkedList.includes(list) ? true : false}
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