import { IconButton, InputAdornment, TextField, styled } from "@mui/material";
import ErrorIcon from '@mui/icons-material/Error';
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {COLORS} from "../../constants/theme";

const CssTextField = styled(TextField, {
    shouldForwardProp: (prop) => prop !== "" && prop !== undefined
})<{errorMessage? : string}>(({errorMessage}) => ({
    '& .MuiFormLabel-root': {
        color: COLORS.primary,
    },
    '& .MuiFormHelperText-root': {
        color: 'red',
        fontFamily: 'QSBold',
        fontWeight: 300,
        lineHeight: '16px',
        fontSize: '14px',
    },
    '& .MuiOutlinedInput-root': {
        height: '56px',
        fontFamily: 'QSBold',
        fontWeight: 600,
        lineHeight: '28px',
        fontSize: '18px',
        backgroundColor: COLORS.white,
        borderRadius: 20,
        '& fieldset': {
            borderColor: errorMessage ? '#D4423F' : COLORS.primary,
        },
        '&:hover fieldset': {
            borderColor: errorMessage ? '#D4423F' : COLORS.primary,
        },
        '&.Mui-focused fieldset': {
            borderWidth: '2px',
            borderColor: errorMessage ? '#D4423F' : COLORS.primary,
        },
    },
    '&.description': {
        '& .MuiOutlinedInput-root': {
            height: 'auto',
        },
    },
}));

function FormInputText({
                           label,
                           type,
                           setData,
                           data,
                           errorMessage,
                           setErrorMessage,
                           showPassword,
                           handleClickShowPassword
                       }: {
    label: string;
    type: string;
    setData: Function;
    data?: string;
    errorMessage?: string;
    setErrorMessage?: Function;
    showPassword?: boolean,
    handleClickShowPassword?: Function

}) {
    const [inputValue, setInputValue] = useState<string>(data || "");
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const labelStyles = {
        fontFamily: 'QSBold',
        fontSize: !isFocused && inputValue === '' ? '16px' : '18px',
        fontWeight: !isFocused && inputValue === '' ? 400 : 300,
        lineHeight: !isFocused && inputValue === '' ? '20px' : '14px',
        color: errorMessage ? '#D4423F' : COLORS.primary,
    };

    return (
        <CssTextField
            error={!!errorMessage}
            errorMessage={errorMessage}
            helperText={errorMessage}
            className={type === 'description' ? 'description' : ''}
            label={label}
            type={showPassword ? 'text' : type}
            id="custom-css-outlined-input"
            onChange={(e : any) => {
                setInputValue(e.target.value);
                setData(e.target.value);
                if (setErrorMessage) {
                    setErrorMessage("");
                }
            }}
            defaultValue={data}
            onFocus={handleFocus}
            onBlur={handleBlur}
            fullWidth
            multiline={type === 'description'}
            rows={type === 'description' ? 4 : 0}
            InputLabelProps={{
                style: labelStyles,
            }}
            InputProps={{endAdornment:
                    errorMessage ? (
                            <InputAdornment position="end">
                                <ErrorIcon sx={{color: "#D4423F"}}/>
                            </InputAdornment>)
                        : type === 'password' ? (
                                <InputAdornment position="end">
                                    <IconButton
                                        disableRipple
                                        onClick={() => {
                                            if(handleClickShowPassword)
                                                handleClickShowPassword()
                                        }}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>)
                            : ''
            }}
        />
    );
}

export default FormInputText;
