import React from "react";
import Icons from "../../Components/Shared/Icons";

const SubsFooter = () => {
  return (
    <div className="mx-auto grid grid-cols-4 max-w-7xl px-20 my-10">
      <div className="text-xl">All Accounts Include</div>
      <div className="text-slate-500 text-sm py-4">
        <div className="flex">
          <Icons.Tick />
          <p className="px-2">Post Jobs</p>
        </div>
        <div className="flex">
          <Icons.Tick />
          <p className="px-2">Advanced instructors search</p>
        </div>
        <div className="flex">
          <Icons.Tick />
          <p className="px-2">Invite candidates</p>
        </div>
        <div className="flex">
          <Icons.Tick />
          <p className="px-2">Post events</p>
        </div>
        <div className="flex">
          <Icons.Tick />
          <p className="px-2">Cancel any time</p>
        </div>
      </div>
      <div className="flex-1 text-slate-500 text-sm py-4">
        <div className="flex">
          <Icons.Tick />
          <p className="px-2">Advanced instructors search</p>
        </div>
        <div className="flex">
          <Icons.Tick />
          <p className="px-2">Cancel any time</p>
        </div>
        <div className="flex">
          <Icons.Tick />
          <p className="px-2">Invite candidates</p>
        </div>
        <div className="flex">
          <Icons.Tick />
          <p className="px-2">Post events</p>
        </div>
        <div className="flex">
          <Icons.Tick />
          <p className="px-2">Post Jobs</p>
        </div>
      </div>
      <div className="flex-1 text-slate-500 text-sm py-4">
        <div className="flex">
          <Icons.Tick />
          <p className="px-2">Invite candidates</p>
        </div>
        <div className="flex">
          <Icons.Tick />
          <p className="px-2">Post events</p>
        </div>
        <div className="flex">
          <Icons.Tick />
          <p className="px-2">Post Jobs</p>
        </div>
        <div className="flex">
          <Icons.Tick />
          <p className="px-2">Advanced instructors search</p>
        </div>
        <div className="flex">
          <Icons.Tick />
          <p className="px-2">Cancel any time</p>
        </div>
      </div>
    </div>
  );
};
export default SubsFooter;
