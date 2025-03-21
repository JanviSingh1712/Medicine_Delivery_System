import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

export default function Carousel() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div>
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit: "contain !important"}}>
        <div className="carousel-inner" id='carousel'>
          <div className="carousel-caption" style={{zIndex: "10"}}>
            <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
              <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>
            </form>
          </div>
          <div className="carousel-item active">
            <img src="./Images2/medicine1.jpg" className="d-block w-100" style={{filter: "brightness(30%)"}} alt="..." />
          </div>
          <div className="carousel-item">
            <img src="./Images2/medicine2.jpg" className="d-block w-100" style={{filter: "brightness(30%)"}} alt="..." />
          </div>
          <div className="carousel-item">
            <img src="./Images2/medicine2.jpg" className="d-block w-100" style={{filter: "brightness(30%)"}} alt="..." />
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
  );
}

