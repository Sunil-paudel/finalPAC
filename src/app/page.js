import Possibility from "../components/possibility/Possibility";
import Header from "@/components/header/Header";
import Features from "@/components/features/Features";
import PAC from "@/components/PAC/PAC";
import ChatbotToggleButton from "@/components/ChatbotToggleButton";

export default function Home() {
  return (
  <div className="styles.container">
    <Header />
    <Possibility />
    <Features />
    <PAC />
    <ChatbotToggleButton /> 
    </div>
  );
}
