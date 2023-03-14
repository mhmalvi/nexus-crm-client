import React from "react";
import blog from "../../assets/Images/blog.png";
import Spark from "../../assets/Images/spark.png";

function BlogsSection() {
  return (
    <div className="font-poppins pb-10 md:pb-40">
      <div className="flex relative text-3xl md:text-5xl text-black font-bold justify-center text-center pb-16">
        Blogs
        <img
          src={Spark}
          alt=""
          className="w-[150px] md:w-[250px] absolute -top-8 md:-top-15"
        />
      </div>
      {/* first row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 md:px-20 md:pb-16">
        {/* card1 */}
        <div className="group lg:hover:scale-105 duration-500 flex-col text-black">
          <div className="pb-8">
            <img
              src={blog}
              className="m-auto h-[256px] lg:group-hover:scale-105 duration-500"
              width={381}
              alt=""
            />
          </div>
          <div className="text-xl md:text-2xl font-bold pb-4">
            How to Create a Customer Centric Strategy For Your Business
          </div>
          <div className="pb-4">
            Creating a customer-centric strategy is essential for businesses
            that want to thrive in today's competitive market. Here are some
          </div>
          <div className="text-sm pb-4">Luke Matthews | November 8, 2021</div>
        </div>
        {/* card2 */}
        <div className="group lg:hover:scale-105 duration-500 flex-col   text-black">
          <div className="pb-8">
            <img
              src={blog}
              className="m-auto h-[256px] lg:group-hover:scale-105 duration-500"
              width={381}
              alt=""
            />
          </div>
          <div className="text-xl md:text-2xl font-bold pb-4">
            Five Killer Email Marketing Mistakes to Avoid
          </div>
          <div className="pb-4">
            Email marketing is a powerful tool for businesses to reach and
            engage with their audience.
          </div>
          <div className="text-sm pb-4">Luke Matthews | November 8, 2021</div>
        </div>
        {/* card3 */}
        <div className="group lg:hover:scale-105 duration-500 flex-col   text-black">
          <div className="pb-8">
            <img
              src={blog}
              className="m-auto h-[256px] lg:group-hover:scale-105 duration-500"
              width={381}
              alt=""
            />
          </div>
          <div className="text-xl md:text-2xl font-bold pb-4">
            Why Your Organization Needs A Mobile CRM Strategy
          </div>
          <div className="pb-4">
            A mobile CRM fosters better communication and collaboration among
            team members.
          </div>
          <div className="text-sm pb-4">Luke Matthews | November 8, 2021</div>
        </div>
        {/* card1 */}
        <div className="group lg:hover:scale-105 duration-500 flex-col   text-black">
          <div className="pb-8">
            <img
              src={blog}
              className="m-auto h-[256px] lg:group-hover:scale-105 duration-500"
              width={381}
              alt=""
            />
          </div>
          <div className="text-xl md:text-2xl font-bold pb-4">
            Eight Ways CRM Software Can Help Reduce Costs for Your Business
          </div>
          <div className="pb-4">
            CRM software can help businesses streamline their processes and
            improve efficiency, leading to cost savings.
          </div>
          <div className="text-sm pb-4">Luke Matthews | November 8, 2021</div>
        </div>
        {/* card2 */}
        <div className="group lg:hover:scale-105 duration-500 flex-col   text-black">
          <div className="pb-8">
            <img
              src={blog}
              className="m-auto h-[256px] lg:group-hover:scale-105 duration-500"
              width={381}
              alt=""
            />
          </div>
          <div className="text-xl md:text-2xl font-bold pb-4">
            Why Customer Complaints Are Good For Your Business
          </div>
          <div className="pb-4">
            Customer complaints can actually be good for your business. Here are
            some reasons why.
          </div>
          <div className="text-sm pb-4">Luke Matthews | November 8, 2021</div>
        </div>
      </div>
      {/* Second row */}
      <div className="w-1/2 md:w-1/5 m-auto bg-black rounded-xl text-center py-4 my-6">
        <a className="text-md text-white font-semibold" href="">
          More Blog
        </a>
      </div>
    </div>
  );
}

export default BlogsSection;
