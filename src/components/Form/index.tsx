import React, { useCallback, useRef } from "react";
import { Form as UnForm } from "@unform/web";
import { FormHandles } from "@unform/core";
import Input from "./Input";
import * as Yup from "yup";

const Form: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data, { reset }) => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("Nome é obrigatório!"),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      reset();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages: any = {};

        err.inner.forEach((error) => {
          errorMessages[error.path] = error.message;
        });

        formRef.current?.setErrors(errorMessages);
      }
    }
  }, []);

  return (
    <UnForm onSubmit={handleSubmit}>
      <Input name="name" />
      <button type="submit">Submit</button>
    </UnForm>
  );
};

export default Form;
