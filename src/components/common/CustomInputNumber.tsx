import { InputAdornment, TextField, styled } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import ErrorIcon from '@mui/icons-material/Error';

const CssTextField = styled(TextField, {
  shouldForwardProp: (prop) => prop !== "" && prop !== undefined
})<{errorMessage? : string}>(({errorMessage}) => ({
    '& .MuiFormLabel-root': {
      color: '#1E4B92',
    },
    '& .MuiTypography-root': {
      color: 'black',
      fontFamily: 'Source Sans Pro, sans-serif',
      fontSize: '18px',
      fontWeight: 600
    },
    '& .MuiFormHelperText-root': {
      color: '#D4423F',
      fontFamily: 'Source Sans Pro, sans-serif',
      fontWeight: 300,
      lineHeight: '16px',
      fontSize: '14px',
    },
    '& .MuiOutlinedInput-root': {
      height: '56px',
      fontFamily: 'Source Sans Pro, sans-serif',
      fontWeight: 600,
      lineHeight: '28px',
      fontSize: '18px',
      '& fieldset': {
        borderColor: errorMessage ? '#D4423F' : '#1E4B92',
      },
      '&:hover fieldset': {
        borderColor: errorMessage ? '#D4423F' : '#1E4B92',
      },
      '&.Mui-focused fieldset': {
        borderWidth: '1px',
        borderColor: errorMessage ? '#D4423F' : '#1E4B92',
      },
    },
    '&.description': {
      '& .MuiOutlinedInput-root': {
        height: 'auto',
      },
    },
  }));
  
function CustomInputNumber({ label,  setData, data, errorMessage, setErrorMessage, }: { label: string, setData: Function, data?: string, errorMessage?: string, setErrorMessage?: Function; }) {
    const [inputValue, setInputValue] = useState<string>(data || "");
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    
    const handleFocus = () => {
      setIsFocused(true);
    };
  
    const handleBlur = () => {
      setIsFocused(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.slice(0, -1);
      let lastChar =  e.target.value[e.target.value.length - 1];

      if(value === ("0") && (lastChar !== "," && lastChar !== ".")) {
        return
      }

      if(value === "" && lastChar === undefined) {
        setData("")
        setInputValue("")
      }

      if(value === "" && /^\d+$/.test(lastChar)) {
        setData(lastChar)
        setInputValue(lastChar)

        return
      }

      if(/^\d+$/.test(value)) {
        if(/^\d+$/.test(lastChar)) {
          setInputValue(value + lastChar)
          setData(value + lastChar)
        } else if(lastChar === "," || lastChar === ".") {
          setData(value + lastChar)
          setInputValue(value + lastChar)
        }
      } else if(/^\d+([.,]\d*)?$/.test(value)) {
        const numberOfDecimalValues = value.split(/[.,]/)[1].length
        if(numberOfDecimalValues < 2 && /^\d+$/.test(lastChar)) {
          setData(value + lastChar)
          setInputValue(value + lastChar)
        }
      }

      return;
    };
      
    const labelStyles = {
      fontFamily: 'Source Sans Pro, sans-serif',
      fontSize: !isFocused && inputValue === '' ? '16px' : '18px',
      fontWeight: !isFocused && inputValue === '' ? 400 : 300,
      lineHeight: !isFocused && inputValue === '' ? '20px' : '16px',
      color: errorMessage ? '#D4423F' : '#1E4B92',
    };
    
    return (
      <CssTextField
        inputRef={inputRef}
        value={inputValue}
        label={label}
        error={!!errorMessage}
        errorMessage={errorMessage}
        helperText={errorMessage}
        id="custom-css-outlined-input"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          handleChange(e);
          if (setErrorMessage) {
            setErrorMessage("");
          }}
        }
        onFocus={handleFocus}
        onBlur={handleBlur}
        fullWidth
        InputLabelProps={{
          style: labelStyles,
        }}
        InputProps={{endAdornment: 
          errorMessage ? (
            <InputAdornment position="end">
              <ErrorIcon sx={{color: "#D4423F"}}/>
            </InputAdornment>) :
            <InputAdornment position="end">
              EUR
            </InputAdornment>
        }}
      />
    );
}
    export default CustomInputNumber;