import { Link } from "react-router-dom";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  MapPin, 
  Phone 
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="inline-block">
              <span className="text-2xl font-bold gradient-text">Guidew</span>
            </Link>
            <p className="mt-3 text-gray-600 text-sm">
              Connecting you with local expertise, on demand, wherever you are in the world.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-brand-teal">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-teal">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-teal">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-teal">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Explore
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/discover" className="text-gray-600 hover:text-brand-teal text-sm">
                  Find Services
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-gray-600 hover:text-brand-teal text-sm">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/become-expert" className="text-gray-600 hover:text-brand-teal text-sm">
                  Become an Expert
                </Link>
              </li>
              <li>
                <Link to="/locations" className="text-gray-600 hover:text-brand-teal text-sm">
                  Locations
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Company
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-brand-teal text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-600 hover:text-brand-teal text-sm">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-brand-teal text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/press" className="text-gray-600 hover:text-brand-teal text-sm">
                  Press
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Contact
            </h3>
            <ul className="mt-4 space-y-2">
              <li className="flex items-start">
                <MapPin size={18} className="flex-shrink-0 text-brand-teal mr-2 mt-0.5" />
                <span className="text-gray-600 text-sm">
                  123 Innovation Way, San Francisco, CA 94107
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="flex-shrink-0 text-brand-teal mr-2" />
                <span className="text-gray-600 text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="flex-shrink-0 text-brand-teal mr-2" />
                <span className="text-gray-600 text-sm">support@localxpert.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} LocalXpert. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <Link to="/terms" className="text-sm text-gray-500 hover:text-brand-teal">
                Terms of Service
              </Link>
              <Link to="/privacy" className="text-sm text-gray-500 hover:text-brand-teal">
                Privacy Policy
              </Link>
              <Link to="/cookies" className="text-sm text-gray-500 hover:text-brand-teal">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
