import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function MyOrder() {
    const [orderData, setOrderData] = useState(null);

    useEffect(() => {
        fetchMyOrder();
    }, []);

    const fetchMyOrder = async () => {
        const userEmail = localStorage.getItem('userEmail');
        if (!userEmail) {
            console.error('User email not found in localStorage.');
            return;
        }

        try {
            const response = await fetch("https://medicine-delivery-system-1.onrender.com", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: userEmail
                })
            });
            if (!response.ok) {
                throw new Error('Failed to fetch order data.');
            }
            const data = await response.json();
            setOrderData(data.orderData ? data.orderData : null); // Set orderData to the received data
        } catch (error) {
            console.error('Error fetching order data:', error.message);
        }
    };

    return (
        <>
            <Navbar />
            <div className='container'>
                {orderData ? (
                    <div className='row'>
                        {orderData.order_data.map((order, index) => (
                            <div key={index} className='mb-3'>
                                <div className='fs-3 m-3'>{order[0].Order_date}</div>
                                <hr />
                                <div className='row'>
                                    {order.slice(1).map((item, itemIndex) => (
                                        <div key={itemIndex} className='col-12 col-md-6 col-lg-3 mb-3'>
                                            <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                <img src={item.img} className="card-img-top" alt={item.name} style={{ height: "120px", objectFit: "cover" }} />
                                                <div className="card-body">
                                                    <h5 className="card-title">{item.name}</h5>
                                                    <div className='container w-100 p-0' style={{ height: "60px" }}>
                                                        <span className='m-1'>Quantity: {item.qty}</span>
                                                        <span className='m-1'>Size: {item.size}</span>
                                                        <br />
                                                        <span className='m-1'>Order Date: {order[0].Order_date}</span>
                                                        <br />
                                                        <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                                            ₹{item.price}/-
                                                        Item Price</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>No order data available</div>
                )}
            </div>
            <Footer />
        </>
    );
}
