import { useState } from "react";
import { AiOutlineEnter } from "react-icons/ai";

import BarcodeList from "./BarcodeList";

const ManualEntry = ({ onSubmit }) => {
  const [list, setList] = useState([]);
  const [result, setResult] = useState([]);
  const [apiBeingCalled, setApiBeingCalled] = useState(false);
  const [apiError, setApiError] = useState("");
  const [text, setText] = useState("");

  const handleClick = async () => {
    try {
      setApiBeingCalled(true);
      const res = await onSubmit(list);
      setResult(res);
      setList([]);
    } catch (error) {
      setApiError(error.message);
    }
    setApiBeingCalled(false);
  };

  const handleEnter = () => {
    if (!text.length) return;
    setList((prev) => [...prev, text]);
    setText("");
  };

  const keyDown = (e) => {
    if (e.key === "Enter") {
      handleEnter();
    }
  };

  return (
    <>
      <div className={`m-auto w-fit mt-32`}>
        <div className={`w-[32rem] object-center overflow-hidden relative`}>
          <input
            className="w-full h-12 border-2 border-gray-300 rounded-3xl p-4 focus:outline-none"
            placeholder="Enter the barcodes here"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={keyDown}
          />
          <AiOutlineEnter
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-200 h-6 w-12 p-1 rounded-3xl cursor-pointer hover:bg-gray-300"
            onClick={handleEnter}
          />
        </div>
        {apiBeingCalled ? (
          <h1 className="text-gray-500 text-2xl w-full text-center my-20">
            Loading...
          </h1>
        ) : apiError ? (
          <h1 className="text-gray-500 text-2xl w-full text-center my-20">
            {apiError}
          </h1>
        ) : (
          <BarcodeList
            list={result.length > 0 ? result : list}
            setList={setList}
          />
        )}

        <button
          className={`w-full h-12 bg-red-500 hover:bg-red-600 text-white rounded-3xl disabled:bg-red-200 ${
            apiBeingCalled ? "cursor-wait" : ""
          }`}
          onClick={handleClick}
          disabled={list.length === 0 || apiBeingCalled}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default ManualEntry;
