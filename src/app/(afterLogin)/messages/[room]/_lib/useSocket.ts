import { useCallback, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export default function useSocket() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const disconnect = useCallback(() => {
    socket?.disconnect();
    setSocket(null);
  }, []);

  useEffect(() => {
    if (!socket) {
      const socketResult = io(`${process.env.NEXT_PUBLIC_BASE_URL}/messages`, {
        transports: ["websocket"],
      });

      socketResult.on("connect_error", (err) => {
        console.error(err);
        console.log(`connect_error due to ${err.message}`);
      });

      setSocket(socketResult);
    }
  }, [socket]);

  return [socket, disconnect];
}
