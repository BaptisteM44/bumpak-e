import React, { useState } from "react";
import '../styles/components/Color.scss'

function Product() {
  const [selectedClass, setSelectedClass] = useState("product-shape1");
  const [selectedColor, setSelectedColor] = useState(null);
  const classes = ["product-shape1", "product-shape2", "product-shape3", "product-shape4"];
  const colors = ["#e1e851", "#8cd147", "#4a9ccf", "#661f45",'#1e2024','#ffc107','#dc3545','#17a2b8','#9b59b6','#f1c40f',];

  const handleColorSelect = (e) => {
  setSelectedClass(e.target.value);
  setSelectedColor(null);
  };

  const handleColorClick = (hex) => {
  setSelectedColor(hex);
  const overlay = document.querySelectorAll("." + selectedClass);
  overlay.forEach((element) => {
  element.style.fill = hex;
  });
  };
  function handleRandomColors() {
      const classToColorMap = {};
      for (const className of classes) {
        classToColorMap[className] = colors[Math.floor(Math.random() * colors.length)];
      }
      setSelectedColor("");
      for (const className in classToColorMap) {
        const elements = document.querySelectorAll("." + className); // use className instead of selectedClass
        const color = classToColorMap[className];
        for (const element of elements) {
          element.style.fill = color;
        }
      }
      setSelectedClass(classes[1]); // set selectedClass to the first item in classes
    }
  return (
  <>
    <div className="config_select">
      <label htmlFor="">Part</label>
      <select id="color-select" value={selectedClass} onChange={handleColorSelect}>
            <option value="product-shape2">Partie haute</option>
            <option value="product-shape3">Poche avant</option>
            <option value="product-shape1">Cordons élastique</option>
        </select>
        <div className="svg_select">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.8001 8L0.643175 2L8.95702 2L4.8001 8Z" fill="currentColor"></path>
          </svg>
        </div>
    </div>
    <div className="colors-content">
      <div className="colors">
          <div className="color" style={{ backgroundColor: "#e1e851" }} data-hex="#e1e851" onClick={() => handleColorClick("#e1e851")}></div>
          <div className="color" style={{ backgroundColor: "#8cd147" }} data-hex="#8cd147" onClick={() => handleColorClick("#8cd147")}></div>
          <div className="color" style={{ backgroundColor: "#4a9ccf" }} data-hex="#4a9ccf" onClick={() => handleColorClick("#4a9ccf")}></div>
          <div className="color" style={{ backgroundColor: "#661f45" }} data-hex="#661f45" onClick={() => handleColorClick("#661f45")}></div>
          <div className="color" style={{ backgroundColor: "#1e2024" }} data-hex="#1e2024" onClick={() => handleColorClick("#1e2024")}></div>
          <div className="color" style={{ backgroundColor: "#ffc107" }} data-hex="#ffc107" onClick={() => handleColorClick("#ffc107")}></div>
          <div className="color" style={{ backgroundColor: "#dc3545" }} data-hex="#dc3545" onClick={() => handleColorClick("#dc3545")}></div>
          <div className="color" style={{ backgroundColor: "#17a2b8" }} data-hex="#17a2b8" onClick={() => handleColorClick("#17a2b8")}></div>
          <div className="color" style={{ backgroundColor: "#f8f9fa" }} data-hex="#f8f9fa" onClick={() => handleColorClick("#f8f9fa")}></div>
          <div className="color" style={{ backgroundColor: "#343a40" }} data-hex="#343a40" onClick={() => handleColorClick("#343a40")}></div>
          <div className="color" style={{ backgroundColor: "#9b59b6" }} data-hex="#9b59b6" onClick={() => handleColorClick("#9b59b6")}></div>
          <div className="color" style={{ backgroundColor: "#34495e" }} data-hex="#34495e" onClick={() => handleColorClick("#34495e")}></div>
          <div className="color" style={{ backgroundColor: "#f1c40f" }} data-hex="#f1c40f" onClick={() => handleColorClick("#f1c40f")}></div>
          <div className="color" style={{ backgroundColor: "#1abc9c" }} data-hex="#1abc9c" onClick={() => handleColorClick("#1abc9c")}></div>
          <div className="color" style={{ backgroundColor: "#e67e22" }} data-hex="#e67e22" onClick={() => handleColorClick("#e67e22")}></div>
      </div>
      <div className="color_btn">
        <button id="change-colors-button" onClick={handleRandomColors}>Aléatoire</button>
      </div>
    </div>
  </>
  );
  }

export default Product;