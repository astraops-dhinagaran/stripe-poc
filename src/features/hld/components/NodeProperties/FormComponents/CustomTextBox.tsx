import { InputText } from "primereact/inputtext";
import { Control } from "react-hook-form";
import { Controller } from "react-hook-form";
import { useDebounce} from "primereact/hooks"
import { useEffect } from "react";

function CustomTextBox({
  property,
  onInputChange,
  control,
  errorMessages,
  onDebounce
}: {
  property: any;
  onInputChange: (value: string, field_name: string, field_type: string, is_required: boolean) => void;
  control: Control<any>;
  errorMessages: any;
  onDebounce: (value: string) => void;
}) {

  const [value, debouncedValue, setValue] = useDebounce(property.value, 1000);

  useEffect(() => {
    onDebounce(debouncedValue);
  }, [debouncedValue]);

  return (
    <div className="my-2">
      <label>{property.field_name}</label>
      <Controller
        name={property.field_name}
        control={control}
        defaultValue={value || ""}
        rules={{ required: property.is_required ? 'This field is required' : false }}
        render={({ field }) => (
          <>
            <InputText
              {...field}
              placeholder={property.field_name}
              onChange={(e) => {
                field.onChange(e);
                setValue(e.target.value);
                onInputChange(e.target.value, property.field_name, property.field_type, property.is_required);
              }}
            />
            {errorMessages[property.field_name] && <div className="text-red-500">{errorMessages[property.field_name].message}</div>}
          </>
        )}
      />
    </div>
  );
}

export default CustomTextBox;
