import { useNavigate, useSearchParams } from "react-router-dom";

const Edit = () => {
  //navigate의 기능 : link 태그를 선택하지 않아도 원하는 페이지로 보낼 수 있게 함
  //ex) 비로그인 사용자가 로그인 되었을 때 보여주는 페이지로 가려고 할 때 로그인페이지로 보냄
  const navigate = useNavigate();

  //QueryString 담은 배열
  //useSearchParams = react router의 hook 이다.
  const [searchParams, setSearchParams] = useSearchParams();

  const id = searchParams.get("id");
  console.log("id = ", id);

  const mode = searchParams.get("mode");
  console.log("mode = ", mode);

  return (
    <div>
      <h1>Edit</h1>
      <p>이곳은 일기 수정 페이지 입니다.</p>
      <button onClick={() => setSearchParams({ id: 321512, mode: "이영철" })}>
        QueryString 바꾸기
      </button>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Home으로 이동!
      </button>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        뒤로가기{" "}
      </button>
    </div>
  );
};

export default Edit;
