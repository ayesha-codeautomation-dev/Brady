import { useFormContext, get, FieldErrors } from 'react-hook-form';

type UseFieldErrorProps = {
  name: string;
  errors?: FieldErrors;
};

const useFieldError = (props: UseFieldErrorProps) => {
  const { name, errors } = props;
  const contextMethods = useFormContext();
  const error = get(errors || contextMethods.formState.errors, name);

  if (!error) return null;

  return error;
};

export default useFieldError;
