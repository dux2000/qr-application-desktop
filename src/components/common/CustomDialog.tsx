import { Box, Dialog, IconButton, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

const CustomDialog = ({childrenForms, childrenSwitch, title, childrenButton, open, handleOpen}: {childrenForms: JSX.Element[], childrenSwitch?: JSX.Element[], title: string, childrenButton: JSX.Element, open: boolean, handleOpen: Function}) => {
    return (
    <Dialog open={open} PaperProps={{ sx: { borderRadius: "12px" } }} onClose={() => handleOpen(false)}>
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '420px',
            padding: '24px',
        }}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px'}}>
                <Typography sx={{
                    fontSize: '24px',
                    fontStyle: 'normal',
                    fontWeight: 700,
                    lineHeight: 'normal',
                    fontFamily: 'Source Sans Pro, sans-serif',
                    color: '#0B2556'
                }}>
                    {title}
                </Typography>
                <IconButton sx={{
                    color: '#1E4B92',
                    '&:hover': {
                        backgroundColor: '#E6E6E6',
                      },
                    }} 
                    onClick={() => handleOpen(false)}>
                    <CloseIcon />
                </IconButton>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'start'}}>
                {childrenForms.map((child) => 
                    <div style={{width: '90%', marginBottom: '32px'}}>
                        {child}
                    </div>
                )}
            </div>
            <div style={{display: 'flex', flexDirection: 'column', marginBottom: '32px'}}>
                {childrenSwitch?.map((child) => child)}
            </div>
            <div>
                {childrenButton}
            </div>
        </Box>
    </Dialog>)
}

export default CustomDialog