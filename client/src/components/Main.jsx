import React, { useContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client';
import Popup from './Popup';
import PopupContext from '../contexts/PopupContext';
import ThemeContext from '../contexts/ThemeContext';


export default function Main() {
    const [openPopup, setOpenPopup] = useState(false)
    const [jokeData, setJokeData] = useState(null)
    const [socket, setSocket] = useState(null)
    const [userID, setUserID] = useState(null)
    const [username, setUsername] = useState(null)
    const theme = useContext(ThemeContext)


    useEffect(() => {
        const socket = io("http://localhost:1000")
        setSocket(socket)

        const urlParams = new URLSearchParams(window.location.search);
        setUsername(urlParams.get('username'));
        setUserID(urlParams.get('userid'));

        console.log({ username, userID })

        socket.on('data', (data) => {
            setJokeData(data)
            setOpenPopup(true)
            console.log("recived data:", data);
        })

        return () => {

        }
    }, [openPopup, userID, username])

    const handleConfirm = (e) => {
        e.preventDefault()
        try {
            if (jokeData.value.length > 85) {
                socket.emit('requestDelete')
                console.log("joke deleted! ", jokeData.value.length);
            } else {
                console.log(`the goke length: ${jokeData.value.length} is correct!`);
            }
            setOpenPopup(false)
        } catch (error) {

        }
    }

    return (
        <div
            className='main'
            style={{ backgroundColor: theme.color, fontFamily: theme.font, backgroundImage: 'url(https://aicontentfy.com/hubfs/Blog/e2f82ed6-4180-4648-9560-949a48793661.jpg)' }}
        >
            {
                userID ?
                    (<div>
                        <h1>hello {username}</h1>
                        <h3>, ID: {userID}</h3>
                    </div>
                    )
                    :
                    (<h1>Hello guest</h1>)
            }

            {openPopup ?
                (
                    <div>
                        <p>
                            <PopupContext.Provider value={{ openPopup, setOpenPopup }}>
                                <Popup open={openPopup} value={jokeData?.value} id={jokeData?.id} handleConfirm={handleConfirm} />
                            </PopupContext.Provider>
                        </p>
                    </div>
                )
                :
                (<h1>Waiting for a new joke...</h1>)}
            {/* <img src="https://aicontentfy.com/hubfs/Blog/e2f82ed6-4180-4648-9560-949a48793661.jpg" alt="" style={{ height: "100%", width: "100%" }} /> */}

        </div>

    )
}
