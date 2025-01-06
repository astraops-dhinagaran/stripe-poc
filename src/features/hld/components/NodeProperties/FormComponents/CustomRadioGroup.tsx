import { RadioButton } from "primereact/radiobutton";
import { Control } from "react-hook-form";
import { Controller } from "react-hook-form";

function CustomRadioGroup({property, onRadioChange, control, errorMessages}: {property: any, onRadioChange: (value: string, field_name: string, field_type: string, is_required: boolean) => void, control: Control<any>, errorMessages: any}) {
    return (
        <div className="my-2">
            <label>{property.field_name}</label>
            <Controller
                name={property.field_name}
                control={control}
                defaultValue={property.value || ""}
                render={({ field }) => (
                    <>
                        {
                            property.options.map((option: any) => (
                                <div key={option.label} className="flex items-center gap-2">
                                    <RadioButton
                                        name={property.field_name}
                                        value={option.value}
                                        onChange={(e) => {
                                          field.onChange(e.value);
                                          onRadioChange(e.value, property.field_name, property.field_type, property.is_required);
                                        }}
                                        checked={field.value === option.value}
                                    />
                                    <label>{option.label}</label>
                                </div>
                            ))
                        }
                    </>
                )}
            />
            {errorMessages[property.field_name] && <div className="text-red-500">{errorMessages[property.field_name].message}</div>}
        </div>
     );
    }

export default CustomRadioGroup;