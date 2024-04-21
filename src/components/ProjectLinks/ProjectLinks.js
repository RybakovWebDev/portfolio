import { ExternalLink, GitHub } from "react-feather";

import ExternalLinkIcon from "../ExternalLinkIcon";

import styles from "./ProjectLinks.module.css";

function ProjectLinks({ live, github }) {
  return (
    <div className={styles.wrapper}>
      <ExternalLinkIcon aria-label='Open deployed project' link={live}>
        <ExternalLink size={40} strokeWidth={1} />
      </ExternalLinkIcon>

      <ExternalLinkIcon aria-label='Open project on GitHub' link={github}>
        <GitHub size={40} strokeWidth={1} />
      </ExternalLinkIcon>
    </div>
  );
}

export default ProjectLinks;
