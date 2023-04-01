import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React, { useContext } from 'react'
import { InterfaceContext } from '../../services/interface-context';
import { styled } from '@mui/material/styles';
import LogoImage from '../../assets/icon.svg';
import { useNavigate } from 'react-router-dom';
import { Code, Forum, Home, People, Person, Search } from '@mui/icons-material';
import { AuthContext } from '../../services/auth-context';
import { AdminContext } from '../../services/admin-context';

const DrawerContainer = styled(Box)(() => ({
  width: 300,
  height: '100%',
  backgroundColor: '#1E1E1E',
  paddingTop: 100
}));

const ImageBox = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}))

const ImageContainer = styled(Box)(() => ({
  width: 150,
  height: 150,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  borderRadius: '50%',
  backgroundColor: 'white'
}));

const Image = styled('img')(() => ({
  height: '100%',
  width: '100%'
}))

const AppDrawer = () => {

  const { drawerOpen, closeDrawer } = useContext(InterfaceContext);
  const { profile } = useContext(AuthContext);
  const { admin } = useContext(AdminContext);
  const navigate = useNavigate();

  const navigattionHandler = (route) => {
    closeDrawer();
    navigate(route);
  }

  return (
    <Drawer open={drawerOpen} onClose={closeDrawer}>
      <DrawerContainer>
        <ImageBox>
          <ImageContainer><Image src={LogoImage} alt='logo-image' /></ImageContainer>
        </ImageBox>
        <List sx={{ px: 2 }}>
          <ListItem sx={{ backgroundColor: 'white', my: 1 }}>
            <ListItemButton onClick={() => { navigattionHandler(admin ? '/admin/dashboard' : '/home') }}>
              <ListItemIcon><Home /></ListItemIcon>
              <ListItemText primary='Home'></ListItemText>
            </ListItemButton>
          </ListItem>
          {profile && <>
            <ListItem sx={{ backgroundColor: 'white', my: 1 }}>
              <ListItemButton onClick={() => { navigattionHandler('/search') }}>
                <ListItemIcon><Search /></ListItemIcon>
                <ListItemText primary='Search'></ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem sx={{ backgroundColor: 'white', my: 1 }}>
              <ListItemButton onClick={() => { navigattionHandler('/chats') }}>
                <ListItemIcon><Forum /></ListItemIcon>
                <ListItemText primary='Chats'></ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem sx={{ backgroundColor: 'white', my: 1 }}>
              <ListItemButton onClick={() => { navigattionHandler(`/user/${profile._id}`) }}>
                <ListItemIcon><Person /></ListItemIcon>
                <ListItemText primary='Profile'></ListItemText>
              </ListItemButton>
            </ListItem>
          </>}
          {admin && <>
            <ListItem sx={{ backgroundColor: 'white', my: 1 }}>
              <ListItemButton onClick={() => { navigattionHandler('/admin/users') }}>
                <ListItemIcon><People /></ListItemIcon>
                <ListItemText primary='Users'></ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem sx={{ backgroundColor: 'white', my: 1 }}>
              <ListItemButton onClick={() => { navigattionHandler('/admin/add-field') }}>
                <ListItemIcon><Code /></ListItemIcon>
                <ListItemText primary='Add Field'></ListItemText>
              </ListItemButton>
            </ListItem>
          </>}
        </List>
      </DrawerContainer>
    </Drawer>
  )
}

export default AppDrawer;