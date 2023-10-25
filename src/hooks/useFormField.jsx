import { useState, useCallback } from 'react';

// Este custom hook gestiona un campo de entrada y su valor
function useFormField(initialValue) {
  const [value, setValue] = useState(initialValue);

  const handleChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  return [value, handleChange];
}

export default useFormField;
