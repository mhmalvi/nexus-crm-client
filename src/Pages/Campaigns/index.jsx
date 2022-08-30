import React, { useEffect, useState } from "react";
import Campaign from "./Campaign";
import campaignData from "./campaignsData.json";
import Filter from "./Filter";

const Campaigns = () => {
  const [campaignList, setCampaignList] = useState([]);
  const [activeFilter, setActiveFilter] = useState(0);
  const [searchCampaign, setSearchCampaign] = useState("");

  useEffect(() => {
    if (!searchCampaign.length) {
      if (activeFilter === 0) {
        setCampaignList(campaignData);
      } else if (activeFilter === 1) {
        const runningCampaigns = campaignData.filter(
          (campaign) => campaign.running === true
        );
        setCampaignList(runningCampaigns);
      } else if (activeFilter === 2) {
        const closedCampaigns = campaignData.filter(
          (campaign) => campaign.running === false
        );
        setCampaignList(closedCampaigns);
      }
    } else {
      const campaign = campaignData.filter((campaign) =>
        campaign.title.toLowerCase().includes(searchCampaign.toLowerCase())
      );
      setCampaignList(campaign);
    }
  }, [activeFilter, searchCampaign]);

  return (
    <div className="lg:mx-6 2xl:ml-12 2xl:mr-16 py-12">
      <div>
        <Filter
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          // searchCampaign={searchCampaign}
          setSearchCampaign={setSearchCampaign}
        />
      </div>
      <div>
        <div className="grid grid-cols-2 2lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 mt-6">
          {campaignList.map((campaign, i) => (
            <Campaign key={i} campaign={campaign} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Campaigns;
