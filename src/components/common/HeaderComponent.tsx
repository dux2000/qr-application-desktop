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
        <AppBar position="static" sx={{height: 70, backgroundColor: COLORS.secondary, boxShadow: 'none'}}>
            <Toolbar sx={{justifyContent: 'space-between'}}>
                <div style={{display: 'flex'}}>
                    <SvgIcon sx={{height: 'auto', width: 'auto'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="28" viewBox="0 0 100 28" fill="none">
                            <g clip-path="url(#clip0_1_432)">
                                <path d="M1.33356 0.860596H14.3356V27.1326H1.33356V0.860596ZM18.9885 0.860596V27.1326H31.9905V6.38822L36.6975 27.1326H50.4278H61.9796V0.860596H48.9776V20.7432L44.5081 0.860596H31.9905H18.9885ZM70.0621 0.860596L64.1424 27.1326H76.5162L77.5289 22.6651H85.9833L86.996 27.1326H99.3698L93.4501 0.860596H82.4359H81.0763H70.0621ZM81.7577 4.03917L84.0612 14.1954H79.4511L81.7577 4.03917Z" fill="white"/>
                                <path d="M13.6926 7.49961C13.6926 9.0607 13.0754 10.5578 11.9768 11.6617C10.8782 12.7656 9.38821 13.3857 7.83456 13.3857C6.28091 13.3857 4.79089 12.7656 3.69229 11.6617C2.59369 10.5578 1.9765 9.0607 1.9765 7.49961C1.9765 5.93853 2.59369 4.44138 3.69229 3.33752C4.79089 2.23367 6.28091 1.61353 7.83456 1.61353C9.38821 1.61353 10.8782 2.23367 11.9768 3.33752C13.0754 4.44138 13.6926 5.93853 13.6926 7.49961Z" fill="#1E4B92"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_1_432">
                                    <rect width="100" height="27.6316" fill="white"/>
                                </clipPath>
                            </defs>
                        </svg>
                    </SvgIcon>
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
