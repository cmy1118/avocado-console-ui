import React, {useCallback, useEffect, useState} from 'react';
import TemplateElementContainer from "../../../TemplateElementContainer";
import Table from "../../../../../../Table/Table";
import PropTypes from "prop-types";
import ResourceManagement from "../ResourceManagement";
import RRM_RESOURCE from "../../../../../../../reducers/api/RRM/Resource/resource";
import {useDispatch, useSelector} from "react-redux";
import {tableColumns} from "../../../../../../../Constants/Table/columns";
import {tableKeys} from "../../../../../../../Constants/Table/keys";
import AddAcessResourceAccountDialogBox from "../../../../../../DialogBoxs/Form/AddAcessResourceAccountDialogBox";
import {RowDiv} from "../../../../../../../styles/components/style";
import {AllreplaceStr} from "../../../../../../../utils/dataFitering";

/**********************************************************************
 * roberto - 자원 접근 권한
 **********************************************************************/
const ResourceAccess = ({templateId, name, description}) => {
    const dispatch = useDispatch();
    const [tableData, setTableData] =useState([])
    const [select, setSelect] = useState([]);
    //접근 자원 계쩡 추가 오픈
    const [openDialogBox, setOpenDialogBox] = useState(false);
    //lastClicked: 가장 마지막으로 클릭된 자원
    const [lastClicked, setLastClicked] = useState(null);

    /******************************************************************
     *
     ******************************************************************/
     const findAllApi = useCallback(
        async (search, selectProtocol) => {
            try{
                const response = await dispatch(
                    RRM_RESOURCE.asyncAction.findAllResourceAction({
                        keyword2: search ? search : '',
                        serviceType: selectProtocol ? selectProtocol : '',
                    }),
                );
                console.log('조회목록:',response)
                await setTableData(response.payload.map((v) => ({
                    id: v.id,
                    group: AllreplaceStr(v.group.namePath),
                    name: v.name,
                    address: v.defaultAddress,
                    protocol: v.servicePorts[0].serviceType.name,
                })))
                await alert('조회완료')
            }catch (err){
                 console.log(err)
                 alert('조회오류')
            }
        }, [dispatch],);
    /******************************************************************
     * 테이블 자원 선택 이벤트 핸들러
     *****************************************************************/
    const onClickSelectResource = useCallback(
        (e, data) => {
            //shift, command를 누르지 않은 상태로 클릭
            if (!e.shiftKey && !e.metaKey) setLastClicked(data);
        },
        [setLastClicked],
    );
    /******************************************************************
     * 자원삭제 이벤트 핸들러
     *****************************************************************/
    const onClickDeleteReosource = useCallback(
        (e) => {
            console.log(e)
            alert('삭제되었습니다')
        },
        [],
    );
    /******************************************************************
     * 자원삭제 이벤트 핸들러
     *****************************************************************/
    const onClickAddReosource = useCallback(
        (e) => {
            setOpenDialogBox(true)
        },
        [],
    );

    /**********************************************************************
     *
     **********************************************************************/
    useEffect(() => {
        findAllApi()
    }, [findAllApi]);

    return (
        <div>
            <TemplateElementContainer
                title={name}
                description={description}
                render={() => {
                    return (
                        <div>
                            <RowDiv>
                                <button onClick={e=>onClickAddReosource(e)}>
                                    추가
                                </button>
                                <button onClick={e => onClickDeleteReosource(e)}>
                                    삭제
                                </button>
                            </RowDiv>


                            <Table
                                tableKey={tableKeys.policy.add.pamTemplate.accessResource}
                                columns={tableColumns[tableKeys.policy.add.pamTemplate.accessResource]}
                                data={tableData}
                                rowClick={onClickSelectResource}
                                // isPaginable
                                // optionBarTitle={`자원 목록 : ${resources?.length}건`}
                                // isSearchable
                                isColumnFilterable
                                setSelect={setSelect}
                                // defaultClick={defaultClick}
                                // width={'855px'}
                            />
                            <AddAcessResourceAccountDialogBox
                                isOpened={openDialogBox}
                                setIsOpened={setOpenDialogBox}
                                data={tableData}
                                // setResources={setConnectData}
                                select={select}
                                type={'resource'}
                                // currentProtocolIndex={currentProtocolIndex}
                                // setCurrentProtocolIndex={setCurrentProtocolIndex}
                                // currentAccountIndex={currentAccountIndex}
                                // setCurrentAccountIndex={setCurrentAccountIndex}
                                // setConnectData={setConnectData}
                            />
                        </div>
                    );
                }}
                />
        </div>
            );
};
ResourceAccess.propTypes = {
    templateId: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
};
export default ResourceAccess;