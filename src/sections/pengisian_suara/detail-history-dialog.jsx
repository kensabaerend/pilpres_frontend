import PropTypes from 'prop-types';
import React, { useState } from 'react';

import {
  Grid,
  List,
  Slide,
  AppBar,
  Button,
  Dialog,
  Toolbar,
  Typography,
  LinearProgress,
} from '@mui/material';

import tpsService from 'src/services/tpsService';

import Iconify from 'src/components/iconify';

import PartyCardV2 from './party-card_v2';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function DetailHistory({ tps_id }) {
  const [open, setOpen] = React.useState(false);
  const [parties, setParties] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    getHistory();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getHistory = async () => {
    try {
      setLoading(true);
      const dataTps = await tpsService.getTpsById(tps_id);
      setParties(dataTps.data.valid_ballots_detail);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <>
      <Button onClick={handleClickOpen}>Lihat</Button>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <Iconify icon="eva:arrow-ios-back-fill" onClick={handleClose} />
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Detail Riwayat Pengisian Suara
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          {loading && <LinearProgress color="primary" variant="query" />}
          {!loading && (
            <Grid container spacing={2} mb={5}>
              {parties.map((party) => (
                <Grid item xs={12} sm={6} md={4} key={party._id}>
                  <PartyCardV2 party={party} />
                </Grid>
              ))}
            </Grid>
          )}
        </List>
      </Dialog>
    </>
  );
}

DetailHistory.propTypes = {
  tps_id: PropTypes.any,
};
