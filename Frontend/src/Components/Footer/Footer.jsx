import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt, FaFacebookF } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import iso from "../../assets/iso.png";
import appStore from "../../assets/apps.jpg";
import Google from "../../assets/googl.jpg";
import { FiInstagram } from "react-icons/fi";
import { CiLinkedin } from "react-icons/ci";
import { ImYoutube2 } from "react-icons/im";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between py-10 bg-[#111111] text-white px-4 lg:px-20">
        {/* About Us Section */}
        <div className="w-full lg:w-1/4 mb-8 lg:mb-0">
          <h1 className="text-lg font-bold mb-4">About Us</h1>
          <p className="text-sm">
            A Blog App enables users to create, read, update, and delete posts.
            It features user authentication, a rich text editor, categories, and
            comments, fostering engagement and content sharing.
          </p>
        </div>

        {/* Contact Info Section */}
        <div className="w-full lg:w-1/4 md:ml-5">
          <h1 className="text-lg mb-5">Contact Info</h1>
          <ul>
            <li className="flex items-center text-sm mb-2">
              <FaLocationDot className="inline mt-1 mr-2 text-[#008000]" />
              <span>Guwarko Balkumari Lalitpur</span>
            </li>
            <li className="flex items-center text-sm mb-2">
              <FaPhoneAlt className="inline mt-1 mr-2 text-[#008000]" />
              <span className="hover:text-[#008000] cursor-pointer">
                9824830624
              </span>{" "}
              /{" "}
              <span className="hover:text-[#008000] cursor-pointer">
                9824830625
              </span>
            </li>
            <li className="flex items-center text-sm hover:text-[#008000] cursor-pointer">
              <MdOutlineEmail className="inline mt-1 mr-2 text-[#008000]" />
              <span>rajipmahato68@gmail.com</span>
            </li>
          </ul>
          <h1 className="text-lg font-bold mt-5">ISO Certification</h1>
          <div className="flex gap-2 mt-5">
            <img src={iso} alt="ISO Certification" className="w-16" />
            <img src={iso} alt="ISO Certification" className="w-16" />
            <img src={iso} alt="ISO Certification" className="w-16" />
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="w-full lg:w-1/4">
          <h1 className="text-lg mb-2">Quick Links</h1>
          <ul>
            <Link to={"about"}>
              <li className="text-sm mb-2 hover:text-[#008000] cursor-pointer">
                About
              </li>
            </Link>
            <Link to={"blog"}>
              <li className="text-sm mb-2 hover:text-[#008000] cursor-pointer">
                Blog
              </li>
            </Link>
            <Link to={"contact"}>
              <li className="text-sm mb-2 hover:text-[#008000] cursor-pointer">
                Contact
              </li>
            </Link>
          </ul>
        </div>

        {/* Social Network & Download Section */}
        <div className="w-full lg:w-1/4">
          <h1 className="text-lg mb-2">Social Network</h1>
          <ul className="flex flex-wrap gap-2 pt-5">
            <li className="bg-white rounded-full text-center p-2">
              <FaFacebookF className="text-[#008000]" />
            </li>
            <li className="bg-white rounded-full text-center p-2">
              <FiInstagram className="text-[#008000]" />
            </li>
            <li className="bg-white rounded-full text-center p-2">
              <CiLinkedin className="text-[#008000]" />
            </li>
            <li className="bg-white rounded-full text-center p-2">
              <ImYoutube2 className="text-[#008000]" />
            </li>
          </ul>
          <h1 className="text-lg font-bold mt-5 mb-5">Download</h1>
          <div className="flex flex-col gap-2">
            <a href="#" className="block">
              <img src={appStore} alt="App Store" className="rounded-md w-32" />
            </a>
            <a href="#" className="block">
              <img src={Google} alt="Google Play" className="rounded-md w-32" />
            </a>
          </div>
        </div>
      </div>

      <hr className="border-[#292929]" />

      <div className="flex flex-col lg:flex-row justify-between bg-[#111111] text-white px-4 lg:px-32 py-5">
        <div className="text-center lg:text-left">
          Copyright 2023 - sparkcar
        </div>
        <div className="text-center lg:text-right hover:text-[#008000] cursor-pointer">
          Privacy Policy
        </div>
      </div>
    </>
  );
}

export default Footer;
