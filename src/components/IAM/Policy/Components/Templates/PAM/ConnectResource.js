import React, {useEffect, useState} from 'react';
import TemplateElementContainer from '../../TemplateElementContainer';
import useRadio from '../../../../../../hooks/useRadio';
import {
	loginTypeOptions,
	policyOption,
	resourceOptions,
} from '../../../../../../utils/policyOptions';
import ResourceSelectionContainer from './Resource/ResourceSelectionContainer';
import PAM_RULE_TEMPLATE_DETAIL from '../../../../../../reducers/api/PAM/TemplateManagement/RuleTemplate/ruleTemplateDetail';
import PropTypes from 'prop-types';
import ConnectReason from './ConnectReason';
import {useDispatch} from 'react-redux';

const connectResource = {
	loginType: {
		title: '로그인 방식',
		description: [
			'원격 자원에 접속 하는 방식을 설정합니다.',
			'자동 로그인은 사용자가 계정ID 나 패스워드를 알지 못하는 상태지만 로그인이 가능한 방식입니다.',
			'직접 로그인 방식은 계정 ID/Password 또는 Key Pairs를 직접 선택, 입력하여 로그인 하는 방식 입니다.',
			'수동 로그인 방식은 사용자는 접속할 계정 ID만으로 접속이 가능한 방식 입니다.',
		],
	},
	resource: {
		title: '자원',
		description: [
			'자원 추가는 정책(권한) 부여 권한이 있는 자원만 추가 가능하며, 모든 자원 은 부여 권한이 있는 모든 자원 입니다.',
			'자원 그룹 : 선택한 그룹의 하위 자원만 해당 정책이 적용되며 하위의 그룹은 해당 되지 않습니다.',
			"'특정자원' 추가 후 '모든자원'으로 선택 변경 시 기존에 선택된 자원은 모두 삭제 됩니다.",
			'정책은 선택한 자원 그룹의 하위 자원과 자원을 모두 합하여 적용됩니다.',
		],
	},
};

/**************************************************
 * ambacc244 - 자원 접속 방식 템플릿 컴포넌트
 **************************************************/
const ConnectResource = ({templateId, name, description}) => {
	const dispatch = useDispatch();
	//loginType: 로그인 방식
	const [loginType, loginTypeRadioButton, setLoginType] = useRadio({
		name: 'loginType',
		options: loginTypeOptions,
	});
	//resource: 자원 선택 방식
	const [resource, resourceRadioButton, setResource] = useRadio({
		name: 'connectResource',
		options: resourceOptions,
	});
	//selected: 선택된 자원 & 그룹
	const [selected, setSelected] = useState({});

	/**************************************************
	 * ambacc244 - 자원 접속 방식 템플릿의 default 정보 불러오기
	 **************************************************/
	useEffect(() => {
		const getDefaultValue = async () => {
			try {
				const res = await dispatch(
					PAM_RULE_TEMPLATE_DETAIL.asyncAction.findAllRuleTemplateDetail(
						{
							id: templateId,
						},
					),
				);

				console.log(res.payload.data);
			} catch (err) {
				console.log('error => ', err);
			}
		};

		getDefaultValue();
	}, [dispatch, templateId]);

	return (
		<div>
			<TemplateElementContainer
				title={connectResource.loginType.title}
				description={connectResource.loginType.description}
				render={loginTypeRadioButton}
			/>
			<TemplateElementContainer
				title={connectResource.resource.title}
				description={connectResource.resource.description}
				render={() => {
					return (
						<div>
							{resourceRadioButton()}
							<div>----------------------------------</div>
							<ResourceSelectionContainer
								disabled={
									resource === policyOption.resource.all.key
								}
								setSelected={setSelected}
							/>
						</div>
					);
				}}
			/>
		</div>
	);
};

ConnectResource.propTypes = {
	templateId: PropTypes.string,
	name: PropTypes.string,
	description: PropTypes.string,
};

export default ConnectResource;
