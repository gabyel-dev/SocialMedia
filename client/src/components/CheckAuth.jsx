// import axios from "axios";

// const CheckAuth = async () => {
//     try {
//       const url = import.meta.env.VITE_URL;
//       const res = await axios.get(`${url}/protected`, {
//         withCredentials: true,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
      
//       // Check both status and data
//       if (res.status === 200 && res.data?.user) {
//         return true;
//       }
//       return false;
//     } catch (err) {
//       console.error('Auth check failed:', err);
//       return false;
//     }
//   };

// export default CheckAuth;
