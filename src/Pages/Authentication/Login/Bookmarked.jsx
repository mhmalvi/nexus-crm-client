import React from "react";
import Avatar from "react-avatar";

const Bookmarked = () => {
  return (
    <div className="h-[55vh] overflow-y-auto">
      <div className="text-black transition-all delay-1000 duration-200 mt-10 ml-2 flex flex-col justify-start items-start">
        <div className="text-xl font-semibold ">Bookmarked Accounts</div>

        <div className="group mt-4 mr-4 p-1 rounded-full shadow-md">
          <Avatar
            className="rounded-full cursor-pointer mr-1"
            size={38}
            name={"Sourav"}
          />
          <span className="pl-2 pr-4">Sourav</span>

          <div className="hidden group-hover:block min-w-40 bg-white shadow-md absolute -right-8 top-[52px] rounded-md">
            <div className="flex flex-col p-4 text-xs">
              <div>Sourav</div>
              <div>Sourav</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookmarked;
