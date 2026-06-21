import BackgroundLayer from "../components/BackgroundLayer";
import Navbar from "../components/Navbar";
import Home from "../components/Home";
import AboutMe from "../components/AboutMe";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Experience from "../components/Experience";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import BackToTop from "../components/BackToTop";
import GoogleLoginButton from "../components/GoogleLoginButton";

const PortfolioPage = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <BackgroundLayer />

      {/* Main Content Layer */}
      <main className="relative z-10">
        <Navbar />
        <Home />
        <AboutMe /> 
        <Skills />
        <Projects />
        <Experience />
        <Contact />
        <Footer />
        <BackToTop />
        <GoogleLoginButton />
      </main>
    </div>
  );
};

export default PortfolioPage;
