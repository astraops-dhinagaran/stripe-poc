import { Sidebar } from "primereact/sidebar";
import useHLDStore from "../../store/hld.store";
import CustomTextBox from "./FormComponents/CustomTextBox";
import CustomDropdownBox from "./FormComponents/CustomDropdownBox";
import CustomCheckBox from "./FormComponents/CustomCheckBox";
import CustomRadioGroup from "./FormComponents/CustomRadioGroup";
import { useForm, FieldValues } from "react-hook-form";

function NodeProperties() {

  const { isNodePropertiesOpen, hldProperties, currentNode } = useHLDStore();

  const { formState: { errors }, control, setError, reset } = useForm<FieldValues>();

  const setIsNodePropertiesOpen = (value: boolean) => {
    useHLDStore.setState((state) => ({
      ...state,
      isNodePropertiesOpen: value,
      zodSchemaValidation: null,
      currentNode: null,
      hldProperties: [],
    }))
    reset();
  }

  const onValueChange = (value: any, field_name: string, field_type: string, is_required: boolean) => {
    if(field_type === "checkbox") {
      if (!value && is_required) {
        setError(field_name, { message: "This field is required" });
      } else {
        setError(field_name, { message: "" });
      }
    } else if (field_type === "select") {
      if (value.value === "" && is_required) {
        setError(field_name, { message: "This field is required" });
      } else {
        setError(field_name, { message: "" });
      }
    } else {
      if (value === "" && is_required) {
        setError(field_name, { message: "This field is required" });
      } else {
        setError(field_name, { message: "" });
      }
    }
  }

  const onDebounce = (value: string) => {
    console.log(value);
  }

  console.log(errors);
    return (
      <Sidebar onHide={() => setIsNodePropertiesOpen(false)} visible={isNodePropertiesOpen}>
        <div>
          <h1>Node Properties</h1>
          <p>{currentNode}</p>
        </div>
        <form>
          {hldProperties.map((property: any) => (
            property.field_type === "input" ? <CustomTextBox control={control} key={property.field_name} onDebounce={onDebounce} property={property} onInputChange={onValueChange} errorMessages={errors} /> : 
            property.field_type === "select" ? <CustomDropdownBox control={control} key={property.field_name} property={property} onSelectChange={onValueChange} errorMessages={errors} /> : 
            property.field_type === "checkbox" ? <CustomCheckBox control={control} key={property.field_name} property={property} onCheckboxChange={onValueChange} errorMessages={errors} /> :
            property.field_type === "radio" ? <CustomRadioGroup control={control} key={property.field_name} property={property} onRadioChange={onValueChange} errorMessages={errors} /> : <></>
          ))}
        </form>
      </Sidebar>
    )
}

export default NodeProperties;