import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home.js";
import New from "./pages/New.js";
import Edit from "./pages/Edit.js";
import Diary from "./pages/Diary.js";

// COMPONENTS
import MyButton from "./components/MyButton";
import MyHeader from "./components/MyHeader";

function App() {
  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || "";

  return (
    //브라우저 URL과 react app을 연결하는 기능을 하는 <BrowserRouter>로 감싸줌
    <BrowserRouter>
      <div className="App">
        <MyHeader
          headText={"App"}
          leftChild={
            <MyButton text="왼쪽버튼" onClick={() => alert("왼쪽클릭")} />
          }
          rightChild={
            <MyButton text="오른쪽버튼" onClick={() => alert("오른쪽클릭")} />
          }
        />
        <h2>App.js</h2>
        <MyButton
          text={"버튼"}
          onClick={() => alert("버튼클릭")}
          type={"positive"}
        />
        <MyButton
          text={"버튼"}
          onClick={() => alert("버튼클릭")}
          type={"nagative"}
        />
        <MyButton
          text={"버튼"}
          onClick={() => alert("버튼클릭")}
          type={"default"}
        />
        {/* <Routes> 기능을 이용해 페이지 연동  */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<New />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/diary/:id" element={<Diary />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
