import { CSSProperties } from "react";

import { GitHub, Linkedin, Mail } from "react-feather";
import { Transition } from "motion";

import insightourImage from "../public/images/projects/App_Demo_Screenshot_Insightour.webp";
import pairLearnerImage from "../public/images/projects/App_Demo_Screenshot_PairLearner.webp";
import handsomeMenuImage from "../public/images/projects/App_Demo_Screenshot_Handsome.webp";
import mdsImage from "../public/images/projects/App_Demo_Screenshot_MDS.webp";
import todoListImage from "../public/images/projects/App_Demo_Screenshot_ToDo.webp";
import AmplifyIcon from "../public/images/aws-icons/Amplify.webp";
import CloudFrontIcon from "../public/images/aws-icons/CloudFront.webp";
import CodePipelineIcon from "../public/images/aws-icons/CodePipeline.webp";
import EC2Icon from "../public/images/aws-icons/EC2.webp";
import EBIcon from "../public/images/aws-icons/Elastic Beanstalk.webp";
import S3Icon from "../public/images/aws-icons/Simple Storage Service.webp";

export const PROJECTS = [
  {
    title: "Insightour",
    slug: "Insightour",
    description: "Static website for a travel agency with multilingual support.",
    stack: "Next.js, TypeScript, Framer Motion",
    media: insightourImage,
    year: "2024",
    github: "https://github.com/RybakovWebDev/Insightour",
    live: "https://www.insightour.agency/",
  },
  {
    title: "Pair Learner",
    slug: "PairLearner",
    description: "Full-stack website for learning languages.",
    stack: "Next.js, TypeScript, Supabase, Framer Motion",
    media: pairLearnerImage,
    year: "2024",
    github: "https://github.com/RybakovWebDev/pair-learner",
    live: "https://www.pairlearner.app/",
  },
  {
    title: "Handsome bar",
    slug: "Handsome",
    description: "Static website for a local bar with an interactive menu.",
    stack: "Next.js, TypeScript, Framer Motion",
    media: handsomeMenuImage,
    year: "2024",
    github: "https://github.com/RybakovWebDev/handsome-menu",
    live: "https://handsome-menu.vercel.app/",
  },
  {
    title: "MDS",
    slug: "MDS",
    description: "Full-stack website for looking up information related to films.",
    stack: "MERN, MUI",
    media: mdsImage,
    year: "2023",
    github: "https://github.com/RybakovWebDev/MDS",
    live: "https://main.d3agl6wdyl1nit.amplifyapp.com/",
  },
  {
    title: "To-do List",
    slug: "Todolist",
    description: "A simple, minimalist, responsive to-do list.",
    stack: "React",
    media: todoListImage,
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

export const smoothSpring: Transition = {
  type: "spring",
  damping: 60,
  stiffness: 500,
};

export const shevronAnimation: Transition = {
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

interface ThemeColors extends CSSProperties {
  "--color-text": string;
  "--color-text-secondary": string;
  "--color-text-secondary-light": string;
  "--color-underline": string;
  "--color-background": string;
  "--color-background-secondary": string;
  "--color-gradient-lightness": string;
}

export const LIGHT_COLORS: ThemeColors = {
  "--color-text": "hsl(0 0% 0%)",
  "--color-text-secondary": "hsl(0 0% 0%)",
  "--color-text-secondary-light": "hsl(0, 0%, 30%)",
  "--color-underline": "0, 0, 0",
  "--color-background": "hsl(0 0% 92%)",
  "--color-background-secondary": "hsla(0, 0%, 0%, 0.2)",
  "--color-gradient-lightness": "92%",
};

export const DARK_COLORS: ThemeColors = {
  "--color-text": "hsl(0 0% 92%)",
  "--color-text-secondary": "hsl(0 0% 0%)",
  "--color-text-secondary-light": "hsl(0, 0%, 64%)",
  "--color-underline": "250, 250, 250",
  "--color-background": "hsl(0 0% 8%)",
  "--color-background-secondary": "hsla(0, 0%, 80%, 0.4)",
  "--color-gradient-lightness": "8%",
};

export const timeline = [
  {
    date: "2024 - Present",
    name: "Vennie Tech UG",
    position: "Full-Stack Developer",
    bullets: [
      "Implemented JTL warehouse management system integration, including REST API connectivity, intuitive onboarding UI for non-technical users, and backend services for order management synchronization between JTL and Shopify, expanding the platform's reach to businesses using JTL-Wawi",
      "Integrated multiple third-party services (Notion, Xentral, Freshdesk, Gorgias) via REST APIs with a primary Python/FastAPI backend and a dedicated Node.js backend for external integrations",
      "Built and maintained key frontend components using React, TypeScript and MUI",
      "Wrote automated end-to-end tests using Playwright to verify cross-platform workflows, reducing manual QA and accelerating deployment cycles",
      "Developed initial Stripe-based payment infrastructure, including API integration, subscriptions, usage tracking, and automated billing",
    ],
  },
  {
    date: "2022 - 2024",
    name: "Self-employed",
    position: "Full-Stack Developer",
    bullets: [
      "Architected and deployed Pair Learner, a full-stack language learning platform with user authentication, PostgreSQL database, and Amazon SES email integration, featuring advanced game mechanics and tag-based content filtering",
      "Delivered Insightour, a multilingual travel agency with custom D3.js map visualizations, automatic language detection, and Google Sheets API integration, achieving perfect 100/100 Lighthouse scores",
      "Engineered Movie Data Search using MERN stack, integrating AI chatbot functionality with drag-and-drop interfaces and comprehensive AWS deployment across EC2, S3, and CloudFront",
      "Established automated CI/CD pipelines and cloud infrastructure management, consistently delivering optimized applications with perfect performance metrics",
    ],
  },
];
