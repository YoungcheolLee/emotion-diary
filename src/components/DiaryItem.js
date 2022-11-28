import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";

/** DiaryItem 페이지 정의
 * 일기 아이템의 컴포넌트
 */

const DiaryItem = ({ id, emotion, content, date }) => {
  /** navigate 설명
   * 일기 content 영역 클릭 시 > 일기 상세 페이지 이동
   * 일기 "수정하기" 버튼 클릭 시 > 수정하기 페이지 이동
   */
  const navigate = useNavigate();

  /** strDate 설명
   * 일기 작성날짜를 년,월,일로 변환해주는 구문
   * parseInt(date) = 날짜가 문자로 들어올 경우를 대비해 숫자로 변경
   */
  const strDate = new Date(parseInt(date)).toLocaleDateString();

  /** goDetail 설명
   * home에서 일기 감정, 내용 클릭 시 id에 맞는 diary 페이지로 이동
   */
  const goDetail = () => {
    navigate(`/diary/${id}`);
  };

  /** goEdit 설명
   * home에서 수정하기 버튼 클릭 시 id에 맞는 edit 페이지로 이동
   */
  const goEdit = () => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="DiaryItem">
      <div
        className={[
          "emotion_img_wrapper",
          `emotion_img_wrapper_${emotion}`,
        ].join(" ")}
        onClick={goDetail}
      >
        {/* img태그 설명
          process.env.PUBLIC_URL = public directory의 주소
          assets/emotion${emotion}.png = 일기의 emotion은 1~5까지 있는데 ${emotion} 변수를 통해 변수에 맞는 이미지 출력
        */}
        <img src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`} />
      </div>
      <div className="info_wrapper">
        <div className="diary_date" onClick={goDetail}>
          {strDate}
        </div>
        <div className="diary_content_preview">{content.slice(0, 25)}</div>
      </div>
      <div className="btn_wrapper">
        <MyButton text={"수정하기"} onClick={goEdit} />
      </div>
    </div>
  );
};

export default DiaryItem;
