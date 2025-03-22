import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCart, useDispatchCart } from "../components/ContextReducer";

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [onlinePaymentMethod, setOnlinePaymentMethod] = useState("");

  if (data.length === 0) {
    return (
      <div>
        <div className="m-5 w-100 text-center fs-3 text-white">
          The Cart is Empty!
        </div>
      </div>
    );
  }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");

    try {
      let response = await fetch("http://localhost:5000/api/orderData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_data: data,
          email: userEmail,
          order_date: new Date().toDateString(),
          payment_method:
            paymentMethod === "Online" ? onlinePaymentMethod : "COD",
        }),
      });

      console.log("JSON RESPONSE:::::", response.status);
      if (response.status === 200) {
        dispatch({ type: "DROP" });
      } else {
        console.error("Failed to place order:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  let totalPrice = data.reduce((total, Med) => total + Med.price, 0);

  return (
    <div>
      <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
        <table className="table table-hover">
          <thead className="text-success fs-4">
            <tr>
              <th scope="col" className="text-white">
                #
              </th>
              <th scope="col" className="text-white">
                Name
              </th>
              <th scope="col" className="text-white">
                Quantity
              </th>
              <th scope="col" className="text-white">
                Option
              </th>
              <th scope="col" className="text-white">
                Amount
              </th>
              <th scope="col" className="text-white"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((Med, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td className="text-white">{Med.name}</td>
                <td className="text-white">{Med.qty}</td>
                <td className="text-white">{Med.size}</td>
                <td className="text-white">{Med.price}</td>
                <td>
                  <button type="button" className="btn p-0">
                    <DeleteIcon
                      onClick={() => {
                        dispatch({ type: "REMOVE", index: index });
                      }}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className="fs-2">Total Price: {totalPrice}/-</h1>
        </div>

        {/* Payment Method Section */}
        <div className="mt-4">
          <h3>Select Payment Method</h3>
          <div>
            <input
              type="radio"
              id="cod"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={() => setPaymentMethod("COD")}
            />
            <label htmlFor="cod" className="ms-2">
              Cash on Delivery (COD)
            </label>
          </div>

          <div>
            <input
              type="radio"
              id="online"
              value="Online"
              checked={paymentMethod === "Online"}
              onChange={() => setPaymentMethod("Online")}
            />
            <label htmlFor="online" className="ms-2">
              Online Payment
            </label>
          </div>

          {paymentMethod === "Online" && (
            <div className="mt-3">
              <h5>Select Online Payment Method</h5>
              <select
                className="form-select"
                onChange={(e) => setOnlinePaymentMethod(e.target.value)}
              >
                <option value="">Select Payment Method</option>
                <option value="Debit Card">Debit Card</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Paytm">Paytm</option>
                <option value="GPay">Google Pay</option>
                <option value="PhonePe">PhonePe</option>
              </select>
            </div>
          )}
        </div>

        <div>
          <button className="btn bg-success mt-5" onClick={handleCheckOut}>
            {" "}
            Check Out{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
