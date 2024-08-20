import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { BASE_URL } from "../services/config";
import Base from '../components/Base.jsx';

const AddProduct = () => {
    const [product, setProduct] = useState({
        productName: "",
        description: "",
        quantity: 0,
        price: 0.0,
        categoryDto: {
            categoryId: "" // This will be filled with manual input
        }
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith("categoryDto")) {
            // Handle nested object update
            setProduct(prevProduct => ({
                ...prevProduct,
                categoryDto: {
                    ...prevProduct.categoryDto,
                    [name.split(".")[1]]: value
                }
            }));
        } else {
            // Handle simple state update
            setProduct(prevProduct => ({
                ...prevProduct,
                [name]: value
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let admin = JSON.parse(localStorage.getItem("data"));
        axios.post(`${BASE_URL}/api/products/2`, product, { headers: { "Authorization": `Bearer ${admin.jwt}` } })
            .then(res => {
                swal("Product added successfully", "", "success");
                navigate("/admin/products");
            })
            .catch(err => {
                console.log("Error adding product:", err); // Debug log
                swal("Error adding product", "", "error");
            });
    };

    return (
        <Base>
        <div className="container my-4">
            <h2>Add New Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Product Name</label>
                    <input
                        type="text"
                        name="productName"
                        value={product.productName}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Quantity</label>
                    <input
                        type="number"
                        name="quantity"
                        value={product.quantity}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input
                        type="number"
                        step="0.01"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Category ID</label>
                    <input
                        type="text"
                        name="categoryDto.categoryId"
                        value={product.categoryDto.categoryId}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">Add Product</button>
            </form>
        </div>
        </Base>
    );
}

export default AddProduct;
