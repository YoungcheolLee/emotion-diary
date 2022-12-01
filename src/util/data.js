/** util 폴더 안 data.js 설명
 * 공통으로 사용될 함수들을 모아놓은 폴더
 */

//날짜를 보여주기 위한 메서드
export const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};
