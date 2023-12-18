import React from "react";
import "./section1.css";
import crm_show from "../../../assets/Gif/crm_show.gif";
import backgroundphoto from "../../../assets/BackgroundPhotos/Background-01.png";
import HeroSVG from "./HeroSVG";
const SectionOne = () => {
  return (
    <div>
      <div
        className=" "
        style={{
          borderWidth: "0px",
          borderStyle: "solid",
          borderColor: "rgb(229, 231, 235)",
          boxSizing: "border-box",
          paddingTop: "300px",
          marginTop: "-220px",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "cover",
          backgroundImage: `url(${backgroundphoto})`,
        }}
      >
        <div
          className="mx-auto gy-5  !grid !grid-cols-12"
          style={{
            borderWidth: "0px",
            borderStyle: "solid",
            borderColor: "rgb(229, 231, 235)",
            boxSizing: "border-box",
            paddingRight: "var(--bs-gutter-x, .75rem)",
            paddingLeft: "var(--bs-gutter-x, .75rem)",
            display: "flex",
            flexWrap: "wrap",
            marginTop: "calc(-1*3rem)",
            width: "100%",
            marginRight: "auto",
            marginLeft: "auto",
            maxWidth: "1400px",
          }}
        >
          <div
            className="!col-span-12 lg:!col-span-5"
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
              className="hero-content"
              style={{
                borderWidth: "0px",
                borderStyle: "solid",
                borderColor: "rgb(229, 231, 235)",
                boxSizing: "border-box",
              }}
            >
              <h1
                className="hero-heading"
                style={{
                  borderWidth: "0px",
                  borderStyle: "solid",
                  borderColor: "rgb(229, 231, 235)",
                  boxSizing: "border-box",
                  margin: "0px",
                  fontSize: "36px",
                  fontWeight: 700,
                  lineHeight: "68px",
                  color: "#a115ff",
                }}
              >
                Easiest way of Skyrocketing{" "}
                <span
                  style={{
                    borderWidth: "0px",
                    borderStyle: "solid",
                    borderColor: "rgb(229, 231, 235)",
                    boxSizing: "border-box",
                    color: "#e964ff",
                  }}
                >
                  Conversions
                </span>
              </h1>
              <p
                className="body-text"
                style={{
                  borderWidth: "0px",
                  borderStyle: "solid",
                  borderColor: "rgb(229, 231, 235)",
                  boxSizing: "border-box",
                  margin: "40px 0px",
                  fontSize: "24px",
                  fontWeight: 500,
                  lineHeight: "32px",
                  color: "rgb(48, 48, 83)",
                }}
              >
                Leads from Campaigns, Assign and Manage, Communicate & Update,
                Payment and Beyond.
              </p>
              <div
                style={{
                  borderWidth: "0px",
                  borderStyle: "solid",
                  borderColor: "rgb(229, 231, 235)",
                  boxSizing: "border-box",
                }}
              >
                <p
                  className="col-lg-8"
                  style={{
                    borderWidth: "0px",
                    borderStyle: "solid",
                    borderColor: "rgb(229, 231, 235)",
                    boxSizing: "border-box",
                    margin: "0px",
                    flex: "0 0 auto",
                    width: "66.6667%",
                    padding: "10px",
                    color: "rgb(185, 190, 199)",
                    fontSize: "14px",
                  }}
                >
                  Just Begin with A Simple Step |
                </p>
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
