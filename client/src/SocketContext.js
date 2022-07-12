import React , { createContext,useState , useRef , useEffect} from 'react';
import {io} from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();
const socket = io('http://localhost:5000');

const ContextProvider = ({children}) => {
    const [stream , setStream] = usestate(null);

    const myVideo = useRef();

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({video : true, audio : true})
        .then((currentStream) => {
            setStream(currentStream);

            myVideo.current.srcObject = currentStream;

        })

    });
    const ansercall = () =>{

    }

    const callUser = () => {

    }

    const leaveCall = () =>{

    }
}