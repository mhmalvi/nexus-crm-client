/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import "./nav.css";
import { useNavigate } from "react-router-dom";
import { Drawer } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const qqCrmLogo = require("../../../assets/Icons/qq_logo_july.jpeg");

const ResNav = () => {
  const [isMenuFixed, setIsMenuFixed] = useState(false);
  const [Draweropen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const showDrawer = () => {
    setDrawerOpen(!Draweropen);
  };

  const onClose = () => {
    setDrawerOpen(false);
  };
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Define the scroll position where you want the menu to become fixed
      const scrollThreshold = 45; // Adjust this value based on your needs
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
            maxWidth: "1400px",
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
                    height: "8vh",
                  }}
                />
              </a>
            </div>

            <div
              className="astro-W2BEH2IL gap-2 navbar-buttons cursor-pointer"
              onClick={showDrawer}
              style={{
                borderWidth: "0px",
                borderStyle: "solid",
                borderColor: "rgb(229, 231, 235)",
                boxSizing: "border-box",
              }}
            >
              <div className="h-[2px] w-[30px] bg-[#08A0F7]"></div>
              <div className="h-[2px] w-[30px] bg-[#08A0F7] my-[6px]"></div>
              <div className="h-[2px] w-[30px] bg-[#08A0F7]"></div>
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
      <Drawer
        className=" !z-[100001]"
        headerStyle={{ display: "none" }}
        title={null}
        closeIcon={true}
        placement="left"
        onClose={onClose}
        open={Draweropen}
        visible={Draweropen}
        width={"100%"}
      >
        <div>
          <div className="flex justify-between items-center p-2">
            <div className="w-[50%]">
              <img
                className="w-full h-full"
                src={qqCrmLogo}
                alt="QueledsLogo"
              />
            </div>
            <div>
              <CloseOutlined onClick={onClose} />
            </div>
          </div>
          <div>
            <ul>
              <li>
                <a
                  className="astro-W2BEH2IL w-full mt-10"
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
                    className="button button-primary w-full !bg-[#159afb]"
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
              </li>
            </ul>
            <ul>
              <li className=" cursor-pointer">Pricing</li>
            </ul>
            <ul>
              <li className=" cursor-pointer">Contact Us</li>
            </ul>
            <ul>
              <li className=" cursor-pointer">Resources</li>
            </ul>
            <ul>
              <li className=" cursor-pointer">Book a Demo</li>
            </ul>
          </div>
          <div
            className="astro-W2BEH2IL gap-2 navbar-buttons flex flex-col gap-2 justify-center items-center mt-10"
            style={{
              borderWidth: "0px",
              borderStyle: "solid",
              borderColor: "rgb(229, 231, 235)",
              boxSizing: "border-box",
            }}
          >
            <a
              className="astro-W2BEH2IL w-full"
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
                className="button button-primary w-full !bg-[#159afb]"
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
              className="astro-W2BEH2IL w-full"
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
                className="button button-primary button-inverted w-full hover:!bg-[#08A0F7] hover:!text-white"
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
              className="astro-W2BEH2IL w-full"
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
                className="button button-primary button-inverted w-full hover:!bg-[#08A0F7] hover:!text-white"
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
        </div>
      </Drawer>
    </>
  );
};

export default ResNav;
