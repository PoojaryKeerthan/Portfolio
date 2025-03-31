import Project1 from "../assets/Project1.png";
import Project2 from "../assets/Project2.jpeg";
import Project3 from "../assets/Project3.jpeg";
import { BiCodeAlt, BiMobileAlt, BiPalette, BiSearchAlt } from "react-icons/bi";
import { SiGmail } from "react-icons/si";
import { IoMdCall } from "react-icons/io";
import { BsLinkedin } from "react-icons/bs";
import { FaGithubSquare, FaCity,FaJava  } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
export const menuItems = [
  { label: "Home", href: "#" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const projects = [
  {
    id: 1,
    title: "MLA Finder: Discover Your Regional Leaders",
    image: Project1,
    description:
      "MLA Finder is an interactive web tool that allows users to click on any region in the Indian map and instantly view the Member of Legislative Assembly (MLA) details for that area. Built with React, Node.js, and interactive mapping technologies, this project simplifies political awareness by providing quick access to regional leadership information",
  },
  {
    id: 2,
    title: "FlavorFind: Your Ultimate Recipe Companion",
    image: Project2,
    description:
      "Helping You Reunite with Your Lost Items!FindIt is a smart lost item finder available as both a mobile app (React Native) and a web platform (React, Node.js, MongoDB). Whether you've lost something or found an unclaimed item, FindIt connects people to help recover lost belongings efficiently.",
  },
  {
    id: 3,
    title: " FindIt: Lost & Found Made Easy",
    image: Project3,
    description:
      "A highly customizable and interactive admin dashboard built with Tailwind CSS, React, and Chart.js to visualize complex data effectively.",
  },
];

export const services = [
  {
    title: "Web Development",
    description:"Experienced in React.js for building dynamic and interactive UIs, and Node.js for developing scalable backend services. Proficient in MongoDB and Firebase for efficient database management and real-time data handling. Skilled in Git for version control, ensuring smooth collaboration and deployment.Passionate about creating responsive, high-performance web applications with a focus on user experience and scalability.",
    icon: BiCodeAlt,
  },
  {
    title: "Mobile App Development",
    description:
      "Proficient in React Native for building cross-platform mobile applications with a smooth and native-like experience. Skilled in Firebase for real-time data handling, authentication, and cloud storage. Experienced in Node.js and MongoDB for creating scalable backend services. Passionate about developing efficient, user-friendly, and high-performance mobile apps that work seamlessly on both Android and iOS.",
    icon: BiMobileAlt,
  },
  {
    title: "UI/UX Design",
    description:
      "Proficient in Figma for designing intuitive and engaging user interfaces with a focus on user experience. Skilled in wireframing, prototyping, and interactive design to create seamless digital experiences. Experienced in user research and accessibility principles for building modern, user-friendly interfaces. Passionate about crafting visually appealing and functional designs that enhance usability across web and mobile platforms.",
    icon: BiPalette,
  },
  {
    title: "Java Programming",
    description:
      "Proficient in Java with a strong understanding of object-oriented programming (OOP) principles and problem-solving. Skilled in writing efficient, clean, and optimized code for algorithms and data structures. Passionate about leveraging Java for competitive programming, logical thinking, and software development fundamentals. Continuously exploring new challenges to enhance coding efficiency and logical reasoning",
    icon: FaJava,
  },
];

export const contactDetails = [
  {
    id: 1,
    type: "Email",
    link: "mailto:keerthanpoojary221@gmail.com",
    icon: <SiGmail color="white" size={30} />,
  },
  {
    id: 2,
    type: "LinkedIn",
    link: "https://www.linkedin.com/in/keerthan-poojary-845903282?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    icon: <BsLinkedin color="white" size={30} />,
  },
  {
    id: 3,
    type: "Github",
    link: "https://github.com/PoojaryKeerthan",
    icon: <FaGithubSquare color="white" size={30} />,
  },
  {
    id: 4,
    type: "Instagram",
    link: " https://www.instagram.com/keerthan.__poojary",
    icon: <FaSquareInstagram color="white" size={30} />,
  },
];

export const words = [
  "React",
  "Next.js",
  "Tailwind",
  "TypeScript",
  "JavaScript",
  "HTML",
  "CSS",
  "Node.js",
  "Express",
  "MongoDB",
  "GraphQL",
  "Apollo",
  "APIs",
  "Git",
  "GitHub",
  "VS Code",
];

// ::-webkit-scrollbar {
//     width: 12px;
//     height: 12px;
//   }

//   ::-webkit-scrollbar-track {
//     background: #20242d;
//   }

//   ::-webkit-scrollbar-thumb {
//     background: #3b82f6;
//     border-radius: 6px;
//     border: 1px solid #eee;
//     transition: background 0.3s ease;
//   }

//   ::-webkit-scrollbar-thumb:hover {
//     background: #555555;
//   }
