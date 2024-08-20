import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { BASE_URL } from "../services/config";
import Base from "../components/Base";

const CategoryMgt = () => {
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        let admin = JSON.parse(localStorage.getItem("data"));
        axios.get(`${BASE_URL}/api/categories`, { headers: { "Authorization": `Bearer ${admin.jwt}` } })
            .then(res => {
                setCategories(res.data);
            })
            .catch(err => {
                console.log(err);
                swal("Error fetching categories", "", "error");
            });
    }, []);

    const handleAddCategory = (e) => {
        e.preventDefault();
        let admin = JSON.parse(localStorage.getItem("data"));
        axios.post(`${BASE_URL}/api/categories`, { categoryName }, { headers: { "Authorization": `Bearer ${admin.jwt}` } })
            .then(res => {
                swal("Category added successfully", "", "success");
                setCategoryName(""); // Clear input field
                // Refresh categories list
                axios.get(`${BASE_URL}/api/categories`, { headers: { "Authorization": `Bearer ${admin.jwt}` } })
                    .then(res => setCategories(res.data))
                    .catch(err => console.log(err));
            })
            .catch(err => {
                console.log(err);
                swal("Error adding category", "", "error");
            });
    };

    const handleDeleteCategory = (categoryId) => {
        let admin = JSON.parse(localStorage.getItem("data"));
        axios.delete(`${BASE_URL}/api/categories/${categoryId}`, { headers: { "Authorization": `Bearer ${admin.jwt}` } })
            .then(res => {
                swal("Category removed successfully", "", "success");
                // Refresh categories list
                axios.get(`${BASE_URL}/api/categories`, { headers: { "Authorization": `Bearer ${admin.jwt}` } })
                    .then(res => setCategories(res.data))
                    .catch(err => console.log(err));
            })
            .catch(err => {
                console.log(err);
                swal("Error removing category", "", "error");
            });
    };

    return (
        <Base>
        <div className="container my-4">
            <h2>Manage Categories</h2>

            <form onSubmit={handleAddCategory} className="mb-4">
                <div className="form-group">
                    <label>Category Name</label>
                    <input
                        type="text"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        className="form-control"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-2">Add Category</button>
            </form>

            <table className="table table-bordered">
                <thead className="bg-dark text-light">
                    <tr>
                        <th>Category ID</th>
                        <th>Category Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category.categoryId}>
                            <td>{category.categoryId}</td>
                            <td>{category.categoryName}</td>
                            <td>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDeleteCategory(category.categoryId)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </Base>
    );
};

export default CategoryMgt;
