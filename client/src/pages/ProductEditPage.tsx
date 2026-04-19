import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
    Typography,
    Box,
    TextField,
    Button,
    Paper,
    MenuItem,
    CircularProgress,
    Breadcrumbs,
} from '@mui/material';
import { useNavigate, useParams, Link, useSearchParams } from 'react-router-dom';
import { productApi, storeApi } from '../api';
import { Store } from '../types';

const productSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    category: z.string().min(1, 'Category is required'),
    price: z.coerce.number().min(0, 'Price must be a positive number'),
    quantity: z.coerce.number().int().min(0, 'Quantity must be a positive integer'),
    storeId: z.string().min(1, 'Store is required'),
});

type ProductFormData = z.infer<typeof productSchema>;

export default function ProductEditPage() {
    const { id } = useParams<{ id: string }>();
    const [searchParams] = useSearchParams();
    const storeIdFromQuery = searchParams.get('storeId');
    const isEdit = !!id;
    const navigate = useNavigate();
    const [stores, setStores] = useState<Store[]>([]);
    const [loading, setLoading] = useState(isEdit);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
    });

    const storeIdValue = watch('storeId');

    useEffect(() => {
        const fetchStores = async () => {
            try {
                const data = await storeApi.getAll();
                setStores(data);
            } catch (error) {
                console.error('Failed to fetch stores', error);
            }
        };
        fetchStores();

        if (storeIdFromQuery && !isEdit) {
            setValue('storeId', storeIdFromQuery);
        }

        if (isEdit) {
            const fetchProduct = async () => {
                try {
                    const product = await productApi.getById(id);
                    setValue('name', product.name);
                    setValue('category', product.category);
                    setValue('price', product.price);
                    setValue('quantity', product.quantity);
                    setValue('storeId', product.storeId);
                } catch (error) {
                    console.error('Failed to fetch product', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchProduct();
        }
    }, [id, isEdit, setValue, storeIdFromQuery]);

    const onSubmit = async (data: ProductFormData) => {
        try {
            if (isEdit) {
                await productApi.update(id, data);
            } else {
                await productApi.create(data);
            }
            navigate('/product');
        } catch (error) {
            console.error('Failed to save product', error);
        }
    };

    if (loading) return <CircularProgress />;

    return (
        <Box>
            <Breadcrumbs sx={{ mb: 2 }}>
                <Link to="/product" style={{ textDecoration: 'none', color: 'inherit' }}>
                    Products
                </Link>
                <Typography color="text.primary">
                    {isEdit ? 'Edit Product' : 'Add Product'}
                </Typography>
            </Breadcrumbs>

            <Typography variant="h4" gutterBottom>
                {isEdit ? 'Edit Product' : 'Add New Product'}
            </Typography>

            <Paper sx={{ p: 3, maxWidth: 600 }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            label="Product Name"
                            fullWidth
                            {...register('name')}
                            error={!!errors.name}
                            helperText={errors.name?.message}
                        />
                        <TextField
                            label="Category"
                            fullWidth
                            {...register('category')}
                            error={!!errors.category}
                            helperText={errors.category?.message}
                        />
                        <TextField
                            label="Price"
                            type="number"
                            fullWidth
                            {...register('price')}
                            error={!!errors.price}
                            helperText={errors.price?.message}
                        />
                        <TextField
                            label="Quantity"
                            type="number"
                            fullWidth
                            {...register('quantity')}
                            error={!!errors.quantity}
                            helperText={errors.quantity?.message}
                        />
                        <TextField
                            select
                            label="Store"
                            fullWidth
                            {...register('storeId')}
                            error={!!errors.storeId}
                            helperText={errors.storeId?.message}
                            InputLabelProps={{ shrink: true }}
                            value={storeIdValue || ''}
                        >
                            <MenuItem value="" disabled>
                                Select a store
                            </MenuItem>
                            {stores.map(store => (
                                <MenuItem key={store.id} value={store.id}>
                                    {store.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                            <Button variant="contained" type="submit">
                                {isEdit ? 'Update Product' : 'Create Product'}
                            </Button>
                            <Button variant="outlined" onClick={() => navigate('/product')}>
                                Cancel
                            </Button>
                        </Box>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
}
