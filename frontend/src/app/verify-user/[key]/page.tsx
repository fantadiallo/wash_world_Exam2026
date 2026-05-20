// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";

// export default function VerifyUser() {
//   const params = useParams();
//   const key = params?.key as string;

//   const [status, setStatus] = useState("loading");

//   useEffect(() => {
//     console.log("EFFECT RAN");
//     console.log("KEY:", key);

//     if (!key) return;

//     const verify = async () => {
//       try {
//         const res = await fetch(
//           `http://127.0.0.1:5000/verify-user/${key}`,
//           { method: "POST" }
//         );

//         console.log("FETCH SENT");

//         if (!res.ok) {
//           setStatus("error");
//           return;
//         }

//         setStatus("success");
//       } catch (err) {
//         console.log("FETCH ERROR", err);
//         setStatus("error");
//       }
//     };

//     verify();
//   }, [key]);

//   return (
//     <div>
//       {status === "loading" && <p>Verifying account...</p>}
//       {status === "success" && <p>Account verified! You can now log in.</p>}
//       {status === "error" && <p>Verification failed or link invalid.</p>}
//     </div>
//   );
// }