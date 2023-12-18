const LEADSSCAN = require("../../../assets/tabmenulistimages/LEADS SCAN.png");
const PLANALYZE = require("../../../assets/tabmenulistimages/PLANALYZE.png");
const TASKMASTERY = require("../../../assets/tabmenulistimages/TASK-MASTERY.png");
const TEAMCRAFT = require("../../../assets/tabmenulistimages/TEAM-CRAFT.png");
const COLLABLEADS = require("../../../assets/tabmenulistimages/COLLABLEADS.png");

const tabImage1 = require("../../../assets/tabimages/tabiamge1.jpeg");
const tabImage2 = require("../../../assets/tabimages/tabimage2.jpeg");
const tabImage3 = require("../../../assets/tabimages/tabimage3.jpeg");
const tabImage4 = require("../../../assets/tabimages/tabimage4.jpeg");
const tabImage5 = require("../../../assets/tabimages/tabimage5.jpeg");

export const tabMenuList = [
  {
    id: 1,
    icon: LEADSSCAN,
    name: "LeadsScan",
    isActive: false,
  },
  {
    id: 2,
    icon: COLLABLEADS,
    name: "CollabLeads",
    isActive: false,
  },
  {
    id: 3,
    icon: TASKMASTERY,
    name: "Task Mastery",
    isActive: false,
  },
  {
    id: 4,
    icon: PLANALYZE,
    name: "Planalyze",
    isActive: false,
  },
  {
    id: 5,
    icon: TEAMCRAFT,
    name: "TeamCraft",
    isActive: false,
  },
];

export const TabAllData = [
  {
    tid: 1,
    image: tabImage1,
    title: "Leads to Conversion: One Platform, Total Control!",
    desc: `Effortlessly generate and gather leads from multiple sources, all in one platform`,
  },
  {
    tid: 2,
    image: tabImage2,
    title: "Collaborate via WhatsApp, Email, and Calls.",
    desc: `Connect with Leads via Whatsapp, Email or Phone Call in one platform with all the Lead information in front of you
`,
  },
  {
    tid: 3,
    image: tabImage3,
    title: "Plan your work and manage your sales force.",
    desc: `Assign tasks, schedule on calendar and get live notifications for every task.`,
  },
  {
    tid: 4,
    image: tabImage4,
    title: "Plan better using Calendar.",
    desc: ` Get notifications of every task and pre-notifications of deadlines.`,
  },
  {
    tid: 5,
    image: tabImage5,
    title: "Manage your own team.",
    desc: `Manage your sales force and admins for easy tracking. 
`,
  },
];
