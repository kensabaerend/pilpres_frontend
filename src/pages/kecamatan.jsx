import { Helmet } from 'react-helmet-async';

import { KecamatanView } from 'src/sections/kecamatan/view';

// ----------------------------------------------------------------------

export default function KecamatanPage() {
  return (
    <>
      <Helmet>
        <title> Kecamatan| Rekapitulasi Legislatif UI </title>
      </Helmet>

      <KecamatanView />
    </>
  );
}
