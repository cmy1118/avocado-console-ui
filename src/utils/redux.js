export function changeId(arr, id) {
	if (arr) {
		if (arr.includes(id)) {
			deleteId(arr, id);
		} else {
			arr.push(id);
		}
	} else {
		arr = [id];
	}
	console.log('arr', arr);
	return arr;
}

export function deleteId(arr, id) {
	const index = arr.findIndex((v) => v.id === id);
	arr.splice(index, 1);
	return arr;
}
