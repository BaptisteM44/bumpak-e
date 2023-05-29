// import React, { useState, useEffect } from "react";
// import '../styles/components/Color.scss'

// function Color(props) {
//   const productOption = props.productOption;
//   const [selectedClass, setSelectedClass] = useState("product-shape1");
//   const [selectedColor, setSelectedColor] = useState(null);
//   const classes = ["product-shape1", "product-shape2", "product-shape3", "product-shape4", "product-shape5", "product-shape6", "product-shape7"];
//   const colors = ["#d0f352", "#2a2b2d", "#fe251d", "#96498d",'#028790','#3f3d40','#0564c1','#921224','#fab642','#453e29', '#c0005d', '#ff0076', '#835e3d', '#c6c6c6', '#eaeaea', '#092642', '#162a27', '#5e2828', '#15174b'];
//   const [selectedColors, setSelectedColors] = useState({});

//   const handleColorSelect = (e) => {
//     setSelectedClass(e.target.value);
//     setSelectedColor(null);
//   };

//   const handleColorClick = (color) => {
//     setSelectedColor(color);
//     setSelectedClass(prevSelectedClass => {
//       const svgElement = document.getElementById("product-svg");
//       const elements = svgElement.querySelectorAll("." + prevSelectedClass);
//       elements.forEach((element) => {
//         element.style.fill = color;
//       });
//       console.log(`Selected color: ${color}, Selected class: ${prevSelectedClass}, SVG elements:`, elements);
//       return prevSelectedClass;
//     });
  
//     setSelectedColors(prevSelectedColors => ({
//       ...prevSelectedColors,
//       [productOption]: color,
//     }));
//     props.onColorsChange(props.productOption, color);

//   };
  
  
//   const updateSvgElements = () => {
//     if (selectedColor !== null) {
//       const svgElement = document.getElementById("product-svg");
//       if (svgElement) {
//         const overlay = svgElement.querySelectorAll("." + selectedClass);
//         overlay.forEach((element) => {
//           element.style.fill = selectedColor;
//         });
//         console.log(`Selected color: ${selectedColor}, Selected class: ${selectedClass}, SVG elements:`, overlay);
//       }
//     }
//   };

//   useEffect(() => {
//     updateSvgElements();
//   }, [selectedColor, selectedClass]);

//   useEffect(() => {
//     const observer = new MutationObserver((mutations) => {
//       mutations.forEach((mutation) => {
//         if (mutation.target.id === "product-svg") {
//           updateSvgElements();
//         }
//       });
//     });

//     const svgElement = document.getElementById("product-svg");
//     if (svgElement) {
//       observer.observe(svgElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
//     }

//     return () => {
//       observer.disconnect();
//     };
//   }, [selectedColor, selectedClass]);
  
//   const handleRandomColors = () => {
//     const classToColorMap = {};
//     for (const className of classes) {
//       classToColorMap[className] = colors[Math.floor(Math.random() * colors.length)];
//     }
//     console.log("Random colors generated:", classToColorMap);
//     setSelectedColor("");
//     setSelectedClass(classes[1]);
//     setSelectedColors(prevSelectedColors => ({
//       ...prevSelectedColors,
//       [productOption]: classToColorMap[selectedClass],
//     }));
    
//     const svgElement = document.getElementById("product-svg");
//     if (svgElement) {
//       classes.forEach(className => {
//         const elements = svgElement.querySelectorAll("." + className);
//         const color = classToColorMap[className];
//         elements.forEach(element => {
//           element.style.fill = color;
//         });
//       });
//     }
//   };

//   return (
//     <>
//       <div className="config_select">
//         <label htmlFor="">Color part</label>
//         <select id="color-select" value={selectedClass} onChange={handleColorSelect}>
//           {props.product.part1 && (
//             <option value="product-shape1">{props.product.part1}</option>
//           )}
//           {props.product.part2 && (
//             <option value="product-shape2">{props.product.part2}</option>
//           )}
//           {props.product.part3 && (
//             <option value="product-shape3">{props.product.part3}</option>
//           )}
//           {props.product.part4 && (
//             <option value="product-shape4">{props.product.part4}</option>
//           )}
//           {props.product.part5 && (
//             <option value="product-shape5">{props.product.part5}</option>
//           )}
//           {props.product.part6 && (
//             <option value="product-shape6">{props.product.part6}</option>
//           )}
//           {props.product.part7 && (
//             <option value="product-shape7">{props.product.part7}</option>
//           )}
//         </select>

