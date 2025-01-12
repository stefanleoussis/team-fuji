import { useState, MouseEvent } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useAuth } from '../../context/useAuthContext';
import { useHistory } from 'react-router-dom';
import FormDialog from '../UploadImageForm/FormDialog';
import { Box } from '@material-ui/core';

const AuthMenu = (): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const open = Boolean(anchorEl);
  const { logout } = useAuth();
  const history = useHistory();
  const fetch = {
    url: '/uploadProfileImage/',
    handler: 'image',
    maxFiles: 1,
  };
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
  };

  const handleProfile = () => {
    history.push('/profile');
  };

  const toggleProfileImageDialog = (submitted: boolean) => {
    setOpenDialog(!openDialog);
    if (submitted) handleClose();
  };

  return (
    <Box>
      <IconButton aria-label="show auth menu" aria-controls="auth-menu" aria-haspopup="true" onClick={handleClick}>
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id="auth-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        getContentAnchorEl={null}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
        <MenuItem onClick={handleProfile}>Profile</MenuItem>
        <MenuItem onClick={() => toggleProfileImageDialog(false)}>Profile Image</MenuItem>
        <FormDialog
          open={openDialog}
          dialogControl={toggleProfileImageDialog}
          action={['Upload Profile Image', 'Submit']}
          fetch={fetch}
        />
      </Menu>
    </Box>
  );
};

export default AuthMenu;
