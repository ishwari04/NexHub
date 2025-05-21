import { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronDown, LogIn, LogOut, Search, User, Briefcase, Award, BarChart, Database, Calendar, FileText, CheckCircle, Mail, Phone, MapPin } from 'lucide-react';
import AuthContext from "../context/AuthContext.jsx";

export default function NexHub() {
  const { token, logout } = useContext(AuthContext);
  const isLoggedIn = !!token;
  const navigate = useNavigate();
  
  const [activeDropdown, setActiveDropdown] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const toggleLogin = () => {
    if (isLoggedIn) {
      logout();
    } else {
      navigate('/login');
    }
  };

  const handleDashboardClick = () => {
    if (isLoggedIn) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  const toggleDropdown = () => {
    setActiveDropdown(!activeDropdown);
  };
  
  const toggleContactModal = () => {
    setShowContactModal(!showContactModal);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription for:', newsletterEmail);
    setNewsletterEmail('');
  };
  
  // Set global styles to ensure no external CSS affects the component
  useEffect(() => {
    // Create a style element
    const styleEl = document.createElement('style');
    
    // Define reset styles to override any defaults
    styleEl.innerHTML = `
      body, html {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        background-color: #ffffff !important;
        overflow-x: hidden;
      }
      * {
        box-sizing: border-box;
      }
      .container {
        width: 100%;
        max-width: 1280px;
        margin-left: auto;
        margin-right: auto;
      }
    `;
    
    // Append the style element to head
    document.head.appendChild(styleEl);
    
    // Cleanup function
    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen w-full bg-white" style={{ width: '100%', margin: 0, padding: 0 }}>
      {/* Navigation Bar */}
      <header className="bg-gray-900 text-white shadow-md w-full">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center w-full" style={{ maxWidth: '1280px' }}>
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">HIRE<span className="text-orange-500">HUB</span></h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="hover:text-orange-300 border-b-2 border-orange-500 pb-1">HOME</a>
            <a href="#" className="hover:text-orange-300">ABOUT</a>
            <a href="#" className="hover:text-orange-300">SERVICES</a>
            <a href="#" className="hover:text-orange-300">FOR EMPLOYERS</a>
            <a href="#" className="hover:text-orange-300">FOR JOB SEEKERS</a>
            <div className="relative">
              <button 
                className="flex items-center hover:text-orange-300"
                onClick={toggleDropdown}
              >
                RESOURCES
                <ChevronDown size={16} className="ml-1" />
              </button>
              {activeDropdown && (
                <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                  <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-orange-100">Student Verification</a>
                  <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-orange-100">Job Recommendations</a>
                  <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-orange-100">Resume Analytics</a>
                  <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-orange-100">Graph-based Matching</a>
                </div>
              )}
            </div>
            <a href="#" className="hover:text-orange-300" onClick={toggleContactModal}>CONTACT</a>
            {isLoggedIn && (
              <a 
                href="#" 
                className="hover:text-orange-300"
                onClick={handleDashboardClick}
              >
                DASHBOARD
              </a>
            )}
          </nav>
          
          <button 
            onClick={toggleLogin}
            className="border border-orange-500 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded transition-colors duration-200"
          >
            {isLoggedIn ? (
              <div className="flex items-center">
                <LogOut size={16} className="mr-2" />
                <span>LOGOUT</span>
              </div>
            ) : (
              <div className="flex items-center">
                <LogIn size={16} className="mr-2" />
                <span>GET STARTED</span>
              </div>
            )}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative bg-gray-800 text-white w-full" style={{ width: '100%' }}>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 bg-gray-900"
          style={{ backgroundImage: "url('/api/placeholder/1920/1080')", width: '100%', height: '100%' }}
        ></div>
        <div className="relative w-full mx-auto px-4 py-24 flex flex-col items-center text-center z-10" style={{ maxWidth: '1280px' }}>
          <div className="max-w-3xl w-full mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">CONNECTING TALENT TO OPPORTUNITY</h2>
            <p className="text-xl md:text-2xl mb-10">A next-gen platform for recruiters and job seekers based on graph analysis</p>
            <button 
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-md text-lg font-medium transition-colors duration-200"
              onClick={isLoggedIn ? handleDashboardClick : () => navigate('/login')}
            >
              {isLoggedIn ? 'GO TO DASHBOARD' : 'DISCOVER MORE'}
            </button>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section className="py-16 bg-white w-full">
        <div className="container mx-auto px-4 w-full" style={{ maxWidth: '1280px' }}>
          <div className="text-center mb-12 w-full">
            <p className="text-gray-500 uppercase tracking-wider mb-2">OUR SERVICES</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">DISCOVER WHAT HIREHUB BRINGS TO YOUR HIRING JOURNEY</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            <div className="bg-white rounded-lg shadow p-6 flex">
              <div className="mr-6">
                <div className="text-orange-500 mb-2">
                  <Briefcase className="w-10 h-10" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Job Matching</h3>
                <p className="text-gray-600">
                  We connect job seekers with roles that align with their skills, experience, and 
                  preferences using AI-powered algorithms.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6 flex">
              <div className="mr-6">
                <div className="text-orange-500 mb-2">
                  <FileText className="w-10 h-10" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Resume Builder</h3>
                <p className="text-gray-600">
                  Create professional, ATS-friendly resumes effortlessly with our smart resume
                  builder.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6 flex">
              <div className="mr-6">
                <div className="text-orange-500 mb-2">
                  <BarChart className="w-10 h-10" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Analytics Dashboard</h3>
                <p className="text-gray-600">
                  Employers can access real-time insights into candidate profiles, application
                  trends, and hiring performance.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6 flex">
              <div className="mr-6">
                <div className="text-orange-500 mb-2">
                  <Search className="w-10 h-10" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Smart Search</h3>
                <p className="text-gray-600">
                  Advanced search filters help recruiters find the perfect candidates with ease and
                  precision.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6 flex">
              <div className="mr-6">
                <div className="text-orange-500 mb-2">
                  <CheckCircle className="w-10 h-10" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Skill Verification</h3>
                <p className="text-gray-600">
                  Ensure quality hires with pre-screening assessments and verified skill tests for
                  applicants.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6 flex">
              <div className="mr-6">
                <div className="text-orange-500 mb-2">
                  <Calendar className="w-10 h-10" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Interview Scheduling</h3>
                <p className="text-gray-600">
                  Automate interview scheduling and reduce time-to-hire with integrated calendar
                  tools.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Student Verification Section */}
      <section className="py-16 bg-gray-100 w-full">
        <div className="container mx-auto px-4 w-full" style={{ maxWidth: '1280px' }}>
          <div className="flex flex-col md:flex-row items-center justify-between w-full">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Only Genuine and Verified Students</h2>
              <p className="text-gray-700 mb-6">
                We make sure that all student profiles on our platform are thoroughly verified to maintain
                credibility and trust.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="text-orange-500 mr-3">
                    <CheckCircle size={20} />
                  </div>
                  <p className="text-gray-700">Authentic student profiles from recognized institutions</p>
                </div>
                
                <div className="flex items-start">
                  <div className="text-orange-500 mr-3">
                    <CheckCircle size={20} />
                  </div>
                  <p className="text-gray-700">Documents and qualifications manually verified</p>
                </div>
                
                <div className="flex items-start">
                  <div className="text-orange-500 mr-3">
                    <CheckCircle size={20} />
                  </div>
                  <p className="text-gray-700">No fake applications — only real talent!</p>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2 flex justify-center">
              <img 
                src="/api/placeholder/600/400" 
                alt="Verified Students" 
                className="rounded-lg shadow-lg w-full max-w-md"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white w-full">
        <div className="container mx-auto px-4 w-full" style={{ maxWidth: '1280px' }}>
          <div className="text-center mb-12 w-full">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              HAVE QUESTIONS OR NEED SUPPORT? REACH OUT TO THE HIREHUB TEAM
            </h2>
            <span className="text-xl md:text-2xl font-medium mt-2 block text-gray-600">
              — WE'RE HERE TO HELP YOU SUCCEED
            </span>
          </div>
          
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg w-full">
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <input 
                    type="email" 
                    placeholder="Your Email" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    style={{ width: '100%' }}
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <input 
                  type="text" 
                  placeholder="Subject" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  style={{ width: '100%' }}
                />
              </div>
              
              <div className="mb-6">
                <textarea 
                  placeholder="Message" 
                  rows="4" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  style={{ width: '100%' }}
                ></textarea>
              </div>
              
              <div className="text-center">
                <button 
                  type="submit" 
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-medium transition-colors duration-200"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 w-full">
        <div className="container mx-auto px-4 w-full" style={{ maxWidth: '1280px' }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
            <div>
              <h3 className="text-2xl font-bold mb-4">HireHub</h3>
              <p className="text-gray-400 mb-4">Nagpur, Maharashtra</p>
              <p className="text-gray-400 mb-4">India - 410001</p>
              <div className="flex items-center mb-2">
                <Phone size={16} className="mr-2 text-orange-500" />
                <span>+91 1234567890</span>
              </div>
              <div className="flex items-center">
                <Mail size={16} className="mr-2 text-orange-500" />
                <span>companyhirehub@gmail.com</span>
              </div>
            
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Useful Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-orange-500">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-500">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-500">Services</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-500">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-500">Privacy Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Our Services</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-orange-500">Student Verification</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-500">Job Recommendations</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-500">Company Insights</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-500">Resume Analytics</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-500">Graph-based Matching</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Newsletter</h4>
              <p className="text-gray-400 mb-4">Subscribe to our newsletter to receive updates about new features and job opportunities</p>
              <form onSubmit={handleNewsletterSubmit}>
                <div className="flex w-full">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="px-4 py-2 w-full rounded-l-md focus:outline-none"
                    style={{ flex: '1', minWidth: 0 }}
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 rounded-r-md transition-colors duration-200 whitespace-nowrap"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-800 text-center w-full">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} HireHub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      
      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50" style={{ width: '100vw', height: '100vh' }}>
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full" style={{ width: '90%', maxWidth: '500px' }}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Contact Us</h3>
              <button onClick={toggleContactModal} className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center mb-3">
                <Phone size={20} className="text-orange-500 mr-3" />
                <span>+91 1234567890</span>
              </div>
              <div className="flex items-center mb-3">
                <Mail size={20} className="text-orange-500 mr-3" />
                <span>companyhirehub@gmail.com</span>
              </div>
              <div className="flex items-center">
                <MapPin size={20} className="text-orange-500 mr-3" />
                <span>Nagpur, Maharashtra, India - 410001</span>
              </div>
            </div>
            
            <form>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  style={{ width: '100%' }}
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  style={{ width: '100%' }}
                />
              </div>
              <div className="mb-4">
                <textarea
                  placeholder="Your Message"
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  style={{ width: '100%' }}
                ></textarea>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md transition-colors duration-200"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}