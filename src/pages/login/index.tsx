import { View, Text } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import React, { useEffect } from "react";

const Index = (): JSX.Element => {
  useLoad(() => {
    console.log("Page loaded.");
  });

  useEffect(() => {
    console.log("useEffect");
  }, []);

  return (
    <View className="index">
      <Text>Hello world!</Text>
    </View>
  );
};

export default Index;
