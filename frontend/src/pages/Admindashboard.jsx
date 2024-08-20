import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Base from "../components/Base";

const Admindashboard = () => {
    const [admin, setAdmin] = useState({
        email: "",
        role: "",
        userId:" ",
        jwt: ""
    });

    const [loggedIn, setLoggedIn] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        //let adm = JSON.parse(localStorage.getItem("data"))?.user;
        let adm = JSON.parse(localStorage.getItem("data"));
        if (adm == null) {
            console.log(adm);
            swal("Not Authorized", "", "error");
            navigate("/login"); // Redirect to login if not authorized
        } else {

            setLoggedIn(true);
            setAdmin({
                role: adm.role,
                userId: adm.userId,
                email: adm.email,
                jwt: adm.jwt
            });
        }
    }, [navigate]);

    return (
        <Base>
        <>
            {loggedIn ? (
                <>
                    <div className="jumbotron" style={{ marginLeft: 20 }}>
                        <h3 style={{ marginTop: 10 }}>Hello,</h3>
                        <h1 style={{ marginLeft: 30 }}>Admin</h1>
                    </div>
                    <hr className="my-4" />

                    <div className="container" style={{ marginBottom: "50px", textAlign: "center" }}>
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="card" onClick={() => navigate("/admin/users")}>
                                    <div className="card-body">
                                        <h5 className="card-title">User List</h5>
                                        <p className="card-text">View and manage all users</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="card" onClick={() => navigate("/admin/products")}>
                                    <div className="card-body">
                                        <h5 className="card-title">Product List</h5>
                                        <p className="card-text">View and manage all products</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="card" onClick={() => navigate("/admin/addproduct")}>
                                    <div className="card-body">
                                        <h5 className="card-title">Add Product</h5>
                                        <p className="card-text">Add a new product</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="card" onClick={() => navigate("/admin/categorymgt")}>
                                    <div className="card-body">
                                        <h5 className="card-title">Add Category</h5>
                                        <p className="card-text">Add a new category</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div style={{ textAlign: "center" }}>
                    <h1>Please Log in to Access this page</h1>
                </div>
            )}
        </>
        </Base>
    );
}

export default Admindashboard;
