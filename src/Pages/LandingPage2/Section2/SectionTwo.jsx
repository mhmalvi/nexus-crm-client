import React, { useEffect, useState } from "react";
import { TabAllData, tabMenuList } from "./Section2Data";
import "./style.css";
const SectionTwo = () => {
  const [currentTabId, setCurrentTabId] = useState(1);
  const [activeTab, setActiveTab] = useState(0);
  const [tabMenu, setTabmenu] = useState([]);
  const [TabData, setTabData] = useState({});

  const handleTab = (id, idx) => {
    setCurrentTabId(id);
    setActiveTab(idx);
  };
  useEffect(() => {
    const data = tabMenuList;
    setTabmenu(data);
  }, []);

  useEffect(() => {
    const data = TabAllData;
    const tabDataDetail = data?.filter(
      (item, idx) => item?.tid === currentTabId
    );
    setTabData(tabDataDetail[0]);
  }, [currentTabId]);

  console.log("tab data list ", tabMenuList, " tab data: ", currentTabId);

  return (
    <>
      <div>
        <div
          className="section-padding features-wrapper"
          style={{
            borderWidth: "0px",
            borderStyle: "solid",
            borderColor: "rgb(229, 231, 235)",
            boxSizing: "border-box",
            position: "relative",
            padding: "80px 0px",
            paddingTop: "80px",
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
                color: "rgb(48, 48, 83)",
                marginBottom: "100px",
              }}
            >
              Single Solution to Boost Your{" "}
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
                Sales and Conversion
              </span>
            </h2>
            <div
              className="MuiTabs-root css-orq8zk"
              style={{
                borderWidth: "0px",
                borderStyle: "solid",
                borderColor: "rgb(229, 231, 235)",
                boxSizing: "border-box",
                overflow: "hidden",
                minHeight: "48px",
                display: "flex",
              }}
            >
              <div
                className="MuiTabs-hideScrollbar MuiTabs-scrollableX css-oqr85h"
                style={{
                  borderWidth: "0px",
                  borderStyle: "solid",
                  borderColor: "rgb(229, 231, 235)",
                  boxSizing: "border-box",
                  overflow: "scroll",
                  width: "99px",
                  height: "99px",
                  position: "absolute",
                  top: "-9999px",
                }}
              />
              <div
                className="MuiTabs-hideScrollbar MuiTabs-scrollableX MuiTabs-scroller css-12qnib"
                style={{
                  borderWidth: "0px",
                  borderStyle: "solid",
                  borderColor: "rgb(229, 231, 235)",
                  boxSizing: "border-box",
                  flex: "1 1 auto",
                  whiteSpace: "nowrap",
                  overflow: "auto hidden",
                  position: "relative",
                  display: "inline-block",
                  marginBottom: "0px",
                }}
              >
                <div
                  className="MuiTabs-flexContainer css-k008qs"
                  role="tablist"
                  style={{
                    borderWidth: "0px",
                    borderStyle: "solid",
                    borderColor: "rgb(229, 231, 235)",
                    boxSizing: "border-box",
                    display: "flex",
                  }}
                >
                  {tabMenu?.map((tab, idx) => {
                    return (
                      <button
                        onClick={() => {
                          handleTab(tab?.id, idx);
                        }}
                        key={idx}
                        id="mui-p-17322-T-1"
                        className={`MuiButtonBase-root MuiTab-labelIcon MuiTab-root MuiTab-textColorPrimary css-1tnnsql Mui-selected ${
                          activeTab === idx ? "crm-tab-button" : ""
                        }`}
                        type="button"
                        role="tab"
                        tabIndex={activeTab === idx ? "0" : "-1"}
                        style={{
                          borderWidth: "0px",
                          borderStyle: "solid",
                          borderColor: "rgb(229, 231, 235)",
                          backgroundImage: "none",
                          outline: "0px",
                          border: "0px",
                          margin: "0px",
                          borderRadius: "0px",
                          textDecoration: "none",
                          padding: "9px 16px",
                          overflow: "hidden",
                          whiteSpace: "normal",
                          display: "inline-flex",
                          WebkitBoxAlign: "center",
                          alignItems: "center",
                          WebkitBoxPack: "center",
                          justifyContent: "center",
                          boxSizing: "border-box",
                          WebkitTapHighlightColor: "transparent",
                          backgroundColor: "transparent",
                          cursor: "pointer",
                          userSelect: "none",
                          verticalAlign: "middle",
                          appearance: "none",
                          fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                          fontWeight: 500,
                          fontSize: "0.875rem",
                          lineHeight: 1.25,
                          letterSpacing: "0.02857em",
                          textTransform: "uppercase",
                          maxWidth: "360px",
                          minWidth: "90px",
                          position: "relative",
                          minHeight: "72px",
                          flexShrink: 0,
                          textAlign: "center",
                          flexDirection: "column",
                          color: "rgb(25, 118, 210)",
                        }}
                      >
                        <img
                          className="MuiTab-iconWrapper"
                          src={tab?.icon}
                          style={{
                            borderWidth: "0px",
                            borderStyle: "solid",
                            borderColor: "rgb(229, 231, 235)",
                            boxSizing: "border-box",
                            display: "block",
                            verticalAlign: "middle",
                            maxWidth: "100%",
                            padding: "0px",
                            width: "2.5rem",
                            height: "2.5rem",
                            marginBottom: "0.5rem",
                            marginTop: "0.7rem",
                          }}
                        />
                        {tab?.name}
                        <span
                          className="MuiTouchRipple-root css-w0pj6f"
                          style={{
                            borderWidth: "0px",
                            borderStyle: "solid",
                            borderColor: "rgb(229, 231, 235)",
                            boxSizing: "border-box",
                            overflow: "hidden",
                            inset: "0px",
                            borderRadius: "inherit",
                            pointerEvents: "none",
                            position: "absolute",
                            zIndex: 0,
                          }}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            <div
              id="mui-p-17322-P-1"
              className="MuiTabPanel-root css-19kzrtu"
              aria-labelledby="mui-p-17322-T-1"
              role="tabpanel"
              style={{
                borderWidth: "0px",
                borderStyle: "solid",
                borderColor: "rgb(229, 231, 235)",
                boxSizing: "border-box",
                padding: "24px",
              }}
            >
              {TabData && (
                <div
                  className="!grid !grid-cols-12 gap-2"
                  style={{
                    borderWidth: "0px",
                    borderStyle: "solid",
                    borderColor: "rgb(229, 231, 235)",
                    boxSizing: "border-box",
                    display: "flex",
                    flexWrap: "wrap",
                    marginTop: "calc(-1*0)",
                    marginRight: "calc(-.5*1.5rem)",
                    marginLeft: "calc(-.5*1.5rem)",
                  }}
                >
                  <div
                    className="!col-span-12 md:!col-span-8"
                    style={{
                      borderWidth: "0px",
                      borderStyle: "solid",
                      borderColor: "rgb(229, 231, 235)",
                      boxSizing: "border-box",
                      maxWidth: "100%",
                      paddingRight: "calc(1.5rem*.5)",
                      paddingLeft: "calc(1.5rem*.5)",
                      marginTop: "0",
                      flex: "0 0 auto",
                      flexShrink: 0,
                      width: "100%",
                    }}
                  >
                    <div
                      className="features-img"
                      style={{
                        borderWidth: "0px",
                        borderStyle: "solid",
                        borderColor: "rgb(229, 231, 235)",
                        boxSizing: "border-box",
                      }}
                    >
                      <img
                        alt="colaboration"
                        src={TabData?.image}
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
                  <div
                    className="!col-span-12 md:!col-span-4"
                    style={{
                      borderWidth: "0px",
                      borderStyle: "solid",
                      borderColor: "rgb(229, 231, 235)",
                      boxSizing: "border-box",
                      maxWidth: "100%",
                      paddingRight: "calc(1.5rem*.5)",
                      paddingLeft: "calc(1.5rem*.5)",
                      marginTop: "0",
                      flex: "0 0 auto",
                      flexShrink: 0,
                      width: "100%",
                    }}
                  >
                    <div
                      className="features-content"
                      style={{
                        borderWidth: "0px",
                        borderStyle: "solid",
                        borderColor: "rgb(229, 231, 235)",
                        boxSizing: "border-box",
                        height: "100%",
                        position: "relative",
                        width: "100%",
                      }}
                    >
                      <h3
                        style={{
                          borderWidth: "0px",
                          borderStyle: "solid",
                          borderColor: "rgb(229, 231, 235)",
                          boxSizing: "border-box",
                          margin: "0px",
                          fontSize: "24px",
                          fontWeight: 700,
                          lineHeight: "32px",
                          color: "rgb(48, 48, 83)",
                          marginBottom: "20px",
                          marginTop: "20px",
                          width: "100%",
                        }}
                        className="break-words"
                      >
                        <span
                          className="icon"
                          style={{
                            borderWidth: "0px",
                            borderStyle: "solid",
                            borderColor: "rgb(229, 231, 235)",
                            boxSizing: "border-box",
                          }}
                        />
                        {TabData?.title}
                      </h3>
                      <ul
                        className="features-items"
                        style={{
                          borderWidth: "0px",
                          borderStyle: "solid",
                          borderColor: "rgb(229, 231, 235)",
                          boxSizing: "border-box",
                          margin: "0px",
                          padding: "0px",
                          listStyle: "none",
                        }}
                      >
                        <li
                          style={{
                            borderWidth: "0px",
                            borderStyle: "solid",
                            borderColor: "rgb(229, 231, 235)",
                            boxSizing: "border-box",
                            fontSize: "18px",
                            lineHeight: "24px",
                            color: "rgb(48, 48, 83)",
                          }}
                        >
                          {TabData?.desc}
                        </li>
                      </ul>
                      <div
                        style={{
                          borderWidth: "0px",
                          borderStyle: "solid",
                          borderColor: "rgb(229, 231, 235)",
                          boxSizing: "border-box",
                          marginTop: "20px",
                          width: "40%",
                        }}
                      >
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
                          }}
                        >
                          Next
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
              )}
            </div>
            <div
              id="mui-p-17322-P-2"
              className="MuiTabPanel-root css-19kzrtu"
              aria-labelledby="mui-p-17322-T-2"
              hidden
              role="tabpanel"
              style={{
                borderWidth: "0px",
                borderStyle: "solid",
                borderColor: "rgb(229, 231, 235)",
                boxSizing: "border-box",
                padding: "24px",
              }}
            />
            <div
              id="mui-p-17322-P-3"
              className="MuiTabPanel-root css-19kzrtu"
              aria-labelledby="mui-p-17322-T-3"
              hidden
              role="tabpanel"
              style={{
                borderWidth: "0px",
                borderStyle: "solid",
                borderColor: "rgb(229, 231, 235)",
                boxSizing: "border-box",
                padding: "24px",
              }}
            />
            <div
              id="mui-p-17322-P-4"
              className="MuiTabPanel-root css-19kzrtu"
              aria-labelledby="mui-p-17322-T-4"
              hidden
              role="tabpanel"
              style={{
                borderWidth: "0px",
                borderStyle: "solid",
                borderColor: "rgb(229, 231, 235)",
                boxSizing: "border-box",
                padding: "24px",
              }}
            />
            <div
              id="mui-p-17322-P-5"
              className="MuiTabPanel-root css-19kzrtu"
              aria-labelledby="mui-p-17322-T-5"
              hidden
              role="tabpanel"
              style={{
                borderWidth: "0px",
                borderStyle: "solid",
                borderColor: "rgb(229, 231, 235)",
                boxSizing: "border-box",
                padding: "24px",
              }}
            />
          </div>
          <div
            className="illustraton"
            style={{
              borderWidth: "0px",
              borderStyle: "solid",
              borderColor: "rgb(229, 231, 235)",
              boxSizing: "border-box",
              position: "absolute",
              right: "0px",
              top: "40%",
              zIndex: -1,
            }}
          >
            <img
              src="data:image/webp;base64,UklGRpoBAABXRUJQVlA4II4BAABQLQCdASqsAcsBPpFIoU0lpCMiIAgAsBIJaW7hd2EbQAnsA99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfWAAD+/9umAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=="
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

export default SectionTwo;
