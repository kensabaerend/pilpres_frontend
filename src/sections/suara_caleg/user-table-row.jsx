import PropTypes from 'prop-types';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

// ----------------------------------------------------------------------

export default function UserTableRow({ name, company, role, no }) {
  return (
    <TableRow hover tabIndex={-1} role="checkbox">
      <TableCell align="center">{no}</TableCell>
      <TableCell>{name}</TableCell>

      <TableCell>{company}</TableCell>

      <TableCell>{role}</TableCell>
    </TableRow>
  );
}

UserTableRow.propTypes = {
  company: PropTypes.any,
  no: PropTypes.any,
  name: PropTypes.any,
  role: PropTypes.any,
};
