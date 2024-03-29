/**************************************************************************************************
 * roberto - TableMode 테이블 상태관리 constants
 *
 * NOMAL :  (기능 : 조회, 첫번쨰 컬럼 체크박스, 컬럼 오름차순내림차순 버튼)
 * READ_ONLY :(기능 : 조회 , 테이블 디자인 짝수번쨰 홀수번째 row 칼러 적용)
 * INNER :(...)
 * CHECKBOX : (기능 : 조회 , 테이블 디자인 짝수번쨰 홀수번째 row 칼러 적용 , row 체크박스 기능 활성화)
 *************************************************************************************************/
export const TableMode = {
	NOMAL: 'normal',
	READ_ONLY: 'readOnly',
	INNER: 'inner',
	CHECKBOX: 'checkBox',
};
