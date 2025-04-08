import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart, useDispatchCart } from '../components/ContextReducer';

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();

  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3 text-white'>The Cart is Empty!</div>
      </div>
    );
  }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");

    try {
      let response = await fetch("https://medicine-delivery-system-1.onrender.com", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          order_data: data,
          email: userEmail,
          order_date: new Date().toDateString()
        })
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
  }

  let totalPrice = data.reduce((total, Med) => total + Med.price, 0);

  return (
    <div>
      <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
        <table className='table table-hover'>
          <thead className='text-success fs-4'>
            <tr>
              <th scope='col' className='text-white'>#</th>
              <th scope='col' className='text-white'>Name</th>
              <th scope='col' className='text-white'>Quantity</th>
              <th scope='col' className='text-white'>Option</th>
              <th scope='col' className='text-white'>Amount</th>
              <th scope='col' className='text-white'></th>
            </tr>
          </thead>
          <tbody>
            {data.map((Med, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td className='text-white'>{Med.name}</td>
                <td className='text-white'>{Med.qty}</td>
                <td className='text-white'>{Med.size}</td>
                <td className='text-white'>{Med.price}</td>
                <td>
                  <button type="button" className="btn p-0">
                    <DeleteIcon onClick={() => { dispatch({ type: "REMOVE", index: index }) }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-success mt-5' onClick={handleCheckOut}> Check Out </button>
        </div>
      </div>
    </div>
  );
}
