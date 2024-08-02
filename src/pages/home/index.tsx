import Profile from "@/components/profile";
import { View } from "@tarojs/components";
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

const Home = (): JSX.Element => {
  return (
    <BrowserRouter>
      <div>This is home.</div>
      <View className="drawer-box">
        <View className="box-item">
          <Link to="/pages/home/index/view1">view1</Link>
        </View>
        <View className="box-item">
          <Link to="/pages/home/index/view2">view2</Link>
        </View>
        <View className="box-item">
          <Link to="/pages/home/index/view3">view3</Link>
        </View>
        <View className="box-item">
          <Link to="/profile">Profile</Link>
        </View>
      </View>

      <Routes>
        <Route
          path="/pages/home/index/view1"
          element={<div>view1</div>}
        ></Route>
        <Route
          path="/pages/home/index/view2"
          element={<div>view2</div>}
        ></Route>
        <Route
          path="/pages/home/index/view3"
          element={<div>view3</div>}
        ></Route>
        <Route path="/profile" element={<Profile></Profile>}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Home;
