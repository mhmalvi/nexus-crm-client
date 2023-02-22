export const customlinks = [
  { name: "Home", link: "/" },
  { name: "Course", link: "/course" },
  { name: "About", link: "/about-us" },
  {
    name: "More",
    submenu: [
      {
        name: "Blogs",
        sublink: "/blog",
      },
      {
        name: "Gallery",
        sublink: "/gallery",
      },
      {
        name: "Stories",
        sublink: "/stories",
      },
    ],
  },
  { name: "Contact", link: "/contact" },
  { name: "Login", link: "/auth" },
];
