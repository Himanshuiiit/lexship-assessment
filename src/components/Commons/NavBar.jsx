const NavBar = ({ active, setActive }) => {
  return (
    <ul className="w-full hidden text-sm font-medium text-center text-gray-500 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
      <li className="w-full focus-within:z-10">
        <div
          className={`inline-block w-full p-4 rounded-s-lg border-r ${
            active === "read-barcode"
              ? "text-gray-900 bg-gray-100  border-gray-200 dark:border-gray-700  focus:outline-none dark:bg-gray-700 dark:text-white"
              : "bg-white border-gray-200 dark:border-gray-700 hover:text-gray-700 hover:bg-gray-50 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
          }`}
          aria-current="page"
          onClick={() => setActive("read-barcode")}
        >
          Read Barcodes
        </div>
      </li>
      <li className="w-full focus-within:z-10">
        <div
          className={`inline-block w-full p-4 rounded-e-lg ${
            active === "manual-entry"
              ? "text-gray-900 bg-gray-100 border-gray-200 dark:border-gray-700 focus:outline-none dark:bg-gray-700 dark:text-white"
              : "bg-white border-gray-200 dark:border-gray-700 hover:text-gray-700 hover:bg-gray-50 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
          }`}
          onClick={() => setActive("manual-entry")}
        >
          Enter Codes Manually
        </div>
      </li>
    </ul>
  );
};

export default NavBar;
