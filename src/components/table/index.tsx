import React from "react";

import styles from "./styles.module.scss";

interface Props {
  children: JSX.Element[];
}

const Table: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles.table}>
      <h2 className={styles.tableTitle}>Device</h2>
      <div className={styles.tableItems}>{children}</div>
    </div>
  );
};

export default Table;
