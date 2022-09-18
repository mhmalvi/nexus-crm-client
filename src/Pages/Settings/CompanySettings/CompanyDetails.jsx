import React from "react";

const CompanyDetails = () => {
  return (
    <div
      className="font-poppins border py-6 px-8 mx-auto mb-28"
      style={{
        width: "80%",
        borderRadius: "20px",
      }}
    >
      <div className="flex justify-between items-stretch">
        <div className="w-1/2 border-r mr-4">
          <h1 className="font-semibold text-3xl leading-8">NTA</h1>
          <p className="w-10/12 text-justify font-normal leading-6 text-sm mt-8">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum illo
            voluptates, culpa quos sequi pariatur sunt, ut nesciunt alias
            deleniti quibusdam beatae nostrum maxime consectetur enim ab
            repellendus nulla! Culpa. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Blanditiis nisi qui doloremque placeat ipsum!
            Velit modi in earum, ducimus accusantium quae quas nostrum. Facilis
            rerum hic, illum repellat vel atque? Lorem ipsum dolor sit, amet
            consectetur adipisicing elit. Hic, reiciendis? Lorem ipsum dolor sit
            amet consectetur, adipisicing elit. Laudantium, magni? Lorem ipsum
            dolor sit amet. Lorem ipsum dolor sit amet.
          </p>
        </div>
        <div className="w-1/2 pb-16 mb-20">
          <div className="border w-36 h-36 rounded-full ml-4">
            <img
              className="w-full h-full"
              src="https://itecounsel.com/wp-content/uploads/2022/03/nta-150x150.png"
              alt=""
            />
            <div className="mt-6">
              <div className="font-normal text-sm 2xl:text-base leading-6 font-poppins">
                <span>Contact:&nbsp;</span>
                <span>01756414858</span>
              </div>
              <div className="font-normal text-sm 2xl:text-base leading-6 font-poppins flex items-center mt-2">
                <span>Email:&nbsp;</span>
                <span>itec@gmail.com</span>
              </div>
              <div className="font-normal text-sm 2xl:text-base leading-6 font-poppins flex items-center mt-2">
                <span>Address:&nbsp;</span>
                <span className="whitespace-nowrap">Sydney, Australia.</span>
              </div>
              <div className="font-normal text-sm 2xl:text-base leading-6 font-poppins flex items-center mt-2">
                <span>Courses:&nbsp;</span>
                <span className="whitespace-nowrap">Fashion Designing</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
