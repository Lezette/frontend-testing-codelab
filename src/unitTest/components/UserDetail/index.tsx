import React, { useState, useEffect } from 'react';

type User = {
  id: number;
  name: string;
};

type UserDetailProps = {
  userId: number;
};

const UserDetail: React.FC<UserDetailProps> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock API call to fetch user data
    const fetchUser = async () => {
      setLoading(true);
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
      const data = await response.json();
      setUser(data);
      setLoading(false);
    };

    fetchUser();
  }, [userId]); // Effect depends on userId

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>No user found</p>;

  return (
    <div>
      <h2>User Detail</h2>
      <p>ID: {user.id}</p>
      <p>Name: {user.name}</p>
    </div>
  );
};

export default UserDetail;
