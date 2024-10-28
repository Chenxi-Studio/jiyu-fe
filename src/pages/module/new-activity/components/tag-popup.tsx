import React, { type FC } from "react";
import { $User } from "@/store/user";
import { Checkbox, Divider, Popup } from "@nutui/nutui-react-taro";
import {
  degreeNames,
  genderNames,
  type Degree,
  type Gender,
} from "@/types/common";
import { $Tag } from "@/store/tag";
import { Checklist } from "@nutui/icons-react-taro";
import { type ManageScope } from "@/types/admin";

export interface TagPopupProps {
  visible: boolean;
  onClose?: () => void;
  onChange?: (
    value: boolean,
    tag: string | Degree | Gender | number,
    type: "grade" | "major" | "class" | "gender" | "degree" | "tags",
  ) => void;
  defaultValue?: ManageScope;
}
export const TagPopup: FC<TagPopupProps> = (props) => {
  const { visible, onClose, onChange, defaultValue } = props;
  const scope = $User.use((state) => state.manageScope);
  const tags = $Tag.use((state) => state.tags);

  return (
    <Popup
      closeable
      visible={visible}
      title="选择活动参与范围"
      position="bottom"
      onClose={onClose}
      destroyOnClose
    >
      <div className="pb-4">
        <Divider contentPosition="left">班级</Divider>
        <div className="flex flex-wrap gap-x-2 gap-y-2 px-2">
          {scope?.class.map((option) => (
            <Checkbox
              key={option}
              value={option}
              label={option}
              defaultChecked={defaultValue?.class.includes(option)}
              onChange={(value) => {
                if (onChange !== undefined) {
                  onChange(value, option, "class");
                }
              }}
              activeIcon={
                <Checklist className="nut-checkbox-button-icon-checked" />
              }
              shape="button"
            />
          ))}
        </div>
        <Divider contentPosition="left">专业</Divider>
        <div className="flex flex-wrap gap-x-2 gap-y-2 px-2">
          {scope?.major.map((option) => (
            <Checkbox
              key={option}
              value={option}
              defaultChecked={defaultValue?.major.includes(option)}
              label={option}
              onChange={(value) => {
                if (onChange !== undefined) {
                  onChange(value, option, "major");
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
              defaultChecked={defaultValue?.degree.includes(option)}
              label={degreeNames(option)}
              onChange={(value) => {
                if (onChange !== undefined) {
                  onChange(value, option, "degree");
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
              defaultChecked={defaultValue?.gender.includes(option)}
              label={genderNames(option)}
              onChange={(value) => {
                if (onChange !== undefined) {
                  onChange(value, option, "gender");
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
              defaultChecked={defaultValue?.grade.includes(option)}
              label={option}
              onChange={(value) => {
                if (onChange !== undefined) {
                  onChange(value, option, "grade");
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
                  defaultChecked={defaultValue?.tags.includes(tag.id)}
                  label={tag.tagName}
                  onChange={(value) => {
                    if (onChange !== undefined) {
                      onChange(value, tag.id, "tags");
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
