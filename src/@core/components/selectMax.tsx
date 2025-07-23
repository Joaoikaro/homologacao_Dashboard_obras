/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  BaseSelectProps} from '@mui/material';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'
import type { Control} from 'react-hook-form';
import { Controller } from 'react-hook-form'

import { alphabeticalSort } from '../utils/alphabeticalSort';


interface SelectMaxTypes extends BaseSelectProps {
  name: string
  size?: 'small' | 'medium'
  control: Control<any>
  label?: string
  menuItens: { value: string; nome: string }[]
  helperText?: string
  error?: boolean
}

function SelectMax({
  name,
  size = 'small',
  control,
  label,
  menuItens,
  helperText,
  error = false,
  ...rest
}: SelectMaxTypes) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControl fullWidth size={size} error={error}>
          <InputLabel>{label}</InputLabel>
          <Select
            label={label}
            size={size}
            value={field.value ?? ''}
            onChange={(e) => field.onChange(e.target.value)}
            {...rest}
          >
            {alphabeticalSort(menuItens).map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.nome}
              </MenuItem>
            ))}
          </Select>
          {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
      )}
    />
  )
}

export default SelectMax
