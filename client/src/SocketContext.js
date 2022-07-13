import React , { createContext,useState , useRef , useEffect} from 'react';
import {io} from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();
const socket = io('http://localhost:5000');

const ContextProvider = ({children}) => {
    const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState('');
  const [call, setCall] = useState({});
  const [me, setMe] = useState('');

    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    useEffect(() => {
        navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);

        myVideo.current.srcObject= currentStream;

        }).catch((err) => {
            console.log("Not able to get user media permisiion", err);
          });

        socket.on('me', (id)=>{
            setMe(id);
        });

        socket.on('callUser', (from , name, signal)=>{
            setCall({isReceivedCall : true , from , name , signal});

        });



    },[]);   //[] is empty dependency array otherwise it's always going to run.
    const answerCall = () =>{
        setCallAccepted(true);
        const peer = new Peer({initiator : false , trickle : false, stream})
        peer.on('signal', (data) =>{// callback function that we want to execute when call is accepted;
            socket.emit('ansercall' , {signal : data , to: call.from}) //passing data to answercall

        }) ;
        peer.on('stream', (currentStream)=>{ //stream for the other person.
            userVideo.current.srcObject = currentStream;


        });

        peer.signal(call.signal);
        connectionRef.current = peer;
        //Current connection is equal to the peer who is inside of this connection

    }

    const callUser = (id) => {
        const peer = new Peer({initiator : true , trickle : false, stream})  //here initiator value will be true as we are the one who is calling
        peer.on('signal', (data) =>{
            socket.emit('callUser' , {userToCall : id , signalData : data , from : me , name}) 

        }) ;
        peer.on('stream', (currentStream)=>{
            userVideo.current.srcObject = currentStream;


        });
        socket.on('callAccepted' , (signal) =>{
            setCallAccepted(true);
            peer.signal(signal);
        });
        connectionRef.current = peer;


    }

    const leaveCall = () =>{
        setCallEnded(true);
        connectionRef.current.destroy();  //Destroy that specific connection
        window.location.reload();  //Reloads the page and provides the user with new id

    }

    return(
        //whatever you pass inside the value will be globally accessible to all the components i.e . we will pass all the values and functions in the value function
         <SocketContext.Provider value = {{call,
         callAccepted,
         myVideo,
         userVideo,stream,name,setName,callEnded , me, callUser, leaveCall , answerCall}}> 
         {children} 
         

        </SocketContext.Provider>
    )
}

export {SocketContext, ContextProvider};