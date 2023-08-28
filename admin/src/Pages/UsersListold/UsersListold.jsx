import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CircularProgress } from "@mui/material";
// import { Loader } from '../../Components/import';
import { BASE_API_URL, fetchData } from "../../Components/Utils";
import { ReactPaginate } from "react-paginate";
import "./UsersList.css";
import useRedirectLoggedOutUser from "../../CustomHook/useRedirectLoggedOutUser";
import { selectUsers } from "../../redux/features/auth/filterSlice";
const UsersList = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");

  const { /**users,  */ isLoading, isLoggedIn, isSuccess, message } =
    useSelector((state) => state.auth);

  const filteredUsers = useSelector(selectUsers);

  //   useEffect(() => {
  //     dispatch(get);

  //     return () => {
  //       second;
  //     };
  //   }, [third]);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsersData = async () => {
      const usersData = await fetchData(`${BASE_API_URL}/users`);

      setUsers(usersData);
    };
    fetchUsersData();
  }, []);

  return !users.length ? (
    <CircularProgress />
  ) : (
    <div>
      <div className="user-div">
        <table>
          <tr>
            <th>Name</th>
            <th>L-Reg id</th>
            <th>Owener Image</th>
            <th>Email</th>
            <th>Mobile Number</th>
            <th>Loom Type</th>
            <th>Loom Type Image</th>
            <th>Product Type </th>
            <th>Product Type Image</th>
            <th>Weaver Name</th>
            <th>Weaver Name Image</th>
            <th>State</th>
            <th>City</th>
            <th>Village</th>
            <th>Pin Code</th>
          </tr>
          {users.map((user, idx) => {
            return (
              <tr key={idx} user={user}>
                <td>
                  {user.first_name} {user.last_name}
                </td>
                <td>{user.Reg_id}</td>
                <td>
                  <img src={user.owner_img} />
                </td>
                <td>{user.user_email}</td>

                <td>{user.phone}</td>
                <td>{user.loom_type}</td>
                <td>
                  <img src={user.loom_type_img} />
                </td>
                <td>{user.product_type}</td>
                <td>
                  <img src={user.product_type_img} />
                </td>
                <td>{user.weaver_name}</td>
                <td>
                  <img src={user.weaver_img} />
                </td>

                <td>{user.state}</td>
                <td>{user.city}</td>
                <td>{user.village}</td>
                <td>{user.pin_code}</td>
              </tr>
            );
          })}
        </table>
      </div>
      {/* // <UserCard key={idx} user={user} /> */}
      {/* ))}</div> */}
    </div>
  );
};

export default UsersList;
