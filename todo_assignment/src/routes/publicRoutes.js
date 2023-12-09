import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "../pages/Index";
import TaskList from "../components/TaskData/Index";
import PageNotFound from "../components/page_Not_Found/Index"

const PublicRoutes = () => {
  return (
    <>
      <Routes>
         <Route path="/" element={<Main />} />
         <Route path="/tasklist" element={<TaskList/>} />
         <Route path="*" element={<PageNotFound/>} />
      </Routes>
    </>
  );
};

export default PublicRoutes;
