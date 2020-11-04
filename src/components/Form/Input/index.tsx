import React, { InputHTMLAttributes, useEffect, useRef } from "react";
import { useField } from "@unform/core";

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

const Input: React.FC<IInput> = ({ name, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { defaultValue, error, registerField, fieldName } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  return (
    <div>
      <input defaultValue={defaultValue} ref={inputRef} {...rest} />
      {error && <span>{error}</span>}
    </div>
  );
};

export default Input;
