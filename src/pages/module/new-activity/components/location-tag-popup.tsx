import React, { type FC } from "react";
import { Checkbox, Divider, Popup } from "@nutui/nutui-react-taro";
import { Checklist } from "@nutui/icons-react-taro";

export interface LocationTagPopupProps {
  visible: boolean;
  onClose?: () => void;
  onChange?: (value: boolean, name: string) => void;
  defaultValue?: string[];
}
const scope = ["邯郸校区", "枫林校区", "江湾校区", "张江校区"];
export const LocationTagPopup: FC<LocationTagPopupProps> = (props) => {
  const { visible, onClose, onChange, defaultValue } = props;

  return (
    <Popup
      closeable
      visible={visible}
      title="选择活动校区"
      position="bottom"
      onClose={onClose}
      destroyOnClose
      lockScroll={false}
    >
      <div className="pb-4">
        <Divider contentPosition="left">校区</Divider>
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
