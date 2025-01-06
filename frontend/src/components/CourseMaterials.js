import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useParams } from 'react-router-dom';
import { fetchMaterials, addMaterial, deleteMaterial } from '../api/materials';
import { Box, Typography, Grid, TextField, Button, Select, MenuItem, Card, CardContent, CardActions } from '@mui/material';
import Header from './Header';

const CourseMaterials = () => {
    const { courseId } = useParams();
    const [materials, setMaterials] = useState([]);
    const [newMaterial, setNewMaterial] = useState({ title: '', material_type: 'link', material_url: '' });
    const token = localStorage.getItem('token');
    const { user } = useAuth();

    useEffect(() => {
        const loadMaterials = async () => {
            const data = await fetchMaterials(courseId, token);
            setMaterials(data);
        };
        loadMaterials();
    }, [courseId, token]);

    const handleAddMaterial = async () => {
        await addMaterial({ ...newMaterial, course_id: courseId }, token);
        setNewMaterial({ title: '', material_type: 'link', material_url: '' });
        const updatedMaterials = await fetchMaterials(courseId, token);
        setMaterials(updatedMaterials);
    };

    const handleDelete = async (materialId) => {
        await deleteMaterial(materialId, token);
        const updatedMaterials = await fetchMaterials(courseId, token);
        setMaterials(updatedMaterials);
    };

    return (
        <>
            <Header />
            <Box p={3}>
                <Typography variant="h4" gutterBottom>Course Materials</Typography>
                <Grid container spacing={2}>
                    {materials.map((material) => (
                        <Grid item xs={12} md={6} key={material.id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">{material.title}</Typography>
                                    <Typography variant="body2">
                                        Type: {material.material_type} -{' '}
                                        <a href={material.material_url} target="_blank" rel="noopener noreferrer">
                                            Open Material
                                        </a>
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button color="error" onClick={() => handleDelete(material.id)}>Delete</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {user && user.role === 'admin' && (
                    <Box mt={4}>
                        <Typography variant="h5">Add New Material</Typography>
                        <TextField
                            fullWidth
                            label="Title"
                            size="small"
                            value={newMaterial.title}
                            onChange={(e) => setNewMaterial({ ...newMaterial, title: e.target.value })}
                            margin="normal"
                        />
                        <Select
                            fullWidth
                            size="small"
                            value={newMaterial.material_type}
                            onChange={(e) => setNewMaterial({ ...newMaterial, material_type: e.target.value })}
                            margin="normal"
                        >
                            <MenuItem value="pdf">PDF</MenuItem>
                            <MenuItem value="video">Video</MenuItem>
                            <MenuItem value="link">Link</MenuItem>
                        </Select>
                        <TextField
                            fullWidth
                            label="URL"
                            size="small"
                            value={newMaterial.material_url}
                            onChange={(e) => setNewMaterial({ ...newMaterial, material_url: e.target.value })}
                            margin="normal"
                        />
                        <Button variant="contained" color="primary" onClick={handleAddMaterial}>
                            Add Material
                        </Button>
                    </Box>
                )}
            </Box>
        </>
    );
};

export default CourseMaterials;
