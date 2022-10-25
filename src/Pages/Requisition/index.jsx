import { DatePicker } from "antd";
import React, { useEffect, useState } from "react";
import Subscription from "../Subscription";
import SubsFooter from "../Subscription/SubsFooter";

const RequisitionForm = () => {
  const [ImgFile, setImgFile] = useState();
  const [previewer, setPreviewer] = useState();
  const [DataErr, setDataErr] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [Show, setShow] = useState(false);
  const [Data, setData] = useState({
    fname: "",
    lname: "",
    address: "",
    region: "",
    postal: "",
    experience: "",
    location: "",
    profession: "",
    phone: "",
    birth: "",
    Cname: "",
    description: "",
    //logo: "",
    telNo: "",
    email: "",
    Caddress: "",
    Tname: "",
    rto: "",
    abn: "",
    Cweb: "",
    country: "",
    facebook: "",
  });

  /*   const handleChange = (e) => {
    setData({ ...Data, [e.target.name]: e.target.value });
  }; */
  const formData = new FormData();
  const reader = new FileReader();

  const handleChange = (e) => {
    e.preventDefault();
    //const form = document.getElementById("form");
    setData({ ...Data, [e.target.name]: e.target.value });
    // formData.append("fname", document.getElementById('fname').value)
    // formData.append("lname", document.getElementById('lname').value)
    // formData.append("address", document.getElementById('address').value)
    // formData.append("region", document.getElementById('region').value)
    // formData.append("postal", document.getElementById('postal').value)
    // formData.append("experience", document.getElementById('experience').value)
    // formData.append("location", document.getElementById('location').value)
    // formData.append("profession", document.getElementById('profession').value)
    // formData.append("phone", document.getElementById('phone').value)
    // formData.append("birth", document.getElementById('birth').value)
    // formData.append("Cname", document.getElementById('Cname').value)
    // formData.append("description", document.getElementById('description').value)
    // formData.append("telNo", document.getElementById('telNo').value)
    // formData.append("email", document.getElementById('email').value)
    // formData.append("Caddress", document.getElementById('Caddress').value)
    // formData.append("Tname", document.getElementById('Tname').value)
    // formData.append("rto", document.getElementById('rto').value)
    // formData.append("abn", document.getElementById('abn').value)
    // formData.append("Cweb", document.getElementById('Cweb').value)
    // formData.append("country", document.getElementById('country').value)
    // formData.append("facebook", document.getElementById('facebook').value)
    /*     Object.keys(Data).map((key, value) => {
      formData.append("data", value)
    })
    console.log(formData); */
  };

  function handleImage(e) {
    setPreviewer(URL.createObjectURL(e.target.files[0]));
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      formData.append("image", readerEvent.target.result);
    };
    // console.log(e.target.files[0]);
    setImgFile(e.target.files[0]);
    // formData.append("logo", ImgFile);
    console.log(formData.values());

    setShow(!Show);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setDataErr(validate(Data));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(DataErr);
    if (Object.keys(DataErr).length === 0 && isSubmit) {
      console.log(formData);
      /*       Axios.post("http://localhost:4000/posts", formData)
      .then(res=>console.log(res))
      .catch(err=>console.log(err)) */
      //console.log(Data);
      /*       fetch(
        "http://localhost:4000/posts",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Data)
        }
      ).then((result) => {
        console.warn("result", result);
      }); */
    }
  });

  const validate = (values) => {
    //Data.logo = ImgFile;
    const errors = {};
    if (!values.fname) {
      errors.fname = "First name is required!";
    }
    if (!values.lname) {
      errors.lname = "Last name is required!";
    }
    if (!values.address) {
      errors.address = "Address is required!";
    }
    if (!values.region) {
      errors.region = "Region is required!";
    }
    if (!values.postal) {
      errors.postal = "Postal code is required!";
    }
    if (!values.location) {
      errors.location = "Location is required!";
    }
    if (!values.profession) {
      errors.profession = "Profession is required!";
    }
    if (!values.phone) {
      errors.phone = "Contact number is required!";
    }
    if (!values.birth) {
      errors.birth = "Date of birth is required!";
    }
    if (!values.Cname) {
      errors.Cname = "Company name is required!";
    }
    /*     if (!values.logo) {
      errors.logo = "Company logo is required!";
    } */
    if (!values.telNo) {
      errors.telNo = "Company contact is required!";
    }
    if (!values.email) {
      errors.email = "Business email is required!";
    }
    if (!values.Caddress) {
      errors.Caddress = "Company address is required!";
    }
    if (!values.Tname) {
      errors.Tname = "Company trade name is required!";
    }
    if (!values.rto) {
      errors.rto = "RTO code is required!";
    }
    if (!values.abn) {
      errors.abn = "Australian business number is  required!";
    }
    if (!values.Cweb) {
      errors.Cweb = "Company website is required!";
    }
    if (!values.country) {
      errors.country = "Country is required!";
    }
    return errors;
  };

  return (
    <div>
      <div className="w-10/12 mx-auto">
        <Subscription />
      </div>
      <div className="flex flex-col justify-center items-center overflow-hidden py-16 font-poppins">
        <div className="w-1/2">
          <h1 className=" font-poppins text-xl font-semibold text-center pt-4 pb-8">
            CRM Requisition From
          </h1>
          <div className="p-6 m-auto shadow-x bg-gray-50 bg-opacity-40 rounded-md shadow">
            <h1 className="text-base font-semibold text-left text-brand-color uppercase tracking-wide">
              Personal Information
            </h1>
            <form id="form" onSubmit={handleSubmit} className="mt-6">
              <div className="mb-2">
                <label>
                  <span className="block text-sm font-medium text-gray-700 tracking-wide">
                    Your Name
                  </span>
                  <div className="grid grid-cols-2 gap-1">
                    <input
                      type="text"
                      name="fname"
                      id="fname"
                      placeholder="First Name"
                      className=" mt-1 block w-full py-2 px-3 border-b border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-indigo-400 focus:border-b focus:border-indigo-400 sm:text-sm"
                      onChange={handleChange}
                      value={Data.fname}
                    />
                    <input
                      type="text"
                      name="lname"
                      id="lname"
                      placeholder="Last Name"
                      className=" mt-1 block w-full py-2 px-3 border-b border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-b focus:border-indigo-500 sm:text-sm"
                      value={Data.lname}
                      onChange={handleChange}
                    />
                  </div>
                </label>
                <div className="grid grid-cols-2">
                  <div>
                    <p className="text-red-500 text-xs">{DataErr.fname}</p>
                  </div>
                  <div>
                    <p className="text-red-500 text-xs">{DataErr.lname}</p>
                  </div>
                </div>
              </div>
              <div className="mb-2">
                <label>
                  <span className="block text-sm font-medium text-gray-700 tracking-wide">
                    Address
                  </span>
                  <input
                    name="address"
                    type="text"
                    id="address"
                    className=" mt-1 block w-full py-2 px-3 border-b border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-b focus:border-indigo-500 sm:text-sm "
                    placeholder="Address"
                    value={Data.address}
                    onChange={handleChange}
                  />
                </label>
                <p className="text-red-500 text-xs">{DataErr.address}</p>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700 tracking-wide">
                    Region
                  </label>
                  <select
                    id="region"
                    name="region"
                    value={Data.region}
                    onChange={handleChange}
                    className="mt-1 block w-full py-2 px-3 border-b border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-b focus:border-indigo-500"
                  >
                    <option className="text-slate-400">Select Region</option>
                    <option>Victoria</option>
                    <option>Queensland</option>
                    <option>South Australia</option>
                    <option>New South Wales</option>
                    <option>Tasmania</option>
                    <option>Western Australia</option>
                  </select>
                  <p className="text-red-500 text-xs">{DataErr.region}</p>
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700 tracking-wide">
                    Postal Code
                  </label>
                  <input
                    name="postal"
                    type="number"
                    id="postal"
                    className=" mt-1 block w-full py-2 px-3 border-b border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-b focus:border-indigo-500 sm:text-sm "
                    placeholder="Postal code"
                    value={Data.postal}
                    onChange={handleChange}
                  />
                  <p className="text-red-500 text-xs">{DataErr.postal}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700 tracking-wide">
                    Work Experience
                  </label>
                  <input
                    name="experience"
                    type="number"
                    id="experience"
                    className="mt-1 block w-full py-2 px-3 border-b border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-b focus:border-indigo-500 sm:text-sm "
                    placeholder="In years (Only Number)"
                    value={Data.experience}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700 tracking-wide">
                    Work Location
                  </label>
                  <input
                    name="location"
                    type="text"
                    id="location"
                    className=" mt-1 block w-full py-2 px-3 border-b border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-b focus:border-indigo-500 sm:text-sm "
                    placeholder="Perth"
                    value={Data.location}
                    onChange={handleChange}
                  />
                  <p className="text-red-500 text-xs">{DataErr.location}</p>
                </div>
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700 tracking-wide">
                  Profession
                </label>
                <input
                  name="profession"
                  type="text"
                  id="profession"
                  className=" mt-1 block w-full py-2 px-3 border-b border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-b focus:border-indigo-500 sm:text-sm "
                  placeholder="Tell us what you do"
                  value={Data.profession}
                  onChange={handleChange}
                />
                <p className="text-red-500 text-xs">{DataErr.profession}</p>
              </div>
              <div className="w-full flex items-center">
                <div className="w-full mb-2">
                  <label className="block text-sm font-medium text-gray-700 tracking-wide">
                    Phone
                  </label>
                  <div className="flex justify-start gap-1 my-2">
                    <div className="w-full">
                      <input
                        name="phone"
                        type="text"
                        id="phone"
                        maxLength={12}
                        minLength={9}
                        className="block w-full py-2 px-3 border-b border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-b focus:border-indigo-500 sm:text-sm "
                        placeholder="Contact No."
                        value={Data.phone}
                        onChange={handleChange}
                      />
                      <p className="text-red-500 text-xs">{DataErr.phone}</p>
                    </div>
                  </div>
                </div>
                <div className="w-full mb-2 ml-2">
                  <label className="block text-sm font-medium text-gray-700 tracking-wide">
                    Date of Birth
                  </label>
                  <DatePicker
                    className="w-full focus:ring-indigo-500 focus:border-b focus:border-indigo-500"
                    style={{
                      borderTop: "none",
                      borderLeft: "none",
                      borderRight: "none",
                      borderBottom: "1.5px solid #D1D5DB",
                      padding: "7px",
                    }}
                    // defaultValue={moment("01/01/2015", dateFormatList[0])}
                    format={dateFormatList}
                    suffixIcon={
                      <h1 className="font-normal text-gray-400">DD-MM-YYYY</h1>
                    }
                  />

                  {/* <input
                  name="birth"
                  type="date"
                  id="birth"
                  className=" mt-1 block w-full py-2 px-3 border-b border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-b focus:border-indigo-500 sm:text-sm "
                  placeholder=""
                  value={Data.birth}
                  onChange={handleChange}
                /> */}
                  <p className="text-red-500 text-xs">{DataErr.birth}</p>
                </div>
              </div>
              <h1 className="text-base font-semibold text-left text-brand-color uppercase py-4 tracking-wide">
                Company Information
              </h1>
              <div className="mb-2">
                <label>
                  <span className="block text-sm font-medium text-gray-700 tracking-wide">
                    Company name
                  </span>
                  <div className="flex justify-between">
                    <input
                      type="text"
                      name="Cname"
                      id="Cname"
                      placeholder="Name of your company"
                      value={Data.Cname}
                      onChange={handleChange}
                      className=" mt-1 block w-full py-2 px-3 mr-1 border-b border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-b focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </label>
                <p className="text-red-500 text-xs">{DataErr.Cname}</p>
              </div>
              <div className="mb-2">
                <label>
                  <span className="block text-sm font-medium text-gray-700 tracking-wide">
                    Description
                  </span>
                  <textarea
                    name="description"
                    id="description"
                    className=" mt-1 block w-full py-2 px-3 mr-1 border-b border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-b focus:border-indigo-500 sm:text-sm"
                    rows="2"
                    value={Data.description}
                    onChange={handleChange}
                  ></textarea>
                </label>
              </div>
              <div className="mb-2">
                <label>
                  <span className="block text-sm font-medium text-gray-700 tracking-wide mb-2">
                    Logo
                  </span>
                  <div className="cursor-pointer w-[20%] max-h-10 shadow text-white font-medium text-center bg-brand-color focus:outline-none hover:ring-indigo-700 hover:border-indigo-700 py-2">
                    Upload
                    <input
                      id="logo"
                      name="logo"
                      type="file"
                      placeholder="Company contact no."
                      onChange={(e) => handleImage(e)}
                      style={{ display: "none" }}
                    />
                  </div>
                  {Show && (
                    <div className="w-full my-4">
                      <div className="w-[20%] bg-white py-2">
                        <img src={previewer} alt="" />
                      </div>
                    </div>
                  )}
                </label>
                <p className="text-red-500 text-xs">{DataErr.logo}</p>
              </div>

              <div className="mb-2">
                <label
                  htmlFor="telNo"
                  className="block text-sm font-medium text-gray-700 tracking-wide"
                >
                  Company Contact Number
                </label>
                <input
                  id="telNo"
                  name="telNo"
                  type="tel"
                  minLength="9"
                  maxLength="14"
                  /*               pattern="[0-9]{3}-[0-9]{9}" */
                  className=" mt-1 block w-full py-2 px-3 border-b border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-b focus:border-indigo-500 sm:text-sm "
                  placeholder="company contact no."
                  value={Data.telNo}
                  onChange={handleChange}
                />
                <p className="text-red-500 text-xs">{DataErr.telNo}</p>
              </div>
              <div className="mb-2">
                <label>
                  <span className="block text-sm font-medium text-gray-700 tracking-wide">
                    Business Email
                  </span>
                  <input
                    name="email"
                    type="email"
                    id="email"
                    className=" mt-1 block w-full py-2 px-3 border-b border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-b focus:border-indigo-500 sm:text-sm  "
                    placeholder="john.cooks@example.com"
                    value={Data.email}
                    onChange={handleChange}
                  />
                </label>
                <p className="text-red-500 text-xs">{DataErr.email}</p>
              </div>
              <div className="mb-2">
                <label>
                  <span className="block text-sm font-medium text-gray-700 tracking-wide">
                    Company Address
                  </span>
                  <input
                    name="Caddress"
                    type="text"
                    id="Caddress"
                    className=" mt-1 block w-full py-2 px-3 border-b border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-b focus:border-indigo-500 sm:text-sm "
                    placeholder="Address of your company"
                    value={Data.Caddress}
                    onChange={handleChange}
                  />
                </label>
                <p className="text-red-500 text-xs">{DataErr.Caddress}</p>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700 tracking-wide">
                    Trading Name
                  </label>
                  <input
                    name="Tname"
                    type="text"
                    id="Tname"
                    className=" mt-1 block w-full py-2 px-3 border-b border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-b focus:border-indigo-500 sm:text-sm "
                    placeholder="Enter trade name"
                    value={Data.Tname}
                    onChange={handleChange}
                  />
                  <p className="text-red-500 text-xs">{DataErr.Tname}</p>
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700 tracking-wide">
                    RTO code
                  </label>
                  <input
                    name="rto"
                    type="text"
                    id="rto"
                    className=" mt-1 block w-full py-2 px-3 border-b border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-b focus:border-indigo-500 sm:text-sm "
                    placeholder="RTO"
                    value={Data.rto}
                    onChange={handleChange}
                  />
                  <p className="text-red-500 text-xs">{DataErr.rto}</p>
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700 tracking-wide">
                    ABN <span className="text-xs">(Business number)</span>
                  </label>
                  <input
                    name="abn"
                    type="text"
                    id="abn"
                    className=" mt-1 block w-full py-2 px-3 border-b border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-b focus:border-indigo-500 sm:text-sm "
                    placeholder="Business number"
                    value={Data.abn}
                    onChange={handleChange}
                  />
                  <p className="text-red-500 text-xs">{DataErr.abn}</p>
                </div>
              </div>
              <div className="mb-2">
                <label>
                  <span className="block text-sm font-medium text-gray-700 tracking-wide">
                    Company Website
                  </span>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 border-b border-t-0 border-x-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      http://
                    </span>
                    <input
                      name="Cweb"
                      id="Cweb"
                      className="block w-full py-2 px-3 border-b border-l-0 border-gray-300 bg-white rounded-tr-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm "
                      placeholder="www.example.com"
                      value={Data.Cweb}
                      onChange={handleChange}
                    />
                  </div>
                </label>
                <p className="text-red-500 text-xs">{DataErr.Cweb}</p>
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700 tracking-wide">
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  value={Data.country}
                  onChange={handleChange}
                  className="mt-1 block w-full py-2 px-3 border-b border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-b focus:border-indigo-500"
                >
                  <option className="text-slate-400">Select country</option>
                  <option>USA</option>
                  <option>Canada</option>
                  <option>Australia</option>
                  <option>UK</option>
                  <option>Bangladesh</option>
                  <option>China</option>
                  <option>India</option>
                </select>
                <p className="text-red-500 text-xs">{DataErr.country}</p>
              </div>
              <div className="mb-2">
                <label>
                  <span className="block text-sm font-medium text-gray-700 tracking-wide">
                    FaceBook Account
                  </span>
                  <input
                    name="facebook"
                    type="text"
                    id="facebook"
                    className=" mt-1 block w-full py-2 px-3 border-b border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-b focus:border-indigo-500 sm:text-sm "
                    placeholder="www.facebook.com"
                    value={Data.facebook}
                    onChange={handleChange}
                  />
                </label>
              </div>

              <div className="flex justify-end mt-10 mb-6">
                <button
                  type="submit"
                  className="h-10 px-5 text-white bg-brand-color text-sm rounded-lg transition-colors duration-150 focus:shadow-outline hover:bg-indigo-600 font-poppins tracking-wide"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div>
        <SubsFooter />
      </div>
    </div>
  );
};

export default RequisitionForm;

const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];
