import React from "react";
import qIcon from "../../../assets/Icons/Q-icon.png";
import { priceData } from "./Section6Data";

const SectionSix = () => {
  return (
    <>
      <div>
        <div
          className="section-padding pricing-wrapper"
          style={{
            borderWidth: "0px",
            borderStyle: "solid",
            borderColor: "rgb(229, 231, 235)",
            boxSizing: "border-box",
            padding: "80px 0px",
          }}
        >
          <div
            className="container"
            style={{
              borderWidth: "0px",
              borderStyle: "solid",
              borderColor: "rgb(229, 231, 235)",
              boxSizing: "border-box",
              paddingRight: "var(--bs-gutter-x, .75rem)",
              paddingLeft: "var(--bs-gutter-x, .75rem)",
              marginRight: "auto",
              marginLeft: "auto",
              width: "100%",
              maxWidth: "1400px",
            }}
          >
            <h2
              className="heading-primary"
              style={{
                borderWidth: "0px",
                borderStyle: "solid",
                borderColor: "rgb(229, 231, 235)",
                boxSizing: "border-box",
                margin: "0px",
                fontSize: "50px",
                lineHeight: "68px",
                fontWeight: 400,
                color: "rgb(8, 160, 247)",
                marginBottom: "10px",
              }}
            >
              We're offering you{" "}
              <span
                style={{
                  borderWidth: "0px",
                  borderStyle: "solid",
                  borderColor: "rgb(229, 231, 235)",
                  boxSizing: "border-box",
                  color: "rgb(8, 160, 247)",
                  fontWeight: 600,
                }}
              >
                The best deal!
              </span>
            </h2>
            <p
              className="body-text"
              style={{
                borderWidth: "0px",
                borderStyle: "solid",
                borderColor: "rgb(229, 231, 235)",
                boxSizing: "border-box",
                margin: "0px",
                fontWeight: 400,
                color: "rgb(48, 48, 83)",
                fontSize: "35px",
                lineHeight: "45px",
                marginBottom: "100px",
              }}
            >
              See how our pricing and features differ from our competitors
            </p>
            <div
              className="!grid !grid-cols-12 gap-2"
              style={{
                borderWidth: "0px",
                borderStyle: "solid",
                borderColor: "rgb(229, 231, 235)",
                boxSizing: "border-box",
                display: "flex",
                flexWrap: "wrap",
                marginTop: "calc(-1*3rem)",
                marginRight: "calc(-.5*1.5rem)",
                marginLeft: "calc(-.5*1.5rem)",
              }}
            >
              <div
                className="!col-span-12 lg:!col-span-8 md:ml-[6%]"
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
                <div className="!grid !grid-cols-12 gap-2">
                  <div
                    className="!col-span-12 md:!col-span-5 w-[100%] flex justify-center flex-column item-center large pricing-card"
                    style={{
                      borderWidth: "0px",
                      borderStyle: "solid",
                      borderColor: "rgb(229, 231, 235)",
                      boxSizing: "border-box",
                      display: "flex",
                      justifyContent: "center",
                      borderRadius: "10px",
                      padding: "30px",
                      textAlign: "center",
                      minHeight: "100%",
                      background: "rgb(255, 255, 255)",
                      border: "1px solid rgb(8, 160, 247)",
                      boxShadow: "rgb(82, 182, 255) 0px 0px 7px",
                      flexDirection: "column",
                    }}
                  >
                    <div
                      className="icon"
                      style={{
                        borderWidth: "0px",
                        borderStyle: "solid",
                        borderColor: "rgb(229, 231, 235)",
                        boxSizing: "border-box",
                        margin: "0px auto",
                        maxWidth: "100%",
                      }}
                    >
                      <img
                        // src="data:image/webp;base64,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"
                        src={qIcon}
                        style={{
                          borderWidth: "0px",
                          borderStyle: "solid",
                          borderColor: "rgb(229, 231, 235)",
                          boxSizing: "border-box",
                          display: "block",
                          verticalAlign: "middle",
                          maxWidth: "100%",
                          height: "auto",
                        }}
                      />
                    </div>
                    <span
                      className="price"
                      style={{
                        borderWidth: "0px",
                        borderStyle: "solid",
                        borderColor: "rgb(229, 231, 235)",
                        boxSizing: "border-box",
                        display: "inline-block",
                        marginTop: "10px",
                        fontSize: "20px",
                      }}
                    >
                      $3.49/month
                    </span>
                  </div>
                  <div
                    className="!col-span-12 md:!col-span-7"
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
                      className="!grid !grid-cols-12 gap-2"
                      style={{
                        borderWidth: "0px",
                        borderStyle: "solid",
                        borderColor: "rgb(229, 231, 235)",
                        boxSizing: "border-box",
                        display: "flex",
                        flexWrap: "wrap",
                        marginTop: "calc(-1*1.5rem)",
                        marginRight: "calc(-.5*1.5rem)",
                        marginLeft: "calc(-.5*1.5rem)",
                      }}
                    >
                      {priceData.map((item, idx) => {
                        return (
                          <div
                            className="!col-span-12 xsm:!col-span-6"
                            style={{
                              borderWidth: "0px",
                              borderStyle: "solid",
                              borderColor: "rgb(229, 231, 235)",
                              boxSizing: "border-box",
                              maxWidth: "100%",
                              paddingRight: "calc(1.5rem*.5)",
                              paddingLeft: "calc(1.5rem*.5)",
                              marginTop: "1.5rem",
                              flex: "0 0 auto",
                              flexShrink: 0,
                              width: "100%",
                            }}
                          >
                            <div
                              className="pricing-card"
                              style={{
                                borderWidth: "0px",
                                borderStyle: "solid",
                                borderColor: "rgb(229, 231, 235)",
                                boxSizing: "border-box",
                                background: "rgb(255, 255, 255)",
                                borderRadius: "10px",
                                padding: "30px",
                                textAlign: "center",
                                boxShadow: "rgb(228, 228, 228) 0px 0px 7px",
                                minHeight: "100%",
                              }}
                            >
                              <div
                                className="icon"
                                style={{
                                  borderWidth: "0px",
                                  borderStyle: "solid",
                                  borderColor: "rgb(229, 231, 235)",
                                  boxSizing: "border-box",
                                  margin: "0px auto",
                                  maxWidth: "45px",
                                }}
                              >
                                <img
                                  src={item?.icon}
                                  style={{
                                    borderWidth: "0px",
                                    borderStyle: "solid",
                                    borderColor: "rgb(229, 231, 235)",
                                    boxSizing: "border-box",
                                    display: "block",
                                    verticalAlign: "middle",
                                    maxWidth: "100%",
                                    height: "auto",
                                  }}
                                />
                              </div>
                              <span
                                className="price"
                                style={{
                                  borderWidth: "0px",
                                  borderStyle: "solid",
                                  borderColor: "rgb(229, 231, 235)",
                                  boxSizing: "border-box",
                                  display: "inline-block",
                                  fontSize: "16px",
                                  marginTop: "10px",
                                }}
                              >
                                {`${item?.price}/month`}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="!col-span-12 lg:!col-span-4"
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
                  className="pricing-form"
                  style={{
                    borderWidth: "0px",
                    borderStyle: "solid",
                    borderColor: "rgb(229, 231, 235)",
                    boxSizing: "border-box",
                    marginLeft: "40px",
                  }}
                >
                  <h3
                    style={{
                      borderWidth: "0px",
                      borderStyle: "solid",
                      borderColor: "rgb(229, 231, 235)",
                      boxSizing: "border-box",
                      fontWeight: "inherit",
                      margin: "0px",
                      fontSize: "30px",
                      lineHeight: "40px",
                      color: "rgb(48, 48, 83)",
                      marginBottom: "20px",
                    }}
                  >
                    Start Free Trial Now!
                  </h3>
                  <form
                    style={{
                      borderWidth: "0px",
                      borderStyle: "solid",
                      borderColor: "rgb(229, 231, 235)",
                      boxSizing: "border-box",
                    }}
                  >
                    <div
                      className="mb4 relative"
                      style={{
                        borderWidth: "0px",
                        borderStyle: "solid",
                        borderColor: "rgb(229, 231, 235)",
                        boxSizing: "border-box",
                        position: "relative",
                      }}
                    >
                      <input
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
                          borderRadius: "12px",
                          padding: "20px",
                          border: "0px",
                          width: "100%",
                          backgroundColor: "rgb(255, 255, 255)",
                          boxShadow: "rgba(0, 0, 0, 0.15) 0px 0px 7px",
                        }}
                      />
                    </div>
                    <button
                      className="button button-primary"
                      type="button"
                      style={{
                        borderWidth: "0px",
                        borderStyle: "solid",
                        borderColor: "rgb(229, 231, 235)",
                        boxSizing: "border-box",
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
                        backgroundColor: "rgb(8, 160, 247)",
                        width: "max-content",
                        margin: "20px 0px",
                      }}
                    >
                      Let's Get Started
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
                  <h3
                    style={{
                      borderWidth: "0px",
                      borderStyle: "solid",
                      borderColor: "rgb(229, 231, 235)",
                      boxSizing: "border-box",
                      fontWeight: "inherit",
                      margin: "0px",
                      fontSize: "30px",
                      lineHeight: "40px",
                      color: "rgb(48, 48, 83)",
                      marginBottom: "20px",
                    }}
                  >
                    Or, Choose a Plan
                  </h3>
                  <a
                    className="button button-primary"
                    href="https://www.onethreadapp.com/#"
                    style={{
                      borderWidth: "0px",
                      borderStyle: "solid",
                      borderColor: "rgb(229, 231, 235)",
                      boxSizing: "border-box",
                      textDecoration: "inherit",
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
                      backgroundColor: "rgb(8, 160, 247)",
                      width: "max-content",
                    }}
                  >
                    See Plans
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
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <style
          dangerouslySetInnerHTML={{
            __html: `
html {
  border-width: 0px;
  border-style: solid;
  border-color: rgb(229, 231, 235);
  box-sizing: border-box;
  line-height: 1.5;
  text-size-adjust: 100%;
  tab-size: 4;
  font-family: Poppins, sans-serif;
}

body {
  border-width: 0px;
  border-style: solid;
  border-color: rgb(229, 231, 235);
  box-sizing: border-box;
  margin: 0px;
  line-height: inherit;
  width: 100%;
}
`,
          }}
        />
      </div>
    </>
  );
};

export default SectionSix;
