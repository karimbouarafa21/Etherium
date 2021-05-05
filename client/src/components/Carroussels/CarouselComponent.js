/*!

=========================================================
* Paper Kit React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import imageCarroussel1 from 'assets/img/carroussel1.png'
import imageCarroussel2 from 'assets/img/carroussel2.png'
import imageCarroussel3 from 'assets/img/carroussel3.png'
// reactstrap components
import {
  Card,
  Carousel,
  CarouselItem,
  CarouselIndicators,
  CarouselCaption,
} from "reactstrap";

// core components

const items = [
  {
    src: imageCarroussel1,
    altText: "Somewhere",
    // caption: 
    // // <div style={{textAlign:"left"}}>
    // //   <h1>Tous vos actes d’état civil en un même endroit</h1> 
    // //   <h5>
    // //     <ul>
    // //       <li>Actes de naissance</li>
    // //       <li>Actes de mariage</li>
    // //       <li>Actes de décès</li>
    // //     </ul>
    // //   </h5>
    // //   </div>,
  },
  {
    src: imageCarroussel2,
    altText: "Somewhere else",
    // caption: 
    // /* <div style={{textAlign:"left"}}>
    // <h1>Vos actes numériques certifiés sans attendre</h1> 
    // <h5>Les actes sont générés instantanément. Les données qui y figurent sont certifiées.</h5>
    // </div> */,
  },
  {
    src: imageCarroussel3,
    altText: "Here it is",
    // caption: 
    // {/* <div style={{textAlign:"left"}}>
    //   <h1>Vérification des identités sûre et rapide</h1> 
    //   <h5>Pour vérifier l’authenticité d’un acte, demandez le numéro à son porteur. Vous pourrez obtenir une garantie en un clic.</h5>
    // </div> */},
  },
];

function CarouselComponent() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [animating, setAnimating] = React.useState(false);
  const onExiting = () => {
    setAnimating(true);
  };
  const onExited = () => {
    setAnimating(false);
  };
  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };
  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };
  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };
  return (
    <>
      <Card className="page-carousel">
        <Carousel
          activeIndex={activeIndex}
          next={next}
          previous={previous}
        >
          <CarouselIndicators
            items={items}
            activeIndex={activeIndex}
            onClickHandler={goToIndex}
          />
          {items.map((item) => {
            return (
              <CarouselItem
                onExiting={onExiting}
                onExited={onExited}
                key={item.src}
              >
                <img src={item.src} alt={item.altText} />
                <CarouselCaption
                  captionText={item.caption}
                  captionHeader=""
                />
              </CarouselItem>
            );
          })}
          <a
            className="left carousel-control carousel-control-prev"
            data-slide="prev"
            href="#pablo"
            onClick={(e) => {
              e.preventDefault();
              previous();
            }}
            role="button"
          >
            <span className="fa fa-angle-left" />
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="right carousel-control carousel-control-next"
            data-slide="next"
            href="#pablo"
            onClick={(e) => {
              e.preventDefault();
              next();
            }}
            role="button"
          >
            <span className="fa fa-angle-right" />
            <span className="sr-only">Next</span>
          </a>
        </Carousel>
      </Card>

      {" "}
    </>
  );
}

export default CarouselComponent;
