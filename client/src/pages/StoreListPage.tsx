import React, { useState, useEffect } from 'react';
import {
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Button,
    TextField,
    Box,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { storeApi } from '../api';
import { Store } from '../types';

export default function StoreListPage() {
    const [stores, setStores] = useState<Store[]>([]);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [newStoreName, setNewStoreName] = useState('');
    const [editingStoreId, setEditingStoreId] = useState<string | null>(null);
    const [editingName, setEditingName] = useState('');
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const navigate = useNavigate();

    const fetchStores = async () => {
        try {
            const data = await storeApi.getAll();
            setStores(data);
        } catch (error) {
            console.error('Failed to fetch stores', error);
        }
    };

    useEffect(() => {
        fetchStores();
    }, []);

    const handleAddStore = async () => {
        if (!newStoreName.trim()) return;
        try {
            await storeApi.create(newStoreName);
            setNewStoreName('');
            setIsAddDialogOpen(false);
            fetchStores();
        } catch (error) {
            console.error('Failed to add store', error);
        }
    };

    const handleRemoveStore = async (id: string) => {
        try {
            await storeApi.remove(id);
            fetchStores();
        } catch (error) {
            console.error('Failed to remove store', error);
        }
    };

    const startEditing = (store: Store) => {
        setEditingStoreId(store.id);
        setEditingName(store.name);
    };

    const handleUpdateName = async (id: string) => {
        if (!editingName.trim()) return;
        try {
            await storeApi.update(id, editingName);
            setEditingStoreId(null);
            fetchStores();
        } catch (error) {
            console.error('Failed to update store', error);
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
                <Typography variant="h4">Stores</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setIsAddDialogOpen(true)}
                >
                    Add Store
                </Button>
            </Box>

            <Paper elevation={2}>
                <List>
                    {stores.map(store => (
                        <ListItem
                            key={store.id}
                            divider
                            onMouseEnter={() => setHoveredId(store.id)}
                            onMouseLeave={() => setHoveredId(null)}
                            sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}
                            onClick={() =>
                                editingStoreId !== store.id && navigate(`/store/${store.id}`)
                            }
                        >
                            {editingStoreId === store.id ? (
                                <TextField
                                    fullWidth
                                    value={editingName}
                                    onChange={e => setEditingName(e.target.value)}
                                    onKeyDown={e => {
                                        if (e.key === 'Enter') handleUpdateName(store.id);
                                        if (e.key === 'Escape') setEditingStoreId(null);
                                    }}
                                    autoFocus
                                    size="small"
                                    onClick={e => e.stopPropagation()}
                                />
                            ) : (
                                <>
                                    <ListItemText primary={store.name} secondary={store.address} />
                                    {hoveredId === store.id && (
                                        <ListItemSecondaryAction>
                                            <IconButton
                                                edge="end"
                                                onClick={e => {
                                                    e.stopPropagation();
                                                    startEditing(store);
                                                }}
                                            >
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                            <IconButton
                                                edge="end"
                                                onClick={e => {
                                                    e.stopPropagation();
                                                    handleRemoveStore(store.id);
                                                }}
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    )}
                                </>
                            )}
                        </ListItem>
                    ))}
                </List>
            </Paper>

            <Dialog open={isAddDialogOpen} onClose={() => setIsAddDialogOpen(false)}>
                <DialogTitle>Add New Store</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Store Name"
                        fullWidth
                        variant="outlined"
                        value={newStoreName}
                        onChange={e => setNewStoreName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleAddStore} variant="contained">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
