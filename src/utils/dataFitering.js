//배열 값 중복체크
export function checkArrayhasDuplicates(arr) {
	return new Set(arr).size !== arr.length;
}

//배열 특정값 중복 체크
export function checkArrayIsUniqueHasDuplicates(arr, value) {
	const result = arr.filter((v) => v === value).length > 1;
	return result;
}

//두배열 특정값 교집합 체크
export function checkArraysIsUniqueHasDuplicates(arrA, arrB, value) {
	if (arrA && arrB) {
		//	console.log(arrA.filter((v) => arrB.includes(v)).includes(value));
		return arrA.filter((v) => arrB.includes(v)).includes(value);
	} else {
		return true;
	}
}

// 배열의 중복값 갯수 구하기
export function countArrayDuplicates(arr){
	const result = {};
	arr.forEach((v) => {
		result[v] = (result[v] || 0)+1;
	})

	return result;
}


/***********************************************************************************
 * 배열 객체 프로퍼티 분리
 * ex) [ {data:[{id:1, name:'홍길동' ...}]}] => [{id: 1 , data:[{id:1, name:'홍길동' ...}]]
 * array : 배열객체
 * prop: 분리할 프로퍼티
 * target: 분리된 프로퍼티 저장 이름
 ***********************************************************************************/
export function filterPropObj(array, prop, target) {
	let filterPropObject = [];
	array.map((v) => {
		const istrue = filterPropObject.filter((s) => {
			return v[prop] === s[prop];
		});
		if (filterPropObject[0] && istrue[0]) {
			const index = filterPropObject.findIndex((item) => {
				return item[prop] === v[prop];
			});
			filterPropObject[index][target].push(v);
		} else {
			let object = {};
			object[prop] = v[prop];
			object[target] = [v];
			filterPropObject.push(object);
		}
	});
	console.log('filterPropObj 결과:', filterPropObject);
	return filterPropObject;
}

/***********************************************************************************
 * 배열객체 합치기 - 조건 합집합(기존의 원소 우선)
 *
 * array : 배열객체 (기존 배열)
 * prop: 기존배열 prop
 * prop2: 기존배열 prop2
 * target: 조건이 되는 prop
 ***********************************************************************************/
export function objArrUnion(array, tempData, prop, prop2, target) {
	let result = [];
	array.map((v) => {
		const list = v[prop].map((s) => s[target]);
		const duplicatedData = tempData.filter(
			(item) => !list.includes(item[target]),
		);
		const newData = v[prop].concat(duplicatedData);
		let newObject = {};
		newObject[prop2] = v[prop2];
		newObject[prop] = newData;
		// const newObject = {resource: v.resource, data: newData};
		result.push(newObject);
	});
	console.log('objArrUnion 결과:', result);
	return result;
}

/**************************************************
 * 로 나누어진 패스를 > 로 변환
 * 예시 : 폴더1/폴더2 => 폴더1 > 폴더2
 *
 * str: 변환을 할 문자열
 **************************************************/
export function AllreplaceStr(str) {
	//입력된 string이 빈값이 아님
	if (str) {
		// let replaced_str = str.replace(/특정문자열(특수기호는 앞에'\' 붙여줌)/g, '바꿀문자열');
		let replaced_str = str.replace(/\//g, ' > ');
		return replaced_str;
	} else {
		return '';
	}
}
