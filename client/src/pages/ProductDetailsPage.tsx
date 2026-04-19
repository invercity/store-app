import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
    Typography,
    Box,
    Paper,
    Button,
    CircularProgress,
    Breadcrumbs,
    Divider,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { productApi } from '../api';
import { Product } from '../types';

export default function ProductDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) return;
            try {
                const data = await productApi.getById(id);
                setProduct(data);
            } catch (error) {
                console.error('Failed to fetch product details', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleRemove = async () => {
        if (window.confirm('Are you sure you want to remove this product?')) {
            try {
                await productApi.remove(id);
                navigate('/product');
            } catch (error) {
                console.error('Failed to remove product', error);
            }
        }
    };

    if (loading) return <CircularProgress />;
    if (!product) return <Typography>Product not found</Typography>;

    return (
        <Box>
            <Breadcrumbs sx={{ mb: 2 }}>
                <Link to="/product" style={{ textDecoration: 'none', color: 'inherit' }}>
                    Products
                </Link>
                <Typography color="text.primary">{product.name}</Typography>
            </Breadcrumbs>

            <Paper sx={{ p: 4, maxWidth: 800 }}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        mb: 3,
                    }}
                >
                    <Box>
                        <Typography variant="h4" gutterBottom>
                            {product.name}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            Category: {product.category}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                            variant="outlined"
                            startIcon={<EditIcon />}
                            onClick={() => navigate(`/product/${product.id}/edit`)}
                        >
                            Edit
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            startIcon={<DeleteIcon />}
                            onClick={handleRemove}
                        >
                            Remove
                        </Button>
                    </Box>
                </Box>

                <Divider sx={{ my: 3 }} />

                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 3 }}>
                    <Box>
                        <Typography variant="overline" color="text.secondary">
                            Price
                        </Typography>
                        <Typography variant="h6">${product.price}</Typography>
                    </Box>
                    <Box>
                        <Typography variant="overline" color="text.secondary">
                            Quantity
                        </Typography>
                        <Typography variant="h6">{product.quantity}</Typography>
                    </Box>
                    <Box>
                        <Typography variant="overline" color="text.secondary">
                            Store ID
                        </Typography>
                        <Typography variant="body1">
                            <Link to={`/store/${product.storeId}`}>{product.storeId}</Link>
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="overline" color="text.secondary">
                            Created At
                        </Typography>
                        <Typography variant="body1">
                            {new Date(product.createdAt).toLocaleString()}
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}
