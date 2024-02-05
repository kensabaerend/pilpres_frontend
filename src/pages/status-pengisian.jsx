import { Helmet } from 'react-helmet-async';

import { StatusPengisianView } from 'src/sections/status_pengisian/view';

// ----------------------------------------------------------------------

export default function StatusPengisianPage() {
  return (
    <>
      <Helmet>
        <title> Status Pengisian | Pemilihan Legislatif </title>
      </Helmet>

      <StatusPengisianView />
    </>
  );
}
