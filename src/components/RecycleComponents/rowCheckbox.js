import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from "prop-types";

const RowCheckbox = (dataLists) => {
    const [checkedList, setCheckedLists] = useState([]);

    // 전체 체크 클릭 시 발생하는 함수
    const onCheckedAll = useCallback(
        (checked) => {
            if (checked) {
                const checkedListArray = [];
                dataLists.forEach((list) => checkedListArray.push(list));

                setCheckedLists(checkedListArray);
            } else {
                setCheckedLists([]);
            }
        },
        [dataLists]
    );

    // 개별 체크 클릭 시 발생하는 함수
    const onCheckedElement = useCallback(
        (checked, list) => {
            if (checked) {
                setCheckedLists([...checkedList, list]);
            }else {
                setCheckedLists(checkedList.filter((el) => el !== list));
            }
        },
        [checkedList]
    );

    useEffect(()=>{
        console.log('dataLists:',dataLists)
    },[dataLists])
    return (
      <div>
            {dataLists?
                <div>
                <input
                    type="checkbox"
                    onChange={(e) => onCheckedAll(e.target.checked)}
                    checked={
                        checkedList.length === 0
                            ? false : checkedList.length === dataLists.length ? true : false
                    }
                />
            {/*{dataLists.map((list) => (*/}
            {/*    <input*/}
            {/*    key={list.id}*/}
            {/*    type="checkbox"*/}
            {/*    onChange={(e) => onCheckedElement(e.target.checked, list)}*/}
            {/*    checked={checkedList.includes(list) ? true : false}*/}
            {/*    />*/}
            {/*    ))}*/}
                    </div>
                :true
            }
      </div>

    );
};
RowCheckbox.propTypes = {
    dataLists: PropTypes.object,
}
export default RowCheckbox;