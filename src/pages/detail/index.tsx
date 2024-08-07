import { getCurrentInstance } from "@tarojs/runtime";
import React, { useEffect, useState } from "react";

const Detail = (): JSX.Element => {
  const [id, setId] = useState<number>(0);
  const [editable, setEditable] = useState<boolean>(false);

  useEffect(() => {
    const instance = getCurrentInstance();
    const params = instance.router?.params;
    if (!Number.isNaN(Number(params?.id))) {
      setId(Number(params?.id));
    }
    // eslint-disable-next-line no-extra-boolean-cast
    if (Boolean(params?.editable)) {
      setEditable(Boolean(params?.editable));
    }
  }, []);

  return (
    <>
      {" "}
      This is Detail. ID: {id}. Editable: {editable ? "true" : "false"}.
    </>
  );
};

export default Detail;
