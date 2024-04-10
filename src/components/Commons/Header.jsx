import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  return (
    <header className="w-full py-6">
      <h1 className="text-4xl font-semibold text-center">
        {location.pathname === "/" ? "Barcode Scanner" : "Update Status"}
      </h1>
    </header>
  );
};

export default Header;
