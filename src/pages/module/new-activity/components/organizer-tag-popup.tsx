import React, { type FC } from "react";
import { $User } from "@/store/user";
import { Checkbox, Divider, Popup } from "@nutui/nutui-react-taro";
import { degreeNames, genderNames } from "@/types/common";
import { $Tag } from "@/store/tag";
import { Checklist } from "@nutui/icons-react-taro";

export interface OrganizerTagPopupProps {
  visible: boolean;
  onClose?: () => void;
  onChange?: (value: boolean, name: string) => void;
  defaultValue?: string[];
}
export const OrganizerTagPopup: FC<OrganizerTagPopupProps> = (props) => {
  const { visible, onClose, onChange, defaultValue } = props;
  const scope = $User.use((state) => state.manageScope);
  const tags = $Tag.use((state) => state.tags);

  return (
    <Popup
      closeable
      visible={visible}
      title="选择活动组织者单位"
      position="bottom"
      onClose={onClose}
      destroyOnClose
      lockScroll={false}
    >
      <div className="pb-4">
        <Divider contentPosition="left">班级</Divider>
        <div className="flex flex-wrap gap-x-2 gap-y-2 px-2">
          {scope?.class.map((option) => (
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

        <Divider contentPosition="left">基础标签</Divider>
        <div className="flex flex-wrap gap-x-2 gap-y-2 px-2">
          {scope?.degree.map((option) => (
            <Checkbox
              key={option}
              value={option}
              defaultChecked={defaultValue?.includes(degreeNames(option))}
              label={degreeNames(option)}
              onChange={(value) => {
                if (onChange !== undefined) {
                  onChange(value, degreeNames(option));
                }
              }}
              activeIcon={
                <Checklist className="nut-checkbox-button-icon-checked" />
              }
              shape="button"
            />
          ))}
          {scope?.gender.map((option) => (
            <Checkbox
              key={option}
              value={option}
              defaultChecked={defaultValue?.includes(genderNames(option))}
              label={genderNames(option)}
              onChange={(value) => {
                if (onChange !== undefined) {
                  onChange(value, genderNames(option));
                }
              }}
              activeIcon={
                <Checklist className="nut-checkbox-button-icon-checked" />
              }
              shape="button"
            />
          ))}
          {scope?.grade.map((option) => (
            <Checkbox
              key={option}
              value={option}
              defaultChecked={defaultValue?.includes(option)}
              label={option}
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

        <div className="flex flex-wrap gap-x-2 gap-y-2 px-2">
          <Divider contentPosition="left">特殊标签</Divider>
          {scope?.tags.map((id) => {
            const tag = tags.find((item) => item.id === id);
            if (tag !== undefined) {
              return (
                <Checkbox
                  key={tag.tagName}
                  value={tag.id}
                  defaultChecked={defaultValue?.includes(tag.tagName)}
                  label={tag.tagName}
                  onChange={(value) => {
                    if (onChange !== undefined) {
                      onChange(value, tag.tagName);
                    }
                  }}
                  activeIcon={
                    <Checklist className="nut-checkbox-button-icon-checked" />
                  }
                  shape="button"
                />
              );
            }
            return undefined;
          })}
        </div>
      </div>
    </Popup>
  );
};
