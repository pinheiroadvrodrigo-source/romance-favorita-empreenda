import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import BenefitsSection from "@/components/BenefitsSection";
import QuizSection from "@/components/QuizSection";
import EarningsSimulator from "@/components/EarningsSimulator";
import VoceNoComando from "@/components/VoceNoComando";
import bannerBrasileira from "@/assets/banner-brasileira.png";
import TestimonialsSection from "@/components/TestimonialsSection";
import HowItWorks from "@/components/HowItWorks";
import RegistrationForm from "@/components/RegistrationForm";
import BlogSection from "@/components/BlogSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollProgress from "@/components/ScrollProgress";
import SocialProofNotifications from "@/components/SocialProofNotifications";
import ChatbotWidget from "@/components/ChatbotWidget";
import { usePageView } from "@/hooks/usePageView";

const Index = () => {
  usePageView("/");
  return (
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
      <div className="w-full">
        <img
          src={bannerBrasileira}
          alt="Brasileirinha - A lingerie da mulher brasileira Romance"
          className="w-full h-auto object-cover"
          loading="lazy"
        />
      </div>
      <RegistrationForm />
      <BlogSection />
      <FAQSection />
    </main>
    <Footer />
    <WhatsAppButton />
    <SocialProofNotifications />
    <ChatbotWidget />
  </>
  );
};

export default Index;
