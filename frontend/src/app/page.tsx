import Navigation from '../components/navigation/Navigation';

import Footer from '@/src/components/layout/Footer'
import ImageSlider from '../components/slider/ImageSlider';
 

export default function Home() {
  return (
    <>
      <Navigation />
      <ImageSlider />
      <Footer
        address="Dynamovej 4, 2860 Søborg"
        phone="+45 70 70 70 70"
      />
    </>
  );
}