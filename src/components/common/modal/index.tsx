import { useEffect, useRef } from "react";

import useClickOutside from "@/hooks/use-click-outside";
import { UseToggleProps } from "@/hooks/use-toggle";

import Button from "../button";

import styles from "./styles.module.scss";

interface Props {
  show: UseToggleProps;
  children: JSX.Element | JSX.Element[];
}

const Modal: React.FC<Props> = ({ show, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (show.value) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
    }

    return () => {
      document.body.style.removeProperty("overflow");
      document.body.style.removeProperty("height");
    };
  }, [show.value]);

  useClickOutside(modalRef, () => {
    show.off();
  });

  return show.value ? (
    <div className={styles.modalWrapper}>
      <div ref={modalRef} className={styles.modalContent}>
        <Button className={styles.closeModalButton} onClick={show.off}>
          <i className="icon-cross"></i>
        </Button>
        {children}
      </div>
    </div>
  ) : null;
};

export default Modal;