//         <div className="svg_select">
//           <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path d="M4.8001 8L0.643175 2L8.95702 2L4.8001 8Z" fill="currentColor"></path>
//           </svg>
//         </div>
//       </div>

//       <div className="colors-content">
//         <div className="colors">
//           {colors.map((color) => (
//             <div
//               key={color}
//               className="color"
//               style={{ backgroundColor: color }}
//               data-hex={color}
//               onClick={() => handleColorClick(color)}
//             />
//           ))}
//           <button onClick={handleRandomColors}>Random</button>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Color;
// import React, { useState, useEffect } from "react";
// import '../styles/components/Color.scss'

// function Color(props) {
//   const productOption = props.productOption;
//   const [selectedClass, setSelectedClass] = useState("product-shape1");
//   const [selectedColor, setSelectedColor] = useState(null);
//   const classes = ["product-shape1", "product-shape2", "product-shape3", "product-shape4", "product-shape5", "product-shape6", "product-shape7"];
//   const colors = ["#d0f352", "#2a2b2d", "#fe251d", "#96498d",'#028790','#3f3d40','#0564c1','#921224','#fab642','#453e29', '#c0005d', '#ff0076', '#835e3d', '#c6c6c6', '#eaeaea', '#092642', '#162a27', '#5e2828', '#15174b'];
//   const [selectedColors, setSelectedColors] = useState({});

//   const handleColorSelect = (e) => {
//     setSelectedClass(e.target.value);
//     setSelectedColor(null);
//   };

//   const handleColorClick = (color) => {
//     setSelectedColor(color);
//     setSelectedClass(prevSelectedClass => {
//       const svgElement = document.getElementById("product-svg");
//       const elements = svgElement.querySelectorAll("." + prevSelectedClass);
//       elements.forEach((element) => {
//         element.style.fill = color;
//       });
//       const overlay = svgElement.querySelectorAll("." + prevSelectedClass);
//       const colorInfo = `Selected color: ${color}, Selected class: ${prevSelectedClass}, SVG elements: ${overlay.length}`;
//       props.onColorInfoChange(colorInfo);
//       console.log(`Selected color: ${color}, Selected class: ${prevSelectedClass}, SVG elements:`, elements);
//       return prevSelectedClass;
//     });
  
//     setSelectedColors(prevSelectedColors => ({
//       ...prevSelectedColors,
//       [productOption]: color,
//     }));
//     props.onColorsChange(productOption, color);
//   };
  
//   const updateSvgElements = () => {
//     if (selectedColor !== null) {
//       const svgElement = document.getElementById("product-svg");
//       if (svgElement) {
//         const overlay = svgElement.querySelectorAll("." + selectedClass);
//         overlay.forEach((element) => {
//           element.style.fill = selectedColor;
//         });
//         console.log(`Selected color: ${selectedColor}, Selected class: ${selectedClass}, SVG elements:`, overlay);
//       }
//     }
//   };

//   useEffect(() => {
//     updateSvgElements();
//   }, [selectedColor, selectedClass]);

//   useEffect(() => {
//     const observer = new MutationObserver((mutations) => {
//       mutations.forEach((mutation) => {
//         if (mutation.target.id === "product-svg") {
//           updateSvgElements();
//         }
//       });
//     });

//     const svgElement = document.getElementById("product-svg");
//     if (svgElement) {
//       observer.observe(svgElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
//     }

//     return () => {
//       observer.disconnect();
//     };
//   }, [selectedColor, selectedClass]);
  
//   const handleRandomColors = () => {
//     const classToColorMap = {};
//     for (const className of classes) {
//       classToColorMap[className] = colors[Math.floor(Math.random() * colors.length)];
//     }
//     console.log("Random colors generated:", classToColorMap);
//     setSelectedColor("");
//     setSelectedClass(classes[1]);
//     setSelectedColors(prevSelectedColors => ({
//       ...prevSelectedColors,
//       [productOption]: classToColorMap[selectedClass],
//     }));
    
//     const svgElement = document.getElementById("product-svg");
//     if (svgElement) {
//       classes.forEach(className => {
//         const elements = svgElement.querySelectorAll("." + className);
//         const color = classToColorMap[className];
//         elements.forEach(element => {
//           element.style.fill = color;
//         });
//       });
//     }
//   };

