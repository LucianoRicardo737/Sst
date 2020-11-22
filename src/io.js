import io from 'socket.io-client';
import {IP,PORT} from './env'


let socket = io(`http://${IP}:${PORT}`);

export default socket;
