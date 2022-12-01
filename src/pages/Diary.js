import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";

import { getStringDate } from "../util/data";
import { emotionList } from "../util/emotion";

/** Diary 페이지 설명
 * 다이어리 상세 페이지 구현
 */
const Diary = () => {
  //react router dom이 제공하는 함수
  const { id } = useParams();

  //존재하지 않는 다이어리 상세 페이지 진입 시 이전페이지로 보내주기 위해 navigate 변수 생성
  const navigate = useNavigate();

  //diaryList를 가져오는 구문
  const diaryList = useContext(DiaryStateContext);

  //일기 데이터를 컨트롤할 state 생성
  const [data, setData] = useState();

  //id를 기준으로 다이어리 상세 페이지에서 보여줄 내용 매핑
  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (element) => parseInt(element.id) === parseInt(id)
      );

      if (targetDiary) {
        //일기가 존재할 때
        setData(targetDiary);
      } else {
        alert("없는 일기입니다.");
        navigate("/", { replace: true });
        //일기가 없을 떄
      }
    }
  }, [id, diaryList]);

  //
  if (!data) {
    return <div className="DiaryPage">로딩중입니다...</div>;
  } else {
    const curEmotionData = emotionList.find(
      (element) => parseInt(element.emotion_id) === parseInt(data.emotion)
    );
    console.log(curEmotionData);
    return (
      <div className="DiaryPage">
        <MyHeader
          headText={`${getStringDate(new Date(data.date))} 기록`}
          leftChild={
            <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />
          }
          rightChild={
            <MyButton
              text={"수정하기"}
              onClick={() => navigate(`/edit/${data.id}`)}
            />
          }
        />
        <article>
          <section>
            <h4>오늘의 감정</h4>
            <div
              className={[
                "diary_img_wrapper",
                `diary_img_wrapper_${data.emotion}`,
              ].join(" ")}
            >
              <img src={curEmotionData.emotion_img} />
              <div className="emotion_descript">
                {curEmotionData.emotion_descript}
              </div>
            </div>
          </section>
          <section>
            <h4>오늘의 일기</h4>
            <div className="diary_content_wrapper">
              <p>{data.content}</p>
            </div>
          </section>
        </article>
      </div>
    );
  }
};

export default Diary;
