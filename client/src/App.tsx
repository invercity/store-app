import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import {
    ThemeProvider,
    createTheme,
    CssBaseline,
    AppBar,
    Tabs,
    Tab,
    Box,
    Container,
} from '@mui/material';
import StoreListPage from './pages/StoreListPage';
import StoreDetailsPage from './pages/StoreDetailsPage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import ProductEditPage from './pages/ProductEditPage';
import NotFoundPage from './pages/NotFoundPage';
import { ErrorProvider } from './context/ErrorContext';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2',
        },
    },
});

function NavigationTabs() {
    const location = useLocation();
    const currentTab = location.pathname.startsWith('/product') ? 1 : 0;

    return (
        <AppBar position="static" color="default" elevation={1}>
            <Container maxWidth="lg">
                <Tabs value={currentTab} indicatorColor="primary" textColor="primary">
                    <Tab label="Store" component={Link} to="/store" />
                    <Tab label="Product" component={Link} to="/product" />
                </Tabs>
            </Container>
        </AppBar>
    );
}

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <ErrorProvider>
                <BrowserRouter>
                    <NavigationTabs />
                    <Box sx={{ py: 4 }}>
                        <Container maxWidth="lg">
                            <Routes>
                                <Route path="/store" element={<StoreListPage />} />
                                <Route path="/store/:id" element={<StoreDetailsPage />} />
                                <Route path="/product" element={<ProductListPage />} />
                                <Route path="/product/new" element={<ProductEditPage />} />
                                <Route path="/product/:id" element={<ProductDetailsPage />} />
                                <Route path="/product/:id/edit" element={<ProductEditPage />} />
                                <Route path="/" element={<Navigate to="/store" replace />} />
                                <Route path="*" element={<NotFoundPage />} />
                            </Routes>
                        </Container>
                    </Box>
                </BrowserRouter>
            </ErrorProvider>
        </ThemeProvider>
    );
}
