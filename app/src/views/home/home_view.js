import React, { useEffect } from 'react';
import * as cacheStore from 'node-cache';

function HomeView() {
    let myCache = new cacheStore();

    const logout = () => {
        (async () => {
            try {
                await fetch('http://localhost:8080/api/auth/logout', {
                    method: 'POST',
                    credentials: 'include'
                })
                    .then((res) => res.json())
                    .then((data) => {
                        myCache.mset([
                            { key: 'token_data', val: data, ttl: 10000 }
                        ]);
                    });
                let token_data = myCache.mget(['token_data']).token_data;
                console.log('Token Data : ', token_data);
                if (token_data?.success) {
                    window.location.href = '/';
                }
            } catch (error) {
                console.error(error);
            }
        })();
    };

    return (
        <div>
            <p>This is Home Page</p>
            <a
                onClick={(e) => {
                    e.preventDefault();
                    logout();
                }}
            >
                Logout
            </a>
        </div>
    );
}

export default HomeView;
