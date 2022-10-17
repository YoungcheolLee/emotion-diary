import { useParams } from "react-router-dom";

const Diary = () => {
  //react router dom이 제공하는 함수
  const { id } = useParams();
  console.log(id);

  return (
    <div>
      <h1>Diary</h1>
      <p>이곳은 일기 상세 페이지 입니다.</p>
    </div>
  );
};

export default Diary;
