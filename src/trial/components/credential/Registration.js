import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Card, Link, Container, Typography } from '@mui/material';
// layouts
import AuthLayout from './AuthLayout';
// components
import Page from '../Page';

import { MHidden } from '../@material-extend';

import { RegisterForm } from '../authentication/register';

import AuthSocial from '../authentication/AuthSocial';

import { Title } from '../user/UserSidebar';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function UserRegistation() {

  return (
    <RootStyle title="Register | Movie-Rental">
      <AuthLayout>
        Already have an account? &nbsp;
        <Link variant="subtitle2" component={RouterLink} to="/login">
          Login
        </Link>
      </AuthLayout>

      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px:5, mt: -10, mb: 5 }}>
            Discount is awaiting!
          </Typography>
            <Box sx={{ml:3,mt:-3}}>
               <Title cursive italic bold shadowgreylight r72 instagram>
                   T
                 <Title cursive italic textContent={'ake the chance now !'} h3 sx={{mt:-2.9,ml:1}} positive1 />
               </Title>
            </Box> 
          <img alt="register" src="/static/illustrations/illustration_register.png" />
        </SectionStyle>
      </MHidden>

      <Container>
        <ContentStyle>

          <Box sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Get started absolutely free.
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Free forever. No credit card needed.
            </Typography>
          </Box>
	          <AuthSocial />
	          <RegisterForm />
          <Typography variant="body2" align="center" sx={{ color: 'text.secondary', mt: 3 }}>
               By registering, I agree to the &nbsp;
            <Link underline="always" sx={{ color: 'text.primary' }}>
              Terms of Service
            </Link>
            &nbsp;and&nbsp;
            <Link underline="always" sx={{ color: 'text.primary' }}>
              Privacy Policy
            </Link>
            .
          </Typography>

          <MHidden width="smUp">
            <Typography variant="subtitle2" sx={{ mt: 3, textAlign: 'center' }}>
              Already have an account?&nbsp;
              <Link to="/login" component={RouterLink}>
                Login
              </Link>
            </Typography>
          </MHidden>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
