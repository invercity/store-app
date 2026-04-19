import React, { useState, useEffect, useCallback } from 'react';
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
    TablePagination,
    TextField,
    Button,
    IconButton,
    Tooltip,
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Add as AddIcon,
    Search as SearchIcon,
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { productApi } from '../api';
import { Product, ProductFilters } from '../types';

export default function ProductListPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [filters, setFilters] = useState<ProductFilters>({ limit: 10, page: 1 });
    const [searchCategory, setSearchCategory] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const navigate = useNavigate();

    const fetchProducts = useCallback(async () => {
        try {
            const activeFilters: ProductFilters = {
                ...filters,
                limit: rowsPerPage,
                page: page + 1,
                category: searchCategory || undefined,
                minPrice: minPrice ? Number(minPrice) : undefined,
                maxPrice: maxPrice ? Number(maxPrice) : undefined,
            };
            const response = await productApi.getAll(activeFilters);
            setProducts(response.data);
            setTotal(response.total);
        } catch (error) {
            console.error('Failed to fetch products', error);
        }
    }, [filters, rowsPerPage, page, searchCategory, minPrice, maxPrice]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleApplyFilters = () => {
        setPage(0); // Reset to first page
        setFilters(prev => ({ ...prev })); // Trigger effect
    };

    const handleRemoveProduct = async (id: string) => {
        if (window.confirm('Are you sure you want to remove this product?')) {
            try {
                await productApi.remove(id);
                fetchProducts();
            } catch (error) {
                console.error('Failed to remove product', error);
            }
        }
    };

    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 3,
                }}
            >
                <Typography variant="h4">Products</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    component={Link}
                    to="/product/new"
                >
                    Add Product
                </Button>
            </Box>

            <Paper
                sx={{
                    p: 2,
                    mb: 3,
                    display: 'flex',
                    gap: 2,
                    alignItems: 'center',
                    flexWrap: 'wrap',
                }}
            >
                <TextField
                    label="Category"
                    size="small"
                    value={searchCategory}
                    onChange={e => setSearchCategory(e.target.value)}
                />
                <TextField
                    label="Min Price"
                    size="small"
                    type="number"
                    value={minPrice}
                    onChange={e => setMinPrice(e.target.value)}
                />
                <TextField
                    label="Max Price"
                    size="small"
                    type="number"
                    value={maxPrice}
                    onChange={e => setMaxPrice(e.target.value)}
                />
                <Button variant="outlined" startIcon={<SearchIcon />} onClick={handleApplyFilters}>
                    Search
                </Button>
            </Paper>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }} align="right">
                                Price
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }} align="right">
                                Quantity
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }} align="right">
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map(product => (
                            <TableRow key={product.id} hover>
                                <TableCell>
                                    <Link
                                        to={`/product/${product.id}`}
                                        style={{ textDecoration: 'none', color: '#1976d2' }}
                                    >
                                        {product.name}
                                    </Link>
                                </TableCell>
                                <TableCell>{product.category}</TableCell>
                                <TableCell align="right">${product.price}</TableCell>
                                <TableCell align="right">{product.quantity}</TableCell>
                                <TableCell align="right">
                                    <Tooltip title="Edit">
                                        <IconButton
                                            size="small"
                                            onClick={() => navigate(`/product/${product.id}/edit`)}
                                        >
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Remove">
                                        <IconButton
                                            size="small"
                                            color="error"
                                            onClick={() => handleRemoveProduct(product.id)}
                                        >
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 50]}
                    component="div"
                    count={total}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={e => {
                        setRowsPerPage(parseInt(e.target.value, 10));
                        setPage(0);
                    }}
                />
            </TableContainer>
        </Box>
    );
}
