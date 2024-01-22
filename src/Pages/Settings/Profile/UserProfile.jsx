import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import graphgif from "../../../assets/Images/graph.gif";
import xaxis from "../../../assets/Images/x-axis.png";
import yaxis from "../../../assets/Images/y-axis.png";
import { handleProfileDetails } from "../../../Components/services/auth";
import Icons from "../../../Components/Shared/Icons";
import Loading from "../../../Components/Shared/Loader";
import { setLoader } from "../../../features/user/userSlice";

function UserProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState();
  const loadingDetails = useSelector((state) => state?.user?.loading);
  const ProfileDetails = useSelector((state) => state?.user?.userInfo);

  useEffect(() => {
    document.title = `Profile Settings | Queleads CRM`;
    dispatch(setLoader(true));

    setTimeout(() => {
      dispatch(setLoader(false));
    }, 3000);
  }, [dispatch, ProfileDetails?.userInfo]);

  useEffect(() => {
    dispatch(setLoader(true));

    (async () => {
      const userDetailResponse = await handleProfileDetails(
        ProfileDetails?.user_id
      );

      console.log("userDetailResponse", userDetailResponse);

      if (userDetailResponse?.data) {
        const user = userDetailResponse?.data;
        setUserDetails(user);
        dispatch(setLoader(false));
      } else {
        setTimeout(() => {
          dispatch(setLoader(false));
        }, 3000);
      }
    })();
  }, [dispatch, ProfileDetails]);

  const EditSettings = () => {
    navigate("/edit-profile");
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="h-[90vh] w-full mx-5 rounded-xl p-5 shadow-md backdrop-blur-2xl bg-[#ffffff11] overflow-hidden">
        {loadingDetails && (
          <div className="w-full h-full text-7xl absolute z-50 flex justify-center mx-auto items-center bg-white bg-opacity-70">
            <Loading />
          </div>
        )}
        <div className="border rounded-md shadow-md">
          <div className="my-10 mx-5 lg:mx-20">
            <div className="grid grid-cols-1 sm:grid-cols-2">
              <div>
                <div className="flex flex-wrap m-auto">
                  <div className="rounded-full mx-2">
                    <Avatar
                      className="rounded-full cursor-pointer"
                      size="80"
                      name={userDetails?.full_name}
                    />
                  </div>
                  <div className="flex-col font-poppins my-auto">
                    <div className="text-lg">{userDetails?.full_name}</div>
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
              </div>
              <div>
                <div className="flex justify-end">
                  <button
                    className="bg-black text-white font-poppins text-sm rounded-md px-6 py-2 flex items-center"
                    onClick={EditSettings}
                  >
                    <Icons.Edit className="text-white" />
                    <span className="ml-2">Edit</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 my-10 mx-2 gap-8">
              <div>
                <div className="flex-col">
                  <div className="text-xs text-[#808080]">Full Name</div>
                  <div className="font-semibold truncate">
                    {userDetails?.full_name}
                  </div>
                </div>
              </div>
              <div>
                <div className="flex-col">
                  <div className="text-xs text-[#808080]">Date of Birth</div>
                  <div className="font-semibold truncate">
                    {userDetails?.date_of_birth}
                  </div>
                </div>
              </div>
              <div>
                <div className="flex-col">
                  <div className="text-xs text-[#808080]">Address</div>
                  <div
                    className="font-semibold truncate pr-8"
                    title={userDetails?.location}
                  >
                    {userDetails?.location}
                  </div>
                </div>
              </div>
              <div>
                <div className="flex-col">
                  <div className="text-xs text-[#808080]">Address</div>
                  <div className="font-semibold truncate">
                    {userDetails?.address}
                  </div>
                </div>
              </div>
              <div>
                <div className="flex-col">
                  <div className="text-xs text-[#808080]">Email Address</div>
                  <div className="font-semibold truncate">
                    {ProfileDetails?.email}
                  </div>
                </div>
              </div>
              <div>
                <div className="flex-col">
                  <div className="text-xs text-[#808080]">Country</div>
                  <div className="font-semibold truncate">
                    {userDetails?.region}
                  </div>
                </div>
              </div>
              <div>
                <div className="flex-col">
                  <div className="text-xs text-[#808080]">Mobile</div>
                  <div className="font-semibold truncate">
                    {userDetails?.secondary_contact}
                  </div>
                </div>
              </div>
              <div>
                <div className="flex-col">
                  <div className="text-xs text-[#808080]">Postcode</div>
                  <div className="font-semibold truncate">
                    {userDetails?.postcode}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {(userDetails?.userInfo?.role_id === 1 ||
          userDetails?.userInfo?.role_id === 2 ||
          userDetails?.userInfo?.role_id === 3 ||
          userDetails?.userInfo?.role_id === 4 ||
          userDetails?.userInfo?.role_id === 5) && (
          <div className="my-10">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="">
                <div className="bg-[#000000] h-full rounded-lg p-10 shadow-md">
                  <div className="mb-10">
                    <Icons.Equilizer className="w-20" />
                  </div>
                  <div className="flex-col font-poppins">
                    <div className="text-md text-white">Last month income</div>
                    <div className="text-white sm:text-lg xl:text-xl 2xl:text-3xl font-semibold">
                      $88,500
                    </div>
                  </div>
                  <div className="flex flex-col lg:flex-row justify-between my-4">
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
              </div>
              <div className="sm:col-span-2 mt-8 sm:mt-0">
                <div className="h-full border rounded-lg p-5 shadow-md">
                  <div className="flex flex-col lg:flex-row justify-evenly font-poppins my-4">
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
                    <div className="grid grid-col gap-2 mt-5 lg:mt-0">
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
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
