import React from "react";
import "./section1.css";
import crm_show from "../../../assets/Gif/crm_show.gif";
const SectionOne = () => {
  return (
    <div>
      <div
        className="bg-cover hero-wrapper"
        style={{
          borderWidth: "0px",
          borderStyle: "solid",
          borderColor: "rgb(229, 231, 235)",
          boxSizing: "border-box",
          paddingTop: "300px",
          paddingBottom: "300px",
          marginTop: "-220px",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "cover",
          backgroundImage:
            'url("https://www.onethreadapp.com/assets/hero-bg_1.1fc19dbc.webp")',
        }}
      >
        <div
          className="mx-auto gy-5  !grid !grid-cols-12 gap-2"
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
            className="!col-span-12 lg:!col-span-6"
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
                  color: "rgb(48, 48, 83)",
                }}
              >
                Easiest Tool to Manage{" "}
                <span
                  style={{
                    borderWidth: "0px",
                    borderStyle: "solid",
                    borderColor: "rgb(229, 231, 235)",
                    boxSizing: "border-box",
                    color: "rgb(8, 160, 247)",
                  }}
                >
                  Task
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
                Manage tasks, files & communicate in the simplest way.
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
                  NO CREDIT CARD REQUIRED. |
                  <span
                    className="gdpr-text"
                    style={{
                      borderWidth: "0px",
                      borderStyle: "solid",
                      borderColor: "rgb(229, 231, 235)",
                      boxSizing: "border-box",
                    }}
                  >
                    Fully compliant with GDPR
                  </span>
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
                  className="button button-primary"
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
                    backgroundColor: "rgb(8, 160, 247)",
                  }}
                >
                  Subscribe
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
              <div
                className="content-bottom"
                style={{
                  borderWidth: "0px",
                  borderStyle: "solid",
                  borderColor: "rgb(229, 231, 235)",
                  boxSizing: "border-box",
                  marginTop: "20px",
                }}
              >
                <div
                  className="bottom-buttons"
                  style={{
                    borderWidth: "0px",
                    borderStyle: "solid",
                    borderColor: "rgb(229, 231, 235)",
                    boxSizing: "border-box",
                    gap: "20px",
                    marginTop: "25px",
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                  }}
                >
                  <a
                    className="playstore-button"
                    aria-label="Appstore Link"
                    href="https://apps.apple.com/in/app/onethread/id1645752656"
                    target="_blank"
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
                      className="icon-button"
                      width={186}
                      // src="https://www.onethreadapp.com/assets/app-store.6d8c40b6.png"
                      style={{
                        borderWidth: "0px",
                        borderStyle: "solid",
                        borderColor: "rgb(229, 231, 235)",
                        boxSizing: "border-box",
                        display: "block",
                        verticalAlign: "middle",
                        maxWidth: "100%",
                        borderRadius: "8px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                    />
                  </a>
                  <a
                    className="playstore-button"
                    aria-label="Playstore Link"
                    href="https://play.google.com/store/apps/details?id=app.onethread"
                    target="_blank"
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
                      className="icon-button"
                      src="data:image/webp;base64,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"
                      style={{
                        borderWidth: "0px",
                        borderStyle: "solid",
                        borderColor: "rgb(229, 231, 235)",
                        boxSizing: "border-box",
                        display: "block",
                        verticalAlign: "middle",
                        maxWidth: "100%",
                        borderRadius: "8px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div
            className="!col-span-12 lg:!col-span-6"
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
              className="hero-banner"
              style={{
                borderWidth: "0px",
                borderStyle: "solid",
                borderColor: "rgb(229, 231, 235)",
                boxSizing: "border-box",
              }}
            >
              <img
                alt="Banner"
                src={
                  crm_show
                    ? crm_show
                    : "https://www.onethreadapp.com/assets/hero-banner_1.16d208f6.webp"
                }
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
  );
};

export default SectionOne;
