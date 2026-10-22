import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Arsenal from "@/components/Arsenal";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Nav />
      <main className="mx-auto flex max-w-[1400px] flex-col gap-24 px-4 pb-24 pt-8 sm:px-8 lg:px-12 md:gap-32">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Arsenal />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
