import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { useAuthStore } from './store/authStore';

// Pages
import LoginPage from './pages/auth/LoginPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import InventoryListPage from './pages/inventory/InventoryListPage';
import InventoryDetailPage from './pages/inventory/InventoryDetailPage';
import PurchaseListPage from './pages/purchases/PurchaseListPage';
import PurchaseDetailPage from './pages/purchases/PurchaseDetailPage';
import SalesListPage from './pages/sales/SalesListPage';
import SalesDetailPage from './pages/sales/SalesDetailPage';

// Layout
import MainLayout from './components/layout/MainLayout';

// テーマ設定
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

// 認証ガード
function PrivateRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          {/* 認証画面 */}
          <Route path="/login" element={<LoginPage />} />

          {/* メインアプリケーション */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <MainLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<DashboardPage />} />
            
            {/* 在庫管理 */}
            <Route path="inventory" element={<InventoryListPage />} />
            <Route path="inventory/:id" element={<InventoryDetailPage />} />
            
            {/* 発注管理 */}
            <Route path="purchases" element={<PurchaseListPage />} />
            <Route path="purchases/:id" element={<PurchaseDetailPage />} />
            
            {/* 販売管理 */}
            <Route path="sales" element={<SalesListPage />} />
            <Route path="sales/:id" element={<SalesDetailPage />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;