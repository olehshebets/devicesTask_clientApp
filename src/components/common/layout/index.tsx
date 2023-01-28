import React from "react";

import TopBar from "../top-bar";

import styles from "./styles.module.scss";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <TopBar />
      <main className={styles.main}>{children}</main>
    </>
  );
};

export default Layout;
