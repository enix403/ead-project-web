/*

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/users').then((response) => setUsers(response.data));
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id} onClick={() => navigate(`/chat/${user._id}`)}>
            {user.fullName}
          </li>
        ))}
      </ul>
    </div>
  );
};


export default UserList;

*/

