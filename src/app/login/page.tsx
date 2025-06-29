import { Metadata } from 'next';
import { Box } from '@mui/material';
import LoginPage from './Loginpage';

export const metadata: Metadata = {
  title: 'Login',
};

export default function Page() {
  return (
  <Box>
    <LoginPage />;
    {/* <SignInPage />; */}
    </Box>
  );
  
}
