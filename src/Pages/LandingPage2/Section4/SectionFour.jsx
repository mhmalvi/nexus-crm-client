import React from "react";
import { companyPhotos } from "./Section4Data";

const SectionFour = () => {
  return (
    <>
      <div>
        <div
          className="section-padding clients-wrapper"
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
                marginBottom: "100px",
                color: "rgb(255, 168, 0)",
                fontWeight: 600,
              }}
            >
              Our Clients
            </h2>
            <div
              className="client-brands"
              style={{
                borderWidth: "0px",
                borderStyle: "solid",
                borderColor: "rgb(229, 231, 235)",
                boxSizing: "border-box",
              }}
            >
              <div
                className="flex items-center container-2xl flex-row flex-wrap gap-y-12 justify-center logoContainer"
                style={{
                  borderWidth: "0px",
                  borderStyle: "solid",
                  borderColor: "rgb(229, 231, 235)",
                  boxSizing: "border-box",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  rowGap: "3rem",
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {companyPhotos?.map((item, idx) => {
                  return (
                    <div
                      key={idx}
                      style={{
                        borderWidth: "0px",
                        borderStyle: "solid",
                        borderColor: "rgb(229, 231, 235)",
                        boxSizing: "border-box",
                      }}
                    >
                      <div
                        className="mx-auto logo"
                        style={{
                          borderWidth: "0px",
                          borderStyle: "solid",
                          borderColor: "rgb(229, 231, 235)",
                          boxSizing: "border-box",
                          padding: "0px 20px",
                          height: "100px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginRight: "auto",
                          marginLeft: "auto",
                        }}
                      >
                        <img
                          className="h-[250px] object-contain w-56"
                          src={item?.image}
                          style={{
                            borderWidth: "0px",
                            borderStyle: "solid",
                            borderColor: "rgb(229, 231, 235)",
                            boxSizing: "border-box",
                            display: "block",
                            verticalAlign: "middle",
                            maxWidth: "100%",
                            height: "250px",
                            width: "14rem",
                            objectFit: "contain",
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
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

export default SectionFour;
