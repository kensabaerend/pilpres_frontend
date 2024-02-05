import PropTypes from 'prop-types';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------
KecamatanSearch.propTypes = {
  kecamatans: PropTypes.array.isRequired,
  onSelectKecamatan: PropTypes.func,
};

export default function KecamatanSearch({ kecamatans, onSelectKecamatan }) {
  const handleSelectKecamatan = (event, value) => {
    if (value) {
      if (onSelectKecamatan) {
        onSelectKecamatan(value);
      }
    }
  };

  return (
    <Autocomplete
      sx={{ width: 280 }}
      autoHighlight
      popupIcon={null}
      slotProps={{
        paper: {
          sx: {
            width: 320,
            [`& .${autocompleteClasses.option}`]: {
              typography: 'body2',
            },
          },
        },
      }}
      options={kecamatans}
      getOptionLabel={(kecamatan) => kecamatan.name}
      isOptionEqualToValue={(option, value) => option._id === value._id}
      onChange={handleSelectKecamatan} // Set the onChange handler
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Cari kecamatan..."
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Iconify
                  icon="eva:search-fill"
                  sx={{ ml: 1, width: 20, height: 20, color: 'text.disabled' }}
                />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
}
