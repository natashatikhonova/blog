import Message from "../components/message"
import { useRouter, query } from "next/router"
import { useEffect, useState } from "react"
import { auth, db } from "../utils/firebase"
import {toast} from "react-toastify"
import { arrayUnion, updateDoc, doc, getDoc, onSnapshot } from "firebase/firestore"


export default function Details(){
    const router = useRouter()
    const routeData = router.query
    const [message, setMessage] = useState('')
    const [allMessage, setAllMessages] = useState([])

    //submit a msg

    const submitMessage = async()=>{
        //if (!auth.currentUser) return router.push('/auth(login');
        if (!message){
            toast.error("Dont leave an empty comment!", {
                position:POSITION.TOP_CENTER,
                autoClose: 1500,
            })
            return;
        }
        const docRef = doc(db, "posts", routeData.id)
        await updateDoc(docRef, {
            comments: arrayUnion({
                message,
                user: "test_user007",
            }), 
        })
        setMessage("");
    }

    //get comments
    const getComments =  async ()=>{
        const docRef = doc(db, 'posts', routeData.id)
        const unsubscribe = onSnapshot(docRef, (snapshot) =>{
            setAllMessages(snapshot.data().comments)
        }
        )

    }

    useEffect(()=>{
        if (!router.isReady) return;
        getComments();
    }, [])

    return(
        <div>
            <Message {...routeData}></Message>
            <div className="my-4">
                <div className="flex">
                    <input onChange={(e)=> setMessage(e.target.value)} 
                    type="text" 
                    value={message} 
                    placeholder="Leave a comment"
                    className="bg-gray-800 w-full p-2 text-white text-sm"/>
                    <button onClick={submitMessage} className="bg-cyan-500 text-white py-2 px-4 text-sm" >Submit</button>
                </div>
                <div className="py-6">
                    <h2 className="font-bold">Comments</h2>
                    {allMessage?.map((message) => (
                        <div className="bg-white p-4 my-4 border-2" key={message.message}>
                            <div>
                                <h2>{message.user}</h2>
                            </div>
                            <h2>{message.message}</h2>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}