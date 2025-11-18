import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div>
      <nav style={{ padding: '20px', background: '#f0f0f0' }}>
        <h2>在庫管理システム</h2>
      </nav>
      <main style={{ padding: '20px' }}>
        <Outlet />
      </main>
    </div>
  );
}