import React, { useEffect, useState } from 'react';
import { Select } from '@sanity/ui';
import { set, unset } from 'sanity';
import { uuid } from '@sanity/uuid';

import client from '../../client';

const CustomSelect = React.forwardRef((props, ref) => {
  const { value, onChange, schemaType } = props;
  const { query, onSelect, formatOptions } = schemaType;

  const [options, setOptions] = useState([]);

  const fetchData = async () => {
    const fetchedData = await client.fetch(query);
    let formattedOptions;

    if (formatOptions) {
      formattedOptions = formatOptions(fetchedData);
    } else {
      // Default options formatting
      formattedOptions = fetchedData.map(item => ({
        title: item.title,
        value: item._key
      }));
    }

    setOptions(formattedOptions);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Function to handle selection change
  const handleChange = React.useCallback(
    event => {
      const selectedOption = options.find(option => option.value === event.currentTarget.value);
      const valueToUpdate = onSelect ? onSelect(selectedOption) : selectedOption.value;
      const dataToUpdate = typeof valueToUpdate === 'object' ? { _key: uuid(), ...valueToUpdate } : valueToUpdate;
      onChange(dataToUpdate ? set(dataToUpdate) : unset());
    },
    [options, onChange, onSelect]
  );

  return (
    <Select ref={ref} value={value?.value} onChange={handleChange}>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.title}
        </option>
      ))}
    </Select>
  );
});

CustomSelect.displayName = 'CustomSelect';

export default CustomSelect;
