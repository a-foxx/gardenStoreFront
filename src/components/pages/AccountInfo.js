import { useEffect, useState } from "react";

export default function AccountInfo () {
    const [user, getUser] = useState()
    const [load, setLoad] = useState(true)
    
    useEffect(() => {
        fetch(process.env.REACT_APP_SERVER_URL + '/getUsers', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            },
            credentials: 'include'
        })
        .then(response => response.json())
        .then(response => getUser(response))
        .then(response => setLoad(false))
    })

    if (load) return <div>loading...</div>

    return (
        <>
            <h1>Hello World</h1>
            <div>{user.email}</div>
            <div>{user.first_name}</div>
            <div>{user.last_name}</div>
        </>
    )
}