import { useRecoilValue } from 'recoil';
import { useReactToPrint } from 'react-to-print';
import { useRef, useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import {
  Paper,
  Table,
  Stack,
  Button,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  LinearProgress,
  TablePagination,
} from '@mui/material';

import userAtom from 'src/atoms/userAtom';
import rekapService from 'src/services/rekapService';
import districtService from 'src/services/districtService';
import CardWidget from 'src/layouts/dashboard/common/card-widget';

import Iconify from 'src/components/iconify/iconify';

import KecamatanSearch from '../kecamatan-search';
import PieChart from '../../../layouts/dashboard/common/pie-chart';
import BarChart from '../../../layouts/dashboard/common/bar-chart';
// ----------------------------------------------------------------------
const rowsPerPageOptions = [10, 15, 30];
export default function KecamatanView() {
  const user = useRecoilValue(userAtom);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [kecamatans, setKecamatans] = useState([]);
  const [selectedKecamatanName, setSelectedKecamatanName] = useState('');
  const [dataParties, setParties] = useState([]);
  const [kelurahans, setKelurahans] = useState([]);
  const [dataSuaraKecamatans, setDataSuaraKecamatans] = useState({});
  const [loading, setLoading] = useState(false);
  const [getGridSize, setGridSize] = useState({
    // default grid size
    Table: {
      xs: 12,
      md: 6,
    },
    Chart: {
      xs: 12,
      md: 6,
    },
  });

  useEffect(() => {
    const handleGetAllKecamatans = async () => {
      setLoading(true);
      if (user.role === 'admin') {
        const getKecamatans = await districtService.getAllDistrictNames();
        setKecamatans(getKecamatans.data);
        setLoading(false);
      } else if (user.role === 'user_district') {
        setSelectedKecamatanName(user.districtData.name);
        setLoading(true);
        const getKelurahans = await rekapService.getAllVillagesByDistrictIdWithRekapVotes(
          user.district_id
        );
        const getParties = await rekapService.getAllRekapBallotsByDistrictId(user.district_id);
        setDataSuaraKecamatans(getParties.data);
        setParties(getParties.data.valid_ballots_detail);
        setKelurahans(getKelurahans.data);
        setLoading(false);
      }

      setLoading(false);
    };
    handleGetAllKecamatans();
  }, [user]);

  const handleSelectKecamatan = async (selectedKecamatan) => {
    console.log(selectedKecamatan._id);
    setSelectedKecamatanName(selectedKecamatan.name);
    setLoading(true);
    const getKelurahans = await rekapService.getAllVillagesByDistrictIdWithRekapVotes(
      selectedKecamatan._id
    );
    const getParties = await rekapService.getAllRekapBallotsByDistrictId(selectedKecamatan._id);
    setDataSuaraKecamatans(getParties.data);
    // console.log(getParties.data.valid_ballots_detail);
    setParties(getParties.data.valid_ballots_detail);
    // console.log(getParties.valid_ballots_detail);
    setKelurahans(getKelurahans.data);
    // console.log(getKelurahans.data);
    setLoading(false);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // print area function
  const handlePrint = async () => {
    const prevGridSize = { ...getGridSize };
    const getButton = document.querySelectorAll('.printArea');
    getButton.forEach((element) => {
      element.style.display = 'none';
    });
    // change grid to print
    await setGridSize({
      Table: {
        xs: 7,
        md: 7,
      },
      Chart: {
        xs: 5,
        md: 5,
      },
    });
    reactToPrint();
    // back to default
    setGridSize(prevGridSize);
    getButton.forEach((element) => {
      element.style.display = 'inline';
    });
  };
  const reactToPrint = useReactToPrint({
    pageStyle: `@media print {
      @page {
        size: 100vh;
        margin: 10px;
      }
    }`,
    content: () => pdfRef.current,
  });
  const pdfRef = useRef();

  return (
    <Container maxWidth="xl" ref={pdfRef}>
      <Typography variant="h4" mb={5}>
        Data Kecamatan {selectedKecamatanName}
      </Typography>
      {loading && <LinearProgress color="primary" variant="query" />}
      {!loading && (
        <>
          {user.role === 'admin' && (
            <Stack
              mb={5}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              className="printArea"
            >
              <KecamatanSearch kecamatans={kecamatans} onSelectKecamatan={handleSelectKecamatan} />
            </Stack>
          )}
          <Button
            onClick={() => handlePrint()}
            variant="contained"
            startIcon={<Iconify icon="fa6-solid:file-pdf" />}
            className="printArea"
          >
            Export Data
          </Button>

          <Grid container spacing={3}>
            <Grid xs={12} sm={6} md={3}>
              <CardWidget
                title="Total Suara Sah"
                total={dataSuaraKecamatans.total_valid_ballots}
                color="info"
                icon={
                  <Iconify
                    icon="emojione-v1:ballot-box-bold-check"
                    sx={{ width: 64, height: 64 }}
                  />
                }
              />
            </Grid>

            <Grid xs={12} sm={6} md={3}>
              <CardWidget
                title="Total Suara Tidak Sah"
                total={dataSuaraKecamatans.total_invalid_ballots}
                color="warning"
                icon={<Iconify icon="fxemoji:ballottscriptx" sx={{ width: 64, height: 64 }} />}
              />
            </Grid>

            <Grid xs={12} sm={6} md={3}>
              <CardWidget
                title="Total Hak Suara"
                total={dataSuaraKecamatans.total_voters}
                color="error"
                icon={<Iconify icon="teenyicons:building-outline" sx={{ width: 64, height: 64 }} />}
              />
            </Grid>
            <Grid container lg={12}>
              <Grid xs={getGridSize.Table.xs} md={getGridSize.Table.md} lg={8}>
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Kelurahan</TableCell>
                        <TableCell align="right">Total Suara</TableCell>
                        <TableCell align="right">Suara Sah</TableCell>
                        <TableCell align="right">Suara Tidak Sah</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {kelurahans
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => (
                          <TableRow
                            key={row.village_id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell component="th" scope="row">
                              {row.village_name}
                            </TableCell>
                            <TableCell align="right">{row.total_voters}</TableCell>
                            <TableCell align="right">{row.total_valid_ballots}</TableCell>
                            <TableCell align="right">{row.total_invalid_ballots}</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                  <TablePagination
                    rowsPerPageOptions={rowsPerPageOptions}
                    component="div"
                    count={kelurahans.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </TableContainer>
              </Grid>
              <Grid xs={getGridSize.Chart.xs} md={getGridSize.Chart.md} lg={4}>
                <PieChart
                  title="Perolehan Suara"
                  chart={{
                    series: dataParties.map((item) => ({
                      label: item.name,
                      value: item.total_votes_party,
                    })),
                  }}
                />
              </Grid>
            </Grid>
            <Grid xs={12} md={12} lg={12}>
              <BarChart
                title="Perolehan Suara Per Partai"
                chart={{
                  series: dataParties.map((item) => ({
                    label: item.name,
                    value: item.total_votes_party,
                  })),
                }}
                style={{
                  breakBefore: 'page', // Perhatikan penggunaan camelCase di sini
                }}
              />
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
}
