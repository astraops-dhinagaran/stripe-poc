import React from "react";

interface TextFieldProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }

function TextField({
    value,
    onChange
}: TextFieldProps) {
    return ( 
        <input value={value} onChange={onChange} className="border rounded-[12px] w-full h-[56px] py-[17px] px-[12px]" />
     );
}

export default TextField;