import React from 'react';
import Carousel from 'nuka-carousel';


const CarouselHome = () => {
  return (
    <Carousel autoplay={true} autoplayInterval={2000} pauseOnHover={false} wrapAround={true} dragging={true} renderCenterLeftControls={null} renderCenterRightControls={null}>
      <img src="https://res.cloudinary.com/avicloud/image/upload/v1655474645/b1_jsoqoc.jpg" alt='1' />
      <img src="https://res.cloudinary.com/avicloud/image/upload/c_mfit,h_310/v1655478069/bg1_ayfdxw.png" alt='2' />
      <img src="https://res.cloudinary.com/avicloud/image/upload/v1655474644/b2_xyivsg.jpg" alt='3' />
      <img src="https://res.cloudinary.com/avicloud/image/upload/v1655480341/bt5_dmn7cu.jpg" alt='4' />
      <img src="https://res.cloudinary.com/avicloud/image/upload/v1655480341/bt4_bfullu.png" alt='5' />
      <img src="https://res.cloudinary.com/avicloud/image/upload/v1655473556/b2_srlxza.jpg" alt='6' />
    </Carousel>
  );
}

export default CarouselHome;