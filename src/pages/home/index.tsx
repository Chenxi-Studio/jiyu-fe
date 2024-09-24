import React, { useEffect } from "react";
import { SearchBar } from "./components/search-bar";

const Home = (): JSX.Element => {
  useEffect(() => {
    console.log("start.");
  }, []);

  return (
    <div className="px-10 bg-[#fcfcfc] min-h-[100vh]">
      <SearchBar
        onChange={(input) => {
          console.log(input);
        }}
      />
    </div>
  );
};

export default Home;
