import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Menu,
    MenuItem,
    Typography,
    SvgIcon,
} from "@mui/material";
import {
    Logout as LogoutIcon,
    ExpandMore as ExpandMoreIcon,
    ExpandLessOutlined,
} from "@mui/icons-material/";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {COLORS} from "../../constants/theme";

export default function HeaderComponent({username, description} : {username?: string, description?: string}) {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const dispatch = useDispatch();

    function handleOpenUserMenu(event: any) {
        setAnchorElUser(event.currentTarget);
    }
    function handleCloseUserMenu() {
        setAnchorElUser(null);
    }

    return (
        <AppBar position="static" sx={{height: 70, backgroundColor: COLORS.primary, boxShadow: 'none'}}>
            <Toolbar sx={{justifyContent: 'space-between'}}>
                <div style={{display: 'flex'}}>
                    <Box sx={{
                        width: '60px',
                        height: '60px',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                    }}/>
                    {description && <Typography sx={{
                        paddingLeft: '16px',
                        paddingTop: '10px',
                        fontSize: '24px',
                        fontStyle: 'normal',
                        fontWeight: 300,
                        lineHeight: 'normal',
                        fontFamily: 'Source Sans Pro, sans-serif',
                        marginBottom: '1px'
                    }}>
                        {description}
                    </Typography>}
                </div>
                {username &&<Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        '&:hover': {
                            '& *': {
                                color: 'red',

                                backgroundColor: 'transparent',
                            },
                        },
                    }}>
                    <Typography sx={{
                        paddingRight: '8px',
                        fontFamily: 'Source Sans Pro, sans-serif',
                        fontSize: '14px',
                        fontStyle: 'normal',
                        fontWeight: '400',
                        lineHeight: 'normal',
                        color: 'white',
                    }}>
                        {username}
                    </Typography>
                    {anchorElUser === null ?
                        <IconButton
                            sx={{ color: 'white', }}
                            onClick={handleOpenUserMenu}
                            disableRipple
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                        :
                        <IconButton
                            sx={{ color: 'white', backgroundColor: '#0B2556' }}
                            disableRipple
                        >
                            <ExpandLessOutlined />
                        </IconButton>
                    }
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        <MenuItem sx={{
                            '&:hover': {backgroundColor: 'transparent'}
                        }}
                                  onClick={() => {handleCloseUserMenu(); dispatch({ type: "SIGN_OUT" });}}>
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'start',
                                width: '127px',
                                '&:hover': {
                                    '& *': {
                                        color: 'red',
                                        backgroundColor: 'transparent',
                                    },
                                },
                            }}>
                                <LogoutIcon sx={{color: "#003E92"}}/>
                                <Typography textAlign="center" sx={{
                                    paddingLeft: '8px',
                                    fontFamily: 'Source Sans Pro, sans-serif',
                                    fontSize: '14px',
                                    fontStyle: 'normal',
                                    fontWeight: '400',
                                    lineHeight: 'normal',
                                    color: '#003E92',
                                }}>
                                    Log out
                                </Typography>
                            </Box>
                        </MenuItem>
                    </Menu>
                </Box>}
            </Toolbar>
        </AppBar>
    );
}
