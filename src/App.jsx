import React from "react";
import Navbar from "./Layouts/Navbar";
import Header from "./views/Header";
import About from "./views/About";
import Projects from "./views/Projects";
import Skills from "./views/Skills";
import Contact from "./views/Contact";
import Footer from "./Layouts/Footer";
import BackToTop from "./components/BackToTop";


const App = () => {
  return <div className="overflow-x-hidden">
    <Navbar/>
    <Header/>
    <About/>
    <Projects/>
    <Skills/>
    <Contact/>
    <Footer/>
    <BackToTop/>
  </div>;
};

export default App;
