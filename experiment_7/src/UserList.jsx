import { useState, useEffect } from 'react';
import axios from 'axios';

function UserList() {
 const [users, setUsers] = useState([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);

 useEffect(() => {
 axios.get('https://jsonplaceholder.typicode.com/users')
 .then(response => {
 setUsers(response.data);
 setLoading(false);
 })
 .catch(err => {
 setError('Failed to fetch data.');
 setLoading(false);
 });
 }, []);

 if (loading) return <p>Loading...</p>;
 if (error) return <p>{error}</p>;

 return (
 <div>
 <h2>User List</h2>
 {users.map(user => (
 <div key={user.id} style={{ border:'1px solid #ccc', margin:'8px', padding:'8px' }}>
 <strong>{user.name}</strong> | {user.email} | {user.address.city}
 </div>
 ))}
 </div>
 );
}

export default UserList;
