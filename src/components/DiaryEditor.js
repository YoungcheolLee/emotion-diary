import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryDispatchContext } from "../App";

import EmotionItem from "./EmotionItem";
import MyButton from "./MyButton";
import MyHeader from "./MyHeader";

/** DiaryEdior 페이지 설명
 * 일기 쓰기와 일기 수정하기 페이지의 내용이 동일하여 Editor 부분을 따로 컴포넌트로 빼줌
 */

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

// 감정 선택 배열
const emotionList = [
  {
    emotion_id: 1,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion1.png`,
    emotion_descript: "완전 좋음",
  },
  {
    emotion_id: 2,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion2.png`,
    emotion_descript: "좋음",
  },
  {
    emotion_id: 3,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion3.png`,
    emotion_descript: "그럭저럭",
  },
  {
    emotion_id: 4,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion4.png`,
    emotion_descript: "나쁨",
  },
  {
    emotion_id: 5,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion5.png`,
    emotion_descript: "끔찍함",
  },
];

//달력의 default 값에 금일 날짜를 담아주기 위한 메서드
const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};

const DiaryEditor = ({ isEdit, originData }) => {
  // 일기 내용을 작성하지 않으면 포커싱 되게 하는 기능
  const contentRef = useRef();

  // 일기 내용 쓰는 부분인 "오늘의 일기" 데이터를 저장하기 위한 state
  const [content, setContent] = useState();

  //어떤 감정 이미지를 선택했는지 저장할 state
  const [emotion, setEmotion] = useState(3);

  //달력에 기능에 저장되는 숫자를 담은 state
  const [date, setDate] = useState(getStringDate(new Date()));

  // DiaryDispatchContext로 부터 App.js의 onCreate 함수를 받아오는 구문
  const { onCreate, onEdit } = useContext(DiaryDispatchContext);

  //감정 이미지 선택 시 클릭 했을 때 발생하는 메서드
  const handleClickEmote = (emotion) => {
    setEmotion(emotion);
  };

  // 헤더 뒤로가기 버튼 기능을 위해 navigate 상수 생성
  const navigate = useNavigate();

  // 작성하기 버튼 클릭 시 수행되는 메서드
  const handleSubmit = () => {
    if (content.length < 1) {
      alert("최소 1글자 이상 입력해주세요.");
      contentRef.current.focus();
      return;
    }

    if (
      window.confirm(
        isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?"
      )
    ) {
      if (!isEdit) {
        onCreate(date, content, emotion);
      } else {
        onEdit(originData.id, date, content, emotion);
      }
    }

    onCreate(date, content, emotion);

    /** navigate 파라미터 설명
     * 작성하기 버튼 클릭 시 home으로 돌아가기 전 option을 주는 구문
     * 어떤옵션인가? "새 일기쓰기" 페이지를 "뒤로가기" 버튼을 눌러 오지 못하게 막음
     */
    navigate("/", { replace: true });
  };

  // props의 값이 바뀔 때 수행되는 구문
  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(parseInt(originData.date))));
      setEmotion(originData.emotion);
      setContent(originData.content);
    }
  }, [isEdit, originData]);

  return (
    <div className="DiaryEditor">
      <MyHeader
        headText={isEdit ? "일기 수정하기" : "새로운 일기쓰기"}
        leftChild={
          <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />
        }
      />
      <div>
        <section>
          <h4> 오늘은 언제인가요? </h4>
          <div className="input_box">
            <input
              className="input_date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
            />
          </div>
        </section>
        <section>
          <h4>오늘의 감정</h4>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((element) => (
              <EmotionItem
                key={element.id}
                {...element}
                onClick={handleClickEmote}
                /** isSelected 설명
                 * emotion 이미지가 선택되었는지? 선택되지 않았는지? 알기 위해서 만들어진 prop
                 */
                isSelected={element.emotion_id === emotion}
              />
            ))}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className="input_box_text_wrapper">
            <textarea
              placeholder="오늘은 어땠나요?"
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </section>
        <section>
          <div className="control_box">
            <MyButton text={"취소하기"} onClick={() => navigate(-1)} />
            <MyButton
              text={"작성완료"}
              type={"positive"}
              onClick={handleSubmit}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;
