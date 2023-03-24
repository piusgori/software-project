import { ThemeProvider } from "@mui/material"
import Main from "./init/Main"
import AdminContextProvider from "./services/admin-context"
import AppContextProvider from "./services/app-context"
import AuthContextProvider from "./services/auth-context"
import InterfaceContextProvider from "./services/interface-context"
import { theme } from "./services/theme"

function App() {
  return (
    <AuthContextProvider>
      <AdminContextProvider>
        <AppContextProvider>
          <InterfaceContextProvider>
            <ThemeProvider theme={theme}>
              <Main></Main>
            </ThemeProvider>
          </InterfaceContextProvider>
        </AppContextProvider>
      </AdminContextProvider>
    </AuthContextProvider>
  )
}

export default App
