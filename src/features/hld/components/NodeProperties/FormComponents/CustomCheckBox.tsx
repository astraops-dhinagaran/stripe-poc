import { Checkbox } from "primereact/checkbox";
import { Controller, Control } from "react-hook-form";

function CustomCheckBox({property, onCheckboxChange, control, errorMessages}: {property: any, onCheckboxChange: (value: boolean, field_name: string, field_type: string, is_required: boolean) => void, control: Control<any>, errorMessages: any}) {
    return ( 
        <div className="my-2">
            <label>{property.field_name}</label>
            <Controller
                name={property.field_name}
                control={control}
                defaultValue={property.value || false}
                render={({ field }) => (
                    <>
                        <Checkbox checked={field.value} onChange={(e) => {
                            field.onChange(e.target.checked || false);
                            onCheckboxChange(e.target.checked || false, property.field_name, property.field_type, property.is_required);
                        }} />
                    </>
                )}
            />
            {errorMessages[property.field_name] && <div className="text-red-500">{errorMessages[property.field_name].message}</div>}
        </div>
     );
}

export default CustomCheckBox;