import React, { useEffect } from "react";
import { Col, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "react-avatar";
// import picture from "./../../assets/Images/paypal.png";
import graphgif from "../../../assets/Images/graph.gif";
import xaxis from "../../../assets/Images/x-axis.png";
import yaxis from "../../../assets/Images/y-axis.png";
import { useNavigate } from "react-router-dom";
//import { handleUpdateProfileDetails } from "../../Components/services/auth";
// import Loading from "../../Components/Shared/Loader";
import { setLoader } from "../../../features/user/userSlice";
import Icons from "../../../Components/Shared/Icons";
import Loading from "../../../Components/Shared/Loader";

function UserProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //const [userDetails, setUserDetails] = useState();
  const loadingDetails = useSelector((state) => state?.user?.loading);
  const ProfileDetails = useSelector((state) => state?.user?.userInfo);

  useEffect(() => {
    dispatch(setLoader(true));

    setTimeout(() => {
      dispatch(setLoader(false));
    }, 3000);
  }, [dispatch, ProfileDetails?.userInfo]);

  /*   useEffect(() => {
    dispatch(setLoader(true));

    (async () => {
      const userDetailResponse = await handleProfileDetails(
        ProfileDetails?.userInfo?.user_id
      );

      if (userDetailResponse?.data) {
        const user = userDetailResponse?.data?.data;
        setUserDetails(user);
        console.log("onpage", userDetails); 
        dispatch(setLoader(false));
      } else {
        setTimeout(() => {
          dispatch(setLoader(false));
        }, 3000);
      }
    })();
  }, [dispatch, ProfileDetails?.userInfo?.user_id]); */

  const EditSettings = () => {
    navigate("/edit-profile");
  };

  return (
    <div className="m-20">
      {loadingDetails && (
        // <div className="w-screen h-screen text-7xl absolute z-50 flex justify-center items-center bg-white bg-opacity-70">
        <div className="w-full h-full text-7xl absolute z-50 flex justify-center mx-auto items-center bg-white bg-opacity-70">
          <Loading />
        </div>
      )}
      <div className="border rounded-md shadow-sm">
        <div className="my-10 mx-20">
          <Row gutter={[16, 30]}>
            <Col className="gutter-row" span={12}>
              <div className="flex flex-wrap m-auto">
                <div className="rounded-full mx-2">
                  <Avatar
                    className="rounded-full cursor-pointer"
                    size="80"
                    color={Avatar.getRandomColor("sitebase", [
                      "red",
                      "green",
                      "#728FCE",
                      "violet",
                      "#2B547E",
                      "black",
                      "#87AFC7",
                      "Lime",
                      "#D5D6EA",
                      "#77BFC7",
                      "orange",
                      "#FDD017",
                      "#665D1E",
                    ])}
                    name={ProfileDetails?.full_name}
                  />
                </div>
                <div className="flex-col font-poppins my-auto">
                  <div className="text-lg">{ProfileDetails?.full_name}</div>
                  <div className="text-xs">
                    My role
                    <span className="font-semibold px-1">
                      {ProfileDetails?.role_id === 1 && "Super Admin"}
                      {ProfileDetails?.role_id === 2 && "CRM Sales"}
                      {ProfileDetails?.role_id === 3 && "Admin"}
                      {ProfileDetails?.role_id === 4 && "Advisor"}
                      {ProfileDetails?.role_id === 5 && "Sales Employee"}
                      {ProfileDetails?.role_id === 6 && "Students"}
                    </span>
                  </div>
                </div>
              </div>
            </Col>
            <Col className="gutter-row my-auto" span={12}>
              <div className="flex justify-end">
                <button
                  className="bg-black text-white font-poppins text-sm rounded-md px-6 py-2 flex items-center"
                  onClick={EditSettings}
                >
                  <Icons.Edit className="text-white" />
                  <span className="ml-2">Edit</span>
                </button>
              </div>
            </Col>
          </Row>
          <div className="my-10 mx-2 font-poppins">
            <Row gutter={[16, 30]}>
              <Col className="gutter-row" span={6}>
                <div className="flex-col">
                  <div className="text-xs text-[#808080]">Full Name</div>
                  <div className="font-semibold">
                    {ProfileDetails?.full_name}
                  </div>
                </div>
              </Col>
              <Col className="gutter-row" span={6}>
                <div className="flex-col">
                  <div className="text-xs text-[#808080]">Date of Birth</div>
                  <div className="font-semibold">
                    {ProfileDetails?.date_of_birth}
                  </div>
                </div>
              </Col>
              <Col className="gutter-row" span={6}>
                <div className="flex-col">
                  <div className="text-xs text-[#808080]">Work Phone</div>
                  <div className="font-semibold">
                    {ProfileDetails?.contact_number}
                  </div>
                </div>
              </Col>
              <Col className="gutter-row" span={6}>
                <div className="flex-col">
                  <div className="text-xs text-[#808080]">Address</div>
                  <div className="font-semibold">{ProfileDetails?.address}</div>
                </div>
              </Col>
              <Col className="gutter-row" span={6}>
                <div className="flex-col">
                  <div className="text-xs text-[#808080]">Email Address</div>
                  <div className="font-semibold">{ProfileDetails?.email}</div>
                </div>
              </Col>
              <Col className="gutter-row" span={6}>
                <div className="flex-col">
                  <div className="text-xs text-[#808080]">Language</div>
                  <div className="font-semibold">English(US)</div>
                </div>
              </Col>
              <Col className="gutter-row" span={6}>
                <div className="flex-col">
                  <div className="text-xs text-[#808080]">Mobile</div>
                  <div className="font-semibold">
                    {ProfileDetails?.secondary_contact}
                  </div>
                </div>
              </Col>
              <Col className="gutter-row" span={6}>
                <div className="flex-col">
                  <div className="text-xs text-[#808080]">Password</div>
                  <div className="font-semibold">**************</div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <div className="my-10">
        <Row gutter={[16, 30]}>
          <Col span={8}>
            <div className="bg-[#000000] h-full rounded-lg p-10 shadow-sm">
              <div className="mb-10">
                <Icons.Equilizer className="w-20" />
              </div>
              <div className="flex-col font-poppins">
                <div className="text-md text-white">Last month income</div>
                <div className="text-white sm:text-lg xl:text-xl 2xl:text-3xl font-semibold">
                  $88,500
                </div>
              </div>
              <div className="flex justify-between my-4">
                <div>
                  <div className="text-md text-white">Total Sell</div>
                  <div className="text-white sm:text-lg xl:text-xl 2xl:text-3xl font-semibold">
                    $88,500
                  </div>
                </div>
                <div>
                  <div className="text-md text-white">Commission</div>
                  <div className="text-white sm:text-lg xl:text-xl 2xl:text-3xl font-semibold">
                    15%
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col span={16}>
            <div className="h-full border rounded-lg p-5 shadow-sm">
              <div className="flex justify-evenly font-poppins my-4">
                <div className="flex-col">
                  <div className="text-lg text-[#808080] leading-8 mb-4">
                    Monthly Sales
                  </div>
                  <div className="flex mx-2">
                    <img src={yaxis} alt="Avatar" />
                    <img src={graphgif} alt="Avatar" width={300} />
                  </div>
                  <div className="mx-8">
                    <img src={xaxis} alt="Avatar" width={300} />
                  </div>
                </div>
                <div className="grid grid-col gap-2">
                  <div>
                    <div className="text-lg sm:text-xs lg:text-sm font-semibold leading-6">
                      Monthly Sales Stats
                    </div>
                    <div className="text-xs text-[#808080]">
                      55 Lead success
                    </div>
                  </div>
                  <div>
                    <div className="text-lg sm:text-xs lg:text-sm font-semibold leading-6">
                      Lead Accept
                    </div>
                    <div className="text-xs text-[#808080]">
                      150 Lead success
                    </div>
                  </div>
                  <div>
                    <div className="text-lg sm:text-xs lg:text-sm font-semibold leading-6">
                      success percentage
                    </div>
                    <div className="text-xs text-[#808080]">50%</div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default UserProfile;
