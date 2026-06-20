import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

export default function PublicLayout ( {children} ) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}