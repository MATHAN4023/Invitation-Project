import React from "react";
import Login1 from "../../assets/Login1.svg";
import Login2 from "../../assets/Login2.svg";
import Login3 from "../../assets/Login3.svg";

const Onboardleft = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <div className="cw mt-6 pl-10 text-3xl uppercase font-bold hover:text-rose-50">
        logo
      </div>
      <div className="flex flex-col items-center justify-center text-lg uppercase font-bold gap-8 mt-8 w-full max-w-md"> {/* Limit the width of the container */}
        {/* First Section */}
        <div className="flex items-center justify-center w-full">
          <img className="im-sz w-32 h-32 md:w-40 md:h-40" src={Login1} alt="Pay Online" />
          <div className="flex flex-col text-center ml-4">
            <span>Pay Online,</span>
            <span className="cw">with a simple tap!</span>
          </div>
        </div>
        {/* Second Section */}
        <div className="flex items-center justify-center w-full">
          <div className="flex flex-col text-center">
            <span>Unlimited</span>
            <span className="cw">customization's</span>
          </div>
          <img className="im-sz w-32 h-32 md:w-40 md:h-40 ml-4" src={Login2} alt="Unlimited Customization" />
        </div>
        {/* Third Section */}
        <div className="flex items-center justify-center w-full">
          <img className="im-sz w-32 h-32 md:w-40 md:h-40" src={Login3} alt="Pay Online" />
          <div className="flex flex-col text-center ml-4">
            <span>Pay Online,</span>
            <span className="cw">with a simple tap!</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboardleft;
