import {Box, MenuItem, Select, styled, TextField} from "@mui/material";
import {COLORS} from "../../constants/theme";
import {useState} from "react";

const CssCustomTextField = styled(TextField) ({
    '& .MuiOutlinedInput-root': {
        height: '56px',
        fontFamily: 'QSBold',
        fontWeight: 600,
        lineHeight: '28px',
        fontSize: '18px',
        backgroundColor: COLORS.white,
        borderRadius: 0,
        '& fieldset': {
            borderColor: 'transparent',
        },
        '&:hover fieldset': {
            borderColor: 'transparent',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'transparent',
        },
        '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent'
        }
    },
})

const CssCustomSelect = styled(Select) ({
    width: '100%',
    fontFamily: 'QSBold',
    fontSize: '18px',
    fontWeight: 600,
    '.MuiOutlinedInput-notchedOutline': {
        borderColor: 'transparent',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: 'transparent'
    },
    '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
        borderColor: 'transparent'
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'transparent'
    },
    '.MuiSvgIcon-root ': {
        fill: `${COLORS.primary}!important`,
    }
})
const CustomTwoSelectAndInput = ({index, dataFirstSelect, setDataFirstSelect, dataSecondSelect, setDataSecondSelect, dataInput, setDataInput}:{index: any, dataFirstSelect: any, setDataFirstSelect: Function, dataSecondSelect: any, setDataSecondSelect: Function, dataInput: any, setDataInput: Function}) =>  {
    const [inputFirstSelectValue, setInputFirstSelectValue] = useState<string>("");
    const [inputSecondSelectValue, setInputSecondSelectValue] = useState<string>("");

    return (
    <Box sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        border: `1px solid ${COLORS.primary}`,
        borderRadius: '5px',
        overflow: 'hidden'
    }}>
        <Box sx={{ flex: 1, borderRight: `1px solid ${COLORS.primary}` }}>
            <CssCustomSelect
                onChange={(e) => {
                    setInputFirstSelectValue(e.target.value as string);
                    setDataFirstSelect(e.target.value, index);
                }}
            >
                {dataFirstSelect.map((value: any) => {
                    return <MenuItem value={value.id}>{value.name}</MenuItem>
                })}
            </CssCustomSelect>
        </Box>
        <Box sx={{ flex: 1, borderRight: `1px solid ${COLORS.primary}` }}>
            <CssCustomSelect
                disabled={inputFirstSelectValue === ""}
                onChange={(e) => {
                    setInputSecondSelectValue(e.target.value as string);
                    setDataSecondSelect(e.target.value, index);
                }}
            >
                {dataSecondSelect.map((value: any) => {
                    return <MenuItem value={value.id}>{value.name}</MenuItem>
                })}
            </CssCustomSelect>
        </Box>
        <Box sx={{ flex: 1}} >
            <CssCustomTextField
                disabled={inputSecondSelectValue === ""}
                type={'text'}
                onChange={(e : any) => {
                    setDataInput(e.target.value, index);
                }}
            />
        </Box>
    </Box>
  );
}

export default CustomTwoSelectAndInput;