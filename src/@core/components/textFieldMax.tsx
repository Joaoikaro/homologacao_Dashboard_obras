/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { BaseTextFieldProps } from '@mui/material';
import { TextField } from '@mui/material'
import type { Control } from 'react-hook-form';
import { Controller } from 'react-hook-form'

import { useSettings } from '../hooks/useSettings';

interface TextFieldMaxTypes extends BaseTextFieldProps {
  name: string
  size?: 'small' | 'medium'
  control: Control<any>
  slotProps?: any
  label?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function TextFieldMax({
  name,
  size = 'small',
  control,
  slotProps,
  label,
  ...rest
}: TextFieldMaxTypes) {
  const { settings } = useSettings()

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <TextField
          size={size}
          label={label}
          fullWidth
          slotProps={slotProps}
          sx={{
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
            {
              border: '1px solid #0064AC',
            },
            '& .MuiInputBase-input.Mui-disabled': {
              color: settings.mode === 'light' ? '#525252' : '#ffff',
              WebkitTextFillColor:
                settings.mode === 'light' ? '#525252' : '#ffff',
            },
          }}
          {...field}
          {...rest}
        />
      )}
    />
  )
}

export default TextFieldMax
