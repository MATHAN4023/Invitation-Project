import React from "react";
import Login1 from "../../assets/Login1.svg";
import Login2 from "../../assets/Login2.svg";
import Login3 from "../../assets/Login3.svg";

const Onboardleft = () => {
  return (
    <div className="leftCOntainer w-full truncate">
      <div className="cw mt-6 pl-6 text-2xl uppercase font-bold hover:text-rose-50">
        logo
      </div>
      <div className="flex flex-col items-center w-full h-screen">
        {/* First Section */}
        <div className="flex flex-col md:flex-row items-center justify-center h-1/3 w-full  gap-20">
          <img className="im-sz object-contain h-full w-full md:w-1/3 lg:w-1/4" src={Login1} alt="Pay Online" />
          <div className="flex flex-col text-center md:text-left md:ml-4 h-full justify-center">
            <span className="text-2xl font-bold">Pay Online,</span>
            <span className="cw text-xl">with a simple tap!</span>
          </div>
        </div>
        {/* Second Section */}
        <div className="flex flex-col md:flex-row items-center justify-center h-1/3 w-full gap-20">
          <div className="flex flex-col text-center md:text-left md:mr-4 h-full justify-center">
            <span className="text-2xl font-bold">Unlimited</span>
            <span className="cw text-xl">customization's</span>
          </div>
          <img className="im-sz object-contain h-full w-full md:w-1/3 lg:w-1/4" src={Login2} alt="Customization" />
        </div>
        {/* Third Section */}
        <div className="flex flex-col md:flex-row items-center justify-center h-1/3 w-full gap-20">
          <img className="im-sz object-contain h-full w-full md:w-1/3 lg:w-1/4" src={Login3} alt="Pay Online" />
          <div className="flex flex-col text-center md:text-left md:ml-4 h-full justify-center">
            <span className="text-2xl font-bold">Pay Online,</span>
            <span className="cw text-xl">with a simple tap!</span>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Onboardleft;
