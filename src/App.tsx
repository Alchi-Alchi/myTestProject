import Container from "@mui/material/Container";
import {Routes, Route} from "react-router-dom";
import { Header } from "./components";
import { Home, Registration, Login, UserHome } from "./pages";
import { useDispatch, useSelector } from 'react-redux';
import React from "react";
import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth";

function App() {
  const dispatch = useDispatch<any>();
  const isAuth = useSelector(selectIsAuth);
  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/adminPage" element={<Home/>}/>
          <Route path="/home" element={<UserHome/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Registration/>}/>
        </Routes>
      </Container>
    </>
  );
}
export default App;
