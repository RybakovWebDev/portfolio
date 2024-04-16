import { FileText, GitHub, Linkedin, Mail } from "react-feather";

import AmplifyIcon from "../public/images/aws-icons/Amplify.webp";
import CloudFrontIcon from "../public/images/aws-icons/CloudFront.webp";
import CodePipelineIcon from "../public/images/aws-icons/CodePipeline.webp";
import EC2Icon from "../public/images/aws-icons/EC2.webp";
import EBIcon from "../public/images/aws-icons/Elastic Beanstalk.webp";
import S3Icon from "../public/images/aws-icons/Simple Storage Service.webp";

export const PROJECTS = [
  {
    title: "MDS",
    slug: "MDS",
    description: "Full-stack website for looking up information related to films.",
    stack: "MERN",
    media: "/images/projects/App_Demo_Screenshot_MDS.webp",
    mediaHomePageMP4: "Homepage_H264_MP4.mp4",
    year: "2023",
    github: "https://github.com/RybakovWebDev/MDS",
    live: "https://main.d3agl6wdyl1nit.amplifyapp.com/",
  },
  {
    title: "To-do List",
    slug: "Todolist",
    description: "Minimalistic to-do list.",
    stack: "React",
    media: "/images/projects/App_Demo_Screenshot_ToDo.webp",
    year: "2022",
    github: "https://github.com/RybakovWebDev/todo-list-react-2022",
    live: "https://todo-list-react-2022.pages.dev/",
  },
];

export const NAVLINKS = [
  {
    title: "About Me",
    slug: "about",
    href: "/",
  },
  {
    title: "Projects",
    slug: "projects",
    href: "/",
  },
  {
    title: "Contact",
    slug: "contact",
    href: "/",
  },
];

export const RESUME = [
  {
    title: ".PDF",
    link: "https://docs.google.com/document/d/1QsEgbn54SGjTYwA3Z6I24Ea3BXf89S-9UUsQdLMgyZ0/export?format=pdf",
    icon: "/images/icons/PDF_file_icon.svg",
  },
  {
    title: ".DOCX",
    link: "https://docs.google.com/document/d/1QsEgbn54SGjTYwA3Z6I24Ea3BXf89S-9UUsQdLMgyZ0/export?format=docx",
    icon: "/images/icons/docx_icon.svg",
  },
];

export const CONTACTS = [
  {
    title: "LinkedIn",
    link: "https://www.linkedin.com/in/andrey-rybakov-webdev/",
    icon: <Linkedin size={30} strokeWidth={1} />,
  },
  {
    title: "GitHub",
    link: "https://github.com/RybakovWebDev",
    icon: <GitHub size={30} strokeWidth={1} />,
  },
  {
    title: "Email",
    link: "mailto:contact@rybakov.dev",
    icon: <Mail size={30} strokeWidth={1} />,
  },
];

export const TECHICONS = [
  "/images/icons/React_logo512.png",
  "/images/icons/Nextjs-logo.webp",
  "/images/icons/Unofficial_JavaScript_logo_2.svg",
  "/images/icons/CSS3logoandwordmark.svg",
  "/images/icons/Framer-Motion.webp",
  "/images/icons/react-spring.webp",
  "/images/icons/material-ui-icon-2048x1626-on580ia9.webp",
  "/images/icons/Node.js_logo.svg",
  "/images/icons/MongoDB_Logo.svg",
  "/images/icons/Amazon_Web_Services_Logo.svg",
  "/images/icons/Axios_(computer_library)_logo.webp",
  "/images/icons/Git-logo.svg",
  "/images/icons/HTML5_logo_and_wordmark.svg",
  "/images/icons/Bootstrap_logo.svg",
  "/images/icons/Npm-logo.svg",
  "/images/icons/react-router-stacked-color.svg",
  "/images/icons/Redux_logo.svg",
  "/images/icons/Firebase_Logo.svg",
  "/images/icons/JQuery-Logo.svg",
  "/images/icons/Tailwind_CSS_logo.svg",
];

export const AWSICONS = [
  {
    name: "ec2",
    icon: EC2Icon,
  },
  {
    name: "s3",
    icon: S3Icon,
  },
  {
    name: "elasticBeanstalk",
    icon: EBIcon,
  },
  {
    name: "amplify",
    icon: AmplifyIcon,
  },
  {
    name: "codepPipeline",
    icon: CodePipelineIcon,
  },
  {
    name: "cloudFront",
    icon: CloudFrontIcon,
  },
];

export const smoothSpring = {
  type: "spring",
  damping: 60,
  stiffness: 500,
};

export const shevronAnimation = {
  delay: 1,
  duration: 1,
  ease: "easeInOut",
  repeat: Infinity,
  repeatDelay: 1,
};

export const initialVerticalOffset = {
  y: 20,
  opacity: 0,
};

export const finalVerticalOffset = {
  y: 0,
  opacity: 1,
};

export const duration300 = {
  duration: 0.3,
};

export const duration500 = {
  duration: 0.5,
};

export const opacity1 = {
  opacity: 1,
};
export const opacity0 = {
  opacity: 0,
};

export const LIGHT_COLORS = {
  "--color-text": "hsl(0 0% 0%)",
  "--color-text-secondary": "hsl(0 0% 0%)",
  "--color-underline": "0, 0, 0",
  "--color-background": "hsl(0 0% 92%)",
  "--color-background-secondary": "hsla(0, 0%, 0%, 0.1)",
  "--color-gradient-lightness": "92%",
};

export const DARK_COLORS = {
  "--color-text": "hsl(0 0% 92%)",
  "--color-text-secondary": "hsl(0 0% 0%)",
  "--color-underline": "250, 250, 250",
  "--color-background": "hsl(0 0% 8%)",
  "--color-background-secondary": "hsla(0, 0%, 80%, 0.4)",
  "--color-gradient-lightness": "8%",
};
