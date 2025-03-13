import axios from"axios";
const axiosInstance = axios.create({
  //  baseURL:"http://127.0.0.1:5001/clone-6abca/us-central1/api",
  baseURL: "https://api-ik653xz24a-uc.a.run.app/",
  // baseURL:"https://api-ik653xz24a-uc.a.run.app",
});
export {axiosInstance}


