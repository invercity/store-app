import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    Typography,
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    CircularProgress,
    Breadcrumbs,
    Button,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { storeApi } from '../api';
import { Store, Product } from '../types';

export default function StoreDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const [store, setStore] = useState<Store | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [inventoryValue, setInventoryValue] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;
            try {
                const currentStore = await storeApi.get(id);
                if (currentStore) {
                    setStore(currentStore);
                    const [productList, inventoryData] = await Promise.all([
                        storeApi.getProducts(id),
                        storeApi.getInventoryValue(id),
                    ]);
                    setProducts(productList.data);
                    setInventoryValue(inventoryData.total);
                }
            } catch (error) {
                console.error('Failed to fetch store details', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    if (loading) return <CircularProgress />;
    if (!store) return <Typography>Store not found</Typography>;

    return (
        <Box>
            <Breadcrumbs sx={{ mb: 2 }}>
                <Link to="/store" style={{ textDecoration: 'none', color: 'inherit' }}>
                    Stores
                </Link>
                <Typography color="text.primary">{store.name}</Typography>
            </Breadcrumbs>

            <Typography variant="h4" gutterBottom>
                {store.name}
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mt: 4,
                    mb: 2,
                }}
            >
                <Typography variant="h6">Products in this store</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    component={Link}
                    to={`/product/new?storeId=${id}`}
                >
                    Add Product
                </Button>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TitleCell>Name</TitleCell>
                            <TitleCell>Category</TitleCell>
                            <TitleCell align="right">Price</TitleCell>
                            <TitleCell align="right">Quantity</TitleCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map(product => (
                            <TableRow key={product.id}>
                                <TableCell>
                                    <Link to={`/product/${product.id}`}>{product.name}</Link>
                                </TableCell>
                                <TableCell>{product.category}</TableCell>
                                <TableCell align="right">${product.price}</TableCell>
                                <TableCell align="right">{product.quantity}</TableCell>
                            </TableRow>
                        ))}
                        {products.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    No products found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {inventoryValue !== null && (
                <Paper sx={{ p: 2, mb: 3 }}>
                    <Typography variant="h6">Total Inventory Value</Typography>
                    <Typography variant="h4">${inventoryValue.toLocaleString()}</Typography>
                </Paper>
            )}
        </Box>
    );
}

function TitleCell({
    children,
    align,
}: {
    children: React.ReactNode;
    align?: 'right' | 'left' | 'center';
}) {
    return (
        <TableCell align={align} sx={{ fontWeight: 'bold' }}>
            {children}
        </TableCell>
    );
}
