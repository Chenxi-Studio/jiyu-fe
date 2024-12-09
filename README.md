# jiyu-fe

dist/esm/swipe.taro

```javascript
const open = (side) => {
    var _a;
    opened.current = true;
    const offset = side === "left" ? leftWidth : -rightWidth;
    const name = props.name;
    (_a = props.onOpen) === null || _a === void 0 ? void 0 : _a.call(props, { name, position: side });
    if (offset === 0){
      getRectByTaro(rightWrapper.current).then(res => {
        setState((v) => Object.assign(Object.assign({}, v), { offset:  side === "left" ? Number(res.width) : -Number(res.width) }));
      })
    } else{

      setState((v) => Object.assign(Object.assign({}, v), { offset: Number(offset) || 0 }));
    }
  };
```

dist/esm/tour.taro

```javascript
React__default.createElement("div", { className: "nut-tour-masked", style: { display: showTour ? "block" : "none" }, onClick: handleClickMask, "catchMove": true }),
```
