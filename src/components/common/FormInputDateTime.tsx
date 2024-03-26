import { styled } from '@mui/material/styles';
import { DateTimePicker, DateTimePickerProps, DateTimeValidationError, PickerChangeHandlerContext, renderTimeViewClock } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Dayjs} from "dayjs";
import { useState } from 'react'
import { Box } from '@mui/material';

interface StyledDateTimePickerProps extends DateTimePickerProps<Dayjs> {
    hasInputValue?: boolean;
    isFocused?: boolean
    errorMessage?: string | undefined
}

const CssInputDateTime = styled(DateTimePicker)<StyledDateTimePickerProps>((props) => ({
    '& .MuiFormLabel-root': {
        color: props.errorMessage !== "" && props.errorMessage !== undefined  ? '#D4423F !important' : '#1E4B92 !important',
        fontFamily: 'Source Sans Pro, sans-serif',
        fontSize: !props.isFocused && props.hasInputValue ?  '16px' : '18px',
        fontWeight: !props.isFocused && props.hasInputValue ?  400 : 300,
        lineHeight: !props.isFocused && props.hasInputValue ?  '20px' : '16px',
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
        '&.Mui-error .MuiOutlinedInput-notchedOutline': {
          borderColor: props.errorMessage !== "" && props.errorMessage !== undefined  ? '#D4423F' : '#1E4B92',
        },
        '& fieldset': {
          borderColor: props.errorMessage !== "" && props.errorMessage !== undefined  ? '#D4423F' : '#1E4B92',
        },
        '&:hover fieldset': {
          borderColor: props.errorMessage !== "" && props.errorMessage !== undefined  ? '#D4423F' : '#1E4B92',
        },
        '&.Mui-focused fieldset': {
          borderWidth: '1px',
          borderColor: props.errorMessage !== "" && props.errorMessage !== undefined  ? '#D4423F' : '#1E4B92',
        },
      },
      '& .MuiSvgIcon-root': {
        opacity: 0.3
      }
}))

  
const FormInputDate = ({setData, data, label, errorMessage, setErrorMessage}: {setData: Function, data?: Dayjs | null, label: string, errorMessage?: string, setErrorMessage?: Function}) => {

    const [inputValue, setInputValue] = useState<Dayjs | null>(data || null);
    const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <>
      <Box>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CssInputDateTime
            onClose={() => setIsFocused(false)}
            sx={{
                width: '100%'
            }}
            label={label}
            format="DD/MM/YYYY, H:mm"
            viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
            }}
            errorMessage={errorMessage}
            defaultValue={inputValue}
            ampm={false}
            ampmInClock={false}
            hasInputValue={inputValue === null ? true : false}
            isFocused={isFocused}
            onChange={(value: unknown, context: PickerChangeHandlerContext<DateTimeValidationError>) => {
                setInputValue(value as Dayjs | null);
                setData(value)
                if (setErrorMessage) {
                  setErrorMessage("");
                }
            }}
            slotProps={{
              textField: {
                helperText: errorMessage,
                onFocus: () => {setIsFocused(true)},
                onBlur: () => {setIsFocused(false)}
              },
              inputAdornment: {
                onClick: () => setIsFocused(true)
              }
            }}
          />
        </LocalizationProvider>
      </Box>
    </>
  )
}

export default FormInputDate