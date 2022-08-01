import React from 'react';
import {Navigate, Routes} from "react-router-dom";
import {Route} from 'react-router'
import Dashboard from "layout/pages/dashboard/Dashboard";
import Files from "layout/pages/files/Files";
import FileDetail from "layout/pages/files/FileDetail";
import Login from "layout/pages/login/Login";
import {useSelector} from "react-redux";
import {selectUser} from "store/user/user";
import Register from "layout/pages/login/components/Register";

interface Props {}

const FrontRoutes = (props: Props) => {
    const user = useSelector(selectUser).user;

    return (
      <Routes>
          {!user
              ? <Route path={"/login"} element={<Login/>}/>
              : <Route path={"/dashboard"} element={<Navigate replace to={"/"}/>}/>
          }

          {!user && <Route path="/register" element={<Register/>}/>}

          {user && (
              <React.Fragment>
                  <Route path={"/files"} element={<Files/>}/>
                  <Route path={"/fileDetail"} element={<FileDetail/>}/>
                  <Route path={"/profile"} element={<div>Profile</div>}/>
                  <Route path={"/"} element={<Dashboard/>}/>
              </React.Fragment>
          )}
          <Route path={"*"} element={<Login/>}/>
      </Routes>

    );
};

export default FrontRoutes;
