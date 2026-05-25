import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

export default function GetAllProducts() {
    let [products, setProducts] = useState([]);

    const fetchProducts = () => {
        axios.get("http://localhost:8014/api/products/fetchAll")
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
            });
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const deleteHandler = (id) => {
        if (window.confirm("This will mark the product as INACTIVE. Continue?")) {
            axios.delete("http://localhost:8014/api/products/" + id)
                .then(() => {
                    alert("Product marked as INACTIVE!");
                    fetchProducts(); 
                })
                .catch(() => alert("Delete failed!"));
        }
    };

    return (
        <div>
            <h1>All Products</h1>
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Product Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.productId}>
                            <td>{product.productId}</td>
                            <td>{product.productName}</td>
                            <td>{product.category}</td>
                            <td>{product.price}</td>
                            <td>{product.status}</td>
                            <td>
                                
                                <button onClick={() => deleteHandler(product.productId)}>
                                    Delete
                                </button>
                                &nbsp;
                                
                                <Link to={`/Product/update/${product.productId}`}>Edit</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}