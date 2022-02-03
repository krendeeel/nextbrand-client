import axios from "axios";
import { parseCookies } from 'nookies';

const { token } = parseCookies();

export default axios.create({
    baseURL: "https://nextbrand-server.herokuapp.com",
    headers: {
        "Content-type": "application/json",
        "authorization": `Bearer ${token}`
    }
});