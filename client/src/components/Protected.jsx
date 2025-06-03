// import { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";

// const Protected = ({ Component }) => {
//   const [authState, setAuthState] = useState({
//     isAuthenticated: null,
//     isLoading: true
//   });
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const verifyAuth = async () => {
//       try {
//         const isAuthenticated = await CheckAuth();
        
//         setAuthState({
//           isAuthenticated,
//           isLoading: false
//         });
// // 
//         if (!isAuthenticated && location.pathname !== '/login') {
//           navigate('/login', { replace: true });
//         }

//         if (isAuthenticated && location.pathname === '/login') {
//           navigate('/home', { replace: true });
//         }
//       } catch (error) {
//         console.error('Authentication error:', error);
//         setAuthState({
//           isAuthenticated: false,
//           isLoading: false
//         });
//         navigate('/login', { replace: true });
//       }
//     };

//     verifyAuth();
//   }, [navigate, location]);

//   if (authState.isLoading) {
//     return (
//       <div className="w-full h-screen flex justify-center items-center">
//         <div className="border-4 border-t-transparent border-black rounded-full w-10 h-10 animate-spin"></div>
//       </div>
//     );
//   }

//   return authState.isAuthenticated ? <Component /> : null;
// };

// export default Protected;