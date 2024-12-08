'use client';
import React, { useState, useEffect } from 'react';
import styles from '/styles/Login.module.css';

interface User {
  userName: string;
  email: string;
  password?: string; // Optional to avoid displaying it
}

const MyComponent = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState({ userName: '', password: '', email: '' });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:443/user/getUsers'); 
        if (!response.ok) throw new Error('Failed to fetch users');
        const result = await response.json();
        setUsers(result);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:443/user/saveUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newUser = await response.json();
        setUsers((prevUsers) => [...prevUsers, newUser]);
        alert('User saved successfully!');
        setFormData({ userName: '', email: '', password: '' }); // Reset form
      } else {
        const errorMessage = await response.text();
        alert(`Failed to save user: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>Login</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              type="text"
              id="email"
              className={styles.input}
              value={formData.email}
              placeholder="Enter your email"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="userName" className={styles.label}>
              Username
            </label>
            <input
              type="text"
              id="userName"
              className={styles.input}
              value={formData.userName}
              placeholder="Enter your username"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              id="password"
              type="password"
              className={styles.input}
              value={formData.password}
              placeholder="Enter your password"
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className={styles.loginButton}>
            Save User
          </button>
        </form>
      </div>

      <div>
        <h2>Saved Users:</h2>
        {users.map((user, index) => (
          <div key={index} className={styles.loginBox}>
            <p><strong>Username:</strong> {user.userName}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyComponent;
