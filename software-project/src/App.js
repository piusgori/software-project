import { ThemeProvider } from '@mui/material/styles';
import Main from './Main';
import { theme } from './services/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Main></Main>
    </ThemeProvider>
  );
}

export default App;
