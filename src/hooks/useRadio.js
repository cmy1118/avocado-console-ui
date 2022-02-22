import React, {useState} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div``;

/**************************************************
 * seob - 라디오 컴포넌트 hook
 *
 * name: 라디오 input name
 * options: 라디오 input의 value, label의 객체 배열
 * => ex) [{label:A,value:a},{label:B,value:b}...]
 *
 * 사용예시)
 * const [value, Radio] = useRadio({
		name: radio_name,
		options: radio_options,
	});
 *
 * return <div>{Radio()}</div>
 ***************************************************/
const useRadio = ({name, options}) => {
	// 현재 value
	const [value, setValue] = useState(options[0]);

	// 라디오 컴포넌트
	const radio = () => (
		<Container>
			{options.map((ele, i) => {
				console.log(ele);
				return (
					<label key={i}>
						<input
							type='radio'
							name={name}
							onChange={(e) =>
								setValue(JSON.parse(e.target.value))
							}
							value={JSON.stringify(ele)}
							checked={
								JSON.stringify(ele) === JSON.stringify(value)
							}
						/>
						{ele.label}
					</label>
				);
			})}
		</Container>
	);
	return [value.value, radio];
};

useRadio.propTypes = {
	name: PropTypes.string.isRequired,
	options: PropTypes.array.isRequired,
};

export default useRadio;
