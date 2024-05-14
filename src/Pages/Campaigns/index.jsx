import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleFetchCampaigns } from "../../Components/services/leads";
import Loading from "../../Components/Shared/Loader";
import { addCampaigns } from "../../features/Leads/campaignSlice";
import { setLoader } from "../../features/user/userSlice";
import Campaign from "./Campaign";
import Courses from "./Courses";
import Filter from "./Filter";

const Campaigns = () => {
  const dispatch = useDispatch();

  const [campaignList, setCampaignList] = useState([]);
  const [activeFilter, setActiveFilter] = useState(0);
  const [searchCampaign, setSearchCampaign] = useState("");
  const [toggleCourses, setToggleCourses] = useState(false);

  const userDetails = useSelector((state) => state.user);
  const campaigns = useSelector((state) => state.campaigns?.campaigns);
  const loadingDetails = useSelector((state) => state?.user)?.loading;

  useEffect(() => {
    document.title = `Campaigns | Queleads CRM`;

    (async () => {
      dispatch(setLoader(true));

      const response = await handleFetchCampaigns(
        userDetails?.userInfo?.client_id
      );

      if (response?.status === 200) {
        if (response?.data) {
          dispatch(setLoader(false));
          dispatch(addCampaigns(response?.data));
          dispatch(setLoader(false));
          setCampaignList(response?.data);
        } else {
          dispatch(setLoader(false));
          setCampaignList([]);
        }
      } else {
        dispatch(setLoader(false));
        setCampaignList([]);
      }
    })();
  }, [dispatch, userDetails?.userInfo?.client_id]);

  useEffect(() => {
    if (!searchCampaign.length) {
      if (activeFilter === 0) {
        setCampaignList(campaigns);
      } else if (activeFilter === 1) {
        const runningCampaigns = campaigns.filter(
          (campaign) => campaign?.campaign_status === "ACTIVE"
        );
        setCampaignList(runningCampaigns);
      } else if (activeFilter === 2) {
        const closedCampaigns = campaigns.filter(
          (campaign) => campaign?.campaign_status === "PAUSED"
        );
        setCampaignList(closedCampaigns);
      }
    } else {
      const searchedCampaign = campaigns.filter((campaign) =>
        campaign.campaign_name
          .toLowerCase()
          .includes(searchCampaign.toLowerCase())
      );

      if (activeFilter === 0) {
        setCampaignList(searchedCampaign);
      } else if (activeFilter === 1) {
        const runningCampaigns = searchedCampaign.filter(
          (campaign) => campaign?.campaign_status === "ACTIVE"
        );
        setCampaignList(runningCampaigns);
      } else if (activeFilter === 2) {
        const closedCampaigns = searchedCampaign.filter(
          (campaign) => campaign?.campaign_status === "PAUSED"
        );
        setCampaignList(closedCampaigns);
      }
    }
  }, [activeFilter, campaigns, searchCampaign]);

  const handleCancelCourseModal = () => {
    setToggleCourses(false);
  };

  return (
    <div className="h-screen flex justify-center items-center py-8">
      <div className="flex flex-col flex-grow gap-4 w-full h-full mx-5 rounded-md p-4 shadow-md backdrop-blur-2xl bg-[#ffffff11] overflow-hidden">
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
          setSearchCampaign={setSearchCampaign}
        />

        {loadingDetails ? (
          <div className="w-full h-100 z-50 flex justify-center items-center bg-transparent">
            <Loading />
          </div>
        ) : (
          <div className="h-full flex flex-wrap gap-8 overflow-y-scroll">
            {campaignList
              ?.map((campaign, i) => <Campaign key={i} campaign={campaign} />)
              .reverse()}
          </div>
        )}
      </div>
    </div>
  );
};

export default Campaigns;
