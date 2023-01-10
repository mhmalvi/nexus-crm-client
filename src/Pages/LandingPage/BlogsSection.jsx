import React from "react";
import blog from "../../assets/Images/blog.png";
import Spark from "../../assets/Images/spark.png";

function BlogsSection() {
  return (
    <div className="font-poppins pb-40">
      <div className="flex relative text-5xl text-black font-bold justify-center text-center pb-16">
        Blog
      <img src={Spark} alt="" className="absolute -top-15"/>
      </div>
      {/* first row */}
      <div className="flex gap-6 px-20 pb-16">
        {/* card1 */}
        <div className="group lg:hover:scale-105 duration-500 flex-col   text-black">
          <div className="pb-8">
            <img src={blog} className="m-auto h-[256px] lg:group-hover:scale-105 duration-500" width={381} alt="" />
          </div>
          <div className="text-2xl font-bold pb-4">
            How to Create a Customer Centric Strategy For Your Business
          </div>
          <div className="text-base pb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt.
          </div>
          <div className="text-base pb-4">Luke Matthews | November 8, 2021</div>
        </div>
        {/* card2 */}
        <div className="group lg:hover:scale-105 duration-500 flex-col   text-black">
          <div className="pb-8">
            <img src={blog} className="m-auto h-[256px] lg:group-hover:scale-105 duration-500" width={381} alt="" />
          </div>
          <div className="text-2xl font-bold pb-4">
            Five Killer Email Marketing Mistakes to Avoid
          </div>
          <div className="text-base pb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt.
          </div>
          <div className="text-base pb-4">Luke Matthews | November 8, 2021</div>
        </div>
        {/* card3 */}
        <div className="group lg:hover:scale-105 duration-500 flex-col   text-black">
          <div className="pb-8">
            <img src={blog} className="m-auto h-[256px] lg:group-hover:scale-105 duration-500" width={381} alt="" />
          </div>
          <div className="text-2xl font-bold pb-4">
            Why Your Organization Needs A Mobile CRM Strategy
          </div>
          <div className="text-base pb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt.
          </div>
          <div className="text-base pb-4">Luke Matthews | November 8, 2021</div>
        </div>
      </div>
      {/* Second row */}
      <div className="w-2/3 flex gap-6 px-20 pb-30 m-auto">
        {/* card1 */}
        <div className="group lg:hover:scale-105 duration-500 flex-col   text-black">
          <div className="pb-8">
            <img src={blog} className="m-auto h-[256px] lg:group-hover:scale-105 duration-500" width={381} alt="" />
          </div>
          <div className="text-2xl font-bold pb-4">
            Eight Ways CRM Software Can Help Reduce Costs for Your Business
          </div>
          <div className="text-base pb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt.
          </div>
          <div className="text-base pb-4">Luke Matthews | November 8, 2021</div>
        </div>
        {/* card2 */}
        <div className="group lg:hover:scale-105 duration-500 flex-col   text-black">
          <div className="pb-8">
            <img src={blog} className="m-auto h-[256px] lg:group-hover:scale-105 duration-500" width={381} alt="" />
          </div>
          <div className="text-2xl font-bold pb-4">
            Why Customer Complaints Are Good For Your Business
          </div>
          <div className="text-base pb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt.
          </div>
          <div className="text-base pb-4">Luke Matthews | November 8, 2021</div>
        </div>
      </div>
      <div className="w-1/5 m-auto bg-black rounded-xl text-center py-4 my-6">
        <a className="text-md text-white font-semibold" href="">
          More Blog
        </a>
      </div>
    </div>
  );
}

export default BlogsSection;
