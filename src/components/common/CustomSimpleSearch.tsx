import { Box, IconButton, InputBase, Paper } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';

const CustomSearch = ({childrenChecked, handleSearch, placeholder} : {childrenChecked: JSX.Element[], handleSearch: Function, placeholder: string}) => {
    const [focused, setFocused] = useState<boolean>(false)
    const containerRef = useRef<any>(null);

    const handleMouseDown = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target)) {
            setFocused(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleMouseDown);
        return () => {
            document.removeEventListener('click', handleMouseDown);
        };
    }, []);

    return (
        <>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                width: 360,
                height: 42,
                borderRadius: '20px',
                boxShadow: focused ? '2px 2px 4px 0px rgba(0, 0, 0, 0.12)' : 'none'
            }}
                 onFocus={() => setFocused(true)}
                 ref={containerRef}
            >
                <Paper sx={{
                    p: '2px 4px',
                    display: 'flex',
                    alignItems: 'center',
                    width: 360,
                    height: 42,
                    backgroundColor: focused ? 'white' : '#E6E6E6',
                    borderRadius: '20px',
                    boxShadow: 'none'}}
                >
                    <IconButton sx={{
                        p: '10px',
                        color: 'black',
                        '&:hover': {
                            backgroundColor: 'transparent'
                        }}}
                                aria-label="menu">
                        <SearchIcon />
                    </IconButton>
                    <InputBase
                        sx={{
                            ml: 1,
                            flex: 1,
                            color: '#101010',
                            fontFamily: 'Source Sans Pro, sans-serif',
                            fontSize: '14px',
                            fontWeight: 400,
                        }}
                        placeholder={placeholder}
                        inputProps={{ 'aria-label': 'search google maps' }}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </Paper>
            </Box>
        </>
    )
}

export default CustomSearch