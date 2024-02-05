import { lazy, Suspense } from 'react';
import { useRecoilValue } from 'recoil';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import userAtom from 'src/atoms/userAtom';
import DashboardLayout from 'src/layouts/dashboard';
import StatusPengisianPage from 'src/pages/status-pengisian';

export const IndexPage = lazy(() => import('src/pages/app'));
export const KecamatanPage = lazy(() => import('src/pages/kecamatan'));
export const KelurahanPage = lazy(() => import('src/pages/kelurahan'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const PengisianSuaraPage = lazy(() => import('src/pages/pengisian_suara'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const SuaraCaleg = lazy(() => import('src/pages/suara-caleg'));

// ----------------------------------------------------------------------

export default function Router() {
  const user = useRecoilValue(userAtom);
  const routes = useRoutes([
    {
      element: user ? (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ) : (
        <Navigate to="/login" replace />
      ),
      children: [
        {
          element:
            user?.role === 'admin' ? <IndexPage /> : <Navigate to="pengisian-suara" replace />,
          index: true,
        },
        { path: 'pengisian-suara', element: <PengisianSuaraPage /> },

        {
          path: 'status-pengisian',
          element:
            user?.role === 'admin' ? <StatusPengisianPage /> : <Navigate to="/404" replace />,
        },

        {
          path: 'user',
          element:
            user?.role === 'admin' || user?.role === 'user_district' ? (
              <UserPage />
            ) : (
              <Navigate to="/404" replace />
            ),
        },

        {
          path: 'kecamatan',
          element:
            user?.role === 'admin' || user?.role === 'user_district' ? (
              <KecamatanPage />
            ) : (
              <Navigate to="/404" replace />
            ),
        },

        {
          path: 'kelurahan',
          element: user?.role === 'admin' ? <KelurahanPage /> : <Navigate to="/404" replace />,
        },

        {
          path: 'suara-caleg',
          element: user?.role === 'admin' ? <SuaraCaleg /> : <Navigate to="/404" replace />,
        },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
