const MyButton = ({ text, type, onClick }) => {
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
