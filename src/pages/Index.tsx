import HeaderNavbar from "@/components/HeaderNavbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";
import NavigationDots from "@/components/NavigationDots";

const Index = () => {
  return (
    <main className="relative pt-2">
      <HeaderNavbar />
      <NavigationDots />
      
      <div id="hero">
        <HeroSection />
      </div>
      
      <div id="about">
        <AboutSection />
      </div>
      
      <div id="skills">
        <SkillsSection />
      </div>
      
      <div id="experience">
        <ExperienceSection />
      </div>
      
      <div id="projects">
        <ProjectsSection />
      </div>
      
      <div id="contact">
        <ContactSection />
      </div>
    </main>
  );
};

export default Index;
