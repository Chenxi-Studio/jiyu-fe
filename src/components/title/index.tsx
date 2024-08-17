import React, { type FC } from "react";

import "./style.css";

export interface TitleProps {
  content: string;
}

export const Title: FC<TitleProps> = ({ content }): JSX.Element => {
  return (
    <div className="w-full panel__title relative text-xl font-bold pl-4 my-2 text-gray-300">
      {content}
    </div>
  );
};
