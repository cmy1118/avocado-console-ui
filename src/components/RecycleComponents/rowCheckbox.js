import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from "prop-types";

const RowCheckbox = ({dataLists}) => {
    const [checkedList, setCheckedLists] = useState([]);

    // 전체체크
    const onCheckedAll = useCallback(
        (checked) => {
            if (checked) {
                console.log('전체선택')
                const checkedListArray = [];
                dataLists.forEach((list) => checkedListArray.push(list));

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
                setCheckedLists([...checkedList, list]);
            }else {
                setCheckedLists(checkedList.filter((el) => el !== list));
            }
        },
        [checkedList]
    );
    console.log('현재 checedList:',checkedList)

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
            {dataLists.map((list) => (
                <input
                key={list.id}
                type="checkbox"
                onChange={(e) => onCheckedElement(e.target.checked, list)}
                checked={checkedList.includes(list) ? true : false}
                />
                ))}
                    </div>
                :true
            }
      </div>

    );
};
RowCheckbox.propTypes = {
    dataLists: PropTypes.array,
}
export default RowCheckbox;