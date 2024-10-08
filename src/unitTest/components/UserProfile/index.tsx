import { useEffect, useState } from 'react';

type User = {
  id: number;
  name: string;
};

const UserProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
      const data = await response.json();
      setUser(data);
      setLoading(false);
    };
    fetchUser();
  }, []);

  if (loading) return <p>Loading...</p>;
  return (
    <div>
      <h1>User Profile</h1>
      {user ? <p>{user.name}</p> : <p>No user found</p>}
    </div>
  );
};

export default UserProfile;
