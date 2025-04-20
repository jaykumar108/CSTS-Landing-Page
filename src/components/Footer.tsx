import React from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, SendHorizontal, Twitter, Facebook, Instagram, Linkedin } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: 'easeOut'
    }
  })
};

const slideIn = {
  hidden: { x: -50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
};

const Footer = () => {
  return (
    <footer className="bg-[#0a1d3b] text-white py-10">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideIn}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
        >
          {/* About Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideIn}
          >
            <h3 className="text-lg font-semibold mb-4">ABOUT CSTS</h3>
            <ul className="space-y-2 text-sm">
              {['Home', 'About Us', 'Events', 'Blog', 'Contact Us'].map((item, index) => (
                <motion.li
                  key={item}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={slideIn}
                  custom={index}
                >
                  <a href="#" className="hover:underline">{item}</a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Involvement */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideIn}
          >
            <h3 className="text-lg font-semibold mb-4">GET INVOLVED</h3>
            <ul className="space-y-2 text-sm">
              {['Donation', 'Membership', 'Volunteer', 'Saksham Mithila'].map((item, index) => (
                <motion.li
                  key={item}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={slideIn}
                  custom={index}
                >
                  <a href="#" className="hover:underline">{item}</a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideIn}
          >
            <h3 className="text-lg font-semibold mb-4">CONNECT WITH US</h3>
            <ul className="space-y-3 text-sm">
              {[
                { icon: Mail, text: 'csts.ind@gmail.com' },
                { icon: Mail, text: 'maithilimachaan@gmail.com' },
                { icon: Mail, text: 'madhubanilitfest@gmail.com' },
                { icon: MapPin, text: 'SH75 Mabbi Road, Darbhanga, Bihar 846005' }
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={slideIn}
                  custom={index}
                  className="flex items-center gap-2"
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Social Media Icons */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mt-6 flex justify-center gap-6 flex-wrap"
        >
          {[
            { icon: Twitter, href: "https://twitter.com", color: "#1da1f2" },
            { icon: Facebook, href: "https://facebook.com", color: "#3b5998" },
            { icon: Instagram, href: "https://instagram.com", color: "#e1306c" },
            { icon: Linkedin, href: "https://linkedin.com", color: "#0077b5" }
          ].map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideIn}
              custom={index}
              className="transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
            >
              <social.icon className="w-6 h-6 text-white" />
            </motion.a>
          ))}
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mt-10 border-t border-white/20 pt-6 text-center text-sm"
        >
          &copy; 2022 CSTS ( Centre for Studies of Tradition and Systems) | All rights reserved.
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
