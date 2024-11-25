import { GitHub, Globe } from "react-feather";

import ExternalLinkIcon from "@/components/ExternalLinkIcon";

import styles from "./ProjectLinks.module.css";

interface ProjectLinksProps {
  live: string;
  github: string;
}

function ProjectLinks({ live, github }: ProjectLinksProps) {
  return (
    <div className={styles.wrapper}>
      <ExternalLinkIcon aria-label='Open deployed project' link={live}>
        <Globe size={40} strokeWidth={1} />
      </ExternalLinkIcon>

      <ExternalLinkIcon aria-label='Open project on GitHub' link={github}>
        <GitHub size={40} strokeWidth={1} />
      </ExternalLinkIcon>
    </div>
  );
}

export default ProjectLinks;
