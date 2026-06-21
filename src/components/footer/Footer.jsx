import Link from "next/link";
import { BsFacebook, BsLinkedin } from "react-icons/bs";
import { FaCopyright } from "react-icons/fa";
import { ImYoutube } from "react-icons/im";
import { IoLogoTwitter } from "react-icons/io";

export default function Footer () {
  return (
    <div className="bg-black text-white">
      {/* Wrapper */}
      <div className="container mx-auto flex flex-col gap-8 px-4 lg:px-25 xl:px-50 py-8">
        {/* Main container */}
        <div className="flex items-center justify-center">
          {/* Logo container*/}
          <h1 className="text-xl font-bold">
            <span className="text-indigo-500">STARTUP</span><span className="text-orange-500">FORGE</span>
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {/* Information container */}
          <div>
            {/* Social links */}
            <h1 className="text-xl">Social Links</h1>
            <ul className="flex flex-col gap-2">
              <li className="hover:border-b w-fit">
                <Link href={"#"} className="flex items-center gap-2 ">
                  <IoLogoTwitter />
                  <span>Twitter</span>
                </Link>
              </li>
              <li className="hover:border-b w-fit">
                <Link href={"#"} className="flex items-center gap-2">
                  <BsFacebook />
                  <span>Facebook</span>
                </Link>
              </li>
              <li className="hover:border-b w-fit">
                <Link href={"#"} className="flex items-center gap-2">
                  <BsLinkedin />
                  <span>Linkedin</span>
                </Link>
              </li>
              <li className="hover:border-b w-fit">
                <Link href={"#"} className="flex items-center gap-2">
                  <ImYoutube />
                  <span>Youtube</span>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            {/* Quick links */}
            <h1 className="text-xl">Quick Links</h1>
            <ul>
              <li className="hover:border-b w-fit">
                <Link href={"/"}>
                  Home
                </Link>
              </li>
              <li className="hover:border-b w-fit">
                <Link href={"#"}>
                  Browse startups
                </Link>
              </li>
              <li className="hover:border-b w-fit">
                <Link href={"#"}>
                  Browse opportunities
                </Link>
              </li>
              <li className="hover:border-b w-fit">
                <Link href={"/signin"}>
                  Sign In
                </Link>
              </li>
              <li className="hover:border-b w-fit">
                <Link href={"signup"}>
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
          <div>
            {/* Contacts inforamtion */}
            <h1 className="text-xl">Contacts Information</h1>
            <ul>
              <li>Mobile Number: 01322731785</li>
              <li>Email Address: aburayhankobir013@gmail.com</li>
            </ul>
          </div>
        </div>
        <div className="flex justify-center items-center text-center gap-2">
          {/* Copyrights container */}
          <FaCopyright />
          <span>
            {new Date().getFullYear()} STARTUPFORG. Built for innovators, creators, and startup builders. All Rights Reserved.
          </span>
        </div>
      </div>
    </div>
  );
}