//   return (
//     <>
//       <div className="config_select">
//         <label htmlFor="">Color part</label>
//         <select id="color-select" value={selectedClass} onChange={handleColorSelect}>
//           {props.product.part1 && (
//             <option value="product-shape1">{props.product.part1}</option>
//           )}
//           {props.product.part2 && (
//             <option value="product-shape2">{props.product.part2}</option>
//           )}
//           {props.product.part3 && (
//             <option value="product-shape3">{props.product.part3}</option>
//           )}
//           {props.product.part4 && (
//             <option value="product-shape4">{props.product.part4}</option>
//           )}
//           {props.product.part5 && (
//             <option value="product-shape5">{props.product.part5}</option>
//           )}
//           {props.product.part6 && (
//             <option value="product-shape6">{props.product.part6}</option>
//           )}
//           {props.product.part7 && (
//             <option value="product-shape7">{props.product.part7}</option>
//           )}
//         </select>

//         <div className="svg_select">
//           <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path d="M4.8001 8L0.643175 2L8.95702 2L4.8001 8Z" fill="currentColor"></path>
//           </svg>
//         </div>
//       </div>

//       <div className="colors-content">
//         <div className="colors">
//           {colors.map((color) => (
//             <div
//               key={color}
//               className="color"
//               style={{ backgroundColor: color }}
//               data-hex={color}
//               onClick={() => handleColorClick(color)}
//             />
//           ))}
//           <button onClick={handleRandomColors}>Random</button>
//         </div>
//         <p>{JSON.stringify(selectedColors)}</p>
//       </div>
//     </>
//   );
// }

// export default Color;
import React, { useState, useEffect } from "react";
import '../styles/components/Color.scss';

function Color(props) {
  const productOption = props.productOption;
  const [selectedClass, setSelectedClass] = useState("product-shape1");
  const [selectedColor, setSelectedColor] = useState("");
  const classes = ["product-shape1", "product-shape2", "product-shape3", "product-shape4", "product-shape5", "product-shape6", "product-shape7"];
  const colors = ["#d0f352", "#2a2b2d", "#fe251d", "#96498d", '#028790', '#3f3d40', '#0564c1', '#921224', '#fab642', '#453e29', '#c0005d', '#ff0076', '#835e3d', '#c6c6c6', '#eaeaea', '#092642', '#162a27', '#5e2828', '#15174b'];
  const [selectedColors, setSelectedColors] = useState({});

  const handleColorSelect = (e) => {
    const selectedClass = e.target.value;
    setSelectedClass(selectedClass);

    if (!selectedColors[selectedClass]) {
      // Si la couleur n'a pas encore été sélectionnée pour cette option, sélectionner une couleur aléatoire
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
      // Si la couleur a déjà été sélectionnée pour cette option, récupérer la couleur existante
      setSelectedColor(selectedColors[selectedClass]);
    }
  };

  const handleColorClick = (color) => {
    setSelectedColor(color);
    setSelectedColors(prevSelectedColors => ({
      ...prevSelectedColors,
      [selectedClass]: color,
    }));
    props.onColorsChange({
      ...selectedColors,
      [selectedClass]: color,
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
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
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
    const defaultColor = "#FFFFFF"; // Couleur par défaut
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
  }, []); // Exécuter une seule fois au montage du composant

  useEffect(() => {
    const svgElement = document.getElementById("product-svg");
    if (svgElement) {
      const elements = svgElement.querySelectorAll("." + selectedClass);
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
          {props.product.part1 && (
            <option value="product-shape1">{props.product.part1}</option>
          )}
          {props.product.part2 && (
            <option value="product-shape2">{props.product.part2}</option>
          )}
          {props.product.part3 && (
            <option value="product-shape3">{props.product.part3}</option>
          )}
          {props.product.part4 && (
            <option value="product-shape4">{props.product.part4}</option>
          )}
          {props.product.part5 && (
            <option value="product-shape5">{props.product.part5}</option>
          )}
          {props.product.part6 && (
            <option value="product-shape6">{props.product.part6}</option>
          )}
          {props.product.part7 && (
            <option value="product-shape7">{props.product.part7}</option>
          )}
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
          <button onClick={handleRandomColors}>Random</button>
        </div>
      </div>
    </>
  );
}

export default Color;
