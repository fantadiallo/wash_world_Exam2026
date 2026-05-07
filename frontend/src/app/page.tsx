import Header from '@/src/components/layout/Header'
import Footer from '@/src/components/layout/Footer'
//import Navigation from '@/src/components/navigation/Navigation';
import ImageSlider from '../components/slider/ImageSlider';
 

export default function Home() {
  return (
    <>
      <Header />
      <ImageSlider />
      <Footer
        address="Dynamovej 4, 2860 Søborg"
        phone="+45 70 70 70 70"
      />
    </>
  );
}