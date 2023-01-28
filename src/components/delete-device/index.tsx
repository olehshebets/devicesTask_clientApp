import { deleteDevice } from "@/core/services/api/api";
import { Device } from "@/core/services/api/models";

import Button from "../common/button";

import styles from "./styles.module.scss";

interface Props {
  device: Device;
  removeDevice: (device: Device) => void;
  close: () => void;
  refresh: () => void;
}

const DeleteDevice: React.FC<Props> = ({
  device,
  refresh,
  close,
  removeDevice,
}) => {
  return (
    <div className={styles.deleteDevice}>
      <h1 className={styles.title}>Delete device?</h1>
      <p className={styles.text}>
        {`You are about to delete the device ${device?.systemName}. This action cannot
        be undone.`}
      </p>
      <div className={styles.buttons}>
        <Button variant="secondary" onClick={() => close()}>
          Cancel
        </Button>
        <Button
          variant="alert"
          onClick={() =>
            deleteDevice(device.id).then(() => {
              removeDevice(device);
              close();
              refresh();
            })
          }
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default DeleteDevice;
