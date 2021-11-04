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
		console.log(arrA.filter((v) => arrB.includes(v)).includes(value));
		return arrA.filter((v) => arrB.includes(v)).includes(value);
	} else {
		return true;
	}
}
