import { Helmet } from 'react-helmet-async';

import { DashboardView } from 'src/sections/dashboard/view';

// ----------------------------------------------------------------------

export default function AppPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard | Rekapitulasi Legislatif UI </title>
      </Helmet>

      <DashboardView />
    </>
  );
}
