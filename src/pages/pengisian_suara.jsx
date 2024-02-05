import { Helmet } from 'react-helmet-async';

import { PengisianSuaraView } from 'src/sections/pengisian_suara/view';

// ----------------------------------------------------------------------

export default function PengisianSuaraPage() {
  return (
    <>
      <Helmet>
        <title> Pengisian Suara | Pemilihan Legislatif </title>
      </Helmet>

      <PengisianSuaraView />
    </>
  );
}
