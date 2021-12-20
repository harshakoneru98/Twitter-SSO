import React, { useEffect } from 'react';
import * as cacheStore from 'node-cache';
import queryString from 'query-string';

function MainView() {
    let myCache = new cacheStore();

    const login = () => {
        (async () => {
            try {
                //OAuth Step 1
                await fetch('http://localhost:8080/api/auth/request_token', {
                    method: 'POST',
                    credentials: 'include'
                })
                    .then((res) => res.json())
                    .then((data) => {
                        myCache.mset([
                            { key: 'token', val: data.oauth_token, ttl: 10000 }
                        ]);
                    });

                let token = myCache.mget(['token']).token;

                //Oauth Step 2
                window.location.href = `https://api.twitter.com/oauth/authenticate?oauth_token=${token}`;
            } catch (error) {
                console.error(error);
            }
        })();
    };

    useEffect(() => {
        (async () => {
            const { oauth_token, oauth_verifier } = queryString.parse(
                window.location.search
            );

            if (oauth_token && oauth_verifier) {
                try {
                    //Oauth Step 3

                    await fetch('http://localhost:8080/api/auth/access_token', {
                        method: 'POST',
                        body: JSON.stringify({
                            oauth_token: oauth_token,
                            oauth_verifier: oauth_verifier
                        }),
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json'
                        }
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
                        window.location.href = '/incas/home';
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        })();
    }, []);

    return (
        <div>
            <a
                onClick={(e) => {
                    e.preventDefault();
                    login();
                }}
            >
                Login
            </a>
        </div>
    );
}

export default MainView;
