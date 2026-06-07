import BackToTop from "../components/BackToTop";
import ContactCta from "../components/help/ContactCta";
import Footer from "../components/Footer";
import FaqSection from "../components/help/FAQSection";
import HelpHero from "../components/help/HelpHero";
import Navbar from "../components/Navbar";

const Help = () => {
    return (
        <div>
            <Navbar />
            <HelpHero />
            <FaqSection />
            <ContactCta/>
            <Footer />
            <BackToTop />
        </div>
    )
}

export default Help;