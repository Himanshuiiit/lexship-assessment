import { useState } from "react";
import { useZxing } from "react-zxing";
import { RiCameraOffLine } from "react-icons/ri";
import BarcodeList from "./BarcodeList";

const BarcodeScanner = ({ onSubmit }) => {
  const [list, setList] = useState([]);
  const [result, setResult] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [apiBeingCalled, setApiBeingCalled] = useState(false);
  const [apiError, setApiError] = useState("");
  const { ref } = useZxing({
    onDecodeResult(result) {
      if (result.getText() === list[list.length - 1]) return;
      setList((prev) => [...prev, result.getText()]);
    },
    onError(error) {
      console.log(error);
      setError("Camera Not Found");
    },
  });

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
  if (error) {
    return (
      <h1 className="text-gray-500 text-5xl w-full text-center my-auto mt-48">
        <RiCameraOffLine className="m-auto h-32" size={96} />
        {error}
        <p className="text-sm mt-2">Please check the device or permissions</p>
      </h1>
    );
  }

  return (
    <>
      <div className={`m-auto w-fit mt-32 ${loading && "hidden"}`}>
        <div
          className={`w-[32rem] h-32 object-center overflow-hidden relative`}
        >
          <div className="w-[80%] h-1 bg-red-600 rounded-3xl m-auto absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" />
          <video ref={ref} onLoadedData={() => setLoading(false)} />
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

      {loading && (
        <h1 className="text-gray-500 text-5xl w-full text-center my-auto mt-48">
          Loading...
        </h1>
      )}
    </>
  );
};

export default BarcodeScanner;
