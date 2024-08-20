import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { BASE_URL } from "../services/config";
import Base from '../components/Base';

const ProductList = () => {
    const [productList, setProductList] = useState([]);
    const [refreshFlag, setRefreshFlag] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        let admin = JSON.parse(localStorage.getItem("data"));
        axios.get(`${BASE_URL}/api/products`, { headers: { "Authorization": `Bearer ${admin.jwt}` } })
            .then(res => {
                console.log(res.data);
                setProductList(res.data);
            })
            .catch(err => {
                console.log(err);
                swal("Something went wrong", "", "error");
            });
    }, [refreshFlag]);

    const handleDelete = (productId) => {
        let admin = JSON.parse(localStorage.getItem("data"));
        axios.delete(`${BASE_URL}/api/products/${productId}`, { headers: { "Authorization": `Bearer ${admin.jwt}` } })
            .then(res => {
                swal("Product deleted successfully", "", "success");
                setRefreshFlag(!refreshFlag); // Trigger re-fetching of product list
            })
            .catch(err => {
                console.log(err);
                swal("Error deleting product", "", "error");
            });
    };

    return (
        <Base>
        <>
            <div className="container my-4">
                <div>
                    <h3>All Products</h3>

                    <table className="table table-bordered">
                        <thead className="bg-dark text-light">
                            <tr>
                                <th>Id</th>
                                <th>Product Name</th>
                                <th>Description</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productList.map((product) => (
                                <tr key={product.productId}>
                                    <td>{product.productId}</td>
                                    <td>{product.productName}</td>
                                    <td>{product.description}</td>
                                    <td>{product.quantity}</td>
                                    <td>${product.price.toFixed(2)}</td>
                                    <td>{product.categoryDto ? product.categoryDto.categoryName : 'N/A'}</td>
                                    <td>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(product.productId)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
        </Base>
    );
};

export default ProductList;
