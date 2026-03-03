import Navbar from "./assets/components/layouts/Navbar";
import Footer from "./assets/components/layouts/Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background font-outfit">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
