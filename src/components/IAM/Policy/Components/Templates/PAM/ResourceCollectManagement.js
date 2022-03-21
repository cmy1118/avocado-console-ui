/*******************************************************************
 * roberto - 자원 수집 관리 권한 템플릿
 ******************************************************************/


import React, {useEffect, useState} from 'react';
import RowCheckbox from '../../../../../RecycleComponents/rowCheckbox';
import {useDispatch} from 'react-redux';
import {ColDiv} from '../../../../../../styles/components/style';
import {filterPropObj, objArrUnion} from '../../../../../../utils/dataFitering';
import PropTypes from 'prop-types';
// import IAM_ACTION_MANAGEMENT_TEMPLATE_DETAIL from '../../../../../reducers/api/IAM/Policy/ActionManagement/templateDetail';
import IAM_ACTION_MANAGEMENT_TEMPLATE from "../../../../../../reducers/api/IAM/Policy/ActionManagement/actionTemplate";
import {actionTemplateFilter} from "../../../../../../utils/template";
import TemplateElementContainer from "../../TemplateElementContainer";

const constants = {
    main: '자원 관리 권한',
    title: '',
    templates: {},
    templatesId: '',
    //체크박스 컬럼 정보
    column: [
        '항목',
        '전체권한',
        '추가(생성)',
        '조회',
        '수정',
        '삭제',
        // '부여',
        // '회수',
        '설명',
    ],
    //체크박스 action event 정보
    action: ['create', 'update', 'delete', 'read', 'revoke'],
};
/*******************************************************************
 * roberto - 자원 수집 관리 권한 템플릿
 ******************************************************************/
const ResourceCollectManagement = ({templateId, name, description}) => {
    const dispatch = useDispatch();
    const [dataLists, setDataLists] = useState([]);
    // 템플릿 컬럼 에대한 action 정보
    const tempDataLists = [
        {action: 'create', data: false},
        {action: 'find', data: false},
        {action: 'update', data: false},
        {action: 'delete', data: false},
    ];

    //렌더링시 체크박스 정보 조회
    // useEffect(() => {
    //     dispatch(
    //         IAM_ACTION_MANAGEMENT_TEMPLATE.asyncAction.findByIdAction({
    //             range: 'elements=0-50',
    //             templateId: templateId,
    //         }),
    //     )
    //         .unwrap()
    //         .then((res) => {
    //             console.log('사용자관리권한 findByIdAction:', res);
    //             const setData =actionTemplateFilter(res)
    //             dispatch(
    //                 IAM_ACTION_MANAGEMENT_TEMPLATE.action.getActionTemplates({
    //                     templateId: templateId,
    //                     name: res.data.name,
    //                     description: res.data.description,
    //                     data: setData,
    //                 }),
    //             )
    //             const filteredDataList = filterPropObj(
    //                 setData,
    //                 'resource',
    //                 'data',
    //             );
    //             const result = objArrUnion(
    //                 filteredDataList,
    //                 tempDataLists,
    //                 'data',
    //                 'resource',
    //                 'action',
    //             );
    //             setDataLists(result);
    //         });
    // }, [dispatch]);

    return (
        <>
        <TemplateElementContainer
            title={name}
            description={description}
            render={() => {
                return (
                    <div>
                        <ColDiv padding={'0px 0px 0px 25%'} width={'100%'}>
                            {constants?.column}
                        </ColDiv>
                        {dataLists?dataLists.map((item, index) => (
                            <RowCheckbox
                                title={item.resource}
                                dataLists={item.data}
                                key={index}
                            />
                        )):[]}
                    </div>
                );
            }}
        />
    <TemplateElementContainer>
        {/*ToDO : 영애님 자원 엘리먼트 생성시 추가예정*/}
    </TemplateElementContainer>
        </>
    );

};
ResourceCollectManagement.propTypes = {
    templateId: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
};
export default ResourceCollectManagement;