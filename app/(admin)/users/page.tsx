'use client'

import { useState } from 'react'
import { DashboardLayout } from '@/components/layout/dashboard-layout'

const initialUsersData = [
  { id: 1, username: 'Ahmad', email: 'ahmad@mail.com', password: 'password1', organisation: 'Farm 1', role: 'admin', remarks: 'N/A' },
  { id: 2, username: 'Bisau', email: 'bisau@mail.com', password: 'password2', organisation: 'Farm 1', role: 'user', remarks: 'N/A' },
  { id: 3, username: 'Malik', email: 'malik@mail.com', password: 'password3', organisation: 'Farm 1', role: 'user', remarks: 'N/A' },
  { id: 4, username: 'Wan', email: 'wan@mail.com', password: 'password4', organisation: 'Farm 1', role: 'user', remarks: 'N/A' },
  { id: 5, username: 'Noah', email: 'noah@example.com', password: 'password5', organisation: 'Farm 2', role: 'user', remarks: 'N/A' },
  { id: 6, username: 'Sophia', email: 'sophia@example.com', password: 'password6', organisation: 'Farm 1', role: 'admin', remarks: 'N/A' },
  { id: 7, username: 'Mason', email: 'mason@example.com', password: 'password7', organisation: 'Farm 1', role: 'user', remarks: 'N/A' },
  { id: 8, username: 'Isabella', email: 'isabella@example.com', password: 'password8', organisation: 'Farm 2', role: 'user', remarks: 'N/A' },
  { id: 9, username: 'Ethan', email: 'ethan@example.com', password: 'password9', organisation: 'Farm 1', role: 'user', remarks: 'N/A' },
];

