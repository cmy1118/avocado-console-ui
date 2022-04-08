/**************************************************
 *정책 생성 요약정보 - 권한(action) 데이터 필터링 함수
 **************************************************/
//Todo:재사용 가능 하도록 리팩토링 예정
export const actionPreviewfilter = (arr) => {
	let newArr = [];
	let item = '';
	arr.map((v) => {
		if (item === v.resource) {
			const index = newArr.findIndex((s) => s.resource === v.resource);
			newArr[index].value =
				newArr[index].value + `\n\t${v.action} : ${v.effect}`;
		} else if (item != v.resource) {
			let obj = {};
			obj.resource = v.resource;
			obj.value = `\n\t${v.action} : ${v.effect}`;
			item = v.resource;
			newArr.push(obj);
		}
	});
	console.log('결과:', newArr);
	return newArr;
};
