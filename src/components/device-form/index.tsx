import { SingleValue } from "react-select";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  addDevice,
  CreateDeviceParams,
  editDevice,
  EditDeviceParams,
} from "@/core/services/api/api";
import { Device } from "@/core/services/api/models";

import Button from "../common/button";
import Input from "../common/input";
import CustomSelect, { OptionType } from "../custom-select";

import styles from "./styles.module.scss";

interface FormikType {
  id?: string;
  systemName: string;
  hddCapacity: string;
  type: { label: string; value: string };
}

interface Props {
  className?: string;
  type: "add" | "edit";
  initialValues?: FormikType;
  close: () => void;
  refresh: () => void;
}

const ValidationSchema = Yup.object().shape({
  // systemName: Yup.string().required(),
  // type: Yup.string().required(),
  // hddCapacity: Yup.number().required(),
});

const DeviceForm: React.FC<Props> = ({
  className,
  close,
  refresh,
  type,
  initialValues,
}) => {
  const options = [
    { value: "WINDOWS", label: "Windows" },
    { value: "MAC", label: "Mac" },
    { value: "LINUX", label: "Linux" },
  ];

  const initial: FormikType = initialValues
    ? {
        ...initialValues,
      }
    : {
        systemName: "",
        type: options[0],
        hddCapacity: "",
      };

  const handleSubmit = async (values: FormikType) => {
    type === "add"
      ? addDevice({
          system_name: values.systemName,
          type: values.type.value,
          hdd_capacity: values.hddCapacity,
        })
      : editDevice({
          id: values.id || "",
          system_name: values.systemName,
          type: values.type.value,
          hdd_capacity: values.hddCapacity,
        });
    close();
    refresh();
  };

  const formik = useFormik<FormikType>({
    initialValues: initial,
    onSubmit: handleSubmit,
    validationSchema: ValidationSchema,
  });

  const title = type[0].toUpperCase() + type.toLowerCase().slice(1);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>{`${title} device`}</h1>
      <form className={styles.form}>
        <Input
          id="systemName"
          label="System name"
          name="systemName"
          value={formik.values.systemName}
          onChange={formik.handleChange}
          error={formik.errors.systemName}
          required
        />
        <CustomSelect
          label="Device type"
          placeholder="Select type"
          type="input"
          options={options}
          isSearchable={false}
          inputId="type"
          value={formik.values.type}
          onChange={(value) => {
            formik.setFieldValue("type", value);
          }}
          error={formik.errors.type?.label}
          required
        />
        <Input
          id="hddCapacity"
          name="hddCapacity"
          label="HDD capacity"
          value={formik.values.hddCapacity}
          onChange={formik.handleChange}
          error={formik.errors.hddCapacity}
          required
        />
        <div className={styles.buttons}>
          <Button variant="secondary" onClick={() => close()}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={(e) => {
              e.preventDefault();
              formik.submitForm();
            }}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DeviceForm;
