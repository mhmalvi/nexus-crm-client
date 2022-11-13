import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleFetchCampaigns } from "../../../../Components/services/leads";
import { addCampaigns } from "../../../../features/Leads/campaignSlice";
import { setLoader } from "../../../../features/user/userSlice";
import Campaign from "../../../Campaigns/Campaign";
import Filter from "../../../Campaigns/Filter";

const CompanyCampaigns = ({ clientId }) => {
  const dispatch = useDispatch();

  const [campaignList, setCampaignList] = useState([]);
  const [activeFilter, setActiveFilter] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const [searchCampaign, setSearchCampaign] = useState("");
  const [toggleCourses, setToggleCourses] = useState(false);

  const userDetails = useSelector((state) => state.user);
  const campaigns = useSelector((state) => state.campaigns?.campaigns);

  useEffect(() => {
    document.title = `Campaigns`;

    (async () => {
      dispatch(setLoader(true));

      const response = await handleFetchCampaigns(
        clientId
      );

      console.log("response", response);

      if (response?.data) {
        dispatch(addCampaigns(response?.data));
        dispatch(setLoader(false));

        setCampaignList(response?.data);
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
      const campaign = campaignList.filter((campaign) =>
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
    <div>
      <Filter
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        // searchCampaign={searchCampaign}
        setSearchCampaign={setSearchCampaign}
      />

      <div className="grid grid-cols-2 2lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 mt-6">
        {campaignList?.map((campaign, i) => (
          <Campaign key={i} campaign={campaign} />
        ))}
      </div>
    </div>
  );
};

export default CompanyCampaigns;
