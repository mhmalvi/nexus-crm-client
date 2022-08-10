import React from "react";
import QQLogo from "../../assets/Images/QQ.png";
import Icons from "./Icons";

const Sidebar = ({ active, setActive, Items, Items2 }) => {
  // const [active, setActive] = useState();

  return (
    <div
      className="bg-white"
      style={{
        width: "277px",
      }}
    >
      <div className="ml-10">
        <div className="pb-4 pt-12">
          <img src={QQLogo} alt="" />
        </div>
        <div className="border-r pt-8 pb-4">
          <div>
            {Items.map((item) => (
              <div
                key={item.key}
                className="flex items-center text-base cursor-pointer my-5 py-0.5"
                style={{
                  color: `${active === item.name ? "#7037FF" : "#7C8DB5"}`,
                }}
                onClick={() => setActive(item.name)}
              >
                {item.icon}
                <span className="ml-4 leading-6 font-medium font-poppins">
                  {item.label}
                </span>
                {item.count > 0 && (
                  <div className="flex justify-center items-center">
                    <div
                      className="w-5 py-0.5 text-center ml-15.5 rounded-full text-white text-xs font-poppins"
                      style={{
                        background: "#FF3B30",
                      }}
                    >
                      {item.count}
                    </div>
                  </div>
                )}
                {active === item.name && (
                  <div className="ml-auto active-option">|</div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-36 pt-1.5">
            {Items2.map((item) => (
              <div
                key={item.key}
                className="flex items-center text-base cursor-pointer my-5 py-0.5"
                style={{
                  color: `${active === item.name ? "#7037FF" : "#7C8DB5"}`,
                }}
                onClick={() => setActive(item.name)}
              >
                {item.icon}
                <span className="ml-4 leading-6 font-medium font-poppins">
                  {item.label}
                </span>
                {active === item.name && (
                  <div className="ml-auto active-option">|</div>
                )}
              </div>
            ))}

            <div
              className="flex items-center text-base cursor-pointer my-4 py-1.5"
              style={{
                color: "#FF3B30",
              }}
            >
              <Icons.LogOut />
              <span className="ml-4 leading-6 font-medium font-poppins">
                Log out
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
