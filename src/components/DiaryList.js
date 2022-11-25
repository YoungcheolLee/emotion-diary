import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DiaryItem from "./DiaryItem";
import MyButton from "./MyButton";

//최신순, 오래된순 정렬 기능
const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된순" },
];

//감정 필터링 옵션
const filterOptionList = [
  { value: "all", name: "모든 감정" },
  { value: "good", name: "기분 좋은날" },
  { value: "bad", name: " 기분 나쁜날" },
];

/** ControllMenu Props 설명
 * value : ControllMenu가 랜더링하는 select가 어떤걸 선택하는지?
 * onChange : select를 선택하는게 변화했을 때 바꿀 함수
 * optionList : select태그 안에 들어갈 option
 */
const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select
      className="ControlMenu"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((element, idx) => (
        <option key={idx} value={element.value}>
          {element.name}
        </option>
      ))}
    </select>
  );
};

const DiaryList = ({ diaryList }) => {
  //새 일기쓰기 버튼 클릭 시 페이지 이동
  const navigate = useNavigate();

  // [최신순, 오래된순] 정렬 필터 state
  const [sortType, setSortType] = useState();

  // 감정필터에 현재 상태를 저장할 state
  const [filter, setFilter] = useState("all");

  /** getProcessedDiaryList 정의
   * 최신순, 오래된순 필터 기능 구현 부분
   * diaryList.sort를 사용하지 않는 이유?
   * 배열 내장함수 중 sort를 사용하면 원배열 자체가 정렬이 되기 때문에 배열을 copy 함
   * if문으로 분기를 달아서 정렬된 리스트를 반환하는 함수
   */
  const getProcessedDiaryList = () => {
    /** filterCallBack 정의
     * 감정에 따라 필터링 해주는 함수
     */
    const filterCallBack = (element) => {
      if (filter === "good") {
        return parseInt(element.emotion) <= 3;
      } else {
        return parseInt(element.emotion) > 3;
      }
    };

    /** compare 정의\
     * [최신순, 오래된순] 필터 기능
     * 정렬하고자 하는 데이터 요소가 객체로 이루어진 배열인데, 그냥 정렬을 하면 정렬이 되지 않는다.
     * 그렇기 때문에 우리는 비교함수를 만든 구문
     * a.date나 b.date에 문자열이 들어올 수 있기 때문에 문자열을 숫자로 형변환 시켜주는 parseInt로 감싸줌
     */
    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };

    /*JSON.Stringify(diaryList) 의미 
     1. diaryList는 배열이기 때문에 배열을 JSON화 시켜서 문자열로 바꿈
     2. 문자열로 반환된 것을 JSON.parse통해 다시 배열로 복구화 시킨 후 copyList에 넣어줌
     즉, diaryList 값이 문자열로 바뀜 > JSON.parse를 통해 다시 배열로 바뀜 > copyList에는 값만 들어옴
    */
    const copyList = JSON.parse(JSON.stringify(diaryList));

    /** filteredList 정의
     * copyList를 감정에 따라 필터링 하는 구문
     */
    const filteredList =
      filter === "all"
        ? copyList
        : copyList.filter((element) => filterCallBack(element));

    const sortedList = filteredList.sort(compare);
    return sortedList;
  };

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          <ControlMenu
            value={filter}
            onChange={setFilter}
            optionList={filterOptionList}
          />
        </div>
        <div className="right_col">
          <MyButton
            type={"positive"}
            text={"새 일기쓰기"}
            onClick={() => navigate("/new")}
          />
        </div>
      </div>

      {getProcessedDiaryList().map((element) => (
        <DiaryItem key={element.id} {...element} />
      ))}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
