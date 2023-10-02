import React, { useState, useEffect } from "react";
import '../styles/components/Color.scss';

function Color(props) {
  const productOption = props.productOption;
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const classes = props.availableParts.map((part, index) => `product-shape${index + 1}`);
  const colors = ["#d0f352", "#2a2b2d", "#fe251d", "#96498d", '#028790', '#3f3d40', '#0564c1', '#921224', '#fab642', '#453e29', '#c0005d', '#ff0076', '#835e3d', '#c6c6c6', '#eaeaea', '#092642', '#162a27', '#5e2828', '#15174b'];
  const [selectedColors, setSelectedColors] = useState({});

  const colorNames = {
    "limeGreen": "#d0f352",
    "charcoalGrey": "#2a2b2d",
    "fieryRed": "#fe251d",
    "darkPurple": "#96498d",
    "deepTurquoise": '#028790',
    "darkGrey": '#3f3d40',
    "royalBlue": '#0564c1',
    "darkRed": '#921224',
    "goldenYellow": '#fab642',
    "deepOlive": '#453e29',
    "vividMagenta": '#c0005d',
    "brightPink": '#ff0076',
    "warmBrown": '#835e3d',
    "lightGrey": '#c6c6c6',
    "paleGrey": '#eaeaea',
    "darkBlue": '#092642',
    "deepGreen": '#162a27',
    "darkMaroon": '#5e2828',
    "midnightBlue": '#15174b'
  };

  const handleColorSelect = (e) => {
    const selectedClass = e.target.value;
    setSelectedClass(selectedClass);

    if (!selectedColors[selectedClass]) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      setSelectedColor(randomColor);
      setSelectedColors(prevSelectedColors => ({
        ...prevSelectedColors,
        [selectedClass]: randomColor,
      }));
      props.onColorsChange({
        ...selectedColors,
        [selectedClass]: randomColor,
      });
    } else {
      setSelectedColor(selectedColors[selectedClass]);
    }
  };

  const handleColorClick = (color) => {
    const colorName = colorNames[color];
    setSelectedColor(color);
    setSelectedColors(prevSelectedColors => ({
      ...prevSelectedColors,
      [selectedClass]: colorName,
    }));
    props.onColorsChange({
      ...selectedColors,
      [selectedClass]: colorName,
    });

    const svgElement = document.getElementById("product-svg");
    if (svgElement) {
      const elements = svgElement.querySelectorAll("." + selectedClass);
      elements.forEach(element => {
        element.style.fill = color;
      });
    }
  };

  const handleRandomColors = () => {
    const classToColorMap = {};
    for (const className of classes) {
      const randomIndex = Math.floor(Math.random() * colors.length);
      const randomColor = colors[randomIndex];
      classToColorMap[className] = randomColor;
    }

    setSelectedColors(classToColorMap);
    setSelectedColor("");

    const svgElement = document.getElementById("product-svg");
    if (svgElement) {
      classes.forEach(className => {
        const elements = svgElement.querySelectorAll("." + className);
        const color = classToColorMap[className];
        elements.forEach(element => {
          element.style.fill = color;
        });
      });
    }
    props.onColorsChange(classToColorMap);
  };

  useEffect(() => {
    const defaultColor = "#FFFFFF";
    const initialColors = classes.reduce((acc, className) => {
      acc[className] = defaultColor;
      return acc;
    }, {});
    setSelectedColors(initialColors);

    const svgElement = document.getElementById("product-svg");
    if (svgElement) {
      classes.forEach(className => {
        const elements = svgElement.querySelectorAll("." + className);
        elements.forEach(element => {
          element.style.fill = defaultColor;
        });
      });
    }
  }, []);

  useEffect(() => {
    const svgElement = document.getElementById("product-svg");
    if (svgElement) {
      const elements = svgElement.getElementsByClassName(selectedClass);

      elements.forEach(element => {
        element.style.fill = selectedColor;
      });
    }
  }, [selectedColor, selectedClass]);

  return (
    <>
      <div className="config_select">
        <label htmlFor="">Color part</label>
        <select id="color-select" value={selectedClass} onChange={handleColorSelect}>
          {props.availableParts.map((part, index) => (
            <option key={index} value={`product-shape${index + 1}`}>
              {part}
            </option>
          ))}
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
              onClick={() => handleColorClick(color)}
              alt={colorNames[color]}
            />
          ))}
          <button onClick={handleRandomColors}>Random</button>
        </div>
      </div>
    </>
  );
}

export default Color;