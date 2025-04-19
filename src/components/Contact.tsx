import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-950 mb-4 mt-4">Contact Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions or ready to start your next project? Contact us today for a consultation.
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 h-full">
              <h3 className="text-xl font-semibold text-blue-950 mb-6">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-blue-700 mt-1" />
                  <div className="ml-4">
                    <p className="font-medium text-gray-900">Email</p>
                    <a href="mailto:info@csts.com" className="text-gray-600 hover:text-blue-700">
                      info@csts.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-blue-700 mt-1" />
                  <div className="ml-4">
                    <p className="font-medium text-gray-900">Phone</p>
                    <a href="tel:+1234567890" className="text-gray-600 hover:text-blue-700">
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-blue-700 mt-1" />
                  <div className="ml-4">
                    <p className="font-medium text-gray-900">Address</p>
                    <p className="text-gray-600">
                      123 Tech Plaza, Suite 400<br />
                      San Francisco, CA 94105
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="text-lg font-medium text-blue-950 mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  {['facebook', 'twitter', 'linkedin', 'instagram'].map((social) => (
                    <a 
                      key={social}
                      href={`#${social}`}
                      className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-700 hover:text-white transition-all duration-300"
                    >
                      <span className="sr-only">{social}</span>
                      <i className={`fab fa-${social}`}></i>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-blue-950 mb-6">Send Us a Message</h3>
              
              <form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Your email"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Your phone number"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Subject"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your message"
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-md font-medium transition-all duration-300 flex items-center justify-center"
                >
                  Send Message
                  <Send size={18} className="ml-2" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;