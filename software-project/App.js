import MainNavigation from './navigation/MainNavigation';
import AuthContextProvider from './services/auth-context';

export default function App() {
  return (
    <AuthContextProvider>
      <MainNavigation></MainNavigation>
    </AuthContextProvider>
  );
}
