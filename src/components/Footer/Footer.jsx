import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaPhone } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { images } from '../../constants';

const Footer = () => {
  return (
    <footer className="bg-[#1B5E89] text-white pt-10 text-sm">
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row justify-center mx-6 md:mx-16 gap-16 mb-8">
        {/* Logo and Name */}
        <div className="flex items-center gap-2 lg:h-10">
          <img className='w-full h-full' src={images.nobg} alt="log" />
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-bold text-xl">ERPP 2.0</p>
          <ul className="space-y-2 text-white mt-2">
            <li><a href="/about">About Us</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/info">Info</a></li>
            <li><a href="/others">Other Services</a></li>
          </ul>
        </div>

        {/* Address */}
        <div>
          <h4 className="font-bold text-white mb-3">Address</h4>
          <ul className="space-y-3 text-white">
            <li className="flex items-center gap-2">
              <MdEmail className="text-lg" />
              <span>Info@shipperscouncil.Com</span>
            </li>
            <li className="flex items-center gap-2">
              <FaPhone className="text-lg" />
              <span>+234 912 345 678</span>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-bold text-white mb-2">Newsletter</h4>
          <p className="text-sm mb-8">
            Subscribe to our Newsletter &amp; Event right now to be updated.
          </p>
          <form className="flex flex-col gap-4">
            <div className='flex gap-4'>
              <input
              type="text"
              placeholder="Name"
              className="px-3 py-2 text-black text-sm w-full md:w-1/2"
            />
            <input
              type="email"
              placeholder="Email"
              className="px-3 py-2 text-black text-sm w-full md:w-1/2"
            />
            </div>
            <button
              type="submit"
              className="bg-[#4ECB8C] px-4 py-2 text-white font-semibold w-full md:w-auto"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-[#0B0B14] py-4 px-6 flex flex-col-reverse gap-4 md:flex-row justify-around items-center text-xs text-gray-300">
        <p className="text-center mb-2 md:mb-0">© {new Date().getFullYear()} Nigerian Shippers' Council. All rights reserved</p>
        <div className="flex gap-8 text-white text-base">
          <FaFacebookF className="hover:text-[#4ECB8C] cursor-pointer" />
          <FaInstagram className="hover:text-[#4ECB8C] cursor-pointer" />
          <FaLinkedinIn className="hover:text-[#4ECB8C] cursor-pointer" />
          <FaTwitter className="hover:text-[#4ECB8C] cursor-pointer" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
