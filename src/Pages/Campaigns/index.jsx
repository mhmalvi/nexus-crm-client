import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleFetchCampaigns } from "../../Components/services/leads";
import Loading from "../../Components/Shared/Loader";
import { addCampaigns } from "../../features/Leads/campaignSlice";
import { setLoader } from "../../features/user/userSlice";
import Campaign from "./Campaign";
import campaignData from "./campaignsData.json";
import Courses from "./Courses";
import Filter from "./Filter";

const Campaigns = () => {
  const dispatch = useDispatch();

  const [campaignList, setCampaignList] = useState([]);
  const [activeFilter, setActiveFilter] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const [searchCampaign, setSearchCampaign] = useState("");
  const [toggleCourses, setToggleCourses] = useState(false);

  const userDetails = useSelector((state) => state.user);
  const loadingDetails = useSelector((state) => state?.user)?.loading;

  useEffect(() => {
    document.title = `Campaigns`;

    (async () => {
      dispatch(setLoader(true));

      const response = await handleFetchCampaigns(
        userDetails?.userInfo?.client_id
      );

      if (response?.data) {
        dispatch(addCampaigns(response?.data));
        dispatch(setLoader(false));

        setCampaignList(response?.data);
      } else {
        setCampaignList(campaignData);
      }
    })();
  }, [dispatch, userDetails?.userInfo?.client_id]);

  useEffect(() => {
    if (!searchCampaign.length) {
      if (activeFilter === 0) {
        setCampaignList(campaignData);
      } else if (activeFilter === 1) {
        const runningCampaigns = campaignData.filter(
          (campaign) => campaign?.campaign_status === "ACTIVE"
        );
        setCampaignList(runningCampaigns);
      } else if (activeFilter === 2) {
        const closedCampaigns = campaignData.filter(
          (campaign) => campaign?.campaign_status === "PAUSED"
        );
        setCampaignList(closedCampaigns);
      }
    } else {
      const campaign = campaignData.filter((campaign) =>
        campaign.campaign_name
          .toLowerCase()
          .includes(searchCampaign.toLowerCase())
      );
      setCampaignList(campaign);
    }
  }, [activeFilter, searchCampaign]);

  const handleCancelCourseModal = () => {
    setToggleCourses(false);
    setActiveSection(0);
  };

  return (
    <div className="lg:mx-6 2xl:ml-12 2xl:mr-16 py-12">
      <div className="flex items-center mb-6 mt-10">
        <div
          onClick={() => {
            setActiveSection(1);
            setToggleCourses(true);
          }}
        >
          <h1
            className={`text-sm leading-4 font-poppins px-3 py-2 cursor-pointer mr-2.5 ${
              activeSection === 1
                ? "text-brand-color font-semibold"
                : "text-black font-normal"
            } rounded-full`}
          >
            Show Courses
          </h1>
        </div>
      </div>

      <Modal
        visible={toggleCourses}
        footer={null}
        onCancel={handleCancelCourseModal}
        width={900}
      >
        <Courses />
      </Modal>

      <Filter
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        // searchCampaign={searchCampaign}
        setSearchCampaign={setSearchCampaign}
      />

      {loadingDetails ? (
        <div className="w-full h-100 z-50 flex justify-center items-center bg-white bg-opacity-70">
          <Loading />
        </div>
      ) : (
        <div className="grid grid-cols-2 2lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 mt-6">
          {campaignList?.map((campaign, i) => (
            <Campaign key={i} campaign={campaign} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Campaigns;
