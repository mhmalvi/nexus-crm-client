/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import "./nav.css";
import { useNavigate } from "react-router-dom";

const qqCrmLogo = require("../../../assets/Icons/qq_logo_july.jpeg");

const Nav = () => {
  const [isMenuFixed, setIsMenuFixed] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Define the scroll position where you want the menu to become fixed
      const scrollThreshold = 47; // Adjust this value based on your needs
      setIsMenuFixed(scrollY > scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <div>
        <div
          className={`crm-menu astro-W2BEH2IL container shadow-[0px_0px_25px_-10px_rgba(0,0,0,0.8)] ${
            isMenuFixed ? "crm-fixed" : ""
          }`}
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
            maxWidth: "100%",
          }}
        >
          <nav
            className="astro-W2BEH2IL navbar-wrapper"
            style={{
              borderWidth: "0px",
              borderStyle: "solid",
              borderColor: "rgb(229, 231, 235)",
              boxSizing: "border-box",
              padding: "1px 10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              className="astro-W2BEH2IL logo-wrapper"
              style={{
                borderWidth: "0px",
                borderStyle: "solid",
                borderColor: "rgb(229, 231, 235)",
                boxSizing: "border-box",
              }}
            >
              <a
                className="astro-W2BEH2IL"
                href="/"
                style={{
                  borderWidth: "0px",
                  borderStyle: "solid",
                  borderColor: "rgb(229, 231, 235)",
                  boxSizing: "border-box",
                  textDecoration: "inherit",
                  color: "inherit",
                }}
              >
                <img
                  className="astro-W2BEH2IL w-[200px]"
                  alt="Openthread"
                  src={qqCrmLogo || ""}
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
              </a>
            </div>
            <ul
              className="astro-W2BEH2IL navbar-items"
              style={{
                borderWidth: "0px",
                borderStyle: "solid",
                borderColor: "rgb(229, 231, 235)",
                boxSizing: "border-box",
                margin: "0px",
                padding: "0px",
                listStyle: "none",
                display: "flex",
                height: "100%",
              }}
            >
              <a
                className="astro-W2BEH2IL"
                href="/"
                target="_blank"
                style={{
                  borderWidth: "0px",
                  borderStyle: "solid",
                  borderColor: "rgb(229, 231, 235)",
                  boxSizing: "border-box",
                  textDecoration: "inherit",
                  fontSize: "16px",
                  color: "rgb(48, 48, 83)",
                  marginRight: "30px",
                }}
              >
                <button
                  className="button button-primary !bg-[#159afb]"
                  type="button"
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
                  <div
                    className="astro-W2BEH2IL pointer"
                    style={{
                      borderWidth: "0px",
                      borderStyle: "solid",
                      borderColor: "rgb(229, 231, 235)",
                      boxSizing: "border-box",
                      borderRadius: "50%",
                      background: "rgb(255, 255, 255)",
                      animation:
                        "2s ease 0s infinite normal none running pulse",
                      marginRight: "8px",
                      display: "block",
                      width: "15px",
                      height: "15px",
                      cursor: "pointer",
                      boxShadow: "rgb(255, 255, 255) 0px 0px",
                    }}
                  >
                    <span
                      className="astro-W2BEH2IL"
                      style={{
                        borderWidth: "0px",
                        borderStyle: "solid",
                        borderColor: "rgb(229, 231, 235)",
                        boxSizing: "border-box",
                        padding: "5px 0px",
                        color: "rgb(255, 255, 255)",
                        textAlign: "center",
                        display: "block",
                        width: "31px",
                      }}
                    />
                  </div>
                  Live Product Demo
                </button>
              </a>
              <li
                className="astro-W2BEH2IL"
                style={{
                  borderWidth: "0px",
                  borderStyle: "solid",
                  borderColor: "rgb(229, 231, 235)",
                  boxSizing: "border-box",
                  listStyle: "none",
                  padding: "15px 0px",
                  marginRight: "30px",
                }}
              >
                <a
                  className="astro-W2BEH2IL"
                  href="/"
                  style={{
                    borderWidth: "0px",
                    borderStyle: "solid",
                    borderColor: "rgb(229, 231, 235)",
                    boxSizing: "border-box",
                    textDecoration: "inherit",
                    fontSize: "16px",
                    color: "rgb(48, 48, 83)",
                  }}
                >
                  Pricing
                </a>
              </li>
              <li
                className="astro-W2BEH2IL"
                style={{
                  borderWidth: "0px",
                  borderStyle: "solid",
                  borderColor: "rgb(229, 231, 235)",
                  boxSizing: "border-box",
                  listStyle: "none",
                  padding: "15px 0px",
                  marginRight: "30px",
                }}
              >
                <a
                  className="astro-W2BEH2IL"
                  href="/"
                  style={{
                    borderWidth: "0px",
                    borderStyle: "solid",
                    borderColor: "rgb(229, 231, 235)",
                    boxSizing: "border-box",
                    textDecoration: "inherit",
                    fontSize: "16px",
                    color: "rgb(48, 48, 83)",
                  }}
                >
                  Contact Us
                </a>
              </li>
              <li
                className="astro-W2BEH2IL dropdown-wrapper"
                style={{
                  borderWidth: "0px",
                  borderStyle: "solid",
                  borderColor: "rgb(229, 231, 235)",
                  boxSizing: "border-box",
                  position: "relative",
                  height: "100%",
                  listStyle: "none",
                  padding: "15px 0px",
                  marginRight: "30px",
                }}
              >
                <a
                  className="astro-W2BEH2IL"
                  href="/"
                  style={{
                    borderWidth: "0px",
                    borderStyle: "solid",
                    borderColor: "rgb(229, 231, 235)",
                    boxSizing: "border-box",
                    textDecoration: "inherit",
                    fontSize: "16px",
                    color: "rgb(48, 48, 83)",
                  }}
                >
                  Resources
                </a>{" "}
                <span
                  className="astro-W2BEH2IL icon"
                  style={{
                    borderWidth: "0px",
                    borderStyle: "solid",
                    borderColor: "rgb(229, 231, 235)",
                    boxSizing: "border-box",
                    display: "inline-block",
                    marginLeft: "5px",
                    transform: "translateY(2px)",
                    cursor: "pointer",
                  }}
                />
                <ul
                  className="astro-W2BEH2IL dropdown"
                  style={{
                    boxSizing: "border-box",
                    listStyle: "none",
                    borderWidth: "1px 1px 5px",
                    borderStyle: "solid",
                    borderColor:
                      "rgba(82, 182, 255, 0.15) rgba(82, 182, 255, 0.15) rgb(82, 182, 255)",
                    borderImage: "initial",
                    borderRadius: "10px",
                    padding: "10px",
                    transition:
                      "transform 0.25s ease-out 0s, opacity 0.15s ease-out 0.1s",
                    minWidth: "100%",
                    backgroundColor: "rgb(255, 255, 255)",
                    boxShadow: "rgba(82, 182, 255, 0.05) 0px 0px 7px 6px",
                    visibility: "hidden",
                    opacity: 0,
                    display: "flex",
                    justifyContent: "space-around",
                    position: "absolute",
                    transform: "translate(-50%) translateY(0px)",
                    zIndex: 9999,
                    margin: "10px 0px",
                    marginTop: "10px",
                  }}
                >
                  <li
                    className="astro-R5CNXI4O"
                    style={{
                      borderWidth: "0px",
                      borderStyle: "solid",
                      borderColor: "rgb(229, 231, 235)",
                      boxSizing: "border-box",
                      margin: "0px",
                      fontSize: "16px",
                      cursor: "pointer",
                      listStyle: "none",
                      padding: "15px 0px",
                      marginRight: "30px",
                    }}
                  >
                    <a
                      className="astro-R5CNXI4O"
                      href="https://www.onethreadapp.com/public-roadmap"
                      target="_self"
                      style={{
                        borderWidth: "0px",
                        borderStyle: "solid",
                        borderColor: "rgb(229, 231, 235)",
                        boxSizing: "border-box",
                        textDecoration: "inherit",
                        fontSize: "16px",
                        color: "rgb(48, 48, 83)",
                      }}
                    >
                      <div
                        className="astro-R5CNXI4O astro-W2BEH2IL resources roadmap"
                        style={{
                          borderWidth: "0px",
                          borderStyle: "solid",
                          borderColor: "rgb(229, 231, 235)",
                          boxSizing: "border-box",
                          padding: "10px 0px 0px",
                          display: "flex",
                          justifyContent: "flex-start",
                        }}
                      >
                        <h3
                          className="astro-R5CNXI4O icon"
                          style={{
                            borderWidth: "0px",
                            borderStyle: "solid",
                            borderColor: "rgb(229, 231, 235)",
                            boxSizing: "border-box",
                            fontSize: "inherit",
                            fontWeight: "inherit",
                            display: "inline-block",
                            transform: "translateY(2px)",
                            cursor: "pointer",
                            padding: "0px",
                            margin: "0px",
                            marginLeft: "0px",
                            color: "rgb(8, 160, 247)",
                          }}
                        >
                          <svg
                            height="1em"
                            width="1em"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 576 512"
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
                              d="M573.19 402.67l-139.79-320C428.43 71.29 417.6 64 405.68 64h-97.59l2.45 23.16c.5 4.72-3.21 8.84-7.96 8.84h-29.16c-4.75 0-8.46-4.12-7.96-8.84L267.91 64h-97.59c-11.93 0-22.76 7.29-27.73 18.67L2.8 402.67C-6.45 423.86 8.31 448 30.54 448h196.84l10.31-97.68c.86-8.14 7.72-14.32 15.91-14.32h68.8c8.19 0 15.05 6.18 15.91 14.32L348.62 448h196.84c22.23 0 36.99-24.14 27.73-45.33zM260.4 135.16a8 8 0 0 1 7.96-7.16h39.29c4.09 0 7.53 3.09 7.96 7.16l4.6 43.58c.75 7.09-4.81 13.26-11.93 13.26h-40.54c-7.13 0-12.68-6.17-11.93-13.26l4.59-43.58zM315.64 304h-55.29c-9.5 0-16.91-8.23-15.91-17.68l5.07-48c.86-8.14 7.72-14.32 15.91-14.32h45.15c8.19 0 15.05 6.18 15.91 14.32l5.07 48c1 9.45-6.41 17.68-15.91 17.68z"
                              style={{
                                borderWidth: "0px",
                                borderStyle: "solid",
                                borderColor: "rgb(229, 231, 235)",
                                boxSizing: "border-box",
                              }}
                            />
                          </svg>
                        </h3>
                        <div
                          className="astro-R5CNXI4O"
                          style={{
                            borderWidth: "0px",
                            borderStyle: "solid",
                            borderColor: "rgb(229, 231, 235)",
                            boxSizing: "border-box",
                            margin: "0px",
                            padding: "0px",
                            width: "200px",
                          }}
                        >
                          <h3
                            className="astro-R5CNXI4O"
                            style={{
                              borderWidth: "0px",
                              borderStyle: "solid",
                              borderColor: "rgb(229, 231, 235)",
                              boxSizing: "border-box",
                              fontSize: "inherit",
                              fontWeight: "inherit",
                              padding: "0px",
                              margin: "0px",
                            }}
                          >
                            Roadmap
                          </h3>
                          <p
                            className="astro-R5CNXI4O"
                            style={{
                              borderWidth: "0px",
                              borderStyle: "solid",
                              borderColor: "rgb(229, 231, 235)",
                              boxSizing: "border-box",
                              margin: "5px 0px",
                              display: "flex",
                            }}
                          >
                            <small
                              className="astro-R5CNXI4O"
                              style={{
                                borderWidth: "0px",
                                borderStyle: "solid",
                                borderColor: "rgb(229, 231, 235)",
                                boxSizing: "border-box",
                                fontSize: "80%",
                                padding: "0px",
                                margin: "0px",
                                marginLeft: "0px",
                              }}
                            >
                              Get The Most Up-to-date Information
                            </small>
                          </p>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li
                    className="astro-R5CNXI4O"
                    style={{
                      borderWidth: "0px",
                      borderStyle: "solid",
                      borderColor: "rgb(229, 231, 235)",
                      boxSizing: "border-box",
                      margin: "0px",
                      fontSize: "16px",
                      cursor: "pointer",
                      listStyle: "none",
                      padding: "15px 0px",
                      marginRight: "30px",
                    }}
                  >
                    <a
                      className="astro-R5CNXI4O"
                      href="/"
                      target="_blank"
                      style={{
                        borderWidth: "0px",
                        borderStyle: "solid",
                        borderColor: "rgb(229, 231, 235)",
                        boxSizing: "border-box",
                        textDecoration: "inherit",
                        fontSize: "16px",
                        color: "rgb(48, 48, 83)",
                      }}
                    >
                      <div
                        className="astro-R5CNXI4O astro-W2BEH2IL resources blog"
                        style={{
                          borderWidth: "0px",
                          borderStyle: "solid",
                          borderColor: "rgb(229, 231, 235)",
                          boxSizing: "border-box",
                          padding: "10px 0px 0px",
                          display: "flex",
                          justifyContent: "flex-start",
                        }}
                      >
                        <h3
                          className="astro-R5CNXI4O icon"
                          style={{
                            borderWidth: "0px",
                            borderStyle: "solid",
                            borderColor: "rgb(229, 231, 235)",
                            boxSizing: "border-box",
                            fontSize: "inherit",
                            fontWeight: "inherit",
                            display: "inline-block",
                            transform: "translateY(2px)",
                            cursor: "pointer",
                            padding: "0px",
                            margin: "0px",
                            marginLeft: "0px",
                            color: "rgb(152, 64, 221)",
                          }}
                        >
                          <svg
                            height="1em"
                            width="1em"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 1024 1024"
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
                              d="M928 161H699.2c-49.1 0-97.1 14.1-138.4 40.7L512 233l-48.8-31.3A255.2 255.2 0 0 0 324.8 161H96c-17.7 0-32 14.3-32 32v568c0 17.7 14.3 32 32 32h228.8c49.1 0 97.1 14.1 138.4 40.7l44.4 28.6c1.3.8 2.8 1.3 4.3 1.3s3-.4 4.3-1.3l44.4-28.6C602 807.1 650.1 793 699.2 793H928c17.7 0 32-14.3 32-32V193c0-17.7-14.3-32-32-32zM404 553.5c0 4.1-3.2 7.5-7.1 7.5H211.1c-3.9 0-7.1-3.4-7.1-7.5v-45c0-4.1 3.2-7.5 7.1-7.5h185.7c3.9 0 7.1 3.4 7.1 7.5v45zm0-140c0 4.1-3.2 7.5-7.1 7.5H211.1c-3.9 0-7.1-3.4-7.1-7.5v-45c0-4.1 3.2-7.5 7.1-7.5h185.7c3.9 0 7.1 3.4 7.1 7.5v45zm416 140c0 4.1-3.2 7.5-7.1 7.5H627.1c-3.9 0-7.1-3.4-7.1-7.5v-45c0-4.1 3.2-7.5 7.1-7.5h185.7c3.9 0 7.1 3.4 7.1 7.5v45zm0-140c0 4.1-3.2 7.5-7.1 7.5H627.1c-3.9 0-7.1-3.4-7.1-7.5v-45c0-4.1 3.2-7.5 7.1-7.5h185.7c3.9 0 7.1 3.4 7.1 7.5v45z"
                              style={{
                                borderWidth: "0px",
                                borderStyle: "solid",
                                borderColor: "rgb(229, 231, 235)",
                                boxSizing: "border-box",
                              }}
                            />
                          </svg>
                        </h3>
                        <div
                          className="astro-R5CNXI4O"
                          style={{
                            borderWidth: "0px",
                            borderStyle: "solid",
                            borderColor: "rgb(229, 231, 235)",
                            boxSizing: "border-box",
                            margin: "0px",
                            padding: "0px",
                            width: "200px",
                          }}
                        >
                          <h3
                            className="astro-R5CNXI4O"
                            style={{
                              borderWidth: "0px",
                              borderStyle: "solid",
                              borderColor: "rgb(229, 231, 235)",
                              boxSizing: "border-box",
                              fontSize: "inherit",
                              fontWeight: "inherit",
                              padding: "0px",
                              margin: "0px",
                            }}
                          >
                            Blog
                          </h3>
                          <p
                            className="astro-R5CNXI4O"
                            style={{
                              borderWidth: "0px",
                              borderStyle: "solid",
                              borderColor: "rgb(229, 231, 235)",
                              boxSizing: "border-box",
                              margin: "5px 0px",
                              display: "flex",
                            }}
                          >
                            <small
                              className="astro-R5CNXI4O"
                              style={{
                                borderWidth: "0px",
                                borderStyle: "solid",
                                borderColor: "rgb(229, 231, 235)",
                                boxSizing: "border-box",
                                fontSize: "80%",
                                padding: "0px",
                                margin: "0px",
                                marginLeft: "0px",
                              }}
                            >
                              Read how to manage project in easiest way
                            </small>
                          </p>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li
                    className="astro-R5CNXI4O"
                    style={{
                      borderWidth: "0px",
                      borderStyle: "solid",
                      borderColor: "rgb(229, 231, 235)",
                      boxSizing: "border-box",
                      margin: "0px",
                      fontSize: "16px",
                      cursor: "pointer",
                      listStyle: "none",
                      padding: "15px 0px",
                      marginRight: "30px",
                    }}
                  >
                    <a
                      className="astro-R5CNXI4O"
                      href="https://docs.onethreadapp.com/"
                      target="_blank"
                      style={{
                        borderWidth: "0px",
                        borderStyle: "solid",
                        borderColor: "rgb(229, 231, 235)",
                        boxSizing: "border-box",
                        textDecoration: "inherit",
                        fontSize: "16px",
                        color: "rgb(48, 48, 83)",
                      }}
                    >
                      <div
                        className="astro-R5CNXI4O astro-W2BEH2IL resources guide user"
                        style={{
                          borderWidth: "0px",
                          borderStyle: "solid",
                          borderColor: "rgb(229, 231, 235)",
                          boxSizing: "border-box",
                          padding: "10px 0px 0px",
                          display: "flex",
                          justifyContent: "flex-start",
                        }}
                      >
                        <h3
                          className="astro-R5CNXI4O icon"
                          style={{
                            borderWidth: "0px",
                            borderStyle: "solid",
                            borderColor: "rgb(229, 231, 235)",
                            boxSizing: "border-box",
                            fontSize: "inherit",
                            fontWeight: "inherit",
                            display: "inline-block",
                            transform: "translateY(2px)",
                            cursor: "pointer",
                            padding: "0px",
                            margin: "0px",
                            marginLeft: "0px",
                          }}
                        >
                          <svg
                            height="1em"
                            width="1em"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 416 512"
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
                              d="M272 96c26.51 0 48-21.49 48-48S298.51 0 272 0s-48 21.49-48 48 21.49 48 48 48zM113.69 317.47l-14.8 34.52H32c-17.67 0-32 14.33-32 32s14.33 32 32 32h77.45c19.25 0 36.58-11.44 44.11-29.09l8.79-20.52-10.67-6.3c-17.32-10.23-30.06-25.37-37.99-42.61zM384 223.99h-44.03l-26.06-53.25c-12.5-25.55-35.45-44.23-61.78-50.94l-71.08-21.14c-28.3-6.8-57.77-.55-80.84 17.14l-39.67 30.41c-14.03 10.75-16.69 30.83-5.92 44.86s30.84 16.66 44.86 5.92l39.69-30.41c7.67-5.89 17.44-8 25.27-6.14l14.7 4.37-37.46 87.39c-12.62 29.48-1.31 64.01 26.3 80.31l84.98 50.17-27.47 87.73c-5.28 16.86 4.11 34.81 20.97 40.09 3.19 1 6.41 1.48 9.58 1.48 13.61 0 26.23-8.77 30.52-22.45l31.64-101.06c5.91-20.77-2.89-43.08-21.64-54.39l-61.24-36.14 31.31-78.28 20.27 41.43c8 16.34 24.92 26.89 43.11 26.89H384c17.67 0 32-14.33 32-32s-14.33-31.99-32-31.99z"
                              style={{
                                borderWidth: "0px",
                                borderStyle: "solid",
                                borderColor: "rgb(229, 231, 235)",
                                boxSizing: "border-box",
                              }}
                            />
                          </svg>
                        </h3>
                        <div
                          className="astro-R5CNXI4O"
                          style={{
                            borderWidth: "0px",
                            borderStyle: "solid",
                            borderColor: "rgb(229, 231, 235)",
                            boxSizing: "border-box",
                            margin: "0px",
                            padding: "0px",
                            width: "200px",
                          }}
                        >
                          <h3
                            className="astro-R5CNXI4O"
                            style={{
                              borderWidth: "0px",
                              borderStyle: "solid",
                              borderColor: "rgb(229, 231, 235)",
                              boxSizing: "border-box",
                              fontSize: "inherit",
                              fontWeight: "inherit",
                              padding: "0px",
                              margin: "0px",
                            }}
                          >
                            Onboarding
                          </h3>
                          <p
                            className="astro-R5CNXI4O"
                            style={{
                              borderWidth: "0px",
                              borderStyle: "solid",
                              borderColor: "rgb(229, 231, 235)",
                              boxSizing: "border-box",
                              margin: "5px 0px",
                              display: "flex",
                            }}
                          >
                            <small
                              className="astro-R5CNXI4O"
                              style={{
                                borderWidth: "0px",
                                borderStyle: "solid",
                                borderColor: "rgb(229, 231, 235)",
                                boxSizing: "border-box",
                                fontSize: "80%",
                                padding: "0px",
                                margin: "0px",
                                marginLeft: "0px",
                              }}
                            >
                              All the tools you need to get started in Onethread
                            </small>
                          </p>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li
                    className="astro-R5CNXI4O"
                    style={{
                      borderWidth: "0px",
                      borderStyle: "solid",
                      borderColor: "rgb(229, 231, 235)",
                      boxSizing: "border-box",
                      margin: "0px",
                      fontSize: "16px",
                      cursor: "pointer",
                      listStyle: "none",
                      padding: "15px 0px",
                      marginRight: "30px",
                    }}
                  >
                    <a
                      className="astro-R5CNXI4O"
                      href="https://www.youtube.com/channel/UCuZZreI7e9VFYS1svTww6GA/videos"
                      target="_blank"
                      style={{
                        borderWidth: "0px",
                        borderStyle: "solid",
                        borderColor: "rgb(229, 231, 235)",
                        boxSizing: "border-box",
                        textDecoration: "inherit",
                        fontSize: "16px",
                        color: "rgb(48, 48, 83)",
                      }}
                    >
                      <div
                        className="astro-R5CNXI4O astro-W2BEH2IL resources videos"
                        style={{
                          borderWidth: "0px",
                          borderStyle: "solid",
                          borderColor: "rgb(229, 231, 235)",
                          boxSizing: "border-box",
                          padding: "10px 0px 0px",
                          display: "flex",
                          justifyContent: "flex-start",
                        }}
                      >
                        <h3
                          className="astro-R5CNXI4O icon"
                          style={{
                            borderWidth: "0px",
                            borderStyle: "solid",
                            borderColor: "rgb(229, 231, 235)",
                            boxSizing: "border-box",
                            fontSize: "inherit",
                            fontWeight: "inherit",
                            display: "inline-block",
                            transform: "translateY(2px)",
                            cursor: "pointer",
                            padding: "0px",
                            margin: "0px",
                            marginLeft: "0px",
                            color: "rgb(46, 182, 125)",
                          }}
                        >
                          <svg
                            height="1em"
                            width="1em"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 576 512"
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
                              d="M336.2 64H47.8C21.4 64 0 85.4 0 111.8v288.4C0 426.6 21.4 448 47.8 448h288.4c26.4 0 47.8-21.4 47.8-47.8V111.8c0-26.4-21.4-47.8-47.8-47.8zm189.4 37.7L416 177.3v157.4l109.6 75.5c21.2 14.6 50.4-.3 50.4-25.8V127.5c0-25.4-29.1-40.4-50.4-25.8z"
                              style={{
                                borderWidth: "0px",
                                borderStyle: "solid",
                                borderColor: "rgb(229, 231, 235)",
                                boxSizing: "border-box",
                              }}
                            />
                          </svg>
                        </h3>
                        <div
                          className="astro-R5CNXI4O"
                          style={{
                            borderWidth: "0px",
                            borderStyle: "solid",
                            borderColor: "rgb(229, 231, 235)",
                            boxSizing: "border-box",
                            margin: "0px",
                            padding: "0px",
                            width: "200px",
                          }}
                        >
                          <h3
                            className="astro-R5CNXI4O"
                            style={{
                              borderWidth: "0px",
                              borderStyle: "solid",
                              borderColor: "rgb(229, 231, 235)",
                              boxSizing: "border-box",
                              fontSize: "inherit",
                              fontWeight: "inherit",
                              padding: "0px",
                              margin: "0px",
                            }}
                          >
                            Videos
                          </h3>
                          <p
                            className="astro-R5CNXI4O"
                            style={{
                              borderWidth: "0px",
                              borderStyle: "solid",
                              borderColor: "rgb(229, 231, 235)",
                              boxSizing: "border-box",
                              margin: "5px 0px",
                              display: "flex",
                            }}
                          >
                            <small
                              className="astro-R5CNXI4O"
                              style={{
                                borderWidth: "0px",
                                borderStyle: "solid",
                                borderColor: "rgb(229, 231, 235)",
                                boxSizing: "border-box",
                                fontSize: "80%",
                                padding: "0px",
                                margin: "0px",
                                marginLeft: "0px",
                              }}
                            >
                              Watch quick videos to learn the basic of Queleads
                            </small>
                          </p>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li
                    className="astro-R5CNXI4O"
                    style={{
                      borderWidth: "0px",
                      borderStyle: "solid",
                      borderColor: "rgb(229, 231, 235)",
                      boxSizing: "border-box",
                      margin: "0px",
                      fontSize: "16px",
                      cursor: "pointer",
                      listStyle: "none",
                      padding: "15px 0px",
                    }}
                  >
                    <a
                      className="astro-R5CNXI4O"
                      href="/"
                      target="_blank"
                      style={{
                        borderWidth: "0px",
                        borderStyle: "solid",
                        borderColor: "rgb(229, 231, 235)",
                        boxSizing: "border-box",
                        textDecoration: "inherit",
                        fontSize: "16px",
                        color: "rgb(48, 48, 83)",
                      }}
                    >
                      <div
                        className="astro-R5CNXI4O astro-W2BEH2IL resources developers-guidelines"
                        style={{
                          borderWidth: "0px",
                          borderStyle: "solid",
                          borderColor: "rgb(229, 231, 235)",
                          boxSizing: "border-box",
                          padding: "10px 0px 0px",
                          display: "flex",
                          justifyContent: "flex-start",
                        }}
                      >
                        <h3
                          className="astro-R5CNXI4O icon"
                          style={{
                            borderWidth: "0px",
                            borderStyle: "solid",
                            borderColor: "rgb(229, 231, 235)",
                            boxSizing: "border-box",
                            fontSize: "inherit",
                            fontWeight: "inherit",
                            display: "inline-block",
                            transform: "translateY(2px)",
                            cursor: "pointer",
                            padding: "0px",
                            margin: "0px",
                            marginLeft: "0px",
                            color: "rgb(255, 168, 0)",
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
                              d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294l4-13zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0zm6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0z"
                              style={{
                                borderWidth: "0px",
                                borderStyle: "solid",
                                borderColor: "rgb(229, 231, 235)",
                                boxSizing: "border-box",
                              }}
                            />
                          </svg>
                        </h3>
                        <div
                          className="astro-R5CNXI4O"
                          style={{
                            borderWidth: "0px",
                            borderStyle: "solid",
                            borderColor: "rgb(229, 231, 235)",
                            boxSizing: "border-box",
                            margin: "0px",
                            padding: "0px",
                            width: "200px",
                          }}
                        >
                          <h3
                            className="astro-R5CNXI4O"
                            style={{
                              borderWidth: "0px",
                              borderStyle: "solid",
                              borderColor: "rgb(229, 231, 235)",
                              boxSizing: "border-box",
                              fontSize: "inherit",
                              fontWeight: "inherit",
                              padding: "0px",
                              margin: "0px",
                            }}
                          >
                            Developers Guideline
                          </h3>
                          <p
                            className="astro-R5CNXI4O"
                            style={{
                              borderWidth: "0px",
                              borderStyle: "solid",
                              borderColor: "rgb(229, 231, 235)",
                              boxSizing: "border-box",
                              margin: "5px 0px",
                              display: "flex",
                            }}
                          >
                            <small
                              className="astro-R5CNXI4O"
                              style={{
                                borderWidth: "0px",
                                borderStyle: "solid",
                                borderColor: "rgb(229, 231, 235)",
                                boxSizing: "border-box",
                                fontSize: "80%",
                                padding: "0px",
                                margin: "0px",
                                marginLeft: "0px",
                              }}
                            >
                              Learn and build your app with Queleds
                            </small>
                          </p>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </li>
              <li
                className="astro-W2BEH2IL"
                style={{
                  borderWidth: "0px",
                  borderStyle: "solid",
                  borderColor: "rgb(229, 231, 235)",
                  boxSizing: "border-box",
                  listStyle: "none",
                  padding: "15px 0px",
                }}
              >
                <a
                  className="astro-W2BEH2IL"
                  href="/"
                  style={{
                    borderWidth: "0px",
                    borderStyle: "solid",
                    borderColor: "rgb(229, 231, 235)",
                    boxSizing: "border-box",
                    textDecoration: "inherit",
                    fontSize: "16px",
                    color: "rgb(48, 48, 83)",
                  }}
                >
                  Book a Demo
                </a>
              </li>
            </ul>
            <div
              className="astro-W2BEH2IL gap-2 navbar-buttons"
              style={{
                borderWidth: "0px",
                borderStyle: "solid",
                borderColor: "rgb(229, 231, 235)",
                boxSizing: "border-box",
                gap: "0.5rem",
                display: "flex",
                alignItems: "center",
              }}
            >
              <a
                className="astro-W2BEH2IL"
                href="/"
                style={{
                  borderWidth: "0px",
                  borderStyle: "solid",
                  borderColor: "rgb(229, 231, 235)",
                  boxSizing: "border-box",
                  textDecoration: "inherit",
                  color: "inherit",
                }}
              >
                <button
                  className="button button-primary !bg-[#159afb]"
                  type="button"
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
                    fontSize: "18px",
                    fontWeight: 600,
                    padding: "10px 20px",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    color: "rgb(255, 255, 255)",
                    justifyContent: "center",

                    border: "0px",
                    cursor: "pointer",
                  }}
                >
                  Free forever
                </button>{" "}
              </a>
              <a
                className="astro-W2BEH2IL"
                onClick={() => navigate("/register")}
                style={{
                  borderWidth: "0px",
                  borderStyle: "solid",
                  borderColor: "rgb(229, 231, 235)",
                  boxSizing: "border-box",
                  textDecoration: "inherit",
                  color: "inherit",
                }}
              >
                <button
                  className="button button-primary button-inverted"
                  type="button"
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
                    fontSize: "18px",
                    fontWeight: 600,
                    padding: "10px 20px",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgb(8, 160, 247)",
                    cursor: "pointer",
                    border: "1px solid rgb(8, 160, 247)",
                    backgroundColor: "transparent",
                  }}
                >
                  Register
                </button>
              </a>
              <a
                className="astro-W2BEH2IL"
                onClick={() => navigate("/login")}
                style={{
                  borderWidth: "0px",
                  borderStyle: "solid",
                  borderColor: "rgb(229, 231, 235)",
                  boxSizing: "border-box",
                  textDecoration: "inherit",
                  color: "inherit",
                }}
              >
                <button
                  className="button button-primary button-inverted"
                  type="button"
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
                    fontSize: "18px",
                    fontWeight: 600,
                    padding: "10px 20px",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgb(8, 160, 247)",
                    cursor: "pointer",
                    border: "1px solid rgb(8, 160, 247)",
                    backgroundColor: "transparent",
                  }}
                >
                  Login
                </button>
              </a>
            </div>
          </nav>
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

export default Nav;
