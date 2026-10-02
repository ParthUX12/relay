import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import { screens } from './screens';

export default function App() {
  return (
    <Layout>
      <Routes>
        {screens.map((s) => (
          <Route key={s.path} path={s.path} element={<s.component />} />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
