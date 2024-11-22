import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ProfileCard() {
    const [username, setUsername] = useState('gbgaurav007');
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        setData(null);
        setError(null);
        try {
            const response = await fetch(`https://api.github.com/users/${username}`);
            if (!response.ok) {
                throw new Error(`User not found: ${response.status} ${response.statusText}`);
            }
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('Username does not exist');
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gradient-to-tr from-sky-950 from-40% via-blue-900 via-75% to-blue-800 to-90% flex flex-col min-h-screen py-8">
            <div className="absolute md:top-12 md:left-12 top-4 left-6 hover:scale-110">
                <Link to="/" className="flex flex-row">
                    <img
                        src="assets/back.png"
                        alt="Back"
                        className="md:w-10 md:h-9 w-8 h-7"
                    />
                </Link>
            </div>

            <div className="max-w-xl mx-auto mt-10">
                <div className="bg-gray-800 p-6 text-white rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold text-center mb-4">GitHub Profile Finder</h1>
                    <div className="flex items-center gap-4">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter GitHub Username"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black caret-black"
                        />
                        <button
                            onClick={fetchData}
                            className="bg-blue-600 px-4 py-2 rounded-lg text-white font-semibold hover:bg-blue-700 transition"
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>

            {loading && <div className="text-center mt-8 text-white">Loading...</div>}

            {error && !loading && (
                <div className="text-center mt-8 text-red-500">
                    Error: {error}
                </div>
            )}

            {data && (
                <div className="bg-gray-800 p-6 text-white rounded-lg shadow-lg max-w-xl mx-auto mt-10">
                    <div className="text-center">
                        <img
                            src={data.avatar_url}
                            alt="GitHub Avatar"
                            className="rounded-full mx-auto"
                            width={150}
                        />
                        <h1 className="text-3xl font-bold mt-4">{data.name || 'Unknown'}</h1>
                    </div>
                    <div className="mt-6 grid grid-cols-2 gap-4">
                        <div>
                            <h2 className="text-lg font-semibold">Username:</h2>
                            <p>{data.login}</p>
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold">Public Repositories:</h2>
                            <p>{data.public_repos}</p>
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold">Followers:</h2>
                            <p>{data.followers}</p>
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold">Following:</h2>
                            <p>{data.following}</p>
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold">Profile Created:</h2>
                            <p>{new Date(data.created_at).toLocaleDateString()}</p>
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold">Last Updated:</h2>
                            <p>{new Date(data.updated_at).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <div className="text-center mt-8">
                        <a
                            href={data.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition text-white"
                        >
                            Visit GitHub Profile
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProfileCard;