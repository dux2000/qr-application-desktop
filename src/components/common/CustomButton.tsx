import { Button } from '@mui/material';
import React from 'react'

type CustomButtonProps = {
    buttonText: string;
    Icon?: React.ReactElement; // Add this line for the Icon prop
    textColor: string;
    buttonColor: string;
    onHoverButtonColor: string;
    width?: number;
    height?: number;
    border?: string;
    handleClick: Function;
};

const CustomButton = ({
                          buttonText,
                          Icon,
                          textColor,
                          buttonColor,
                          onHoverButtonColor,
                          border,
                          width,
                          height,
                          handleClick,
                      }: CustomButtonProps) => {

    return (
        <Button
            onClick={() => handleClick()}
            startIcon={Icon && React.cloneElement(Icon, { sx: { width: '24px', height: '24px' } })}
            sx={{
                fontWeight: 700,
                fontFamily: 'QSBold',
                fontSize: '18px',
                width: width ? `${width}px` : '118px',
                height: height ? `${height}px` : '40px',
                padding: '6px 20px',
                borderRadius: '26px',
                color: textColor,
                backgroundColor: buttonColor,
                textTransform: 'none',
                border: border ? border : 'none',
                cursor: 'pointer',
                '&:hover': {
                    backgroundColor: onHoverButtonColor,
                },
            }}
            disableRipple>
            {buttonText}
        </Button>
    )
}

export default CustomButton