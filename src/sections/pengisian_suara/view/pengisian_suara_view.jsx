import { useRecoilValue } from 'recoil';
import { useSnackbar } from 'notistack';
import { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import {
  Grid,
  Table,
  Paper,
  Button,
  Card,
  CardContent,
  CardMedia,
  MenuItem,
  TableRow,
  TextField,
  TableBody,
  TableCell,
  TableHead,
  Accordion,
  Typography,
  IconButton,
  TableContainer,
  LinearProgress,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';

import userAtom from 'src/atoms/userAtom';
import tpsService from 'src/services/tpsService';
import partyService from 'src/services/partyService';
import districtService from 'src/services/districtService';

import Iconify from 'src/components/iconify';

import PartyCard from '../party-card';
import DetailHistory from '../detail-history-dialog';

// ----------------------------------------------------------------------

export default function PengisianSuaraView() {
  // Dummy data for parties
const parties = [
  {
    _id: 'party1',
    candidates: [
      { id: 'candidate1', name: 'H. Anies Baswedan, Ph.D.', wakil: 'H. A. Muhaimin Iskandar, Dr.(H.C.)', imageUrl: '/assets/images/capres/candidate1.png' },
      { id: 'candidate2', name: 'H. Prabowo Subianto', wakil: 'Gibran Rakabuming Raka', imageUrl: '/assets/images/capres/candidate2.png' },
      { id: 'candidate3', name: 'H. Ganjar Pranowo, S.IP., M.IP.', wakil: 'Prof. Dr. H. M. Mahfud Mahmodin', imageUrl: '/assets/images/capres/candidate3.png' },
    ],
  },
];

  const user = useRecoilValue(userAtom);
  const [kecamatan, setKecamatan] = useState('');
  const [kelurahan, setKelurahan] = useState('');
  const [tps, setTps] = useState('');
  // const [parties, setParties] = useState([]);
  const [kecamatans, setKecamatans] = useState([]);
  const [kelurahans, setKelurahans] = useState([]);
  const [tpsList, setTpsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [votesResult, setVotesResult] = useState([]);
  const [history, setHistory] = useState([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  function convertDateFormat(originalDateString) {
    const originalDate = new Date(originalDateString);

    const year = originalDate.getFullYear();
    const month = String(originalDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(originalDate.getDate()).padStart(2, '0');

    const hours = String(originalDate.getHours()).padStart(2, '0');
    const minutes = String(originalDate.getMinutes()).padStart(2, '0');
    const seconds = String(originalDate.getSeconds()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return formattedDate;
  }
  useEffect(() => {
    const handleGetAllParties = async () => {
      try {
        setLoading(true);
        const result = await partyService.getAllPartiesWithcandidates();

        setParties(result);

        setLoading(false);
      } catch (error) {
        setKecamatans([]);
        setParties([]);
        setLoading(false);
      }
    };
    handleGetAllParties();
  }, []);

  useEffect(() => {
    const handleGetAllDistricts = async () => {
      try {
        setLoading(true);
        const result = await districtService.getAllDistricts();

        setKecamatans(result.data);

        setLoading(false);
      } catch (error) {
        setKecamatans([]);
        setParties([]);
        setLoading(false);
      }
    };
    handleGetAllDistricts();
  }, []);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (tps === '') {
        enqueueSnackbar('Please select tps', {
          variant: 'error',
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
        setLoading(false);
        return;
      }

      let result;
      if (user.role === 'admin') {
        result = await tpsService.fillBallots(tps, votesResult);
      }
      console.log(result);
      if (result.code === 200) {
        enqueueSnackbar('Voting success', {
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
      } else {
        enqueueSnackbar(result.message, {
          variant: 'error',
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
      }

      setLoading(false);
    } catch (error) {
      setVotesResult([]);
      setLoading(false);
    }
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Formulir Pengisian Suara
      </Typography>
      {loading && <LinearProgress color="primary" variant="query" />}
      {!loading && (
        <>
          {history.length > 0 && (
            <Grid container spacing={3} mb={5}>
              <Grid item xs={12}>
                <Typography variant="h5" sx={{ mb: 3 }} color="primary.main">
                  Riwayat Pengisian Suara
                </Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Tanggal</TableCell>
                        <TableCell>User</TableCell>
                        <TableCell>Aksi</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {history.map((item, index) => (
                        <TableRow key={item._id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{convertDateFormat(item.updated_at)}</TableCell>
                          <TableCell>{item.created_by.username}</TableCell>
                          <TableCell>
                            <DetailHistory parties={item.valid_ballots_detail} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          )}

          {user.role === 'admin' && (
            <Accordion>
              <AccordionSummary
                expandIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="h5" color="primary.main">
                  Input Suara Sah
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={3} mb={5}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      select
                      label="Kecamatan"
                      value={kecamatan}
                      onChange={(e) => {
                        setKecamatan(e.target.value);
                        setKelurahans(e.target.value.villages);
                        // console.log(e.target.value);
                      }}
                      variant="outlined"
                    >
                      <MenuItem value="" disabled>
                        Pilih Kecamatan
                      </MenuItem>
                      {kecamatans.map((option) => (
                        <MenuItem key={option._id} value={option}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      select
                      label="Kelurahan"
                      value={kelurahan}
                      onChange={async (e) => {
                        setHistory([]);
                        setKelurahan(e.target.value);
                        // console.log(e.target.value);
                        const getTps = await tpsService.getAllTpsByVillageId(e.target.value);
                        if (getTps.data) {
                          setTpsList(getTps.data);
                        }
                        // console.log(getTps);
                        // const getHistory = await resultService.getHistoryVillageId(e.target.value);
                        // // console.log(getHistory.data.history);
                        // if (getHistory.data.history) {
                        //   setHistory(getHistory.data.history);
                        // }
                      }}
                      variant="outlined"
                      disabled={!kecamatan}
                    >
                      <MenuItem value="" disabled>
                        Pilih Desa / Kelurahan
                      </MenuItem>
                      {kelurahans.map((option) => (
                        <MenuItem key={option._id} value={option._id}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      select
                      label="TPS"
                      value={tps}
                      onChange={async (e) => {
                        setHistory([]);
                        setTps(e.target.value);
                        // console.log(e.target.value);
                      }}
                      variant="outlined"
                      disabled={!kelurahan}
                    >
                      <MenuItem value="" disabled>
                        Pilih TPS
                      </MenuItem>
                      {tpsList.map((option) => (
                        <MenuItem key={option._id} value={option._id}>
                          {option.number}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
                <Grid item xs={12} mb={5}>
                <Typography variant="h5" sx={{ mb: 3 }} color="primary.main">
                  Masukan Suara Calon Presiden
                </Typography>
                <Grid container spacing={2}>
            {parties.length > 0 &&
              parties[0].candidates.map((candidate) => (
                <Grid item xs={12} sm={4} key={candidate.id}>
                  {/* CandidateCard component */}
                  <Card>
                    {/* Candidate Image */}
                    <CardMedia
                      component="img"
                      height="300"
                      width="200" 
                      image={candidate.imageUrl}
                      alt={candidate.name}
                    />
                    <CardContent>
                      {/* Candidate Name */}
                      <Typography variant="h6" component="div" gutterBottom>
                        {candidate.name}
                      </Typography>
                      {/* Candidate Vice */}
                      <Typography variant="subtitle1" color="text.secondary">
                        {candidate.wakil}
                      </Typography>
                      {/* Add input for votes */}
                      <TextField
                        fullWidth
                        type="number"
                        label="Jumlah Suara"
                        value={candidate.votes}
                        onChange={(e) => {
                          const votes = parseInt(e.target.value, 10);
                          handleVote(candidate.id, votes);
                        }}
                        variant="outlined"
                      />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
              </Grid>
                <Grid item xs={12} mb={5}>
                  <Button type="button" variant="contained" color="primary" onClick={handleSubmit}>
                    Submit
                  </Button>
                </Grid>
              </AccordionDetails>
            </Accordion>
          )}
        </>
      )}
    </Container>
  );
}
