import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';
import useAuth from '../hooks/useAuth';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const SOCKET_URL = API_URL.replace('/api', '');

interface SocketContextType {
  socket: Socket | null;
  connected: boolean;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  connected: false
});

export const useSocket = () => useContext(SocketContext);

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const { token, isAuthenticated } = useAuth();
  
  useEffect(() => {
    // Only connect if user is authenticated
    if (!isAuthenticated || !token) {
      if (socket) {
        socket.disconnect();
        setSocket(null);
        setConnected(false);
      }
      return;
    }
    
    // Connect to Socket.IO server
    const socketInstance = io(SOCKET_URL, {
      transports: ['websocket'],
      autoConnect: true,
      withCredentials: true
    });
    
    socketInstance.on('connect', () => {
      console.log('Connected to Socket.IO server');
      setConnected(true);
      
      // Join admin room
      socketInstance.emit('join-admin', token);
    });
    
    socketInstance.on('disconnect', () => {
      console.log('Disconnected from Socket.IO server');
      setConnected(false);
    });
    
    socketInstance.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
      setConnected(false);
    });
    
    setSocket(socketInstance);
    
    return () => {
      socketInstance.disconnect();
    };
  }, [isAuthenticated, token]);
  
  return (
    <SocketContext.Provider value={{ socket, connected }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider; 