import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { RiExpandUpDownLine } from "react-icons/ri";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { instance, statusData } from "../utils";
import toast, { Toaster } from "react-hot-toast";

const UpdateStatus = () => {
  const [selected, setSelected] = useState(statusData[0]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    awbCode: "",
    convertedCode: "",
    date: "",
    time: "",
  });

  const getCurrentDate = () => {
    const currentDate = new Date(formData.date);
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Adding 1 because January is 0
    const day = String(currentDate.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const getCurrentTime = () => {
    const currentTime = new Date(formData.time);
    const hours = String(currentTime.getHours()).padStart(2, "0");
    const minutes = String(currentTime.getMinutes()).padStart(2, "0");
    const seconds = String(currentTime.getSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!formData.awbCode || !formData.time || !formData.date) return;
    try {
      console.log(formData);
      setLoading(true);
      const res = await instance.post(
        `https://lexlive2.lexship.biz/api/awb/status/update?statusCode=${
          selected.code
        }&CreatedDate=${getCurrentDate()}&CreatedTime=${getCurrentTime()}`,
        {
          AWBs: [formData.awbCode],
        }
      );
      if (res.status === 200) {
        setFormData({ awbCode: "", convertedCode: "", date: "", time: "" });
        setSelected(statusData[0]);
        toast.success("Status Updated");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
    setLoading(false);
  };
  return (
    <form className="w-full max-w-[90rem] m-auto" onSubmit={onSubmit}>
      {/* barcode */}
      <div className="w-[90%] flex justify-between gap-4 items-center my-4">
        <label className="text-gray-500 whitespace-nowrap">AWB Code: </label>
        <input
          type="text"
          placeholder="AWB code"
          value={formData.awbCode}
          onChange={(e) =>
            setFormData({ ...formData, awbCode: e.target.value })
          }
          className="w-[45%] relative cursor-default rounded-lg my-4 bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm"
        />
        <label className="text-gray-500 whitespace-nowrap">
          Converted Code:{" "}
        </label>
        <input
          type="text"
          placeholder="Convered code"
          value={formData.convertedCode}
          onChange={(e) =>
            setFormData({ ...formData, convertedCode: e.target.value })
          }
          className="w-[45%] relative cursor-default rounded-lg my-4 bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm"
        />
      </div>

      {/* status */}
      <div className="w-fit flex gap-10 items-center my-4">
        <label className="text-gray-500 whitespace-nowrap">Status: </label>
        <Listbox value={selected} onChange={setSelected} className="w-[30%]">
          <div className="relative mt-1">
            <Listbox.Button className="relative cursor-default rounded-lg w-96 bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm">
              <span className="block truncate">{selected.value}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <RiExpandUpDownLine
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 z-20 max-h-60 w-96 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                {statusData.map((data) => (
                  <Listbox.Option
                    key={data.code}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-2 pr-4 ${
                        active ? "bg-blue-100 text-blue-900" : "text-gray-900"
                      }`
                    }
                    value={data}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected
                              ? "font-medium text-blue-500"
                              : "font-normal"
                          }`}
                        >
                          {data.value}
                        </span>
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
      {/* Date picker and time picker */}
      <div>
        <div className="w-fit flex gap-10 items-center my-8">
          <label className="text-gray-500 whitespace-nowrap">Date: </label>
          <input
            type="date"
            value={formData.date}
            className="relative cursor-default rounded-lg my-4 bg-white py-2 px-3 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm"
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
          <label className="text-gray-500 whitespace-nowrap">Time: </label>
          <input
            type="time"
            value={formData.time}
            className="relative cursor-default rounded-lg my-4 bg-white py-2 px-3  text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm"
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          />
        </div>
      </div>

      {/* submit button */}
      <div className="w-full h-16 flex gap-10 items-center my-4 relative">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 w-40 h-12 text-white font-bold py-2 px-4 flex justify-center items-center rounded absolute bottom-0 right-36"
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="animate-spin" />
          ) : (
            "Update Status"
          )}
        </button>
      </div>
      <Toaster />
    </form>
  );
};

export default UpdateStatus;
