import { Box, IconButton, InputBase, Paper } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';

const CustomSearch = ({childrenChecked, handleSearch} : {childrenChecked: JSX.Element[], handleSearch: Function}) => {
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
            height: 94,
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
                borderRadius: focused ? '20px 20px 0 0' : '20px',
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
                    placeholder="Search user"
                    inputProps={{ 'aria-label': 'search google maps' }}
                    onChange={(e) => handleSearch(e.target.value)}
                />
            </Paper>
            {focused && <>
            <Box sx={{
                width: '359px',
                height: '1px',
                backgroundColor: '#101010',
                opacity: 0.1
            }}/>
            <Paper sx={{
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'center',
                width: 360,
                height: 52,
                borderRadius: '0 0 20px 20px',
                boxShadow: 'none',
            }}>
                {childrenChecked.map((child) => <div style={{margin: '0 10px'}}>{child}</div>)}
            </Paper>
            </>}
        </Box>
    </>
  )
}

export default CustomSearch