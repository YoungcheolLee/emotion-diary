import { Link } from "react-router-dom";

const RouteTest = () => {
  return (
    <>
      <Link to={"/"}>HOME 페이지로 이동</Link>
      <br />
      <Link to={"/new"}>NEW 페이지로 이동</Link>
      <br />
      <Link to={"/edit"}>EDIT 페이지로 이동</Link>
      <br />
      <Link to={"/diary"}>DIARY 페이지로 이동</Link>
      <br />
    </>
  );
};

export default RouteTest;
