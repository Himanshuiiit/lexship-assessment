import React, { useState } from "react";
import { BarcodeScanner, NavBar, ManualEntry } from "../components";
import { instance } from "../utils";

const ReadBardcode = () => {
  const [active, setActive] = useState("read-barcode");
  const onSubmit = async (list) => {
    const res = await instance.post(
      "https://lexlive2.lexship.biz/api/map/post11/emirates",
      {
        AWB: list,
      }
    );
    console.log(res.data);
    if (res.data.Success.length !== 0) return res.data.Success;
    else throw new Error("Invalid data");
  };
  return (
    <div className="w-full h-[88vh] justify-center">
      <NavBar active={active} setActive={setActive} />
      {
        {
          "read-barcode": <BarcodeScanner onSubmit={onSubmit} />,
          "manual-entry": <ManualEntry onSubmit={onSubmit} />,
        }[active]
      }
    </div>
  );
};

export default ReadBardcode;
