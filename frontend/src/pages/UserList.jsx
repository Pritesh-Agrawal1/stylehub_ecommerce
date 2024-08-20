import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { BASE_URL } from "../services/config";
import Base from '../components/Base';

const UserList = () => {
    const [userList, setUserList] = useState([]);
    const [refreshFlag, setRefreshFlag] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        let admin = JSON.parse(localStorage.getItem("data"));
        axios.get(`${BASE_URL}/api/users`, { headers: { "Authorization": `Bearer ${admin.jwt}` } })
            .then(res => {
                console.log(res.data);
                setUserList(res.data);
            })
            .catch(err => {
                console.log(err);
                swal("Something went Wrong", "", "error");
            });
    }, [refreshFlag]);


    const handleDelete = (userId) => {
      let admin = JSON.parse(localStorage.getItem("data"));
      axios.delete(`${BASE_URL}/api/users/${userId}`, { headers: { "Authorization": `Bearer ${admin.jwt}` } })
          .then(res => {
              swal("User deleted successfully", "", "success");
              setRefreshFlag(!refreshFlag); // Trigger re-fetching of user list
          })
          .catch(err => {
              console.log(err);
              swal("Error deleting user", "", "error");
          });
  };

    return (
        <Base>
        <>
            <div className="container my-4">
                <div>
                    <h3>All Users</h3>

                    <table className="table table-bordered">
                        <thead className="bg-dark text-light">
                            <tr>
                                <th>Id</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Phone No</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userList.map((user) => (
                                <tr key={user.userId}>
                                    <td>{user.userId}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phoneNo}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user.userId)}>
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

export default UserList;
