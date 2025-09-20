// src/hooks/useSocket.js
import { useEffect, useCallback, useState, useRef } from 'react';
import { io } from 'socket.io-client';

export const useSocket = (url) => {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io(url, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 500,
      secure: true,
    });
    socketRef.current.on('connect', () => {
      setIsConnected(true);
    });

    socketRef.current.on('connect_error', (err) => {
      console.error('Socket connection error:', err);
      setError(err);
    });

    socketRef.current.on('disconnect', () => {
      setIsConnected(false);
    });
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [url]);

  // Emit event
  const emit = useCallback(
    (eventName, data) => {
      if (socketRef.current && isConnected) {
        socketRef.current.emit(eventName, data);
      } else {
        console.warn('Socket is not connected, cannot emit event:', eventName);
      }
    },
    [isConnected],
  );

  const on = useCallback((eventName, callback) => {
    if (socketRef.current) {
      socketRef.current.on(eventName, (data) => {
        callback(data);
      });
    } else {
      console.warn(
        `Cannot register ${eventName} listener - no socket instance`,
      );
    }
  }, []);

  const off = useCallback((eventName, callback) => {
    if (socketRef.current) {
      socketRef.current.off(eventName, callback);
    }
  }, []);

  return {
    isConnected,
    error,
    emit,
    on,
    off,
  };
};
