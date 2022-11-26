import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";

const New = () => {
  /**
   * 달력에 기능에 저장되는 숫자를 담은 state
   */
  const [date, setDate] = useState();

  // 헤더 뒤로가기 버튼 기능을 위해 navigate 상수 생성
  const navigate = useNavigate();

  return (
    <div>
      <MyHeader
        headText={"새로운 일기 쓰기"}
        leftChild={
          <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />
        }
      />
      <div>
        <section>
          <h4> 오늘은 언제인가요? </h4>
          <div className="input-box">
            <input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default New;
