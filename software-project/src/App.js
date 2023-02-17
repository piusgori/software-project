import { Button } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './services/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <p>Hello</p>
        <Button variant='contained'>Click</Button>
      </div>
    </ThemeProvider>
  );
}

export default App;
