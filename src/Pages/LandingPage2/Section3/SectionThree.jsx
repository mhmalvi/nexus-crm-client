import React from "react";
import crm_show from "../../../assets/newimages/phones.png";
import backgroundphoto from "../../../assets/BackgroundPhotos/Background-02.png";
const SectionThree = () => {
  return (
    <>
      <div>
        <div
          className="section-padding bg-cover mobile-app-wrapper"
          style={{
            borderWidth: "0px",
            borderStyle: "solid",
            borderColor: "rgb(229, 231, 235)",
            boxSizing: "border-box",
            // padding: "80px 0px",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundSize: "cover",
            backgroundImage: `url(${backgroundphoto})`,
            // 'url("https://www.onethreadapp.com/assets/mobile-app-bg_1.fe801c33.webp")',
            paddingTop: "0px",
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
                color: "#a115ff",
                marginBottom: "0px",
              }}
            >
              Instant Reports at{" "}
              <span
                style={{
                  borderWidth: "0px",
                  borderStyle: "solid",
                  borderColor: "rgb(229, 231, 235)",
                  boxSizing: "border-box",
                  fontWeight: 600,
                  color: "#e964ff",
                }}
              >
                Your Fingertips.
              </span>
            </h2>
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
              <div
                className="!col-span-12 md:!col-span-6"
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
                  className="app-content"
                  style={{
                    borderWidth: "0px",
                    borderStyle: "solid",
                    borderColor: "rgb(229, 231, 235)",
                    boxSizing: "border-box",
                    marginTop: "110px",
                  }}
                >
                  <p
                    className="body-text"
                    style={{
                      borderWidth: "0px",
                      borderStyle: "solid",
                      borderColor: "rgb(229, 231, 235)",
                      boxSizing: "border-box",
                      margin: "0px",
                      fontSize: "20px",
                      fontWeight: 400,
                      lineHeight: "27px",
                      color: "rgb(48, 48, 83)",
                      marginBottom: "10px",
                    }}
                  >
                    Effortlessly Access Managerial Reports and Save Time.
                  </p>
                  <h3
                    style={{
                      borderWidth: "0px",
                      borderStyle: "solid",
                      borderColor: "rgb(229, 231, 235)",
                      boxSizing: "border-box",
                      margin: "0px",
                      fontSize: "25px",
                      lineHeight: "54px",
                      fontWeight: 600,
                      color: "rgb(8, 160, 247)",
                      marginBottom: "40px",
                    }}
                  >
                    Get Sales & Revenue Summary, Lead Conversion Rate, Campaigns
                    Details, Campaigns Revenue, Lead Quality Ratio, Lead
                    Summary, Individual SalesPerson Reports and many more
                    without any effort
                  </h3>
                </div>
              </div>
              <div
                className="!col-span-12 md:!col-span-6"
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
                  className="app-img"
                  style={{
                    borderWidth: "0px",
                    borderStyle: "solid",
                    borderColor: "rgb(229, 231, 235)",
                    boxSizing: "border-box",
                  }}
                >
                  <img
                    alt="CRM_SHOW"
                    // src={
                    //   crm_show
                    //     ? crm_show
                    //     : "https://www.onethreadapp.com/assets/mobile-app-img_1.3a10e8c9.webp"
                    // }
                    src={crm_show}
                    style={{
                      borderWidth: "0px",
                      borderStyle: "solid",
                      borderColor: "rgb(229, 231, 235)",
                      boxSizing: "border-box",
                      display: "block",
                      verticalAlign: "middle",
                      width: "100%",
                      maxWidth: "100%",
                      height: "100%",
                    }}
                  />
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

export default SectionThree;
