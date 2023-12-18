import React from "react";
import "./section1.css";
import crm_show from "../../../assets/Gif/crm_show.gif";
import backgroundphoto from "../../../assets/BackgroundPhotos/Background-01.png";
import HeroSVG from "./HeroSVG";
const SectionOne = () => {
  return (
    <div className="lg:min-h-[87vh] min-h-[95vh] w-full bg-[#180432] flex items-center justify-center">
      <div className="lg:grid lg:grid-cols-2 flex flex-col flex-col-reverse lg:w-[75vw] w-[90vw] min-h-[87vh] lg:mt-0 mt-[-10vh]">
        <div className="min-h-full flex flex-col lg:items-start items-center justify-center ">
          <h1 className="lg:text-[5rem] text-[3rem] font-[700] lg:leading-[10px] leading-[5vh] text-white lg:text-start text-center lg:mb-[24px] mb-0">
            Easiest Way to
          </h1>
          <h1 className="lg:text-[3.5rem] text-[1.8rem] font-[400] text-[#4D8CFC] lg:text-start text-center">
            Skyrocketing Conversions
          </h1>
          <p className="text-white lg:w-3/5 w-[90vw] lg:text-[1.2rem] text-[1rem] font-[400] lg:text-start text-center">
            Leads from Campaigns, Assign and Manage, Communicate & Update,
            Payment and Beyond.
          </p>
          <div className="mt-[5vh] w-full h-[15vh] ">
            <form className="flex flex-col lg:items-start justify-between h-full">
              <div className="w-full flex flex-col">
                <label className="text-[#c5c5c5] text-[1rem] font-[100] m-0 p-0 text-center lg:text-start">
                  Just begin with a simple step 
                </label>
                <input type="email" className="lg:w-1/2 w-[90vw] lg:rounded-r-[12px] rounded-[12px]" placeholder="Enter your email address"/>
              </div>
              <form
                className="hero-form"
                style={{
                  borderWidth: "0px",
                  borderStyle: "solid",
                  borderColor: "rgb(229, 231, 235)",
                  boxSizing: "border-box",
                  gap: "10px",
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    borderWidth: "0px",
                    borderStyle: "solid",
                    borderColor: "rgb(229, 231, 235)",
                    boxSizing: "border-box",
                    width: "100%",
                    position: "relative",
                    marginBottom: "24px",
                  }}
                >
                  <input
                    className="input"
                    name="email"
                    placeholder="Enter your email address"
                    style={{
                      borderWidth: "0px",
                      borderStyle: "solid",
                      borderColor: "rgb(229, 231, 235)",
                      boxSizing: "border-box",
                      margin: "0px",
                      fontFamily: "inherit",
                      fontSize: "100%",
                      fontWeight: "inherit",
                      lineHeight: "inherit",
                      color: "inherit",
                      border: "0px",
                      borderRadius: "12px",
                      padding: "20px",
                      width: "65%",
                      backgroundColor: "rgb(255, 255, 255)",
                      boxShadow: "rgba(0, 0, 0, 0.15) 0px 0px 7px",
                    }}
                  />
                </div>
                <button
                  className="button button-primary !bg-[#159afb]"
                  type="submit"
                  style={{
                    borderWidth: "0px",
                    borderStyle: "solid",
                    borderColor: "rgb(229, 231, 235)",
                    boxSizing: "border-box",
                    margin: "0px",
                    fontFamily: "inherit",
                    lineHeight: "inherit",
                    textTransform: "none",
                    appearance: "button",
                    backgroundImage: "none",
                    border: "0px",
                    fontSize: "18px",
                    fontWeight: 600,
                    cursor: "pointer",
                    padding: "10px 20px",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    color: "rgb(255, 255, 255)",
                    justifyContent: "center",
                  }}
                >
                  Let's get started
                  <span
                    className="icon"
                    style={{
                      borderWidth: "0px",
                      borderStyle: "solid",
                      borderColor: "rgb(229, 231, 235)",
                      boxSizing: "border-box",
                      fontWeight: 500,
                      marginTop: "3px",
                      marginLeft: "5px",
                      color: "rgb(255, 255, 255)",
                      fontSize: "18px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <svg
                      height="1em"
                      width="1em"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 16 16"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        borderWidth: "0px",
                        borderStyle: "solid",
                        borderColor: "rgb(229, 231, 235)",
                        boxSizing: "border-box",
                        display: "block",
                        verticalAlign: "middle",
                      }}
                    >
                      <path
                        d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                        fillRule="evenodd"
                        style={{
                          borderWidth: "0px",
                          borderStyle: "solid",
                          borderColor: "rgb(229, 231, 235)",
                          boxSizing: "border-box",
                        }}
                      />
                    </svg>
                  </span>
                </button>
              </form>
            </div>
          </div>
          <div
            className="!col-span-12 lg:!col-span-7"
            style={{
              borderWidth: "0px",
              borderStyle: "solid",
              borderColor: "rgb(229, 231, 235)",
              boxSizing: "border-box",
              maxWidth: "100%",
              paddingRight: "calc(1.5rem*.5)",
              paddingLeft: "calc(1.5rem*.5)",
              marginTop: "3rem",
              flex: "0 0 auto",
              flexShrink: 0,
              width: "100%",
            }}
          >
            <div
              className="hero-banner w-full"
              style={{
                borderWidth: "0px",
                borderStyle: "solid",
                borderColor: "rgb(229, 231, 235)",
                boxSizing: "border-box",
              }}
            >
             
             <HeroSVG/>
            </div>
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default SectionOne;
