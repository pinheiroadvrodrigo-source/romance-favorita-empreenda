import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import BenefitsSection from "@/components/BenefitsSection";
import QuizSection from "@/components/QuizSection";
import EarningsSimulator from "@/components/EarningsSimulator";
import VoceNoComando from "@/components/VoceNoComando";
import TestimonialsSection from "@/components/TestimonialsSection";
import HowItWorks from "@/components/HowItWorks";
import RegistrationForm from "@/components/RegistrationForm";
import BlogSection from "@/components/BlogSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollProgress from "@/components/ScrollProgress";

const Index = () => (
  <>
    <ScrollProgress />
    <Header />
    <main>
      <HeroSection />
      <BenefitsSection />
      <QuizSection />
      <EarningsSimulator />
      <VoceNoComando />
      <HowItWorks />
      <TestimonialsSection />
      <RegistrationForm />
      <BlogSection />
      <FAQSection />
    </main>
    <Footer />
    <WhatsAppButton />
  </>
);

export default Index;
