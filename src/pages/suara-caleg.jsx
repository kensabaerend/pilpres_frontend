import { Helmet } from 'react-helmet-async';

import { SuaraCalegView } from 'src/sections/suara_caleg/view';

// ----------------------------------------------------------------------

export default function SuaraCalegPage() {
  return (
    <>
      <Helmet>
        <title>Suara Caleg | Pemilihan Legislatif </title>
      </Helmet>

      <SuaraCalegView />
    </>
  );
}
