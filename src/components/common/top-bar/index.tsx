import Logo from "../logo";

import styles from "./styles.module.scss";

const TopBar = () => {
  return (
    <header className={styles.header}>
      <Logo />
    </header>
  );
};

export default TopBar;
