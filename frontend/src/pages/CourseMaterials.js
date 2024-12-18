import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMaterials, addMaterial, deleteMaterial } from '../api/materials';

const CourseMaterials = () => {
    const { courseId } = useParams();
    const [materials, setMaterials] = useState([]);
    const [newMaterial, setNewMaterial] = useState({ title: '', material_type: 'link', material_url: '' });
    const token = localStorage.getItem('token');

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
        <div>
            <h2>Course Materials</h2>
            <ul>
                {materials.map((material) => (
                    <li key={material.id}>
                        <p>
                            <strong>{material.title}</strong> ({material.material_type}) -{' '}
                            <a href={material.material_url} target="_blank" rel="noopener noreferrer">
                                Open Material
                            </a>
                        </p>
                        <button onClick={() => handleDelete(material.id)}>Delete</button>
                    </li>
                ))}
            </ul>

            <h3>Add New Material</h3>
            <input
                type="text"
                placeholder="Title"
                value={newMaterial.title}
                onChange={(e) => setNewMaterial({ ...newMaterial, title: e.target.value })}
            />
            <select
                value={newMaterial.material_type}
                onChange={(e) => setNewMaterial({ ...newMaterial, material_type: e.target.value })}
            >
                <option value="pdf">PDF</option>
                <option value="video">Video</option>
                <option value="link">Link</option>
            </select>
            <input
                type="text"
                placeholder="URL"
                value={newMaterial.material_url}
                onChange={(e) => setNewMaterial({ ...newMaterial, material_url: e.target.value })}
            />
            <button onClick={handleAddMaterial}>Add Material</button>
        </div>
    );
};

export default CourseMaterials;
