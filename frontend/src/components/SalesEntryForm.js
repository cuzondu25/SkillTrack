import React, { useState, useEffect } from 'react';
import Axios from 'axios';

/**
 * SalesEntryForm Component
 * 
 * This component provides a form to submit sales entries. It fetches items from the backend
 * and allows the user to select an item, specify a quantity, and choose a date. The form 
 * validates the input and displays appropriate error messages.
 */
const SalesEntryForm = () => {
    // State to store the list of items fetched from the backend
    const [items, setItems] = useState([]);
    
    // State to store form data
    const [formData, setFormData] = useState({
        item_id: '',
        quantity: '',
        date: ''
    });
    
    // State to store validation errors
    const [errors, setErrors] = useState({});
    
    // State to store success message after form submission
    const [successMessage, setSuccessMessage] = useState('');

    /**
     * useEffect hook to fetch items from the backend when the component mounts
     */
    useEffect(() => {
        Axios.get('http://localhost:5000/api/items')
            .then(response => {
                setItems(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the items!', error);
            });
    }, []);

    /**
     * Handle form field changes
     * 
     * @param {Object} e - The event object
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    /**
     * Validate the form data
     * 
     * @returns {Object} errors - The validation errors
     */
    const validateForm = () => {
        let errors = {};

        if (!formData.item_id) {
            errors.item_id = 'Item is required';
        }
        if (!formData.quantity) {
            errors.quantity = 'Quantity is required';
        } else if (isNaN(formData.quantity) || formData.quantity <= 0) {
            errors.quantity = 'Quantity must be a positive number';
        }
        if (!formData.date) {
            errors.date = 'Date is required';
        }

        return errors;
    };

    /**
     * Handle form submission
     * 
     * @param {Object} e - The event object
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
	const token = localStorage.getItem('token');
        const validationErrors = validateForm();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            await Axios.post('http://localhost:5000/api/sales', formData,
		{ headers: { Authorization: `Bearer ${token}` } })
                .then(response => {
                    setSuccessMessage('Sales data submitted successfully');
                    setFormData({
                        item_id: '',
                        quantity: '',
                        date: ''
                    });
                    setErrors({});
                })
                .catch(error => {
                    console.error('There was an error submitting the sales data!', error);
                });
        }
    };

    return (
        <div>
            <h2>Sales Entry Form</h2>
            {successMessage && <div className="success-message">{successMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="item_id">Item</label>
                    <select name="item_id" value={formData.item_id} onChange={handleChange}>
                        <option value="">Select an item</option>
                        {items.map(item => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </select>
                    {errors.item_id && <div className="error">{errors.item_id}</div>}
                </div>
                <div>
                    <label htmlFor="quantity">Quantity</label>
                    <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                    />
                    {errors.quantity && <div className="error">{errors.quantity}</div>}
                </div>
                <div>
                    <label htmlFor="date">Date</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                    />
                    {errors.date && <div className="error">{errors.date}</div>}
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default SalesEntryForm;
