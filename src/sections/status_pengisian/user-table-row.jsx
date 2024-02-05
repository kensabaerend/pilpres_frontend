import PropTypes from 'prop-types';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import Label from 'src/components/label';

import DetailHistory from '../pengisian_suara/detail-history-dialog';
// ----------------------------------------------------------------------

export default function UserTableRow({
  village_name,
  district_name,
  status,
  no,
  village_id,
  tps,
  tps_id,
}) {
  return (
    <TableRow hover tabIndex={-1} status="checkbox">
      <TableCell align="center">{no}</TableCell>
      <TableCell>{district_name}</TableCell>
      <TableCell>{village_name}</TableCell>
      <TableCell>{tps}</TableCell>
      <TableCell>
        <Label color={status ? 'success' : 'error'}>
          {status ? 'Sudah Mengisi' : 'Belum Mengisi'}
        </Label>
      </TableCell>
      {status && (
        <TableCell align="center">
          {' '}
          <DetailHistory tps_id={tps_id} />
        </TableCell>
      )}
    </TableRow>
  );
}

UserTableRow.propTypes = {
  district_name: PropTypes.any,
  no: PropTypes.any,
  village_name: PropTypes.any,
  village_id: PropTypes.any,
  tps: PropTypes.any,
  tps_id: PropTypes.any,
  status: PropTypes.any,
};
