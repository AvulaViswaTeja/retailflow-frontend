import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

export default function GetAllProducts() {
    let [products, setProducts] = useState([]);
    let [showConfirmModal, setShowConfirmModal] = useState(false);  
    let [showResultModal, setShowResultModal] = useState(false);    
    let [selectedId, setSelectedId] = useState(null);              
    let [selectedName, setSelectedName] = useState("");            
    let [modalMessage, setModalMessage] = useState("");
    let [modalSuccess, setModalSuccess] = useState(true);

    const fetchProducts = () => {
        let token = localStorage.getItem("token");
        axios.get("http://localhost:1405/api/products", {
            headers: { "Authorization": "Bearer " + token }
        })
            .then((response) => setProducts(response.data))
            .catch((error) => console.error("Error fetching products:", error));
    };

    useEffect(() => {
        fetchProducts();
    }, []);

   
    let openConfirmModal = (id, name) => {
        setSelectedId(id);
        setSelectedName(name);
        setShowConfirmModal(true);
    };

    
    let deleteHandler = () => {
        let token = localStorage.getItem("token");
        setShowConfirmModal(false);

        axios.delete("http://localhost:1405/api/products/" + selectedId, {
            headers: { "Authorization": "Bearer " + token }
        })
        .then(() => {
            setModalSuccess(true);
            setModalMessage(`Product "${selectedName}" marked as INACTIVE!`);
            setShowResultModal(true);
            fetchProducts();    
        })
        .catch(() => {
            setModalSuccess(false);
            setModalMessage("Delete failed! Please try again.");
            setShowResultModal(true);
        });
    };

    return (
        <div className="container mt-4">
            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                    <h4 className="mb-0">All Products</h4>
                    <span className="badge bg-light text-primary">
                        Total: {products.length}
                    </span>
                </div>
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-striped table-hover mb-0">
                            <thead className="table-dark">
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
                                        <td>₹{product.price}</td>
                                        <td>
                                            <span className={`badge ${
                                                product.status === "ACTIVE" ? "bg-success" :
                                                product.status === "INACTIVE" ? "bg-danger" :
                                                "bg-secondary"
                                            }`}>
                                                {product.status}
                                            </span>
                                        </td>
                                        <td>
                                           
                                            <button
                                                className="btn btn-danger btn-sm me-2"
                                                onClick={() => openConfirmModal(product.productId, product.productName)}
                                            >
                                                Delete
                                            </button>
                                            <Link
                                                className="btn btn-secondary btn-sm"
                                                to={`/Product/update/${product.productId}`}
                                            >
                                                Edit
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            
            {showConfirmModal && (
                <>
                    <div
                        className="modal-backdrop fade show"
                        onClick={() => setShowConfirmModal(false)}
                    ></div>
                    <div className="modal fade show d-block" tabIndex="-1">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">

                                <div className="modal-header bg-warning text-dark">
                                    <h5 className="modal-title">⚠️ Confirm Delete</h5>
                                    <button
                                        className="btn-close"
                                        onClick={() => setShowConfirmModal(false)}
                                    ></button>
                                </div>

                                <div className="modal-body">
                                    <p>Are you sure you want to mark <strong>"{selectedName}"</strong> as INACTIVE?</p>
                                </div>

                                <div className="modal-footer">
                                    <button
                                        className="btn btn-secondary w-50"
                                        onClick={() => setShowConfirmModal(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="btn btn-danger w-50"
                                        onClick={deleteHandler}
                                    >
                                        Yes, Delete
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </>
            )}

            
            {showResultModal && (
                <>
                    <div
                        className="modal-backdrop fade show"
                        onClick={() => setShowResultModal(false)}
                    ></div>
                    <div className="modal fade show d-block" tabIndex="-1">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">

                                <div className={`modal-header ${modalSuccess ? "bg-success" : "bg-danger"} text-white`}>
                                    <h5 className="modal-title">
                                        {modalSuccess ? "✅ Success" : "❌ Error"}
                                    </h5>
                                    <button
                                        className="btn-close btn-close-white"
                                        onClick={() => setShowResultModal(false)}
                                    ></button>
                                </div>

                                <div className="modal-body">
                                    <p className="mb-0">{modalMessage}</p>
                                </div>

                                <div className="modal-footer">
                                    <button
                                        className={`btn ${modalSuccess ? "btn-success" : "btn-danger"} w-100`}
                                        onClick={() => setShowResultModal(false)}
                                    >
                                        OK
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </>
            )}

        </div>
    );
}