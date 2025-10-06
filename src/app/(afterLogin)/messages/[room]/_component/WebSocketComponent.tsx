"use client";

// custom hook
import useSocket from "../_lib/useSocket";

export default function WebSocketComponent() {
  const [socket, disconnect] = useSocket();
  return null;
}
