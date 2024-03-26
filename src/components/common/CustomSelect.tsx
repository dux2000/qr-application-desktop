import { FormControl, FormHelperText, InputLabel, MenuItem, Select, styled } from '@mui/material'
import { useState } from 'react'

const CssCustomSelect = styled(Select, {
  shouldForwardProp: (prop) => prop !== "" && prop !== undefined
})<{errorMessage? : string}>(({errorMessage}) => ({
    color: 'black',
    fontFamily: 'Source Sans Pro, sans-serif',
    fontSize: '18px',
    fontWeight: 600,
    '.MuiOutlinedInput-notchedOutline': {
      borderColor: errorMessage ? '#D4423F' : '#1E4B92',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: errorMessage ? '#D4423F' : '#1E4B92',
      borderWidth: '1px'
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: errorMessage ? '#D4423F' : '#1E4B92',
    },
    '.MuiSvgIcon-root ': {
      fill: errorMessage ? '#D4423F' : '#1E4B92 !important',
    }
  }));

const CustomSelect = ({ label, setData, data, defaultValue, errorMessage, setErrorMessage }: { label: string, setData: Function, data: any, defaultValue?: any, errorMessage?: string, setErrorMessage?: Function; }) => {
    const [inputValue, setInputValue] = useState<number | null>(defaultValue === undefined ? null : defaultValue);
    const [isFocused, setIsFocused] = useState<boolean>(false);
    
    const handleFocus = () => {
        setIsFocused(true);
    };
    
    const handleBlur = () => {
        setIsFocused(false);
    };
  return (
    <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label" 
            sx={{
                color: errorMessage ? '#D4423F !important' : '#1E4B92 !important',
                fontFamily: 'Source Sans Pro, sans-serif', 
                fontWeight: !isFocused && inputValue === null ? 400 : 300, 
                lineHeight: !isFocused && inputValue === null ? '20px' : '16px', 
                fontSize: !isFocused && inputValue === null ? '16px' : '18px'
            }}>
            {label}
        </InputLabel>
        <CssCustomSelect
          errorMessage={errorMessage}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label={label}
          onChange={(e) => {
              console.log(e.target.value)
            setData(e.target.value); 
            setInputValue(e.target.value as number); 
            if(setErrorMessage)
              setErrorMessage("") 
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
          defaultValue={defaultValue}
        >
            {data.map((value: any) => {
                return <MenuItem value={value.id}>{value.name}</MenuItem>
            })}
        </CssCustomSelect>
        {errorMessage !== "" && 
          <FormHelperText sx={{
            color: '#D4423F',
            fontFamily: 'Source Sans Pro, sans-serif',
            fontWeight: 300,
            lineHeight: '16px',
            fontSize: '14px'
          }}>
            {errorMessage}
          </FormHelperText>}
    </FormControl>
  )
}

export default CustomSelect