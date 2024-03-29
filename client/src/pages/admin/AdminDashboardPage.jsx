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

const AdminDashboardPage = () => {

  const { getQuestions } = useContext(AdminContext);

  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const initialization = async () => {
    try {
      setIsLoading(true);
      setError(false);
      setErrorMessage('');
      const resQuestions = await getQuestions();
      setQuestions(resQuestions);
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
        {!isLoading && questions.length === 0 && <Typography sx={{ color: '#515151' }} variant='h4'>No Questions Found</Typography>}
        {!isLoading && questions.length > 0 && <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Title</StyledTableCell>
                <StyledTableCell align="right">Field</StyledTableCell>
                <StyledTableCell align="right">Views</StyledTableCell>
                <StyledTableCell align="right">User</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {questions.map((row) => 
                <StyledTableRow key={row._id}>
                  <StyledTableCell component="th" scope="row">{row.title}</StyledTableCell>
                  <StyledTableCell align="right">{row.field}</StyledTableCell>
                  <StyledTableCell align="right">{row.views}</StyledTableCell>
                  <StyledTableCell align="right">{row.userName}</StyledTableCell>
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

export default AdminDashboardPage