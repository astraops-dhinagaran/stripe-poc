import { Dropdown } from "primereact/dropdown";
import { Control, Controller } from "react-hook-form";

function CustomDropdownBox({property, onSelectChange, control, errorMessages}: {property: any, onSelectChange: (value: string, field_name: string, field_type: string, is_required: boolean) => void, control: Control<any>, errorMessages: any}) {
    return ( 
        <div className="my-2">
            <label>{property.field_name}</label>
            <Controller
                name={property.field_name}
                control={control}
                defaultValue={property.value || ""}
                render={({ field }) => (
                    <>
                        <Dropdown options={property.options} key={property.field_name} placeholder={property.field_name} value={field.value} onChange={(e) => {
                            field.onChange(e.value);
                            onSelectChange(e.value, property.field_name, property.field_type, property.is_required);
                        }} />
                    </>
                )}
            />
            {errorMessages[property.field_name] && <div className="text-red-500">{errorMessages[property.field_name].message}</div>}
        </div>
     );
}

export default CustomDropdownBox;