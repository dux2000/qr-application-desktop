import { Button } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check';

const CustomCheckbox = ({label, checked, handleChecked} : {label: string, checked: boolean, handleChecked: Function}) => {

  return (
    <Button sx={{
        width: '78px',
        height: '28px',
        backgroundColor: checked ? '#1E4B92' : 'white',
        borderRadius: '26px',
        border: '1px solid #1E4B92',
        fontFamily: 'Source Sans Pro, sans-serif',
        color: checked ? 'white' : '#1E4B92',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: checked ? '#0B2556' : '#E6E6E6'
        }
    }}
    onClick={() => handleChecked(!checked)}
    startIcon={checked && <CheckIcon sx={{marginRight: '-5px', color: 'white'}}/>}
    disableRipple 
    >
        {label}
    </Button>
  )
}

export default CustomCheckbox