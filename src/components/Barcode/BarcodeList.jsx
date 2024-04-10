import { MdDelete } from "react-icons/md";
const BarcodeList = ({ list, setList }) => {
  return (
    <div className="my-4 bg-gray-100 h-48 overflow-y-scroll no-scrollbar p-4">
      {list.length > 0 ? (
        list.map((item, index) => {
          return (
            <div className="flex items-center" key={index}>
              <p className="text-gray-500 text-xl mr-4 my-1 border border-gray-300 p-2 rounded-2xl flex-1">
                {typeof item === "string"
                  ? item
                  : item.FROM_AWB + "     ->      " + item.EMIRATES}
              </p>
              {typeof item === "string" && (
                <MdDelete
                  className="text-red-500 cursor-pointer"
                  size={24}
                  onClick={() => setList(list.filter((_, i) => i !== index))}
                />
              )}
            </div>
          );
        })
      ) : (
        <p className="text-gray-500 text-xl flex justify-center items-center h-[95%]">
          No Code Entered Yet
        </p>
      )}
    </div>
  );
};

export default BarcodeList;
