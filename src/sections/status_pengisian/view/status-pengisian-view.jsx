import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { Grid, MenuItem, TextField, LinearProgress } from '@mui/material';

import tpsService from 'src/services/tpsService';
import districtService from 'src/services/districtService';

import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function StatusPengisianView() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [kecamatans, setKecamatans] = useState([]);
  const [tps, setTps] = useState([]);
  const [kecamatan, setKecamatan] = useState('');

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleGetAllKecamatan = async () => {
      try {
        setLoading(true);

        const getKecamatans = await districtService.getAllDistrictNames();

        const getTps = await tpsService.getAllTpsRekap();

        // // console.log(getVillages.data);
        setTps(getTps.data);
        // console.log(getTps.data);
        setKecamatans(getKecamatans.data);

        setLoading(false);
      } catch (error) {
        setKecamatans([]);
        setLoading(false);
      }
    };
    handleGetAllKecamatan();
  }, []);

  const handleSelectKecamatan = async (districtId) => {
    try {
      setLoading(true);
      setTps([]);

      const getTps = await tpsService.getAllTpsByDistrictId(districtId);
      // // console.log(getVillages.data);

      if (getTps.code === 200) {
        setTps(getTps.data);
      }
      console.log(tps);

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: tps,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h4">Status Pengisian Suara</Typography>
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
        {kecamatan && (
          <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
            Data di Kecamatan {kecamatan.name}
          </Typography>
        )}
      </Stack>

      {loading && <LinearProgress color="primary" variant="query" />}
      {!loading && (
        <>
          <Grid container spacing={3} mb={5}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Kecamatan"
                value={kecamatan}
                onChange={(e) => {
                  setKecamatan(e.target.value);

                  // console.log(e.target.value);
                  handleSelectKecamatan(e.target.value._id);
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
          </Grid>

          <Grid item>
            <Card>
              <UserTableToolbar filterName={filterName} onFilterName={handleFilterByName} />

              <Scrollbar>
                <TableContainer sx={{ overflow: 'unset' }}>
                  <Table>
                    <UserTableHead
                      order={order}
                      orderBy={orderBy}
                      onRequestSort={handleSort}
                      headLabel={[
                        { id: 'no', label: 'No', align: 'center' },
                        { id: 'district_name', label: 'kecamatan' },
                        { id: 'village_name', label: 'Kelurahan' },
                        { id: 'number', label: 'TPS' },
                        { id: 'is_fillBallot', label: 'Status Pengisian' },
                        { id: 'aksi', label: 'Aksi', align: 'center' },
                      ]}
                    />
                    <TableBody>
                      {dataFiltered
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, index) => (
                          <UserTableRow
                            key={row._id}
                            no={page * rowsPerPage + index + 1}
                            district_name={row.district_name}
                            village_name={row.village_name}
                            tps={row.number}
                            status={row.is_fillBallot}
                            tps_id={row._id}
                          />
                        ))}

                      <TableEmptyRows
                        height={77}
                        emptyRows={emptyRows(page, rowsPerPage, dataFiltered.length)}
                      />

                      {notFound && <TableNoData query={filterName} />}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Scrollbar>

              <TablePagination
                page={page}
                component="div"
                count={dataFiltered.length}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
                rowsPerPageOptions={[10, 20, 30, 50, 100, 150, 200]}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Card>
          </Grid>
        </>
      )}
    </Container>
  );
}
