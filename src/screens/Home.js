import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';

export default function Home() {
  const [MedCat, setMedCat] = useState([]);
  const [MedItem, setMedItem] = useState([]);
  const [search, setSearch] = useState('');

  const loadData = async () => {
    try {
      let response = await fetch("https://medicine-delivery-system-1.onrender.com", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      let data = await response.json();
      console.log("API Data:", data);

      if (Array.isArray(data) && data.length === 2) {
        setMedItem(data[0]);
        setMedCat(data[1]);
      } else {
        console.error("Unexpected data structure:", data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    console.log("MedCat:", MedCat);
    console.log("MedItem:", MedItem);
  }, [MedCat, MedItem]);

  return (
    <div>
      <Navbar />
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
          <div className="carousel-inner" id='carousel'>
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>
              </div>
            </div>
            <div className="carousel-item active">
              <img src="./Images2/medicine1.jpg" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="./Images2/medicine2.jpg" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="./Images2/medicine3.jpg" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div className='container'>
        {MedCat.length > 0 ? (
          MedCat.map((data) => (
            <div key={data._id} className='mb-3'>
              <div className="fs-3 m-3">{data.CategoryName}</div>
              <hr />
              <div className='row'>
                {MedItem.filter(item => (
                  item.CategoryName.trim().toLowerCase() === data.CategoryName.trim().toLowerCase() &&
                  item.name.toLowerCase().includes(search.toLowerCase())
                )).map(filteredItem => (
                  <div key={filteredItem._id} className="col-12 col-md-6 col-lg-3 mb-3">
                    <Card
                      MedItem={filteredItem}
                      options={filteredItem.options}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div>No categories available</div>
        )}
      </div>
      <Footer />
    </div>
  );
}
