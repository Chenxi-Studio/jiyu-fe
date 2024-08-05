import { navigatorTo } from "@/utils/navigator";
import React, { useEffect } from "react";

const Home = (): JSX.Element => {
  useEffect(() => {
    console.log("start.");
  }, []);

  return (
    <>
      <div className="text-lg">This is home.</div>
      <div className="drawer-box">
        <div className="box-item">
          <a
            onClick={() => {
              navigatorTo("/pages/profile/index");
            }}
          >
            profile
          </a>
        </div>
      </div>
    </>
  );
};

export default Home;
