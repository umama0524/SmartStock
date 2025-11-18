import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  Container,
  Avatar,
  Divider,
  Chip,
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { useAuthStore } from '../../store/authStore';

export default function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login({ username, password });
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'ログインに失敗しました');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (demoUser: string) => {
    setUsername(demoUser);
    setPassword('password');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <Container maxWidth="sm">
        <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
          <CardContent sx={{ p: 4 }}>
            {/* ヘッダー */}
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Avatar
                sx={{
                  width: 64,
                  height: 64,
                  bgcolor: 'primary.main',
                  mx: 'auto',
                  mb: 2,
                }}
              >
                <LockOutlined sx={{ fontSize: 32 }} />
              </Avatar>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                在庫管理システム
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Inventory Management System
              </Typography>
            </Box>

            {/* エラー表示 */}
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            {/* ログインフォーム */}
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="ユーザー名"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                margin="normal"
                required
                autoFocus
                disabled={loading}
              />
              <TextField
                fullWidth
                label="パスワード"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                required
                disabled={loading}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{ mt: 3, mb: 2, py: 1.5 }}
              >
                {loading ? 'ログイン中...' : 'ログイン'}
              </Button>
            </form>

            {/* デモアカウント */}
            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" color="text.secondary">
                デモアカウント
              </Typography>
            </Divider>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleDemoLogin('admin')}
                disabled={loading}
              >
                管理者でログイン（admin / password）
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleDemoLogin('inventory')}
                disabled={loading}
              >
                在庫担当でログイン（inventory / password）
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleDemoLogin('purchase')}
                disabled={loading}
              >
                発注担当でログイン（purchase / password）
              </Button>
            </Box>

            {/* フッター */}
            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Typography variant="caption" color="text.secondary">
                © 2025 Inventory Management System
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* 機能説明 */}
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="white" sx={{ mb: 1 }}>
            主な機能
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Chip label="リアルタイム在庫管理" size="small" sx={{ bgcolor: 'white' }} />
            <Chip label="発注・入荷管理" size="small" sx={{ bgcolor: 'white' }} />
            <Chip label="販売・出荷管理" size="small" sx={{ bgcolor: 'white' }} />
            <Chip label="承認ワークフロー" size="small" sx={{ bgcolor: 'white' }} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}