import React, { useEffect, useState } from 'react';
import './index.css';

function Github() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch('https://api.github.com/users/gbgaurav007');
                if (!response.ok) {
                    throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className="text-center mt-8">Loading...</div>;
    }

    if (error) {
        return <div className="text-center mt-8 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="p-6 bg-gray-800 text-white rounded-lg shadow-lg max-w-xl mx-auto mt-10">
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
                    <h2 className="text-lg font-semibold">Message:</h2>
                    <p>{data.message}</p>
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
    );
}

export default Github;