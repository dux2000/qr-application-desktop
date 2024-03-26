
import { FormControlLabel, FormHelperText, Switch, styled } from '@mui/material';
import mySvg from '../../assets/svgs/switch.svg'
import mySvgRed from '../../assets/svgs/switch_red.svg'

const CustomSwitchStyled = styled(Switch, {
  shouldForwardProp: (prop) => prop !== "" && prop !== undefined
})<{errorMessage? : string}>(({errorMessage}) => ({
    width: 52,
    height: 32,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: errorMessage ? '#D4423F' : '#1E4B92',
          opacity: 1,
          border: 0,
          transition: 'none'
        },
        '& .MuiSwitch-thumb': {
            width: 24,
            height: 24,
            transform: 'translateX(-12px) translateY(-4px)',
            backgroundImage: errorMessage ? `url(${mySvgRed})` : `url(${mySvg})`
        },
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      backgroundColor: '#1E4B92',
      width: 16,
      height: 16,
      marginTop: 6,
      position: 'relative',
      left: '55%',
      transform: 'translateX(-50%)'
    },
    '& .MuiSwitch-track': {
      borderRadius: 32 / 2,
      border: '1px solid #1E4B92',
      backgroundColor: 'white',
      opacity: 1,
      transition: 'none'
    },
  }));

const CustomSwitch = ({label, checked, handleChange, errorMessage, setErrorMessage} : {label: string, checked?: boolean, handleChange: Function, errorMessage?: string, setErrorMessage?: Function}) => {
  return (<>
    <FormControlLabel
      checked={checked}
      onChange={(event : React.SyntheticEvent) => { 
        handleChange((event.target as HTMLInputElement).checked); 
        if(setErrorMessage)
          setErrorMessage("") 
      }}
      sx={{ '& .MuiTypography-root': {
              color: errorMessage ? '#D4423F' : '#1E4B92',
              fontFamily: 'Source Sans Pro, sans-serif', 
              fontWeight: 400, 
              lineHeight: 'normal', 
              fontSize: '16px',
          }, 
      }}
      control={<CustomSwitchStyled sx={{ m: 1 }} errorMessage={errorMessage}/>}
      label={label}
    />
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
    </>
  )
}

export default CustomSwitch