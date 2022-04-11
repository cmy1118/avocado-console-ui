import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';

import PropTypes from 'prop-types';
import TextBox from '../../../../RecycleComponents/New/TextBox';
import Form from '../../../../RecycleComponents/New/Form';
import * as yup from 'yup';

import {RowDiv} from '../../../../../styles/components/style';
import {restrictionOptions} from '../../../../../utils/policyOptions';
import {NormalButton, TransparentButton} from '../../../../../styles/components/buttons';
import {AddPageContent, TextBoxDescription} from '../../../../../styles/components/iam/addPage';
import {TitleBar, TitleBarButtons, TitleBarText,} from '../../../../../styles/components/iam/iam';

import TemplateElement from '../../../Policy/Components/TemplateElement';
import useRadio from '../../../../../hooks/useRadio';
import CURRENT_TARGET from "../../../../../reducers/currentTarget";

const AddRole = ({setIsOpened , setUsage , setMaxGrants}) => {
	const history = useHistory();
	const formRef = useRef(null);
	const dispatch = useDispatch();

	const [usage, usageRadioButton] = useRadio({
		name: 'restrict',
		options: restrictionOptions,
	});

	const onClickCancelAddGroup = useCallback(() => {
		history.push('/roles');
	}, [history]);
	const onSubmitCreateRole = useCallback((data) => {

			if(data.maxGrants === ''){
				data.maxGrants = 0;
			}

			data.usage = usage;
			dispatch(
				CURRENT_TARGET.action.addReadOnlyData({
					title: 'role',
					data: data
				}),
			);
			setIsOpened(true)
	},[dispatch,setIsOpened,usage])
	
	const validation = {
		name : yup.string().max(100 , '최대 길이는 100자 입니다.').required('역할 이름은 필수값입니다.'),
		description : yup.string().max(200 , '최대 길이는 200자 입니다.').required('역할 설명은 필수값입니다.'),
		maxGrants : yup.number().when({
			is : () =>  usage === 'restrict',
			then: yup.number().typeError('숫자만 입력 가능 합니다.').max(10 , '최대 10까지 입력 가능 합니다.').required('부여 제한은 필수값입니다.')
		}),
	}

	useEffect(() => {
		setUsage(usage)
		if(usage === 'none'){
			formRef.current.setFieldValue('maxGrants' , '')
		}
	},[usage])


	const setValues = useCallback((v) => {
		setMaxGrants(Number(v.maxGrants));
	},[])

	return (
		<>
			<TitleBar>
				<TitleBarText>역할 기본 정보</TitleBarText>
				<TitleBarButtons>
					<NormalButton type={'button'} onClick={() => formRef.current.handleSubmit()}>
						역할 생성
					</NormalButton>

					<TransparentButton margin='0px 0px 0px 5px' onClick={onClickCancelAddGroup}>
						취소
					</TransparentButton>
				</TitleBarButtons>
			</TitleBar>
			<AddPageContent>
				<Form
					initialValues={{name:'', description:'', maxGrants: ''}}
					onSubmit={onSubmitCreateRole}
					innerRef={formRef}
					validation={validation}
					setValues ={setValues}
				>
					
					<RowDiv margin={'0px 0px 12px 0px'}>
						<TextBox name={'name'} placeholder={'역할이름'} direction={'row'} />
						<TextBoxDescription>최대 100자, 영문 대소문자로 생성 가능합니다.</TextBoxDescription>
					</RowDiv>

					<RowDiv margin={'0px 0px 12px 0px'}>
						<TextBox name={'description'} placeholder={'설명'} direction={'row'} />
						<TextBoxDescription>최대 200자 가능합니다.</TextBoxDescription>
					</RowDiv>

					<RowDiv margin={'0px 0px 12px 0px'}>
						<TemplateElement title={'부여 제한'} render={usageRadioButton} />
						<TextBox name={'maxGrants'}  direction={'row'} disabled={(usage === 'none')}/>
						<TextBoxDescription>부여횟수를 제한할 경우 부여 가능 횟수를 입력 합니다. (최대10)</TextBoxDescription>
					</RowDiv>
				</Form>
			</AddPageContent>
		</>
	);
};

AddRole.propTypes = {
	setIsOpened: PropTypes.func,
	setUsage : PropTypes.func,
	setMaxGrants: PropTypes.func,
};

export default AddRole;

