import React, { useContext, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Alert, Box, CircularProgress, Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, tableCellClasses } from '@mui/material';
import TopBar from '../../components/interface/TopBar';
import AppDrawer from '../../components/interface/AppDrawer';
import { AdminContext } from '../../services/admin-context';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontWeight: 'bold'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const MainBox = styled(Box)(() => ({
  height: '100%',
  width: '100%'
}));

const InnerContainer = styled(Box)(() => ({
  padding: 20,
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center'
}))

const AdminUsersPage = () => {
  const { getUsers } = useContext(AdminContext);

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const initialization = async () => {
    try {
      setIsLoading(true);
      setError(false);
      setErrorMessage('');
      const resUsers = await getUsers();
      setUsers(resUsers);
    } catch (err) {
      const errMessage = err?.response?.data?.content || err?.response?.data?.message || err?.response?.message || err?.message;
      setError(true);
      setErrorMessage(errMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initialization();
  }, [])

  return (
    <MainBox>
      <TopBar />
      <AppDrawer />
      <InnerContainer>
        {isLoading && <CircularProgress sx={{ alignSelf: 'center' }}></CircularProgress>}
        {!isLoading && users.length === 0 && <Typography sx={{ color: '#515151' }} variant='h4'>No Questions Found</Typography>}
        {!isLoading && users.length > 0 && <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="right">email</StyledTableCell>
                <StyledTableCell align="right">followers</StyledTableCell>
                <StyledTableCell align="right">following</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((row) => 
                <StyledTableRow key={row._id}>
                  <StyledTableCell component="th" scope="row">{row.firstName} {row.lastName}</StyledTableCell>
                  <StyledTableCell align="right">{row.email}</StyledTableCell>
                  <StyledTableCell align="right">{row.followers.length}</StyledTableCell>
                  <StyledTableCell align="right">{row.following.length}</StyledTableCell>
                </StyledTableRow>)}
            </TableBody>
          </Table>
        </TableContainer>}
      </InnerContainer>
      <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={error} autoHideDuration={10000} onClose={() => { setError(false) }}>
          <Alert onClose={() => { setError(false) }} severity='error' sx={{ width: '100%' }}>{errorMessage}</Alert>
      </Snackbar>
    </MainBox>
  )
}

export default AdminUsersPage