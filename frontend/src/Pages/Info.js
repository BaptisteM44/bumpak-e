import React from 'react';
import Header from '../components/Header';
import '../styles/pages/info.scss';
import black from '../assets/images/ecopack/black.webp'

const ColorSwatch = ({ colorName, imageName, folder }) => {
  const imagePath = require(`../assets/images/${folder}/${imageName}.webp`);

  return (
    <div className="color-swatch">
      <img src={imagePath} alt={colorName} />
      <span>{colorName}</span>
    </div>
  );
};

function Info() {

  const ecopacks = [
    { colorName: 'Army Olive', imageName: 'armyolive', folder: 'ecopack' },
    { colorName: 'Black', imageName: 'black', folder: 'ecopack' },
    { colorName: 'Brick Red', imageName: 'brickred', folder: 'ecopack' },
    { colorName: 'Bright Blue', imageName: 'brightblue', folder: 'ecopack' },
    { colorName: 'Bright Orange', imageName: 'brightorange', folder: 'ecopack' },
    { colorName: 'Coyote Brown', imageName: 'coyotebrown', folder: 'ecopack' },
    { colorName: 'Deep Purple', imageName: 'deeppurple', folder: 'ecopack' },
    { colorName: 'Fuschia', imageName: 'fuschia', folder: 'ecopack' },
    { colorName: 'Golden Lazy', imageName: 'goldenlazy', folder: 'ecopack' },
    { colorName: 'Green Mountain', imageName: 'greenmountain', folder: 'ecopack' },
    { colorName: 'Lemon Lime', imageName: 'lemonlime', folder: 'ecopack' },
    { colorName: 'Lilac', imageName: 'lilac', folder: 'ecopack' },
    { colorName: 'Ocean Blue', imageName: 'oceanblue', folder: 'ecopack' },
    { colorName: 'Pink Flamingo', imageName: 'pinkflamingo', folder: 'ecopack' },
    { colorName: 'Red Barn', imageName: 'redbarn', folder: 'ecopack' },
    { colorName: 'Revel Red', imageName: 'revelred', folder: 'ecopack' },
    { colorName: 'Silver Bullet', imageName: 'silverbullet', folder: 'ecopack' },
    { colorName: 'Snow White', imageName: 'snowwhite', folder: 'ecopack' },
    { colorName: 'Tropical Teal', imageName: 'tropicalteal', folder: 'ecopack' },
    { colorName: 'US Navy', imageName: 'usnavy', folder: 'ecopack' },
    { colorName: 'Wolf Grey', imageName: 'wolfgrey', folder: 'ecopack' }
  ];
  const eplx200ColorNames = ['Lemon Lime', 'Black', 'Silver Bullet', 'Snow White', 'Coyote Brown'];
  const eplx200Colors = ecopacks.filter(color => eplx200ColorNames.includes(color.colorName));

  const elastics = [
    { colorName: 'Light Green', imageName: 'light green', folder: 'elastic' },
    { colorName: 'White', imageName: 'white', folder: 'elastic' },
    { colorName: 'Purple', imageName: 'purple', folder: 'elastic' },
    { colorName: 'Black', imageName: 'black', folder: 'elastic' },
    { colorName: 'Blue', imageName: 'blue', folder: 'elastic' },
    { colorName: 'Bordeaux', imageName: 'bordeaux', folder: 'elastic' },
    { colorName: 'Dark Green', imageName: 'dark green', folder: 'elastic' },
    { colorName: 'Dark Grey', imageName: 'dark grey', folder: 'elastic' },
    { colorName: 'Dark Pink', imageName: 'dark pink', folder: 'elastic' },
    { colorName: 'Electric Blue', imageName: 'electric blue', folder: 'elastic' },
    { colorName: 'Golden Brown', imageName: 'golden brown', folder: 'elastic' },
    { colorName: 'Light Grey', imageName: 'light grey', folder: 'elastic' },
    { colorName: 'Navy Blue', imageName: 'navy blue', folder: 'elastic' },
    { colorName: 'Neon Orange', imageName: 'neon orange', folder: 'elastic' },
    { colorName: 'Neon Pink', imageName: 'neon pink', folder: 'elastic' },
    { colorName: 'Neon Yellow', imageName: 'neon yellow', folder: 'elastic' },
    { colorName: 'Olive', imageName: 'olive', folder: 'elastic' },
    { colorName: 'Orange', imageName: 'orange', folder: 'elastic' },
    { colorName: 'Pink', imageName: 'pink', folder: 'elastic' },
    { colorName: 'Red', imageName: 'red', folder: 'elastic' },
    { colorName: 'Tan', imageName: 'tan', folder: 'elastic' },
    { colorName: 'Teal', imageName: 'teal', folder: 'elastic' },
    { colorName: 'Yellow', imageName: 'yellow', folder: 'elastic' },
  ];


    return (
        <>
        <Header />
        <div className="productDetails_title">
            <h1>Info</h1>
          </div>
        <section className="page_info">
          
            <div className="page_info_content">
                <p>
                  ECOPAK™ is the world’s only durable and waterproof fabric made
                  from 100% recycled polyester
                  fiber and film. Each yard upcycles about 20 plastic water bottles
                  into durable technical textiles.
                  Based on 35 years of weaving, coating and laminating experience,
                  Challenge’s ECOPAK™ fabric
                  lasts longer, absorbs 80% less moisture, and has better UV resistance and color retention than
                  traditional laminated nylon. Just like our sailcloth that has been
                  tested around the world,
                  ECOPAK™ performs in the harshest conditions.</p>
            </div>
            <div className="info_title_part">
              <h2>ECOPAK™ EPX200</h2>
              <p>100% recycled polyester components, C0 DWR (no fluorocarbons),
                  70d Ripstop backing, recyclable after use. Compared to traditional
                  pack fabric with 50d plain weave backing, the 70d Ripstop has
                  better stitch holding and superior strength.</p>
            </div>
            <div className="color-section">
              {ecopacks.map(pack => (
                <ColorSwatch key={pack.imageName} {...pack} />
              ))}
            </div>
            <div className="info_title_part">
              <h2>ECOPAK™ EPLX200</h2>
              <p>100% recycled polyester components, C0 DWR (no fluorocarbons), waterproof
                0.5 mil RUV™ matte film backing, recyclable after use. Compared to other
                laminated pack fabric with shiny film, Challenge’s proprietary RUV™ matte film
                is more abrasion resistant, wrinkles less, and is 97% UV resistant.</p>
            </div>
            <div className="color-section">
            {eplx200Colors.map(pack => (
              <ColorSwatch key={pack.imageName} {...pack} />
            ))}
            </div>
            <div className="info_title_part">
              <h2>ELASTIC CORD 3MM</h2>
            </div>
              <div className="color-section ">
                <div className=" color-section elastic-part">{elastics.map(elastic => (
                  <ColorSwatch key={elastic.imageName} {...elastic} />
                ))}
                </div>
              </div>
        </section>
        </>
    );
  }
  
  export default Info;