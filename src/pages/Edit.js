import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";
import DiaryList from "../components/DiaryList";

const Edit = () => {
  //navigate의 기능 : link 태그를 선택하지 않아도 원하는 페이지로 보낼 수 있게 함
  //ex) 비로그인 사용자가 로그인 되었을 때 보여주는 페이지로 가려고 할 때 로그인페이지로 보냄
  const navigate = useNavigate();

  // 수정하기 버튼을 누를 때 전달받은 id를 꺼내주는 구문
  const { id } = useParams();

  // DiaryStateContext가 제공하는 다이어리 리스트를 받아 오는 구문
  const diaryList = useContext(DiaryStateContext);

  //targetDiary 데이터를 저장할 state
  const [originData, setOriginData] = useState();

  // edit 컴포넌트가 마운트 될 때 다이어리 리스트에서 id값과 일치하는 일기를 꺼내주는 구문
  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (element) => parseInt(element.id) === parseInt(id)
      );

      if (targetDiary) {
        setOriginData(targetDiary);
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [id, DiaryList]);

  return (
    <div>
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
    </div>
  );
};

export default Edit;
