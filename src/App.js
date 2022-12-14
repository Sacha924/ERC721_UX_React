import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import ChainInfo from "./pages/ChainInfo";
import NotFound from "./pages/NotFound";
import FakeBayc from "./pages/FakeBayc";
import FakeBaycTokenInfo from "./pages/FakeBaycTokenInfo";
import FakeNefturians from "./pages/FakeNefturians";
import FakeNefturiansUserInfo from "./pages/FakeNefturiansUserInfo";
import FakeMeebits from "./pages/FakeMeebits";
import WrongNetwork from "./pages/WrongNetwork";
import "./style.css";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="/ChainInfo" element={<ChainInfo />} />
          <Route path="/FakeBayc" element={<FakeBayc />} />
          <Route path="/FakeBaycTokenInfo" element={<FakeBaycTokenInfo />} />
          <Route path="/FakeNefturians" element={<FakeNefturians />} />
          <Route path="/FakeNefturiansUserInfo" element={<FakeNefturiansUserInfo />} />
          <Route path="/FakeMeebits" element={<FakeMeebits />} />
          <Route path="/WrongNetwork" element={<WrongNetwork />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
