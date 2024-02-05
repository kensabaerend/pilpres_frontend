import { useState } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';

import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import userService from 'src/services/userService';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

import EditUserDialog from './edit-user-dialog';

// ----------------------------------------------------------------------

export default function UserTableRow({
  user,
  selected,
  username,
  id,
  kecamatan,
  kelurahan,
  tps,
  role,
  handleClick,
  setUsers,
}) {
  const [open, setOpen] = useState(null);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const handleDeleteUser = async () => {
    try {
      setLoading(true);
      const deleteUser = await userService.deleteUser(id);
      if (deleteUser.code === 200) {
        enqueueSnackbar('Delete success', {
          variant: 'success',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center',
          },
          action: (key) => (
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={() => closeSnackbar(key)}
            >
              <Iconify icon="eva:close-fill" />
            </IconButton>
          ),
        });

        setUsers((prevUsers) => prevUsers.filter((userNow) => userNow._id !== id));
        setLoading(false);
      } else {
        enqueueSnackbar(
          'Delete failed',
          { variant: 'error' },
          {
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'center',
            },
            action: (key) => (
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={() => closeSnackbar(key)}
              >
                <Iconify icon="eva:close-fill" />
              </IconButton>
            ),
          }
        );
        setLoading(false);
      }
    } catch (error) {
      enqueueSnackbar(
        'Delete failed',
        { variant: 'error' },
        {
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center',
          },
          action: (key) => (
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={() => closeSnackbar(key)}
            >
              <Iconify icon="eva:close-fill" />
            </IconButton>
          ),
        }
      );
      setLoading(false);
    }
  };

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };
  const roleColors = {
    admin: 'success',
    user_district: 'primary',
    user_village: 'secondary',
    user_tps: 'info',
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2" noWrap>
              {username}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell>
          <Label color={roleColors[role]}>{role}</Label>
        </TableCell>
        <TableCell>{kecamatan}</TableCell>
        <TableCell>{kelurahan}</TableCell>
        <TableCell>{tps}</TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <EditUserDialog user={user} />
        <MenuItem onClick={handleDeleteUser} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          {loading ? 'Loading...' : 'Delete'}
        </MenuItem>
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  user: PropTypes.any,
  handleClick: PropTypes.func,
  id: PropTypes.any,
  username: PropTypes.any,
  role: PropTypes.any,
  selected: PropTypes.any,
  kecamatan: PropTypes.any,
  kelurahan: PropTypes.any,
  tps: PropTypes.any,
  setUsers: PropTypes.func,
};
