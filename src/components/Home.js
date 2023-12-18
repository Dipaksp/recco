import React, { useState } from "react";
import { IoFastFoodOutline, IoSnow, IoPrintOutline } from "react-icons/io5";
import { PiBowlFoodThin } from "react-icons/pi";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import {
  MdOutlineFastfood,
  MdOutlineSoupKitchen,
  MdLocalDrink,
} from "react-icons/md";
import { TbMeat } from "react-icons/tb";
import { GiChickenOven } from "react-icons/gi";
import { useSelector } from "react-redux";
import chicken from "../assets/chicken.png";
import { VscCheck, VscChromeClose } from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { approveStatus, editProduct, editQandP } from "../redux/productSlice";


function Home() {
  const [diva, setDiv] = useState(0);
  const products = useSelector((state) => state.product.products);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [editPrice, setEditPrice] = useState(null);
  const [editQuantity, setEditQuantity] = useState(null);
  const dispatch = useDispatch();

  const handleEditClick = (id) => {
    if (id.status==="Approved") return
    setEditProductId(id);
    setIsPopupOpen(true);
    setEditQuantity(id.Quantity);
    setEditPrice(id.realPrice);
  };
  const clearEverything = () => {
    setEditProductId({});
    setEditPrice("");
    setEditQuantity("");
    setIsPopupOpen(false);
    return;
  };
  const handleEditSubmit = (e) => {
    e.preventDefault();
    console.log(editProductId, editQuantity);
    if (editQuantity <= 0 || editPrice <= 0) {
      clearEverything();
      return;
    }
    if (editQuantity === editProductId.Quantity) {
      let prc = editPrice + "/6+ 1LB";
      console.log(prc);
      dispatch(
        editQandP({
          id: editProductId.id,
          updates: {
            price: prc,
            realPrice: editPrice,
            status: "Price Updated",
          },
        })
      );
      console.log("editPrice}");
      clearEverything();
      return;
    }
    if (editPrice === editProductId.realPrice) {
      dispatch(
        editQandP({
          id: editProductId.id,
          updates: {
            Quantity: editQuantity,
            status: "Quantity Updated",
          },
        })
      );
      clearEverything();
      return;
    }

    dispatch(
      editProduct({
        id: editProductId.id,
        updates: {
          realPrice: editPrice,
          Quantity: editQuantity,
          status: "Updated price and quantity",
        },
      })
    );
    clearEverything();
  };

  const closeing = () => {
    setDiv(0);
  };
  const getStatusStyle = (status) => {
    switch (status) {
      case "Missing":
        return { backgroundColor: "orange", color: "white" };
      case "Urgent Missing":
        return { backgroundColor: "red", color: "white" };
      case "Approved":
        return { backgroundColor: "green", color: "white" };
      case "Updated price and quantity":
        return { backgroundColor: "green", color: "white" };
      case "Price Updated":
        return { backgroundColor: "green", color: "white" };
      case "Quantity Updated":
        return { backgroundColor: "green", color: "white" };
      default:
        return {};
    }
  };
  const getStatusStyleIcon = (status) => {
    switch (status) {
      case "Missing":
        return { color: "orange" };
      case "Urgent Missing":
        return { color: "red" };
      case "Approved":
        return { color: "green" };
      case "Updated price and quantity":
        return { color: "green" };
      case "Price Updated":
        return { color: "green" };
      case "Quantity Updated":
        return { color: "green" };
      default:
        return {};
    }
  };
  const data = [
    {
      supplier: "East coast fruits & vegetables",
      shipmentDate: "Thu, Feb 20 2024",
      total: "$1,575.43",
      department: "300-444-4756",
      status: "Awaiting your approval",
    },
  ];
  const handleApprove = (id) => {
    let today=Date().slice(0, 15)
    if(today>data[0].shipmentDate) return
    dispatch(
      approveStatus({
        id: id,
        status: "approve",
      })
    );
  };

  let val = products.reduce(
    (acc, item) => acc + item.Quantity * item.realPrice,
    0
  );
  return (
    <div className="bg-gray-100">
      <div className="flex flex-col md:flex-row justify-between items-center p-4 bg-white border-b-2 shadow-sm">
        <div className="flex flex-col mb-4 md:mb-0">
          <span className="text-gray-500">
            Orders {">"} <span className="underline">order 92437108</span>
          </span>
          <span className="text-black font-bold">Order 32457ABC</span>
        </div>
        <div className="flex nvbar space-x-2">
          <button className="bg-gray-50 text-green-900 px-4 py-2 mx-4 sm:mx-0 rounded-full border hover:bg-gray-400 w-full md:w-auto">
            Back
          </button>
          <button className="bg-green-800 text-white px-4 py-2  mx-4 sm:mx-0 rounded-full hover:bg-green-600 w-full md:w-auto">
            Approve Order
          </button>
        </div>
      </div>
      <div className="border bg-white flex md:shrink-0 gap-4 justify-center p-5 mx-4 mt-4 rounded-md middlebody ">
        <div className="p-4 md:border-r  border-gray-300 w-full md:w-1/6">
          <p>Supplier</p>
          <p className="font-semibold text-black ">{data[0].supplier}</p>
        </div>
        <div className="p-4  md:border-r  border-gray-300 w-full md:w-1/6">
          <p>Shipping Date</p>
          <p className="font-semibold text-black ">{data[0].shipmentDate}</p>
        </div>
        <div className="p-4  md:border-r border-gray-300 w-full md:w-1/6">
          <p>Total</p>
          <p className="font-semibold text-black ">$ {val.toFixed(2)}</p>
        </div>
        <div className="p-4  md:border-r border-gray-300 category w-full md:w-1/6">
          <p>Category</p>
          <p className="flex justify-center gap-4 my-2">
            <IoFastFoodOutline /> <PiBowlFoodThin /> <MdOutlineFastfood />
            <IoSnow />{" "}
          </p>
          <p className="flex justify-center gap-4 my-2">
            <TbMeat />
            <GiChickenOven />
            <MdOutlineSoupKitchen />
            <MdLocalDrink />
          </p>
        </div>
        <div className="p-4  md:border-r border-gray-300 w-full md:w-1/6">
          <p>Department</p>
          <p className="font-semibold text-black ">{data[0].department}</p>
        </div>
        <div className="p-4 w-full  md:w-1/6">
          <p>Status</p>
          <p className="font-semibold text-black ">{data[0].status}</p>
        </div>
      </div>
      <div>
        <div className="overflow-x-auto mx-5 bg-white mt-5 rounded-lg ">
          <div className="flex h-auto p-5 justify-between">
            <input
              className="border-[1px] p-2 rounded-xl border-gray-300"
              type="text"
              placeholder="Search..                🔍"
            />

            <div className="text-green-700 gap-5 flex smallButton w-auto">
              <button className="rounded-lg border-[2px] border-green-700 p-2 text-center items-center  hover:bg-gray-400">
                Add Item
              </button>
              <IoPrintOutline size={32} />
            </div>
          </div>
          <div className="relative align-middle   w-0h-0">
            {diva > 0 && (
              <div class="fixed w-auto text-center  align-middle top-60 md:right-72 bg-gray-200 p-4 border border-black rounded-lg">
                <div class="text-right  bg-gray-200 ">
                  <button onClick={closeing} class=" px-3  py-1 rounded">
                    X
                  </button>
                </div>
                <p class="text-black bg-gray-200  mb-4">
                  Is 'Chicken Breast Fillets Boneless ...' urgent?
                </p>
                <div class="flex bg-gray-200 justify-between">
                  <button
                    onClick={() => {
                      dispatch(
                        approveStatus({
                          id: diva,
                          status: "missing",
                        })
                      );
                      setDiv(0);
                    }}
                    class="text-black px-4 py-2 rounded hover:bg-gray-400"
                  >
                    No
                  </button>
                  <button
                    onClick={() => {
                      dispatch(
                        approveStatus({
                          id: diva,
                          status: "missing urgent",
                        })
                      );
                      setDiv(0);
                    }}
                    class=" px-4 py-2 rounded hover:bg-green-600"
                  >
                    Yes
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-300 md:table-auto">
            <thead>
              <tr className="w-full h-auto border-gray-300 border-t  border-b rounded-lg py-4 px-2 mx-2">
                <th className="text-center"><span className="invisible">Image</span></th>
                <th className="text-center">Product Name</th>
                <th className="text-center">Brand</th>
                <th className="text-center">Price</th>
                <th className="text-center">Quantity</th>
                <th className="text-center">Total</th>
                <th className="text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map((item) => (
                  <tr
                    key={item.id}
                    className="h-auto align-middle  border-gray-300 border-b"
                  >
                    <td className="text-center flex justify-center items-center">
                      <div>
                      <img
                        className="sm:h-20 sm:w-20 max-w-full h-auto"
                        src={chicken}
                        alt="Chicken"
                      />
                      </div>
                    </td>
                    <td className="text-center">{item.productName}</td>
                    <td className="text-center">{item.Brand}</td>
                    <td className="text-center">${item.price}</td>
                    <td className="text-center">{item.Quantity}</td>
                    <td className="text-center">
                      ${item.Quantity * item.realPrice}
                    </td>
                    <td className="text-center align-middle flex items-center justify-evenly">
                      {item.status && (
                        <p
                          className="rounded-lg p-2"
                          style={getStatusStyle(item.status)}
                        >
                          {item.status}
                        </p>
                      )}
                      <VscCheck
                        onClick={() => handleApprove(item.id)}
                        style={
                          item.status !== "Missing" &&
                          item.status !== "Urgent Missing"
                            ? getStatusStyleIcon(item.status)
                            : {}
                        }
                        size={20}
                      />{" "}
                      <VscChromeClose
                        size={20}
                        style={
                          item.status === "Missing" ||
                          item.status === "Urgent Missing"
                            ? getStatusStyleIcon(item.status)
                            : {}
                        }
                        onClick={() =>item.status!=="Approved"? setDiv(item.id):setDiv(0)}
                      />{" "}
                      <button onClick={() => handleEditClick(item)}>
                        {" "}
                        Edit{" "}
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          </div>
          {isPopupOpen && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-50  flex justify-center items-center">
              <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full sm:mx-auto">
                <p className="font-semibold text-start">
                  Chicken Breast Fillets Boneless Marinated 6 Owns Raw,...
                </p>
                <div className="text-start"> <span className="text-gray-400 font-sm"> American Ronald </span></div>
                <div className=" text-lg font-bold p-2 rounded-t-lg">
                  <VscChromeClose
                    className="absolute top-0 right-0 m-2 cursor-pointer"
                    size={20}
                    onClick={() => setIsPopupOpen(false)}
                  />
                  <div className="w-full sm:flex gap-2">
                    <div className="w-4/12">
                      <img
                        className="w-auto h-auto"
                        src={chicken}
                        alt="chicken"
                      />
                    </div>
                    <div className="w-8/12 text-base font-normal p-2 rounded-t-lg">
                      {" "}
                      <div className="w-full sm:flex mb-4 gap-4 items-center ">
                        <label htmlFor="editPrice" className=" text-gray-700">
                          Price:
                        </label>
                        <input
                          id="editPrice"
                          className="mt-1 w-full border-black border-[1px] rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                          type="number"
                          value={editPrice}
                          onChange={(e) => setEditPrice(e.target.value)}
                        />
                       <p className="text-sm p-0 m-0">/6+1LB</p> 
                      </div>
                      <div className="w-full flex flex-col sm:flex-row mb-4 gap-4 items-center align-middle">
                        <label
                          htmlFor="editQuantity"
                          className=" text-sm font-normal text-gray-700"
                        >
                          Quantity:
                        </label>
                        <FaPlusCircle
                          onClick={() => setEditQuantity(editQuantity + 1)}
                          size={28}
                          color="green"
                        />
                        <input
                          id="editQuantity"
                          className="mt-1 w-full  border-black border-[1px] rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                          type="number"
                          value={editQuantity}
                          onChange={(e) => setEditQuantity(Number(e.target.value) + 1)}
                        /> 
                         <FaMinusCircle
                          onClick={() => setEditQuantity(editQuantity!==0 ? editQuantity - 1:editQuantity)}
                          size={28}
                          color="green"
                        />
                       <p className="text-sm p-0 m-0"> x6+1LB</p>
                       
                      </div>
                      <div className="w-full flex flex-col sm:flex-row mb-4 gap-4 items-center align-middle">Total : <p>$ {(editQuantity*editPrice).toFixed(2)}</p></div>
                    </div>
                  </div>
                </div>
                <div className="text-start font-semibold"> Choose Reason <span className="text-gray-400 font-base"> (Optional) </span></div>
                <div className=" sm:flex gap-2 m-4 ">
                  <p className=" border-gray-300 border-[1px] rounded-md shadow-sm cursor-pointer active:bg-black active:text-white">
                    missing product
                  </p>
                  <p className=" border-gray-300 border-[1px] rounded-md shadow-sm cursor-pointer active:bg-black active:text-white">
                    Quantity is not the same
                  </p>
                  <p className=" border-gray-300 border-[1px] rounded-md shadow-sm cursor-pointer active:bg-black active:text-white">
                    price is not the same
                  </p>
                  <p className=" border-gray-300 border-[1px] rounded-md shadow-sm cursor-pointer active:bg-black active:text-white">
                    other
                  </p>
                </div>
                <div className="w-full flex items-end justify-end">
                  <button
                    className=" nt-bold py-2 px-4 rounded hover:bg-gray-200 focus:outline-none focus:shadow-outline"
                    onClick={() => setIsPopupOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleEditSubmit}
                    className=" bg-green-600 text-white font-bold py-2 px-4 rounded-full hover:bg-green-700 focus:outline-none focus:shadow-outline"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;

