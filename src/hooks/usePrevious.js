const {useRef, useEffect} = require('react');

/**************************************************
 * roberto6385 - state값이 변경된 후 그 이전의 값을 기억함
 **************************************************/
export const usePrevious = (value) => {
    const ref = useRef();
    /**************************************************
     * roberto6385 - state값 변경을 감지하고 기억
     **************************************************/
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
};
