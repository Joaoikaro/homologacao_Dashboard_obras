/* eslint-disable @typescript-eslint/no-explicit-any */
import type { SyntheticEvent } from 'react'

import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import type {
  BaseSelectProps} from '@mui/material';
import {
  Autocomplete,
  Checkbox,
  TextField,
} from '@mui/material'
import type { Control} from 'react-hook-form';
import { Controller } from 'react-hook-form'

// import { useTheme } from '../store/theme'
import { alphabeticalSort } from '../utils/alphabeticalSort'
import { useSettings } from '../hooks/useSettings';

interface MultiselectMaxTypes extends BaseSelectProps {
  name: string
  size?: 'small' | 'medium'
  control: Control<any>
  label?: string
  menuItens: { value: string; nome: string }[]
  disabled?: boolean
}

function MultiSelectMax({
  name,
  size = 'small',
  control,
  label,
  menuItens,
  disabled,
}: MultiselectMaxTypes) {
  // const { theme } = useTheme()

  const { settings } = useSettings()

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
  const checkedIcon = <CheckBoxIcon fontSize="small" />

  return (
    <Controller
      name={name}
      control={control}
      disabled={disabled}
      defaultValue={[]}
      render={({ field }) => {
        const { ref, onChange, value } = field

        const handleChange = (_: SyntheticEvent, newValue: any[]) => {
          const updatedValue = newValue?.filter(
            (item, index, self) =>
              index === self?.findIndex((t) => t.value === item.value),
          )

          onChange(updatedValue)
        }

        const handleOptionClick = (option: { value: string; nome: string }) => {
          const isSelected = value?.some(
            (item: { value: string }) => item.value === option.value,
          )

          if (isSelected) {
            onChange(
              value?.filter(
                (item: { value: string }) => item.value !== option.value,
              ),
            )

            return
          }

          onChange([...value, option])
        }

        return (
          <>
            <Autocomplete
              multiple={true}
              value={value}
              disabled={disabled}
              size={size}
              getOptionLabel={(option) => option.nome}
              onChange={handleChange}
              options={alphabeticalSort(menuItens)}
              disableCloseOnSelect
              autoComplete={false}
              renderOption={(props, option) => {
                const { key, ...optionProps } = props

                return (
                  <li
                    key={key}
                    {...optionProps}
                    onClick={() => handleOptionClick(option)}
                  >
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      disabled={disabled}
                      style={{ marginRight: 8 }}
                      checked={
                        value?.some(
                          (item: any) => item.value === option.value,
                        ) || false
                      }
                    />
                    {option.nome}
                  </li>
                )
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={label}
                  disabled={disabled}
                  inputRef={ref}
                  type="search"
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
                />
              )}
            />
          </>
        )
      }}
    />
  )
}

export default MultiSelectMax
