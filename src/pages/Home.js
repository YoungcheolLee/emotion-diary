import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";
import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";
import DiaryList from "../components/DiaryList";

const Home = () => {
  //App.js의 DiaryStateContext를 통해서 리스트를 공급받을 수 있게 만들어줌
  const diaryList = useContext(DiaryStateContext);

  //년,월 에 맞춰 diary data들을 관리하기위한 state
  const [data, setData] = useState();

  //header 영역의 날짜 관리를 위한 state
  const [curDate, setCurDate] = useState(new Date());

  //getFullYear() : 로컬에 있는 년도를 가져오는 메서드
  //getMonth() : 로컬에 있는 월을 가져오는 메서드. 0월 부터 시작하기 떄문에 +1을 해주었음
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

  //diaryList 에서 현재 년, 월에 맞는 일기 데이터만 뽑아내기 위한 메서드
  useEffect(() => {
    if (diaryList.length >= 1) {
      const firstDay = new Date(
        //매 년,월의 1일의 데이터를 추리는 구문
        curDate.getFullYear(),
        curDate.getMonth(),
        1
      ).getTime();
      //=================================

      const lastDay = new Date(
        //매 년,월의 마지막날의 데이터를 추리는 구문
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        1
      ).getTime();
      //=================================
      //매 "월" 안에 작성된 다이어리 리스트 데이터를 뽑아내는 구문
      setData(
        diaryList.filter(
          (element) => firstDay <= element.date && element.date <= lastDay
        )
      );
    }
  }, [diaryList, curDate]);

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  //header 영역의 ">" 버튼 클릭 시 "월" 을 증가시켜주는 메서드
  const increaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
    );
  };

  //header 영역의 "<" 버튼 클릭 시 "월" 을 감소시켜주는 메서드
  const decreaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
    );
  };

  return (
    <div>
      <MyHeader
        headText={headText}
        leftChild={<MyButton text={"<"} onClick={decreaseMonth} />}
        rightChild={<MyButton text={">"} onClick={increaseMonth} />}
      />
      <DiaryList diaryList={data} />
    </div>
  );
};

export default Home;
