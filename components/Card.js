import React, { useState, useEffect } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card({ MedItem, options }) {
    let dispatch = useDispatchCart();
    const cartItems = useCart(); // Use useCart hook to access cart data

    const [selectedOption, setSelectedOption] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(0);

    const handleOptionChange = (e) => {
        setSelectedOption(Number(e.target.value));
    };

    const handleQuantityChange = (e) => {
        setQuantity(Number(e.target.value));
    };

    useEffect(() => {
        if (selectedOption) {
            setPrice(selectedOption * quantity);
        }
    }, [selectedOption, quantity]);

    const handleAddToCart = async () => {
        await dispatch({
            type: "ADD",
            id: MedItem._id,
            name: MedItem.name,
            price: price,
            qty: quantity,
            size: selectedOption,
            img: MedItem.img
        });
    };

    useEffect(() => {
        console.log('Cart data:', cartItems);
    }, [cartItems]);

    return (
        <div className="card" style={{ width: "18rem", maxHeight: "480px" }}>
            <img
                src={MedItem.img || "default_image_path.jpg"}
                className="card-img-top"
                alt={MedItem.name || "default_alt_text"}
                style={{ height: "140px", objectFit: "fill" }}
            />
            <div className="card-body">
                <h5 className="card-title">{MedItem.name || "Default Title"}</h5>
                <p className="card-text">{MedItem.description || "Nice card"}</p>
                <div className="container w-100">
                    <select
                        className="m-2 h-100 bg-primary text-white rounded"
                        value={selectedOption}
                        onChange={handleOptionChange}
                    >
                        <option value="">Select an option</option>
                        {options.map((option, index) => (
                            Object.entries(option).map(([key, value]) => (
                                <option key={index} value={value}>{key}: ₹{value}</option>
                            ))
                        ))}
                    </select>
                    <input
                        type="number"
                        className="m-2 h-100"
                        style={{ maxWidth: '4rem' }}
                        value={quantity}
                        min="1"
                        onChange={handleQuantityChange}
                    />
                    <div className="d-inline h-100 fs-5">
                        {selectedOption && `Price: ₹${price}`}
                    </div>
                    <hr />
                    <button className="btn btn-success justify-center ms-2" onClick={handleAddToCart}>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