export default function UsersPage() {
  const [org, setOrg] = useState('')
  const [role, setRole] = useState('')
  const [sortConfig, setSortConfig] = useState({key: 'id', direction: 'ascending'});
  const [searchTerm, setSearchTerm] = useState('')
  const [usersData, setUsersData] = useState(initialUsersData);
  const [newUser, setNewUser] = useState({
    id: '',
    username: '',
    email: '',
    password: '',
    organisation: '',
    role: 'user',
    remarks: '',
  });
  const [editUserId, setEditUserId] = useState<number | null>(null);
  const [editUserData, setEditUserData] = useState({
    password: '',
    remarks: '',
    role: 'user',
  });
  const [passwordVisible, setPasswordVisible] = useState(false); // State to manage password visibility

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewUser(prev => ({ ...prev, [name]: value }));
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newUserData = { ...newUser, id: usersData.length + 1 }; // Assign a new ID
    
    try {
      const response = await fetch('api/farmer/farmer-register.ts',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newFarmerData),
    });

    if (response.ok) {
      alert('Farmer registered successfully!');
      // Reset form and update local state
      setUsersData(prev => [...prev, newUserData]);
      setNewUser({ id: '', username: '', email: '', password: '', organisation: '', role: 'user', remarks: '' });
    } else {
      const error = await response.json();
      alert(`Failed to register farmer: ${error.error}`);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An unexpected error occurred.');
  }
};
  export default function handler(req, res) {
    if (req.method === 'POST') {
      const data = req.body;
      // Handle the POST request logic
       res.status(200).json({ message: 'Farmer registered successfully!' });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  }

  const handleDelete = (username: string, id: number) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete user ${username}?`);
    if (confirmDelete) {
      setUsersData(prev => prev.filter(user => user.id !== id));
    }
  };

  const handleEdit = (user: any) => {
    setEditUserId(user.id);
    setEditUserData({
      password: user.password,
      remarks: user.remarks,
      role: user.role,
    });
  };

  const handleSaveEdit = (id: number) => {
    setUsersData(prev => prev.map(user => 
      user.id === id ? { ...user, ...editUserData } : user
    ));
    setEditUserId(null); // Exit edit mode
  };

  const roleOptions = [
    { label: 'User', value: 'user'},
    { label: 'Admin', value: 'admin'},
  ]

  const orgOptions = [
    { label: 'Farm 1', value: 'Farm 1' },
    { label: 'Farm 2', value: 'Farm 2' },
  ]

  const filteredData = initialUsersData.filter(item => {
    const orgMatch = org ? item.organisation === org : true;
    const roleMatch = role ? item.role === role : true;
    const searchMatch = item.username.toLowerCase().includes(searchTerm.toLowerCase());
    return orgMatch && roleMatch && searchMatch;
  })

  const requestSort = (key:string) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...filteredData].sort((a, b) => {
    if (a[sortConfig.key as keyof typeof a] < b[sortConfig.key as keyof typeof b]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key as keyof typeof a] > b[sortConfig.key as keyof typeof b]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const getArrow = (key: string) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? '↑' : '↓';
    }
    return '↕';
  };

    return (
      <DashboardLayout userRole="admin">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Users</h1>
          <div className="flex flex-col md:flex-row justify-between items-start">
            <div className="flex flex-wrap space-x-4 mb-4">
              <select value={org} onChange={(e) => setOrg(e.target.value)} className="border rounded p-2 w-56">
                <option value="">All Organisations</option>
                {orgOptions.map(option => (
                  <option key={option.label} value={option.value}>{option.label}</option>
                ))}
              </select>
              <select value={role} onChange={(e) => setRole(e.target.value)} className="border rounded p-2 w-56">
                <option value="">All Roles</option>
                {roleOptions.map(option => (
                  <option key={option.label} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            <input 
              type="text" 
              placeholder="Search Username" 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              className="border rounded p-2 w-56 mb-4 md:mb-0" 
            />
          </div>

          {/* Existing User Table Container */}
          <div className="rounded-md border p-6 overflow-hidden" style={{ height: '300px' }}>
            <div className="overflow-y-auto h-full">
              <table className="min-w-full bg-white border border-gray-300">
                <thead className="bg-gray-200 sticky top-0 z-10">
                  <tr>
                    <th onClick={() => requestSort('id')} className={`cursor-pointer text-left p-4 font-normal ${sortConfig.key === 'id' ? 'text-blue-500' : ''}`}>
                      User ID <span className="text-xs text-gray-400">{getArrow('id')}</span>
                    </th>
                    <th onClick={() => requestSort('username')} className={`cursor-pointer text-left p-4 font-normal ${sortConfig.key === 'username' ? 'text-blue-500' : ''}`}>
                      Username <span className="text-xs text-gray-400">{getArrow('username')}</span>
                    </th>
                    <th onClick={() => requestSort('email')} className={`cursor-pointer text-left p-4 font-normal ${sortConfig.key === 'email' ? 'text-blue-500' : ''}`}>
                      Email <span className="text-xs text-gray-400">{getArrow('email')}</span>
                    </th>
                    <th className="text-left p-4">Password</th>
                    <th onClick={() => requestSort('organisation')} className={`cursor-pointer text-left p-4 font-normal ${sortConfig.key === 'organisation' ? 'text-blue-500' : ''}`}>
                      Organisation <span className="text-xs text-gray-400">{getArrow('organisation')}</span>
                    </th>
                    <th onClick={() => requestSort('role')} className={`cursor-pointer text-left p-4 font-normal ${sortConfig.key === 'role' ? 'text-blue-500' : ''}`}>
                      Role <span className="text-xs text-gray-400">{getArrow('role')}</span>
                    </th>
                    <th className="text-left p-4">Remarks</th>
                    <th className="text-left p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedData.map(user => (
                    <tr key={user.id} className="border-b border-gray-300">
                      <td className="text-left p-4">{user.id}</td>
                      <td className="text-left p-4">{user.username}</td>
                      <td className="text-left p-4">{user.email}</td>
                      <td className="text-left p-4">
                        {editUserId === user.id ? (
                          <>
                            <input 
                              type={passwordVisible ? "text" : "password"} 
                              name="password" 
                              value={editUserData.password} 
                              onChange={handleEditInputChange} 
                              className="border rounded p-1" 
                              placeholder="Edit Password" 
                            />
                            <button 
                              type="button" 
                              onClick={() => setPasswordVisible(!passwordVisible)} 
                              className="ml-2 text-blue-500"
                            >
                              {passwordVisible ? "Hide" : "Show"}
                            </button>
                          </>
                        ) : (
                          '********' // Display asterisks for hidden password
                        )}
                      </td>
                      <td className="text-left p-4">{user.organisation}</td>
                      <td className="text-left p-4">{editUserId === user.id ? (
                        <select name="role" value={editUserData.role} onChange={handleEditInputChange} className="border rounded p-1">
                          <option value="admin">Admin</option>
                          <option value="user">User</option>
                        </select>
                      ) : (
                        user.role
                      )}</td>
                      <td className="text-left p-4">{editUserId === user.id ? (
                        <input type="text" name="remarks" value={editUserData.remarks} onChange={handleEditInputChange} className="border rounded p-1" />
                      ) : (
                        user.remarks
                      )}</td>
                      <td className="text-left p-4">
                        <div className="flex space-x-2">
                          {editUserId === user.id ? (
                            <>
                              <button onClick={() => handleSaveEdit(user.id)} className="border rounded p-1 text-green-500">Save</button>
                              <button onClick={() => setEditUserId(null)} className="border rounded p-1 text-red-500">Cancel</button>
                            </>
                          ) : (
                            <>
                              <button onClick={() => handleEdit(user)} className="border rounded p-1">Edit</button>
                              <button onClick={() => handleDelete(user.username, user.id)} className="border rounded p-1 text-red-500">Delete</button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* New User Form Container */}
          <div className="rounded-md border p-6 mt-4">
            <h2 className="text-2xl font-bold mb-4">Add New User</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium">User ID</label>
                <input type="text" name="id" value={newUser.id} onChange={handleInputChange} className="border rounded p-2 w-full" placeholder="Enter User ID" />
              </div>
              <div>
                <label className="block text-sm font-medium">Username</label>
                <input type="text" name="username" value={newUser.username} onChange={handleInputChange} className="border rounded p-2 w-full" placeholder="Enter Username" />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input type="email" name="email" value={newUser.email} onChange={handleInputChange} className="border rounded p-2 w-full" placeholder="Enter Email" />
              </div>
              <div>
                <label className="block text-sm font-medium">Password</label>
                <input type="password" name="password" value={newUser.password} onChange={handleInputChange} className="border rounded p-2 w-full" placeholder="Enter Password" />
            </div>
              <div>
                <label className="block text-sm font-medium">Organisation</label>
                <input type="text" name="organisation" value={newUser.organisation} onChange={handleInputChange} className="border rounded p-2 w-full" placeholder="Enter Organisation" />
              </div>
              <div>
                <label className="block text-sm font-medium">Role</label>
                <select name="role" value={newUser.role} onChange={handleInputChange} className="border rounded p-2 w-full">
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Remarks</label>
                <input type="text" name="remarks" value={newUser.remarks} onChange={handleInputChange} className="border rounded p-2 w-full" placeholder="Enter Remarks" />
              </div>
              <button type="submit" className="bg-blue-500 text-white rounded p-2">Add User</button>
            </form>
          </div>
        </div>
      </DashboardLayout>
      )
    }
