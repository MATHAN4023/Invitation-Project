import React from "react";
import Login1 from "../../assets/Login1.svg";
import Login2 from "../../assets/Login2.svg";
import Login3 from "../../assets/Login3.svg";

const Onboardleft = () => {
  return (
    <>
      
        <div className="flex flex-row">
          <div className="cw mt-6 pl-10 text-2xl uppercase font-bold hover:text-rose-50">
            logo
          </div>
        </div>
        <div className="flex flex-row justify-center">
          <div className="text-2xl flex items-center justify-center uppercase font-bold ">
            <img className="im-sz" src={Login1} alt="" srcset="" />
            <div className="flex flex-col">
              {" "}
              <span>Pay Online,</span>
              <span className="cw">with a simple tap!</span>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center">
          <div className=" text-2xl flex items-center justify-center uppercase font-bold ">
            <div className="flex flex-col">
              {" "}
              <span>Unlimited</span>
              <span className="cw">customization's</span>
            </div>
            <img className="im-sz" src={Login2} alt="" srcset="" />
          </div>
        </div>
        <div className="flex flex-row justify-center">
          <div className="text-2xl flex items-center justify-center uppercase font-bold ">
            <img className="im-sz" src={Login3} alt="" srcset="" />
            <div className=" flex flex-col">
              {" "}
              <span>Pay Online,</span>
              <span className="cw">with a simple tap!</span>
            </div>
          </div>
        </div>
      
    </>
  );
};

export default Onboardleft;
