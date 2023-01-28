import { useEffect, useState } from "react";

import Button from "@/components/common/button";
import Input from "@/components/common/input";
import Modal from "@/components/common/modal";
import CustomSelect from "@/components/custom-select";
import DeviceForm from "@/components/device-form";
import StationCard from "@/components/station-card";
import Table from "@/components/table";
import { getDevices } from "@/core/services/api/api";
import { Device } from "@/core/services/api/models";
import useToggle from "@/hooks/use-toggle";

import styles from "./styles.module.scss";

const typeOptions = [
  { value: "ALL", label: "All" },
  { value: "WINDOWS", label: "Windows" },
  { value: "MAC", label: "Mac" },
  { value: "LINUX", label: "Linux" },
];

const sortOptions = [
  { value: "HDD_D", label: "HDD Capacity (Descending)" },
  { value: "HDD_U", label: "HDD Capacity (Ascending)" },
  { value: "NAME_D", label: "System Name (A-Z)" },
  { value: "NAME_U", label: "System Name (Z-A)" },
];

const sortNumOptions = (a: number, b: number, option: string) => {
  if (option === "HDD_U") return a - b;
  if (option === "HDD_D") return b - a;

  return 0;
};

const sortStrOptions = (a: string, b: string, option: string) => {
  if (option === "NAME_D") return a < b ? -1 : 1;
  if (option === "NAME_U") return b > a ? 1 : -1;

  return 0;
};

interface Props {
  devices: Device[];
  setDevices: (e: Device[]) => void;
}

const Home: React.FC<Props> = ({ devices, setDevices }) => {
  const [devicesCopy, setDevicesCopy] = useState(devices);
  const showCreateDeviceModal = useToggle();
  const [selectedType, setSelectedType] = useState(typeOptions[0]);
  const [sortType, setSortType] = useState(sortOptions[0]);
  const [searchValue, setSearchValue] = useState("");

  const search = (word: string) => {
    return devicesCopy.filter((item) =>
      item.systemName.toLowerCase().includes(word.toLowerCase())
    );
  };

  useEffect(() => {
    if (!searchValue) {
      setDevicesCopy(devices);
    } else if (searchValue) {
      setDevicesCopy(search(searchValue));
    }
  }, [searchValue]);

  const handleRemoveDevice = (device: Device) => {
    setDevices(devices.filter((d) => d.id !== device.id));
  };

  const refresh = async () => {
    const devices = (await getDevices()).data;
    setDevicesCopy(devices);
  };

  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.title}>Devices</h1>
        <Button variant="primary" onClick={showCreateDeviceModal.on}>
          <i className="icon-plus" />
          Add device
        </Button>
      </div>
      <div className={styles.searchBar}>
        <div className={styles.options}>
          <Input
            wrapperClassName={styles.searchInput}
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            icon={<i className="icon-magnifying-glass" />}
            placeholder="Search"
          />
          <CustomSelect
            title="Device type"
            options={typeOptions}
            value={selectedType}
            onChange={(v) =>
              setSelectedType(v as { label: string; value: string })
            }
            isSearchable={false}
            defaultValue={typeOptions[0]}
          />
          <CustomSelect
            title="Sort by"
            options={sortOptions}
            value={sortType}
            onChange={(v) => setSortType(v as { label: string; value: string })}
            isSearchable={false}
            defaultValue={sortOptions[0]}
          />
        </div>
        <Button onClick={() => refresh()} className={styles.refreshButton}>
          <i className="icon-refresh" />
        </Button>
      </div>
      <Table>
        {devicesCopy
          .filter(
            (item) =>
              selectedType.value === "ALL" || item.type === selectedType.value
          )
          .sort((a, b) =>
            sortType.value === "HDD_U" || sortType.value === "HDD_D"
              ? sortNumOptions(+a.hddCapacity, +b.hddCapacity, sortType.value)
              : sortStrOptions(a.systemName, b.systemName, sortType.value)
          )
          .map(
            (item) =>
              item.type && (
                <StationCard
                  refresh={refresh}
                  key={item.id}
                  device={item}
                  removeDevice={handleRemoveDevice}
                />
              )
          )}
      </Table>
      <Modal show={showCreateDeviceModal}>
        <DeviceForm
          refresh={refresh}
          close={showCreateDeviceModal.off}
          type="add"
        />
      </Modal>
    </>
  );
};

export default Home;
