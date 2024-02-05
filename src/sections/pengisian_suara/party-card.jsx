import * as React from 'react';
import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TextField from '@mui/material/TextField';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import TableContainer from '@mui/material/TableContainer';

export default function PartyCard({ party, setVotesResult }) {
  const [votes, setVotes] = React.useState([]);
  const [, setVotesData] = React.useState([]);

  const handleChange = (event, candidateIndex) => {
    const updatedVotes = [...votes];
    const value = parseInt(event.target.value, 10) || 0;

    updatedVotes[candidateIndex] = {
      candidate_id: party.candidates[candidateIndex]._id,
      number_of_votes: value,
    };

    setVotes(updatedVotes);

    const updatedVotesData = {
      party_id: party._id,
      candidates: updatedVotes,
    };

    setVotesData(updatedVotesData);

    // Use the updatedVotesData directly in setVotesResult
    setVotesResult((prevVotesResult) => [
      ...prevVotesResult.filter((result) => result.party_id !== party._id),
      updatedVotesData,
    ]);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe">
            <img src={party.logo_url} alt={party.name} />
          </Avatar>
        }
        subheader={`${party.number_party} - ${party.name}`}
      />

      <CardContent>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Nama</TableCell>
                <TableCell>Input Suara</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {party.candidates.map((candidate, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{candidate.name}</TableCell>
                  <TableCell>
                    <TextField
                      type="text"
                      placeholder="Input Suara"
                      variant="outlined"
                      size="small"
                      onChange={(event) => handleChange(event, index)}
                      fullWidth
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}

PartyCard.propTypes = {
  party: PropTypes.any,
  setVotesResult: PropTypes.any,
};
