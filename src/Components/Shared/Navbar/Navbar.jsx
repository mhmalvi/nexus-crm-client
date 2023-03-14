import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavigationItems from "./NavLinks";
import { Modal } from "antd";
import "../../../App.css";
import "./Navbar.css";
import { customlinks } from "./MyLinks";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [toogleSubmenu, setToogleSubmenu] = useState("");
  const genericHamburgerLine = `h-1 w-7 my-1 rounded-full bg-white transition ease transform duration-500 lg:hidden m-4`;

  return (
    <div id="Navbar" className="w-full absolute top-0 bg-transparent">
      <nav className="bg-transparent text-black relative">
        <div className="flex justify-end">
          <div
            className="absolute top-10 right-5 z-50"
            onClick={() => setOpen(!open)}
          >
            {/* Hamburger Animation */}
            <div
              className={` ${genericHamburgerLine} ${
                open
                  ? "-translate-y-2 opacity-0"
                  : "opacity-100 group-hover:opacity-100"
              }`}
            />
            <div
              className={`${genericHamburgerLine} ${
                open ? "-translate-x-10 opacity-0" : "group-hover:opacity-100"
              }`}
            />
            <div
              className={`${genericHamburgerLine} ${
                open
                  ? "translate-y-2  opacity-0"
                  : "opacity-100 group-hover:opacity-100"
              }`}
            />
          </div>
          {/* Hamburger Animation end*/}
          <ul className="hidden lg:visible lg:flex items-center gap-8">
            <NavigationItems />
          </ul>
          {/* Mobile View */}
          <Modal
            className="bg-white border rounded-md NavbarModal cross_btn"
            title={false}
            centered
            visible={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            footer={false}
            width="100%"
          >
            <div className="w-full h-[95vh] flex flex-col justify-between text-center text-black text-xl py-10">
              {customlinks?.map((link) => (
                <>
                  <div
                    onClick={() => {
                      toogleSubmenu !== link?.name
                        ? setToogleSubmenu(link?.name)
                        : setToogleSubmenu("");
                    }}
                  >
                    <a className="text-black font-semibold" href={link?.link}>
                      {link.name}
                    </a>
                  </div>
                  <div>
                    {link?.submenu !== "" && (
                      <div
                        className={`${
                          toogleSubmenu === link.name ? "" : "hidden"
                        }`}
                      >
                        {link.submenu?.map((slink) => (
                          <Link to={slink.sublink}>
                            <div className="py-6 pl-10">{slink.name}</div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              ))}
            </div>
          </Modal>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
