import React, { type FC } from "react";
import { Checkbox, Divider, Popup } from "@nutui/nutui-react-taro";
import { Checklist } from "@nutui/icons-react-taro";

export interface CategoryTagPopupProps {
  visible: boolean;
  onClose?: () => void;
  onChange?: (value: boolean, name: string) => void;
  defaultValue?: string[];
}
const scope = [
  "党旗引领",
  "志愿服务",
  "学术讲座",
  "校园文化",
  "文体赛事",
  "社会实践",
];

export const CategoryTagPopup: FC<CategoryTagPopupProps> = (props) => {
  const { visible, onClose, onChange, defaultValue } = props;

  return (
    <Popup
      closeable
      visible={visible}
      title="选择活动分类"
      position="bottom"
      onClose={onClose}
      destroyOnClose
      lockScroll={false}
    >
      <div className="pb-4">
        <Divider contentPosition="left">活动分类</Divider>
        <div className="flex flex-wrap gap-x-2 gap-y-2 px-2">
          {scope?.map((option) => (
            <Checkbox
              key={option}
              value={option}
              label={option}
              defaultChecked={defaultValue?.includes(option)}
              onChange={(value) => {
                if (onChange !== undefined) {
                  onChange(value, option);
                }
              }}
              activeIcon={
                <Checklist className="nut-checkbox-button-icon-checked" />
              }
              shape="button"
            />
          ))}
        </div>
      </div>
    </Popup>
  );
};
