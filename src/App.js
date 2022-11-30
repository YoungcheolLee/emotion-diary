import React, { useReducer, useRef } from "react";

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home.js";
import New from "./pages/New.js";
import Edit from "./pages/Edit.js";
import Diary from "./pages/Diary.js";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      newState = [action.data, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((element) => element.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((element) =>
        element.id === action.data.id ? { ...action.data } : element
      );
      break;
    }
    default:
      return state;
  }
  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const dummyData = [
  {
    id: 1,
    emotion: 1,
    content: "오늘의 일기 1번",
    date: 1669822141495,
  },
  {
    id: 2,
    emotion: 2,
    content: "일기 2번",
    date: 1669822141496,
  },
  {
    id: 3,
    emotion: 3,
    content: "일기 3번",
    date: 1669822141497,
  },
  {
    id: 4,
    emotion: 4,
    content: "일기 4번",
    date: 1669822141498,
  },
  {
    id: 5,
    emotion: 5,
    content: "일기 5번",
    date: 1669822141499,
  },
];

function App() {
  const [data, dispatch] = useReducer(reducer, dummyData);

  const dataId = useRef(0);
  // CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current += 1;
  };
  // REMOVE
  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };
  // EDIT
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onRemove, onEdit }}>
        <BrowserRouter>
          {/* 브라우저 URL과 react app을 연결하는 기능을 하는 <BrowserRouter>로 감싸줌 */}
          <div className="App">
            <Routes>
              {/* <Routes> 기능을 이용해 페이지 연동  */}
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
