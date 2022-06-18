import React from 'react';
import Carousel from 'nuka-carousel';


const CarouselHome = () => {
  return (
    <Carousel autoplay={true} autoplayInterval={2000} pauseOnHover={false} wrapAround={true} dragging={true} renderCenterLeftControls={null} renderCenterRightControls={null}>
      <img src="https://res.cloudinary.com/avicloud/image/upload/v1655528662/network-connection-graphic-overlay-background_lxfcry.jpg" alt='1' />
      <img src="https://res.cloudinary.com/avicloud/image/upload/c_mfit,h_310/v1655478069/bg1_ayfdxw.png" alt='2' />
      <img src="https://res.cloudinary.com/avicloud/image/upload/v1655586373/medium-shot-girl-reading-book_qnr5pn.jpg" alt='3' />
      <img src="https://res.cloudinary.com/avicloud/image/upload/v1655474644/b2_xyivsg.jpg" alt='4' />
      <img src="https://res.cloudinary.com/avicloud/image/upload/v1655529303/back-school-background-with-school-supplies-copy-space-notebook_n5pwss.jpg" alt='5' />
      <img src="https://res.cloudinary.com/avicloud/image/upload/v1655528119/g21_kvkkte.jpg" alt='6' />
       <img src="https://res.cloudinary.com/avicloud/image/upload/v1655474645/b1_jsoqoc.jpg" alt='7' />
       <img src="https://res.cloudinary.com/avicloud/image/upload/v1655529806/bg12_v7zkxc.jpg" alt='8' />
    </Carousel>
  );
}

export default CarouselHome;