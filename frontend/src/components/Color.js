import React, { useState, useEffect } from "react";
import '../styles/components/Color.scss'

function Color() {
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
    setSelectedClass(prevSelectedClass => {
      const svgElement = document.getElementById("product-svg");
      const overlay = svgElement.querySelectorAll("." + prevSelectedClass);
      overlay.forEach((element) => {
        element.style.fill = hex;
      });
      console.log(`Selected color: ${hex}, Selected class: ${selectedClass}, SVG elements:`, overlay);
      
      return prevSelectedClass;
    });
  };
  const updateSvgElements = () => {
    if (selectedColor !== null) {
      const svgElement = document.getElementById("product-svg");
      if (svgElement) {
        const overlay = svgElement.querySelectorAll("." + selectedClass);
        overlay.forEach((element) => {
          element.style.fill = selectedColor;
        });
        console.log(`Selected color: ${selectedColor}, Selected class: ${selectedClass}, SVG elements:`, overlay);
      }
    }
  };

  useEffect(() => {
    updateSvgElements();
  }, [selectedColor, selectedClass]);

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.target.id === "product-svg") {
          updateSvgElements();
        }
      });
    });

    const svgElement = document.getElementById("product-svg");
    if (svgElement) {
      observer.observe(svgElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
    }

    return () => {
      observer.disconnect();
    };
  }, [selectedColor, selectedClass]);
  function handleRandomColors() {
    const classToColorMap = {};
    for (const className of classes) {
      classToColorMap[className] = colors[Math.floor(Math.random() * colors.length)];
    }
    console.log("Random colors generated:", classToColorMap);
    setSelectedColor("");
    for (const className in classToColorMap) {
      const elements = document.querySelectorAll("." + className);
      const color = classToColorMap[className];
      for (const element of elements) {
        element.style.fill = color;
      }
    }
    setSelectedClass(classes[1]);
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
      {colors.map((color) => (
      <div
        key={color}
        className="color"
        style={{ backgroundColor: color }}
        data-hex={color}
        onClick={() => handleColorClick(color)}
      />
    ))}
      </div>
      <div className="color_btn">
        <button id="change-colors-button" onClick={handleRandomColors}>Aléatoire</button>
      </div>
    </div>
  </>
  );
  }

export default Color;

