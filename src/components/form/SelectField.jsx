import PropTypes from 'prop-types';
import Select from 'react-select';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const SelectField = ({
  control,
  name,
  label,
  options,
  isDisabled,
  isLoading,
  isClearable,
  isSearchable,
  placeholder,
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { onChange, value, ref } }) => {
        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Select
                inputRef={ref}
                name={name}
                options={options}
                value={options.find((option) => option.value === value)}
                onChange={(selected) => onChange(selected?.value)}
                className='basic-single'
                classNamePrefix='select'
                placeholder={placeholder}
                isDisabled={isDisabled}
                isLoading={isLoading}
                isClearable={isClearable}
                isSearchable={isSearchable}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

SelectField.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  isClearable: PropTypes.bool,
  isSearchable: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default SelectField;
