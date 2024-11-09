import React, { useState, useEffect, type FC } from "react";
import { Block, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import classnames from "classnames";
import "./iconfont.scss";

// const SystemWidth = Taro.getSystemInfoSync().windowWidth;
const quot = '"';

function hex2rgb(hex) {
  const rgb: number[] = [];

  hex = hex.substr(1);

  if (hex.length === 3) {
    hex = hex.replace(/(.)/g, "$1$1");
  }

  hex.replace(/../g, function (color: string) {
    rgb.push(parseInt(color, 0x10));
    return color;
  });

  return "rgb(" + rgb.join(",") + ")";
}

export type IconNames =
  | "icon-beifen"
  | "icon-bianji"
  | "icon-guidang"
  | "icon-pingjia"
  | "icon-shenhe"
  | "icon-shangchuan"
  | "icon-liebiao"
  | "icon-zhuye2"
  | "icon-tuichu"
  | "icon-wode";

interface PropsType {
  name: IconNames;
  size?: number;
  color?: string | string[];
  customStyle?: React.CSSProperties;
  customClassName?: string;
}

const IconFont: FC<PropsType> = ({
  name,
  size = 18,
  color,
  customStyle = {},
  customClassName = "",
}) => {
  const [colors, setColors] = useState<PropsType["color"]>();
  const [isStr, setIsStr] = useState(true);
  const [svgSize, setSvgSize] = useState(() => size);

  useEffect(() => {
    setIsStr(typeof color === "string");
    if (typeof color === "string") {
      setColors(color.indexOf("#") === 0 ? hex2rgb(color) : color);
    } else {
      setColors(
        color?.map(function (item) {
          return item.indexOf("#") === 0 ? hex2rgb(item) : item;
        }),
      );
    }
    return () => {};
  }, [color]);

  useEffect(() => {
    setSvgSize(size);
  }, [size]);

  // 也可以使用 if (name === 'xxx') { return <view> } 来渲染，但是测试发现在ios下会有问题，报错 Maximum call stack啥的。下面这个写法没问题
  return (
    <Block>
      {/* icon-colorCard  本地svg */}
      {/* { name === 'icon-colorCard' && (<View style={{backgroundImage: `url(${quot}data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='${svgSize}px' height='${svgSize}px' viewBox='0 0 72 72'><defs><linearGradient id='a' x1='56.049%' x2='45.965%' y1='85.384%' y2='36.243%'><stop offset='0%' stop-color='${(isStr ? colors : colors?.[0]) || '%233667EF'}' stop-opacity='.572'/><stop offset='100%' stop-color='${(isStr ? colors : colors?.[1]) || '%233591FD'}' stop-opacity='.551'/></linearGradient><linearGradient id='b' x1='100%' x2='16.645%' y1='85.384%' y2='36.243%'><stop offset='0%' stop-color='${(isStr ? colors : colors?.[2]) || '%233667EF'}' stop-opacity='.572'/><stop offset='100%' stop-color='${(isStr ? colors : colors?.[3]) || '%233591FD'}' stop-opacity='.551'/></linearGradient><linearGradient id='c' x1='18.906%' x2='80.404%' y1='44.444%' y2='55.556%'><stop offset='0%' stop-color='${(isStr ? colors : colors?.[4]) || '%233591FD'}'/><stop offset='100%' stop-color='${(isStr ? colors : colors?.[5]) || '%233667EF'}'/></linearGradient></defs><g fill='none' fill-rule='nonzero'><path fill='url(%23a)' d='M24.75 11.25A2.25 2.25 0 0 1 27 13.5v47.25A2.25 2.25 0 0 1 24.75 63h-13.5A2.25 2.25 0 0 1 9 60.75V13.5a2.25 2.25 0 0 1 2.25-2.25h13.5ZM18 50.625a3.375 3.375 0 1 0 0 6.75 3.375 3.375 0 0 0 0-6.75Z'/><path fill='url(%23b)' d='m45.593 16.216 9.546 9.546a2.25 2.25 0 0 1 0 3.182l-31.82 31.82a2.25 2.25 0 0 1-3.182 0L16.273 56.9a3.375 3.375 0 1 0-1.174-1.174l-4.508-4.508a2.25 2.25 0 0 1 0-3.182l31.82-31.82a2.25 2.25 0 0 1 3.182 0Z'/><path fill='url(%23c)' d='M60.75 45A2.25 2.25 0 0 1 63 47.25v13.5A2.25 2.25 0 0 1 60.75 63h-49.5A2.25 2.25 0 0 1 9 60.75v-13.5A2.25 2.25 0 0 1 11.25 45h49.5ZM18 50.625a3.375 3.375 0 1 0 0 6.75 3.375 3.375 0 0 0 0-6.75Z' opacity='.95'/></g></svg%3E${quot})`, width: `${svgSize}px`, height: `${svgSize}px`, ...customStyle}} className={classnames("icon", customClassName)} />) } */}
      {/* icon-alipay */}
      {/* {name === "icon-alipay" && (
        <View
          style={{
            backgroundImage: `url(${quot}data:image/svg+xml, %3Csvg viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' width='${svgSize}px' height='${svgSize}px'%3E%3Cpath d='M192 692.736c0-69.632 51.2-106.496 88.064-111.104 111.104-18.432 264.192 74.24 264.192 74.24-69.632 88.064-166.912 134.144-241.152 134.144-65.024-4.608-111.104-41.472-111.104-97.28z' fill='${(isStr
              ? colors
              : colors[0]) ||
              "rgb(91,139,212)"}' /%3E%3Cpath d='M979.456 729.6c-13.824-4.608-329.216-101.888-319.488-111.104 46.592-55.808 78.848-185.344 78.848-185.344v-27.648h-185.344V335.872h226.816v-41.472h-226.816V192.512H460.8v97.28H257.024v41.472H460.8v69.632H298.496v27.648h333.824c0 13.824-23.04 106.496-46.08 148.48-4.608-9.216-153.088-60.416-236.544-65.024-88.064 4.608-157.696 32.256-189.952 97.28-46.592 120.32 27.648 241.152 194.56 241.152 27.648 0 162.304-13.824 264.192-153.088 27.648 13.824 185.344 92.672 282.624 143.872-92.672 111.104-231.936 180.736-389.12 180.736-280.576 1.024-508.928-226.304-509.44-506.88v-3.072C1.024 231.424 227.84 3.072 508.928 2.56h3.072c280.576-1.024 508.928 226.304 509.44 506.88v3.072c4.608 82.944-13.824 152.576-41.984 217.088z' fill='${(isStr
              ? colors
              : colors[1]) ||
              "rgb(91,139,212)"}' /%3E%3C/svg%3E${quot})`, width: `${svgSize}px`, height: `${svgSize}px`,
            ...customStyle
          }}
          className={classnames(icon, customClassName)}
        />
      )} */}
      {/* icon-beifen */}

      {name === "icon-beifen" && (
        <View
          style={{
            backgroundImage: `url(${quot}data:image/svg+xml, %3Csvg viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' width='${svgSize}px' height='${svgSize}px'%3E%3Cpath d='M0 0h1024v1024H0V0z' fill='${(isStr ? colors : colors?.[0]) || "rgb(32,36,37)"}' opacity='.01'/%3E%3Cpath d='M170.666667 307.2a136.533333 136.533333 0 0 1 136.533333-136.533333h546.133333a136.533333 136.533333 0 0 1 136.533334 136.533333v546.133333a136.533333 136.533333 0 0 1-136.533334 136.533334H307.2a136.533333 136.533333 0 0 1-136.533333-136.533334V307.2z' fill='${(isStr ? colors : colors?.[1]) || "rgb(255,170,68)"}'/%3E%3Cpath d='M34.133333 170.666667a136.533333 136.533333 0 0 1 136.533334-136.533334h546.133333a136.533333 136.533333 0 0 1 136.533333 136.533334v546.133333a136.533333 136.533333 0 0 1-136.533333 136.533333H170.666667a136.533333 136.533333 0 0 1-136.533334-136.533333V170.666667z' fill='${(isStr ? colors : colors?.[2]) || "rgb(255,119,68)"}'/%3E%3Cpath d='M443.733333 187.733333A51.2 51.2 0 0 1 494.933333 238.933333v153.6H648.533333a51.2 51.2 0 0 1 0 102.4h-153.6V648.533333a51.2 51.2 0 0 1-102.4 0v-153.6H238.933333a51.2 51.2 0 0 1 0-102.4h153.6V238.933333A51.2 51.2 0 0 1 443.733333 187.733333z' fill='${(isStr ? colors : colors?.[3]) || "rgb(255,255,255)"}'/%3E%3C/svg%3E${quot})`,
            width: `${svgSize}px`,
            height: `${svgSize}px`,
            ...customStyle,
          }}
          className={classnames("icon", customClassName)}
        />
      )}
      {/* icon-bianji */}

      {name === "icon-bianji" && (
        <View
          style={{
            backgroundImage: `url(${quot}data:image/svg+xml, %3Csvg viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' width='${svgSize}px' height='${svgSize}px'%3E%3Cpath d='M0 0h1024v1024H0V0z' fill='${(isStr ? colors : colors?.[0]) || "rgb(32,36,37)"}' opacity='.01'/%3E%3Cpath d='M136.533333 68.266667a68.266667 68.266667 0 0 0-68.266666 68.266666v327.202134c0 30.378667 36.7616 45.636267 58.2656 24.132266L487.867733 126.532267c21.504-21.504 6.280533-58.2656-24.132266-58.2656H136.533333z m750.933334 887.466666a68.266667 68.266667 0 0 0 68.266666-68.266666v-327.202134c0-30.378667-36.7616-45.636267-58.2656-24.132266L536.132267 897.467733c-21.504 21.504-6.280533 58.2656 24.132266 58.2656H887.466667z' fill='${(isStr ? colors : colors?.[1]) || "rgb(255,170,68)"}'/%3E%3Cpath d='M628.5312 99.669333a68.266667 68.266667 0 0 0 0 96.494934l199.2704 199.304533a68.266667 68.266667 0 0 0 96.5632 0l17.237333-17.237333a68.266667 68.266667 0 0 0 0-96.5632l-199.2704-199.2704a68.266667 68.266667 0 0 0-96.5632 0l-17.237333 17.237333zM54.135467 671.9488A68.266667 68.266667 0 0 0 34.133333 720.213333V921.6a68.266667 68.266667 0 0 0 68.266667 68.266667h201.352533a68.266667 68.266667 0 0 0 48.264534-20.002134l453.051733-453.051733a68.266667 68.266667 0 0 0 0-96.529067l-201.386667-201.352533a68.266667 68.266667 0 0 0-96.529066 0L54.135467 671.982933z' fill='${(isStr ? colors : colors?.[2]) || "rgb(255,119,68)"}'/%3E%3Cpath d='M479.914667 544.085333a51.2 51.2 0 0 1 0 72.362667l-170.666667 170.666667a51.2 51.2 0 0 1-72.362667-72.362667l170.666667-170.666667a51.2 51.2 0 0 1 72.362667 0z' fill='${(isStr ? colors : colors?.[3]) || "rgb(255,255,255)"}'/%3E%3C/svg%3E${quot})`,
            width: `${svgSize}px`,
            height: `${svgSize}px`,
            ...customStyle,
          }}
          className={classnames("icon", customClassName)}
        />
      )}
      {/* icon-guidang */}

      {name === "icon-guidang" && (
        <View
          style={{
            backgroundImage: `url(${quot}data:image/svg+xml, %3Csvg viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' width='${svgSize}px' height='${svgSize}px'%3E%3Cpath d='M0 0h1024v1024H0V0z' fill='${(isStr ? colors : colors?.[0]) || "rgb(32,36,37)"}' opacity='.01'/%3E%3Cpath d='M238.933333 68.266667a68.266667 68.266667 0 0 0-68.266666 68.266666v34.133334a34.133333 34.133333 0 0 0 34.133333 34.133333h614.4a34.133333 34.133333 0 0 0 34.133333-34.133333V136.533333a68.266667 68.266667 0 0 0-68.266666-68.266666H238.933333zM170.666667 238.933333a68.266667 68.266667 0 0 0-68.266667 68.266667v34.133333a34.133333 34.133333 0 0 0 34.133333 34.133334h750.933334a34.133333 34.133333 0 0 0 34.133333-34.133334V307.2a68.266667 68.266667 0 0 0-68.266667-68.266667H170.666667z' fill='${(isStr ? colors : colors?.[1]) || "rgb(255,170,68)"}'/%3E%3Cpath d='M512 546.133333a136.6016 136.6016 0 0 0 132.334933-102.741333c4.642133-18.261333 19.456-33.792 38.331734-33.792h238.933333a68.266667 68.266667 0 0 1 68.266667 68.266667v341.333333a136.533333 136.533333 0 0 1-136.533334 136.533333H170.666667a136.533333 136.533333 0 0 1-136.533334-136.533333V477.866667a68.266667 68.266667 0 0 1 68.266667-68.266667h238.933333c18.8416 0 33.6896 15.530667 38.331734 33.792A136.6016 136.6016 0 0 0 512 546.133333z' fill='${(isStr ? colors : colors?.[2]) || "rgb(255,119,68)"}'/%3E%3Cpath d='M324.266667 750.933333a51.2 51.2 0 0 1 51.2-51.2h273.066666a51.2 51.2 0 0 1 0 102.4h-273.066666A51.2 51.2 0 0 1 324.266667 750.933333z' fill='${(isStr ? colors : colors?.[3]) || "rgb(255,255,255)"}'/%3E%3C/svg%3E${quot})`,
            width: `${svgSize}px`,
            height: `${svgSize}px`,
            ...customStyle,
          }}
          className={classnames("icon", customClassName)}
        />
      )}
      {/* icon-pingjia */}

      {name === "icon-pingjia" && (
        <View
          style={{
            backgroundImage: `url(${quot}data:image/svg+xml, %3Csvg viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' width='${svgSize}px' height='${svgSize}px'%3E%3Cpath d='M0 0h1024v1024H0V0z' fill='${(isStr ? colors : colors?.[0]) || "rgb(32,36,37)"}' opacity='.01'/%3E%3Cpath d='M34.133333 921.6a68.266667 68.266667 0 0 1 68.266667-68.266667h819.2a68.266667 68.266667 0 1 1 0 136.533334H102.4a68.266667 68.266667 0 0 1-68.266667-68.266667z' fill='${(isStr ? colors : colors?.[1]) || "rgb(255,170,68)"}'/%3E%3Cpath d='M628.5312 99.669333a68.266667 68.266667 0 0 0 0 96.494934l199.2704 199.304533a68.266667 68.266667 0 0 0 96.5632 0l17.237333-17.237333a68.266667 68.266667 0 0 0 0-96.5632l-199.2704-199.2704a68.266667 68.266667 0 0 0-96.5632 0l-17.237333 17.237333zM54.135467 671.9488A68.266667 68.266667 0 0 0 34.133333 720.213333V921.6a68.266667 68.266667 0 0 0 68.266667 68.266667h201.352533a68.266667 68.266667 0 0 0 48.264534-20.002134l453.051733-453.051733a68.266667 68.266667 0 0 0 0-96.529067l-201.386667-201.352533a68.266667 68.266667 0 0 0-96.529066 0L54.135467 671.982933z' fill='${(isStr ? colors : colors?.[2]) || "rgb(255,119,68)"}'/%3E%3Cpath d='M479.914667 544.085333a51.2 51.2 0 0 1 0 72.362667l-136.533334 136.533333a51.2 51.2 0 0 1-72.362666-72.362666l136.533333-136.533334a51.2 51.2 0 0 1 72.362667 0z' fill='${(isStr ? colors : colors?.[3]) || "rgb(255,255,255)"}'/%3E%3C/svg%3E${quot})`,
            width: `${svgSize}px`,
            height: `${svgSize}px`,
            ...customStyle,
          }}
          className={classnames("icon", customClassName)}
        />
      )}
      {/* icon-shenhe */}

      {name === "icon-shenhe" && (
        <View
          style={{
            backgroundImage: `url(${quot}data:image/svg+xml, %3Csvg viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' width='${svgSize}px' height='${svgSize}px'%3E%3Cpath d='M0 0h1024v1024H0V0z' fill='${(isStr ? colors : colors?.[0]) || "rgb(32,36,37)"}' opacity='.01'/%3E%3Cpath d='M136.533333 853.333333a68.266667 68.266667 0 0 1 68.266667-68.266666h614.4a68.266667 68.266667 0 0 1 68.266667 68.266666v68.266667a68.266667 68.266667 0 0 1-68.266667 68.266667H204.8a68.266667 68.266667 0 0 1-68.266667-68.266667v-68.266667z' fill='${(isStr ? colors : colors?.[1]) || "rgb(255,170,68)"}'/%3E%3Cpath d='M716.8 238.933333a204.8 204.8 0 0 1-114.312533 183.773867c-12.970667 6.417067-22.2208 19.0464-22.2208 33.518933V477.866667a34.133333 34.133333 0 0 0 34.133333 34.133333h204.8a136.533333 136.533333 0 0 1 136.533333 136.533333v170.666667a34.133333 34.133333 0 0 1-34.133333 34.133333H102.4a34.133333 34.133333 0 0 1-34.133333-34.133333v-170.666667a136.533333 136.533333 0 0 1 136.533333-136.533333h204.8a34.133333 34.133333 0 0 0 34.133333-34.133333v-21.640534c0-14.472533-9.250133-27.101867-22.2208-33.518933A204.8 204.8 0 1 1 716.8 238.933333z' fill='${(isStr ? colors : colors?.[2]) || "rgb(255,119,68)"}'/%3E%3Cpath d='M256 853.333333A51.2 51.2 0 0 1 307.2 802.133333h409.6a51.2 51.2 0 0 1 0 102.4H307.2A51.2 51.2 0 0 1 256 853.333333z' fill='${(isStr ? colors : colors?.[3]) || "rgb(255,255,255)"}'/%3E%3C/svg%3E${quot})`,
            width: `${svgSize}px`,
            height: `${svgSize}px`,
            ...customStyle,
          }}
          className={classnames("icon", customClassName)}
        />
      )}
      {/* icon-shangchuan */}

      {name === "icon-shangchuan" && (
        <View
          style={{
            backgroundImage: `url(${quot}data:image/svg+xml, %3Csvg viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' width='${svgSize}px' height='${svgSize}px'%3E%3Cpath d='M0 0h1024v1024H0V0z' fill='${(isStr ? colors : colors?.[0]) || "rgb(32,36,37)"}' opacity='.01'/%3E%3Cpath d='M307.2 853.333333a68.266667 68.266667 0 0 1 68.266667-68.266666h273.066666a68.266667 68.266667 0 0 1 68.266667 68.266666v68.266667a68.266667 68.266667 0 0 1-68.266667 68.266667h-273.066666a68.266667 68.266667 0 0 1-68.266667-68.266667v-68.266667z' fill='${(isStr ? colors : colors?.[1]) || "rgb(255,170,68)"}'/%3E%3Cpath d='M512 34.133333c-129.706667 0-238.250667 90.4192-266.1376 211.626667-3.652267 15.9744-16.7936 28.330667-32.8704 31.470933A221.866667 221.866667 0 0 0 256 716.8H375.466667a34.133333 34.133333 0 0 0 34.133333-34.133333v-153.6a17.066667 17.066667 0 0 0-17.066667-17.066667H314.2656a17.066667 17.066667 0 0 1-12.049067-29.149867l161.518934-161.518933a68.266667 68.266667 0 0 1 96.529066 0l161.518934 161.518933a17.066667 17.066667 0 0 1-12.049067 29.149867H631.466667a17.066667 17.066667 0 0 0-17.066667 17.066667V682.666667a34.133333 34.133333 0 0 0 34.133333 34.133333h119.466667a221.866667 221.866667 0 0 0 43.008-439.569067 42.052267 42.052267 0 0 1-32.8704-31.470933A273.169067 273.169067 0 0 0 512 34.133333z' fill='${(isStr ? colors : colors?.[2]) || "rgb(255,119,68)"}'/%3E%3C/svg%3E${quot})`,
            width: `${svgSize}px`,
            height: `${svgSize}px`,
            ...customStyle,
          }}
          className={classnames("icon", customClassName)}
        />
      )}
      {/* icon-liebiao */}

      {name === "icon-liebiao" && (
        <View
          style={{
            backgroundImage: `url(${quot}data:image/svg+xml, %3Csvg viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' width='${svgSize}px' height='${svgSize}px'%3E%3Cpath d='M0 0h1024v1024H0V0z' fill='${(isStr ? colors : colors?.[0]) || "rgb(32,36,37)"}' opacity='.01'/%3E%3Cpath d='M409.6 204.8a102.4 102.4 0 0 1 102.4-102.4h341.333333a102.4 102.4 0 1 1 0 204.8H512a102.4 102.4 0 0 1-102.4-102.4z m0 307.2a102.4 102.4 0 0 1 102.4-102.4h341.333333a102.4 102.4 0 1 1 0 204.8H512a102.4 102.4 0 0 1-102.4-102.4z m102.4 204.8a102.4 102.4 0 1 0 0 204.8h341.333333a102.4 102.4 0 1 0 0-204.8H512z' fill='${(isStr ? colors : colors?.[1]) || "rgb(255,119,68)"}'/%3E%3Cpath d='M68.266667 204.8a102.4 102.4 0 1 1 204.8 0 102.4 102.4 0 0 1-204.8 0z m0 307.2a102.4 102.4 0 1 1 204.8 0 102.4 102.4 0 0 1-204.8 0z m102.4 204.8a102.4 102.4 0 1 0 0 204.8 102.4 102.4 0 0 0 0-204.8z' fill='${(isStr ? colors : colors?.[2]) || "rgb(255,170,68)"}'/%3E%3C/svg%3E${quot})`,
            width: `${svgSize}px`,
            height: `${svgSize}px`,
            ...customStyle,
          }}
          className={classnames("icon", customClassName)}
        />
      )}
      {/* icon-zhuye2 */}

      {name === "icon-zhuye2" && (
        <View
          style={{
            backgroundImage: `url(${quot}data:image/svg+xml, %3Csvg viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' width='${svgSize}px' height='${svgSize}px'%3E%3Cpath d='M0 0h1024v1024H0V0z' fill='${(isStr ? colors : colors?.[0]) || "rgb(32,36,37)"}' opacity='.01'/%3E%3Cpath d='M136.533333 409.6a68.266667 68.266667 0 0 1 68.266667-68.266667h614.4a68.266667 68.266667 0 0 1 68.266667 68.266667v477.866667a68.266667 68.266667 0 0 1-68.266667 68.266666H204.8a68.266667 68.266667 0 0 1-68.266667-68.266666V409.6z' fill='${(isStr ? colors : colors?.[1]) || "rgb(255,119,68)"}'/%3E%3Cpath d='M512 597.333333a51.2 51.2 0 0 1 51.2 51.2v102.4a51.2 51.2 0 0 1-102.4 0v-102.4a51.2 51.2 0 0 1 51.2-51.2z' fill='${(isStr ? colors : colors?.[2]) || "rgb(255,255,255)"}'/%3E%3Cpath d='M436.258133 118.784a136.533333 136.533333 0 0 1 151.483734 0l342.459733 228.283733c28.091733 18.7392 14.848 62.532267-18.944 62.532267H112.7424c-33.792 0-47.035733-43.793067-18.944-62.532267l342.459733-228.317866z' fill='${(isStr ? colors : colors?.[3]) || "rgb(255,170,68)"}'/%3E%3C/svg%3E${quot})`,
            width: `${svgSize}px`,
            height: `${svgSize}px`,
            ...customStyle,
          }}
          className={classnames("icon", customClassName)}
        />
      )}
      {/* icon-tuichu */}

      {name === "icon-tuichu" && (
        <View
          style={{
            backgroundImage: `url(${quot}data:image/svg+xml, %3Csvg viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' width='${svgSize}px' height='${svgSize}px'%3E%3Cpath d='M0 0h1024v1024H0V0z' fill='${(isStr ? colors : colors?.[0]) || "rgb(32,36,37)"}' opacity='.01'/%3E%3Cpath d='M307.2 204.8a68.266667 68.266667 0 0 1 68.266667-68.266667h477.866666a102.4 102.4 0 0 1 102.4 102.4v546.133334a102.4 102.4 0 0 1-102.4 102.4H375.466667a68.266667 68.266667 0 0 1-68.266667-68.266667V204.8z' fill='${(isStr ? colors : colors?.[1]) || "rgb(255,170,68)"}'/%3E%3Cpath d='M68.266667 188.654933a68.266667 68.266667 0 0 1 50.312533-65.8432l282.043733-76.936533A34.133333 34.133333 0 0 1 443.733333 78.848v866.372267a34.133333 34.133333 0 0 1-43.1104 32.904533l-282.043733-76.9024A68.266667 68.266667 0 0 1 68.266667 835.310933V188.654933z' fill='${(isStr ? colors : colors?.[2]) || "rgb(255,119,68)"}'/%3E%3Cpath d='M648.533333 319.214933a17.066667 17.066667 0 0 1 30.037334-11.127466l165.239466 192.8192a17.066667 17.066667 0 0 1 0 22.186666l-165.239466 192.8192a17.066667 17.066667 0 0 1-30.037334-11.127466V580.266667h-85.333333a17.066667 17.066667 0 0 1-17.066667-17.066667v-102.4a17.066667 17.066667 0 0 1 17.066667-17.066667H648.533333V319.214933zM341.333333 443.733333a34.133333 34.133333 0 0 0-34.133333 34.133334v68.266666a34.133333 34.133333 0 1 0 68.266667 0v-68.266666a34.133333 34.133333 0 0 0-34.133334-34.133334z' fill='${(isStr ? colors : colors?.[3]) || "rgb(255,255,255)"}'/%3E%3C/svg%3E${quot})`,
            width: `${svgSize}px`,
            height: `${svgSize}px`,
            ...customStyle,
          }}
          className={classnames("icon", customClassName)}
        />
      )}
      {/* icon-wode */}

      {name === "icon-wode" && (
        <View
          style={{
            backgroundImage: `url(${quot}data:image/svg+xml, %3Csvg viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' width='${svgSize}px' height='${svgSize}px'%3E%3Cpath d='M0 0h1024v1024H0V0z' fill='${(isStr ? colors : colors?.[0]) || "rgb(32,36,37)"}' opacity='.01'/%3E%3Cpath d='M716.8 273.066667A204.8 204.8 0 0 0 307.2 273.066667v68.266666a204.8 204.8 0 0 0 409.6 0V273.066667zM238.933333 614.4a204.8 204.8 0 0 0-204.8 204.8v68.266667a68.266667 68.266667 0 0 0 68.266667 68.266666h819.2a68.266667 68.266667 0 0 0 68.266667-68.266666v-68.266667a204.8 204.8 0 0 0-204.8-204.8H238.933333z' fill='${(isStr ? colors : colors?.[1]) || "rgb(255,170,68)"}'/%3E%3Cpath d='M170.666667 819.2a204.8 204.8 0 0 1 204.8-204.8h273.066666a204.8 204.8 0 0 1 204.8 204.8v68.266667a68.266667 68.266667 0 0 1-68.266666 68.266666H238.933333a68.266667 68.266667 0 0 1-68.266666-68.266666v-68.266667z' fill='${(isStr ? colors : colors?.[2]) || "rgb(255,119,68)"}'/%3E%3C/svg%3E${quot})`,
            width: `${svgSize}px`,
            height: `${svgSize}px`,
            ...customStyle,
          }}
          className={classnames("icon", customClassName)}
        />
      )}
    </Block>
  );
};

export default IconFont;
