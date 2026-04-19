import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '60vh',
                    textAlign: 'center',
                }}
            >
                <Typography variant="h1" color="primary" sx={{ fontWeight: 'bold' }}>
                    404
                </Typography>
                <Typography variant="h4" sx={{ mb: 2 }}>
                    Page Not Found
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                    The page you are looking for might have been removed, had its name changed, or
                    is temporarily unavailable.
                </Typography>
                <Button variant="contained" component={Link} to="/">
                    Go to Home
                </Button>
            </Box>
        </Container>
    );
}
