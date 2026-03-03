import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainTemplate from "@/template/MainTemplate";
import Notes from "@/views/Notes";
import Articles from "@/views/Articles";
import Twitter from "@/views/Twitters";
import Button from "@/components/atoms/Button/Button";

const Root = () => (
  <BrowserRouter>
    <MainTemplate>
      <Routes>
        <Route path="/" element={<Notes />} />
        <Route path="/twitters" element={<Twitter />} />
        <Route path="/articles" element={<Articles />} />
      </Routes>
    </MainTemplate>
  </BrowserRouter>
);

export default Root;
