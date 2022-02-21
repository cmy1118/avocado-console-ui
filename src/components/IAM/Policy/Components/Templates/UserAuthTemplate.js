import React from 'react';
import PropTypes from 'prop-types';
import {FoldableContainer} from '../../../../../styles/components/iam/iam';
import TableFold from '../../../../Table/Options/TableFold';
import CheckBox from '../../../../RecycleComponents/New/CheckBox';

/**************************************************
 * ambacc244 - 사용자 인증 템플릿 컴포넌트
 **************************************************/
const UserAuthTemplate = ({isFold, setIsFold}) => {
	return (
		<FoldableContainer>
			<TableFold
				title={'사용자 인증'}
				space={'UserAuth'}
				isFold={isFold}
				setIsFold={setIsFold}
			/>
			{isFold['UserAuth'] && (
				<div>
					<div>
						<div>단말기 인증</div>ㅔ
						<div>
							<div>사용 여부 : </div>
							<div>
								<div>제어 어플리케이션 :</div>
								<CheckBox
									label='Managenent Console'
									checked={true}
								/>
								<CheckBox label='WebTerminal' checked={true} />
							</div>
						</div>
					</div>
				</div>
			)}
		</FoldableContainer>
	);
};
UserAuthTemplate.propTypes = {
	isFold: PropTypes.bool,
	setIsFold: PropTypes.func,
};
export default UserAuthTemplate;
