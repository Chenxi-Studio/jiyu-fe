import { Search } from "@nutui/icons-react-taro";
import { Input } from "@tarojs/components";
import React, { type CSSProperties, useState, type FC } from "react";
import { twMerge } from "tailwind-merge";

export interface SearchBarProps {
  value: string;
  onChange: (input: string) => void;
  className?: string;
}

const baseStyle: CSSProperties = {
  transitionProperty:
    "color, background-color, border-color, text-decoration-color, fill, stroke",
  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  transitionDuration: "150ms",
  borderWidth: 1,
};

const focusStyle: CSSProperties = {
  borderColor: "#f9a8d4",
  ...baseStyle,
};

const normalStyle: CSSProperties = {
  borderColor: "#bcc2cb",
  ...baseStyle,
};

export const SearchBar: FC<SearchBarProps> = (props) => {
  const { value, onChange: handleChange, className } = props;
  const [isFocus, setIsFocus] = useState<boolean>(false);

  return (
    <div
      className={twMerge(
        "flex bg-white items-center justify-center gap-3 py-[2px] px-3 rounded-2xl h-6 border-solid border-4",
        className,
      )}
      style={isFocus ? focusStyle : normalStyle}
    >
      <Search size={12} color="#9ca3af" />
      <Input
        className="flex-1 text-gray-700 text-xs"
        type="text"
        value={value}
        onInput={(event) => {
          const { value: v } = event.detail;
          handleChange(v);
        }}
        onFocus={() => {
          setIsFocus(true);
        }}
        onBlur={() => {
          setIsFocus(false);
        }}
      />
    </div>
  );
};
