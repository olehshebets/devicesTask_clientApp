import React, { useEffect, useState } from "react";

import { Device } from "@/core/services/api/models";
import useToggle from "@/hooks/use-toggle";

import Button from "../common/button";
import Modal from "../common/modal";
import DeleteDevice from "../delete-device";
import DeviceForm from "../device-form";
import Dropdown from "../dropdown";

import styles from "./styles.module.scss";

interface Props {
  device: Device;
  refresh: () => void;
  removeDevice: (device: Device) => void;
}

const StationCard: React.FC<Props> = ({ device, refresh, removeDevice }) => {
  const isHover = useToggle();
  const showDropdown = useToggle();
  const showDeleteDeviceModal = useToggle();
  const showEditDeviceModal = useToggle();

  const description =
    device.type[0].toUpperCase() + device.type.toLowerCase().slice(1);

  const dropdownContent = (
    <>
      <Button
        onClick={() => {
          showEditDeviceModal?.on();
          isHover.off();
        }}
        className={styles.dropdownEditButton}
      >
        Edit
      </Button>
      <Button
        onClick={() => {
          showDeleteDeviceModal?.on();
          isHover.off();
        }}
        className={styles.dropdownDeleteButton}
      >
        Delete
      </Button>
    </>
  );

  useEffect(() => {
    if (!isHover.value) showDropdown.off();
  }, [isHover, isHover.value]);

  return (
    <div
      className={styles.card}
      onMouseEnter={isHover.on}
      onMouseLeave={isHover.off}
    >
      <div>
        <div className={styles.titleWrapper}>
          <i
            className={`icon-${
              device.type === "MAC" ? "apple" : device.type.toLowerCase()
            }`}
          />
          <h3 className={styles.title}>{device.systemName}</h3>
        </div>
        <p className={styles.description}>
          {`${description} workstation - ${device.hddCapacity} GB`}
        </p>
      </div>

      <Dropdown
        active={showDropdown.value}
        align="right"
        content={dropdownContent}
      >
        <Button onClick={showDropdown.toggle} className={styles.optionButton}>
          <i className="icon-three-dots" />
        </Button>
      </Dropdown>

      <Modal show={showDeleteDeviceModal}>
        <DeleteDevice
          refresh={refresh}
          close={showDeleteDeviceModal.off}
          device={device}
          removeDevice={removeDevice}
        />
      </Modal>
      <Modal show={showEditDeviceModal}>
        <DeviceForm
          close={showEditDeviceModal.off}
          initialValues={{
            ...device,
            type: {
              value: device.type,
              label: `${device.type[0].toUpperCase()}${device.type
                .toLowerCase()
                .slice(1)}`,
            },
          }}
          type="edit"
          refresh={refresh}
        />
      </Modal>
    </div>
  );
};

export default StationCard;
