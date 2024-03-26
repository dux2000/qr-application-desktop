import { Box, Dialog, Typography } from '@mui/material'
import React from 'react'

type CustomNotificationProps  = {
    open: boolean;
    title: string;
    description: string | JSX.Element;
    childrenButtons: JSX.Element[];
    buttonAlignment?: string
    titleColor?: string,
};

const CustomNotification: React.FC<CustomNotificationProps> = ({open, title, description, childrenButtons, buttonAlignment, titleColor}) => {
  return (
    <Dialog open={open} PaperProps={{ sx: { borderRadius: "12px" } }} >
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '420px',
            padding: '24px',
        }}>
            <Typography sx={{
                marginBottom: '32px',
                fontSize: '24px',
                fontStyle: 'normal',
                fontWeight: 700,
                lineHeight: 'normal',
                fontFamily: 'Source Sans Pro, sans-serif',
                color: titleColor ? titleColor : '#0B2556'
            }}>
                {title}
            </Typography>
            <Typography sx={{
                marginBottom: '32px',
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: 'normal',
                fontFamily: 'Source Sans Pro, sans-serif',
                color: 'black'
            }}>
                {description}
            </Typography>
            <div style={{display: 'flex', alignItems:'center', justifyContent: buttonAlignment || 'start'}}>
                {childrenButtons.map((button) => {
                    return <div style={{marginLeft: '16px'}}>{button}</div>
                })}
            </div>
        </Box>
    </Dialog>
  )
}

export default CustomNotification