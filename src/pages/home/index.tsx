import React, { useEffect } from "react";

const Home = (): JSX.Element => {
  useEffect(() => {
    console.log("start.");
  }, []);

  return (
    <div className="mx-10">
      <div className="text-lg">This is home.</div>
      <div className="drawer-box">
        <div className="box-item">
          <a onClick={() => {}}>profile</a>
        </div>
      </div>
    </div>
  );
};

export default Home;
