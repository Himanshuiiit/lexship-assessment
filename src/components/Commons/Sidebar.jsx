import React, { useEffect, useState } from "react";
import logo from "../../assets/images/logo.jpg";
import { CiBarcode } from "react-icons/ci";
import { GrDocumentUpdate } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("read-barcode");
  useEffect(() => {
    if (active === "read-barcode") navigate("/");
    if (active === "update-status") navigate("/update-status");
  }, [active, navigate]);

  return (
    <aside className="w-[24rem] border-r border-gray-300 pl-8 pt-4">
      <img
        src={logo}
        alt="logo"
        className="w-48 cursor-pointer"
        onClick={() => setActive("read-barcode")}
      />

      <ul className="mt-36 ml-4">
        <li
          className={`mt-4 text-xl cursor-pointer ${
            active === "read-barcode" && "text-blue-400 font-semibold"
          }`}
          onClick={() => setActive("read-barcode")}
        >
          <CiBarcode
            className="inline text-red-700 mr-3"
            size={active === "read-barcode" ? 25 : 24}
          />
          Read Barcode
        </li>
        <li
          className={`mt-4 text-xl cursor-pointer ${
            active === "update-status" && "text-blue-400 font-semibold"
          }`}
          onClick={() => setActive("update-status")}
        >
          <GrDocumentUpdate
            className="inline text-red-700 mr-3"
            size={active === "update-status" ? 19 : 18}
          />{" "}
          Update Status
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
