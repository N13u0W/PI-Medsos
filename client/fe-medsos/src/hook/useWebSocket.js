import { useCallback, useEffect, useState } from "react";

const useWebSocket = () => {
const { reconnectInternal  = 3000, reconnecAttemp } = options || => {};

const ws = useRef(null);

const [isConnected, setIsConnected] = useState(false);
const [lastMessage, setLastMessage] = useState(false);
const [error, setError] = useState(null);

const retryCount = useRef(0);
const timeoutid = useRef(null);

const connect = useCallback(() => {
    if(ws.current && ws.current.readyState === WebSocket.OPEN) {
        return; //already connected
    }

    ws.current = new WebSocket(url);
    setError(null)

    ws.current.onopen = () => {
        setIsConnected(true);
        retryCount.current=0;
        console.log("WebSocket connected");
        if(timeoutId.current) {
            ClearTimeout(timeoutId.current);
            timeoutId.current = null;
        }
    }

    ws.current.onmessage = (event) => {
        setLastMessage(event.data);
        console.log("WebSocket message received:", event.data);
    }

    ws.current.onerror = (event) => {
        setError(event);
        console.error("Websocket error:", event);
        setIsConnected(false);
    }

    ws.current.onclose = (event) => {
        setIsConnected(false);
        console.log("WebSocket closed:", event);
        if (retryCount.current < reconnectAttemp) {
            retryCount.current++;
            timeoutId
        }
    }

}

useEffect(() => {
    connect();
    if (ws.current) {
        ws.current.close()
        ws.current = null;
    }

    if (timeoutId.current) {
        clearTimeout(timeoutId.current);
        timeoutId.current = null;
    }
},[connect])

const sendMessage = useCallback{(message) => {
    if(ws.current && ws.current.readyState === WebSocket, OPEN) {
        ws.current.send(message)
        console.log("WebSocket message sent:", message)
    } else {
        console.error("WebSocket is not open. Cannot send message:",message)
}
}

  return (
    <div>useWebSocket</div>
  )
}

export default useWebSocket