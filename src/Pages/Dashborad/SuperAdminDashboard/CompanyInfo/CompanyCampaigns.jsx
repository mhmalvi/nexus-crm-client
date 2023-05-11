import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import fbCampaignCover from "../../../../assets/Images/facebook-campaign.jpg";
import { handleFetchCampaigns } from "../../../../Components/services/leads";
import { addCampaigns } from "../../../../features/Leads/campaignSlice";
import { setLoader } from "../../../../features/user/userSlice";
import Filter from "../../../Campaigns/Filter";

const CompanyCampaigns = ({ clientId }) => {
  const dispatch = useDispatch();

  const [campaignList, setCampaignList] = useState([]);
  const [activeFilter, setActiveFilter] = useState(0);
  const [searchCampaign, setSearchCampaign] = useState("");

  const userDetails = useSelector((state) => state.user);
  const campaigns = useSelector((state) => state.campaigns?.campaigns);

  useEffect(() => {
    document.title = `Campaigns | Queleads`;

    (async () => {
      dispatch(setLoader(true));

      const response = await handleFetchCampaigns(clientId);

      console.log("response", response);

      if (response?.data) {
        dispatch(addCampaigns(response?.data));
        setCampaignList(response?.data);
      }
      dispatch(setLoader(false));
    })();
  }, [clientId, dispatch, userDetails.userInfo.client_id]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFilter, campaigns, searchCampaign]);

  return (
    <div>
      <Filter
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        // searchCampaign={searchCampaign}
        setSearchCampaign={setSearchCampaign}
      />

      {campaignList?.length !== 0 ? (
        <div className="grid grid-cols-2 2lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 mt-6">
          {campaignList?.map((campaign, i) => (
            <a
              href={`${window.location.origin}/campaign-details/${campaign?.client_id}_${campaign?.campaign_id}`}
              target="_blank"
              rel="noreferrer"
              key={i}
              // onClick={() => handleNavigate(campaign?.campaign_id)}
              className="mx-auto w-64 h-81 flex flex-col items-center bg-white shadow cursor-pointer overflow-hidden text-black hover:text-black"
              style={{
                borderRadius: "10px",
              }}
            >
              <div className="relative">
                <img
                  src={fbCampaignCover}
                  className="min-w-full h-48 rounded-tl rounded-tr mb-2"
                  alt="Cover_Image"
                />
                <div
                  className={`absolute -top-2.5 -left-11 w-29 flex justify-center items-center ${
                    campaign.campaign_status === "ACTIVE"
                      ? "bg-green-500"
                      : "bg-red-500"
                  } bg-opacity-90 pb-1 pt-8 -rotate-45 shadow-md`}
                >
                  <h6 className="text-white font-poppins text-xs">
                    {campaign.campaign_status}
                  </h6>
                </div>
              </div>
              <div className="p-2 pt-2 rounded flex flex-col items-center justify-center font-poppins">
                <div className="flex flex-col justify-center items-center mb-3">
                  <h2 className="font-semibold text-base mb-4 text-center">
                    {campaign.campaign_name}
                  </h2>
                  <span
                    style={{
                      fontSize: "10px",
                    }}
                  >
                    {campaign.start_time} - {campaign.stop_time}
                  </span>
                </div>
                <h2 className="text-justify text-xs overflow-hidden h-19 px-2">
                  {campaign.details}
                </h2>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div className="py-16">
          <h1 className="text-xl font-light text-center"> No Campaigns Yet</h1>
        </div>
      )}
    </div>
  );
};

export default CompanyCampaigns;
