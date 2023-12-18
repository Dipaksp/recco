import React,{useState} from "react";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { IoMdMenu } from "react-icons/io";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <nav className="flex justify-between items-center p-5 lg:px-10 bg-green-900 nvbar text-white">
        <div className="flex justify-between gap-10">
            <div className="font-bold text-xl">Recco</div>
        <div className="hidden md:flex justify-evenly space-x-4">
          <span className="cursor-pointer hover:text-gray-300">Store</span>
          <span className="cursor-pointer hover:text-gray-300">Orders</span>
          <span className="cursor-pointer hover:text-gray-300">Analytics</span>
          
        </div>
        
        </div>
        <div className="flex nvbar space-x-4">
          <div className="cursor-pointer hover:text-gray-300"><PiShoppingCartSimpleBold size={24}/></div>
          <div className="cursor-pointer hover:text-gray-300">User Info</div>
          <div className="md:hidden">
            <IoMdMenu onClick={() => setIsOpen(!isOpen)} />
            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 py-2 bg-green-900 text-white rounded-lg shadow-xl">
                <p className="block px-4 py-2 hover:bg-indigo-500 hover:text-white">Store</p>
                <p className="block px-4 py-2 hover:bg-indigo-500 hover:text-white">Orders</p>
                <p className="block px-4 py-2 hover:bg-indigo-500 hover:text-white">Analytics</p>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
