const MyButton = ({ text, type, onClick }) => {
  // 버튼의 type이 이상한 글자가 들어와도 삼항연산자를 통해 default 타입으로 바꿔주는 구문
  const btnType = ["positive", "nagative"].includes(type) ? type : "default";

  return (
    <button
      className={["MyButton", `Mybutton_${btnType}`].join(" ")}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

MyButton.defaultProps = {
  type: "default",
};

export default MyButton;
