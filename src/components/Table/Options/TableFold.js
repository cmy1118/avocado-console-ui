import React, {useCallback} from 'react';
import {TableSpace} from "../../../styles/components/table";
import {IconButton} from "../../../styles/components/icons";
import {arrowDownIcon, arrowRightIcon, arrowUpIcon} from "../../../icons/icons";
import PropTypes from "prop-types";

const TableFold = ({space,isFold ,setIsFold ,}) => {
    const onClickFold = useCallback(() => {
        setIsFold({...isFold, [space]: !isFold[space]} );
    }, [isFold, setIsFold, space]);
    
    return (
        <div>
            <TableSpace
                className={
                    isFold[space] ? 'fold' : 'fold close'
                }>
                <div style={{display:'flex'}}>
            <IconButton
                size={'sm'}
                margin={'0px'}
                onClick={onClickFold}
            >
                {isFold[space] ? arrowDownIcon : arrowRightIcon}
            </IconButton>
           그룹에 사용자에 추가
                </div></TableSpace>


        </div>
    );
};
TableFold.propTypes = {
    isFold: PropTypes.object,
    setIsFold: PropTypes.func,
    space: PropTypes.string,
};
export default TableFold;