import React, { useState } from 'react';

export default function App() {
  // Default credentials for the free DummyJSON test API
  const [username, setUsername] = useState('emilys');
  const [password, setPassword] = useState('emilyspass');
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  // The 'e' (event) contains the form submission event.
  // React.SyntheticEvent is its TypeScript type. It tells TS what 'e' is and 
  // ensures the event works exactly the same across all browsers.
  const handleLogin = async (e: React.SyntheticEvent) => {
    // 1. PREVENT PAGE RELOAD (Extremely important in React!)
    e.preventDefault(); 
    setError('');
    
    try {
      // 2. REAL POST REQUEST TO AN AUTH API
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // The data we are sending must be converted to a JSON string!
        body: JSON.stringify({ 
          username: username, 
          password: password 
        })
      });

      if (!response.ok) throw new Error("Wrong credentials!");

      // Parse the response from the server
      const data = await response.json();
      
      // 3. WE GOT A TOKEN! Let's save it to the browser's LocalStorage
      localStorage.setItem('my_real_token', data.accessToken);
      setToken(data.accessToken);
      setIsLoggedIn(true);

    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('my_real_token');
    setIsLoggedIn(false);
    setToken('');
  };

  return (
    <div className="p-8 max-w-lg mx-auto mt-10 font-sans">
      
      {isLoggedIn ? (
        <div>
          {/* Top bar for logged in users */}
          <div className="bg-zinc-800 p-4 rounded-xl flex items-center justify-between shadow-md mb-6">
            <span className="text-green-500 font-bold px-2">You are logged <br/>in!</span>
            <div className="bg-white text-gray-600 text-xs p-2 rounded w-40 truncate">
              Your token:<br/>{token}
            </div>
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded font-bold hover:bg-red-600 transition-colors">
              Logout
            </button>
          </div>
          
          {/* Placeholder for Part 2 */}
          <div className="bg-white p-8 rounded-xl shadow-lg border text-center">
            <h2 className="text-xl font-bold mb-2">Protected Area</h2>
            <p className="text-gray-500">Your feedback form will go here in Part 2!</p>
          </div>
        </div>
      ) : (
        // The form! onSubmit catches both the Enter key press and the button click.
        <form onSubmit={handleLogin} className="flex flex-col gap-4 bg-white p-8 rounded-xl shadow-lg border">
          <h2 className="text-2xl font-bold mb-2 text-center">JWT Login Test</h2>
          <p className="text-sm text-gray-500 mb-4 text-center">
            Tip: Use the default credentials to get a real token!
          </p>
          <input 
            type="text" 
            placeholder="Username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded"
            required
          />
          {error && <p className="text-red-500 text-sm font-bold">{error}</p>}
          <button type="submit" className="bg-blue-600 text-white p-2 rounded font-bold">
            Log In (POST)
          </button>
        </form>
      )}
    </div>
  );
}