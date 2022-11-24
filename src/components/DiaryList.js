import { useState } from "react";
import Diary from "../pages/Diary";

// ControllMenu Props 설명
// value : ControllMenu가 랜더링하는 select가 어떤걸 선택하는지?
// onChange : select를 선택하는게 변화했을 때 바꿀 함수
// optionList : select태그 안에 들어갈 option
const ControlMenu = ({ value, onChange, optionList }) => {
  return <select></select>;
};

const DiaryList = ({ diaryList }) => {
  //정렬 기준을 만들어줄 sort 타입
  const [sortType, setSortType] = useState();
  return (
    <div>
      <ControlMenu />
      {diaryList.map((element) => (
        <div key={element.id}>{element.content}</div>
      ))}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
