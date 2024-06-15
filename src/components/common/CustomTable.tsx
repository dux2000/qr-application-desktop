import React from 'react'
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Typography, styled, tableCellClasses, useTheme } from '@mui/material';
import { TablePaginationActionsProps } from '../../../../../sedamIT/price-list-web/client/src/interface/TableInterface';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        sx={{ color: '#003E92' }}
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        sx={{ color: '#003E92' }}
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        sx={{ color: '#003E92' }}
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        sx={{ color: '#003E92' }}
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: 'transparent',
      color: '#0B2556',
      fontFamily: 'Source Sans Pro, sans-serif',
      fontSize: '14px',
      fontWeight: 600,
    },
    [`&.${tableCellClasses.body}`]: {
      fontFamily: 'Source Sans Pro, sans-serif',
      fontSize: '14px',
      fontWeight: 400,
      maxWidth: '200px', // Set the maximum width based on your needs
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
  }));

const CustomTable = ({
  tableHead, 
  data, 
  editRow,
  customAction,
  deleteRow, 
  totalSize, 
  handlePageChange, 
  messageForEmptyDataBold, 
  messageForEmptyDataRegular} : {
    tableHead: string[], 
    data: any[], 
    editRow: Function, 
    deleteRow: Function,
    customAction?: Function,
    totalSize: number, 
    handlePageChange?: Function,
    messageForEmptyDataBold?: string,
    messageForEmptyDataRegular?: string
  }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    handlePageChange!(event, newPage)
    setPage(newPage);
  };

  return (
    <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
      <TableHead>
        <TableRow>
          {tableHead.map((value) => {
            return <StyledTableCell align={value === "Actions" ? "right" : "left"} sx={{width: value === "Actions" ? 0 : 238, paddingRight: value === "Actions" ? '50px' : 0}}>{value}</StyledTableCell>

          })}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row, index) => (
          <TableRow
            key={index}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            {Object.keys(row).map(value => {
              if(value === "actions") {
                return <StyledTableCell align="right">
                  <IconButton
                      sx={{
                        color: '#1E4B92',
                              '&:hover': {
                                backgroundColor: '#E6E6E6',
                              },
                            }} 
                            onClick={() => editRow(row.id)}
                          >
                            {row.actions[0]}
                          </IconButton>
                          <IconButton 
                            sx={{
                              color: 'red',
                              '&:hover': {
                                backgroundColor: '#E6E6E6',
                              },
                            }}  
                            onClick={() => {
                              if(data.length === 1 && page !== 0) {
                                setPage(page - 1)
                              }
                              deleteRow(row.id) 
                            }}
                          >
                              {row.actions[1]}
                          </IconButton>
                          {customAction === undefined ? null : <IconButton
                              sx={{
                                color: 'green',
                                '&:hover': {
                                  backgroundColor: '#E6E6E6',
                                },
                              }}
                              onClick={() => customAction(row.id)}
                            >
                            {row.actions[2]}
                          </IconButton>
                          }
                        </StyledTableCell>
              }
              if(value === "id")
                return

              return <StyledTableCell component="th" scope="row"> {row[value]}</StyledTableCell>
            })}
          </TableRow>
        ))}
      </TableBody>
      {handlePageChange !== undefined && totalSize !== 0 &&
        <TableFooter>
          <TableRow>
            <TablePagination 
                sx={{ borderBottom: 'none' }}
                count={totalSize}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                rowsPerPageOptions={[]}
                ActionsComponent={TablePaginationActions}
            />
            </TableRow>
        </TableFooter>
    }
    </Table>
    {totalSize === 0 &&
      <Box sx={{
        marginTop: '40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
      <Typography sx={{
        fontFamily: 'Source Sans Pro, sans-serif',
        fontSize: '14px',
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: 'normal',
        color: '#003E92',
      }}>
        {messageForEmptyDataBold}
      </Typography>
      <Typography sx={{
        fontFamily: 'Source Sans Pro, sans-serif',
        fontSize: '16px',
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 'normal',
        color: 'black',
        marginBottom: '24px'
      }}>
       {messageForEmptyDataRegular}
      </Typography>
    </Box>
      }
  </TableContainer>
  )
}

export default CustomTable