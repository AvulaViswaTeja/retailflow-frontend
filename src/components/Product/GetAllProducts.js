import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

export default function GetAllProducts() {
    let [products, setProducts] = useState([]);

    const fetchProducts = () => {
        axios.get("http://localhost:1405/api/products/fetchAll")
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

    let deleteHandler = (id) => {

        let token = localStorage.getItem("token");

        if (window.confirm("This will mark the product as INACTIVE. Continue?")) {
            axios.delete("http://localhost:1405/api/products/" + id)
                .then(() => {
                    alert("Product marked as INACTIVE!");
                    fetchProducts(); 
                })
                .catch(() => alert("Delete failed!"));
        }
    };

    return (
        <div>
            
            <table className="table table-border">
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
                                
                                <button className="btn btn-danger" onClick={() => deleteHandler(product.productId)}>
                                    Delete
                                </button>
                                &nbsp;
                                
                                <Link className="btn btn-secondary" to={`/Product/update/${product.productId}`}>
                                    Edit
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}