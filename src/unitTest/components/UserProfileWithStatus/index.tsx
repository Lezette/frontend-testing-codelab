import { useState, useEffect } from 'react';

const UserProfileWithStatus = () => {
  const [user, setUser] = useState<{ id: number; name: string } | null>(null);
  const [status, setStatus] = useState('offline');

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch('https://api.example.com/user/1');
      const data = await response.json();
      setUser(data);
    };

    fetchUser();
  }, []); // fetch user only once

  useEffect(() => {
    if (user) {
      document.title = `${user.name} is ${status}`;
    }
  }, [user, status]); // this effect depends on both user and status

  return (
    <div>
      <h1>{user ? user.name : 'Loading user...'}</h1>
      <p>Status: {status}</p>
      <button onClick={() => setStatus(status === 'online' ? 'offline' : 'online')}>
        Toggle Status
      </button>
    </div>
  );
};

export default UserProfileWithStatus;
