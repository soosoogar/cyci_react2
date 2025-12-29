import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Main from './page/Main';
import Calc from './page/Calc';
import Dark from './page/Dark';
import StudentInfo from './page/StudentInfo';

import Props건네주기 from './page/7일차_comp/자식건네주기';
import 게시판 from './page/7일차_comp/게시판';
import Axios1 from './page/axios/Axios보내기';
import Login from './page/Login';
import Register from './page/Register';
import Test from './page/test/Test';


function App() {
  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Main />} />
        <Route path={"/calc"} element={<Calc />} />
        <Route path={"/dark"} element={<Dark />} />
        <Route path={"/studentinfo"} element={<StudentInfo />} />
        <Route path={"/comp1"} element={<Props건네주기 />} />
        <Route path={"/board"} element={<게시판 />} />
        <Route path={"/axios1"} element={<Axios1 />} />
        <Route path={"/Login"} element={<Login />} />
        <Route path={"/Register"} element={<Register />} />
        <Route path={"/test"} element={<Test />} />
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
