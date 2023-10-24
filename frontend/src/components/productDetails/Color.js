import React, { useState, useEffect } from "react";
import '../../styles/components/Color.scss';

const colorMapping = {
  "#18174e":"Deep Purple",
  "#d00059":"Fuschia",
  "#9d3e8b": "Lilac",
  "#ff0074" : "Pink Flamingo",
  '#082033': "US Navy",
  '#002643' : "Ocean Blue",
  '#0063c6': "Bright Blue",
  '#008991' : "Tropical Teal",
  '#16302b': "Green Mountain",
  '#885934': "Coyote Brown",
  '#493f26': "Army Olive",
  '#ccf616': "Lemon Lime",
  '#ffb214' : "Golden Dazy",
  '#ff0000': "Bright Orange",
  '#e20020' : "Revel Red",
  '#e20020': "Brick Red",
  '#631e24': "Red Barn",
  '#eaeaea': "Snow White",
  '#c5c4c5' : "Silver Bullet",
  '#454044' : "Wolf Grey",
  '#252729' : "Black",
};
const elasticColorMapping = {
  "#b0c171": "Light Green",
  "#d5d5d5": "White",
  "#6c3d75": "Purple",
  "#2c2b3c": "Navy Blue",
  "#0c0c0c": "Black",
  "#46402a": "Olive",
  "#0f1b16": "Dark Green",
  "#c7de4a": "Neon Yellow",
  "#db5b2b": "Neon Orange",
  "#fd243b": "Neon Pink",
  "#132c2d": "Teal",
  "#6e584f": "Tan",
  "#8e8d93": "Light Grey",
  "#3e3b42": "Dark Grey",
  "#092153": "Electric Blue",
  "#fcb159": "Yellow",
  "#ff4a23": "Orange",
  "#0b6395": "Blue",
  "#ad4075": "Dark Pink",
  "#e68f9e": "Pink",
  "#560813": "Bordeaux",
  "#b70633": "Red",
  "#cd8a3f": "Golden",
};

export const transformSelectedColors = (selectedColors, product) => {
  let transformedObject = {};

  for (const key in selectedColors) {
      let newValue;
      if (key.startsWith("elastic")) {
          newValue = elasticColorMapping[selectedColors[key]] || selectedColors[key];
      } else {
          newValue = colorMapping[selectedColors[key]] || selectedColors[key];
      }

      // Si la clé commence par 'product-shape', récupérer la valeur correspondante depuis 'product'
      if (key.startsWith('product-shape')) {
          const partNumber = key.replace('product-shape', '');
          const correspondingPartValue = product[`part${partNumber}`];
          transformedObject[correspondingPartValue] = newValue;
      } else {
          transformedObject[key] = newValue;
      }
  }

  return transformedObject;
};


function Color(props) {
  const productOption = props.productOption;
  const [selectedClass, setSelectedClass] = useState("product-shape1");
  const [selectedColor, setSelectedColor] = useState("");

  const productClasses = props.availableParts ? props.availableParts.map((part, index) => `product-shape${index + 1}`) : [];
  const elasticClasses = props.availableElastics ? props.availableElastics.map((elastic, index) => `elastic${index + 1}`) : [];
  const classes = productClasses.concat(elasticClasses);
  

  const [selectedColors, setSelectedColors] = useState({});
  const product = props.product;
  const colorsArray = Object.keys(colorMapping);
  
  const [selectedElasticClass, setSelectedElasticClass] = useState("elastic1");
  const [selectedElasticColor, setSelectedElasticColor] = useState("");
  const [selectedElasticColors, setSelectedElasticColors] = useState({});

  
  const handleColorSelect = (e) => {
    const selectedClass = e.target.value;
    setSelectedClass(selectedClass);
    const isElastic = selectedClass.startsWith("elastic");

    if (!selectedColors[selectedClass]) {
      const randomColor = isElastic 
            ? Object.keys(elasticColorMapping)[Math.floor(Math.random() * Object.keys(elasticColorMapping).length)]
            : Object.keys(colorMapping)[Math.floor(Math.random() * Object.keys(colorMapping).length)];
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
    const colorName = colorMapping[color];
    setSelectedColor(colorName);
    setSelectedColors(prevSelectedColors => ({
      ...prevSelectedColors,
      [selectedClass]: colorName,
    }));
    props.onColorsChange({
      ...selectedColors,
      [selectedClass]: colorName,
    });
    console.log('selectedClass:', selectedClass);

    const svgElement = document.getElementById("product-svg");
    if (svgElement) {
      const elements = svgElement.querySelectorAll("." + selectedClass);
      elements.forEach(element => {
        element.style.fill = color;
      });
    }
  };

//ELASTIC PART
const handleElasticSelect = (e) => {
  const selectedElasticClass = e.target.value;
  setSelectedElasticClass(selectedElasticClass);
  
  if (!selectedElasticColors[selectedElasticClass]) {
    const randomColor = Object.keys(elasticColorMapping)[Math.floor(Math.random() * Object.keys(elasticColorMapping).length)];
    setSelectedElasticColor(randomColor);
    setSelectedElasticColors(prevSelectedElasticColors => ({
      ...prevSelectedElasticColors,
      [selectedElasticClass]: randomColor,
    }));
    props.onElasticColorsChange({
      ...selectedElasticColors,
      [selectedElasticClass]: randomColor,
    });
  } else {
    setSelectedElasticColor(selectedElasticColors[selectedElasticClass]);
  }
};
const handleElasticColorClick = (color) => {
  const colorName = elasticColorMapping[color];
  setSelectedElasticColor(colorName);
  setSelectedElasticColors(prevSelectedElasticColors => ({
    ...prevSelectedElasticColors,
    [selectedElasticClass]: colorName,
  }));
  props.onElasticColorsChange({
    ...selectedElasticColors,
    [selectedElasticClass]: colorName,
  });
  
  const svgElement = document.getElementById("product-svg");
  if (svgElement) {
    const elements = svgElement.querySelectorAll("." + selectedElasticClass);
    elements.forEach(element => {
      element.style.fill = color;
    });
  }
};

  const handleRandomColors = () => {
    const classToColorMap = {};

    // Traitement des classes de produits
    for (const className of productClasses) {
        const randomColor = Object.keys(colorMapping)[Math.floor(Math.random() * Object.keys(colorMapping).length)];
        classToColorMap[className] = randomColor;
    }

    // Traitement des classes d'élastiques
    for (const className of elasticClasses) {
        const randomColor = Object.keys(elasticColorMapping)[Math.floor(Math.random() * Object.keys(elasticColorMapping).length)];
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
            {Object.keys(colorMapping).map((color) => (
          <div
            key={color}
            className="color"
            style={{ backgroundColor: color }}
            onClick={() => handleColorClick(color)}
            alt={colorMapping[color]}
          />
            ))}
        </div>
      </div>
      <div className="config_select">
        <label htmlFor="">Elastic part</label>
        <select id="elastic-select" value={selectedElasticClass} onChange={handleElasticSelect}>
          {props.availableElastics && props.availableElastics.map((elastic, index) => (
              <option key={index} value={`elastic${index + 1}`}>
                  {elastic}
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
        {Object.keys(elasticColorMapping).map((color) => (
          <div
            key={color}
            className="color"
            style={{ backgroundColor: color }}
            onClick={() => handleElasticColorClick(color)}
            alt={elasticColorMapping[color]}
          />
        ))}
        </div>
      </div>
      <button className="random-button" onClick={handleRandomColors}>Random</button>

      
    </>
  );
}

export default Color;