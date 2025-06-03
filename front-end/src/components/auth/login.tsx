"use client";

import { useState } from "react";
import { useAuth } from "../userProvider";
import { api } from "@/axios";
import { useRouter } from "next/navigation";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser, setAuthToken } = useAuth();
  const router = useRouter();
  const signIn = async () => {
    setError("");

    if (!email || !password) {
      setError("Имэйл болон нууц үг бүрэн оруулна уу.");
      return;
    }

    try {
      const response = await api.post("/auth/signin", {
        email,
        password,
      });

      const { token, user } = response.data;

      if (!token) {
        setError("Токен хүлээн авсангүй. Серверийн алдаа.");
        return;
      }

      localStorage.setItem("token", token);
      setAuthToken(token);
      console.log(user.profile);
      setUser(user);
      router.push(user.profile === null ? "/createprofile" : `/home`);
    } catch (error: any) {
      console.error("Login error:", error);
      // user.profile === null ? `/home` :
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("Нэвтрэх үед алдаа гарлаа");
      }
    }
  };

  return (
    <div className="w-[407px] min-h-[344px] mt-100  flex flex-col gap-2 ">
      <div className="w-full h-[106px] p-6">
        <p className="font-bold text-[24px]">Welcome back</p>
        <p className="text-[14px] text-[#71717A]">
          Choose a username for your page
        </p>
      </div>

      <div className="w-full h-[86px] pl-[24px] pr-[24px]">
        <p className="font-bold text-[14px]">Email</p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email here"
          className="w-full h-10 border-1 border-[#E4E4E7] rounded-md"
        />
        {error && error.includes("имэйл") && (
          <div className="text-red-500 text-[12px]">{error}</div>
        )}
      </div>

      <div className="w-full h-[86px] pl-[24px] pr-[24px]  flex flex-col gap-2">
        <p className="font-bold text-[14px]">Password</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password here"
          className="w-full h-10 border-1 border-[#E4E4E7] rounded-md"
        />
        {error && error.includes("нууц үг") && (
          <div className="text-red-500 text-[12px]">{error}</div>
        )}
      </div>
      {error && !error.includes("имэйл") && !error.includes("нууц үг") && (
        <div className="pl-[24px] text-red-500 text-[12px] ">{error}</div>
      )}
      <div className="w-full h-16 flex justify-center">
        <button onClick={signIn} className="w-90 h-10 bg-[#E4E4E7] rounded-md">
          Continue
        </button>
      </div>
    </div>
  );
};
// "use client";

// import { useState } from "react";
// import { useAuth } from "../userProvider";
// import { api } from "@/axios";

// export const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const { setUser } = useAuth();
//   const signIn = async () => {
//     try {
//       const { data } = await api.post("/auth/signin", {
//         email: email,
//         password: password,
//       });
//       console.log(data);

//       localStorage.setItem("token", data.token);
//       setUser(data.user);
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   return (
//     <div className="w-[407px] h-[344px] mt-100">
//       <div className=" w-full h-[106px] p-6">
//         <p className="font-bold text-[24px]">Welcome back</p>
//         <p className="text-[14px] text-[#71717A]">
//           Choose a username for your page
//         </p>
//       </div>
//       <div className=" w-full h-[86px] pl-[24px] pr-[24px] ">
//         <p className="font-bold text-[14px]">Email</p>
//         <input
//           type="email"
//           placeholder=" Enter email here"
//           className="w-full h-10 border-1 border-[#E4E4E7] rounded-md"
//         ></input>
//         <div className="text-[12px]">aldaag haruulna</div>
//       </div>
//       <div className=" w-full h-[86px] pl-[24px] pr-[24px] ">
//         <p className="font-bold text-[14px]">password</p>
//         <input
//           type="password"
//           placeholder=" Enter password here"
//           className="w-full h-10 border-1 border-[#E4E4E7] rounded-md"
//         ></input>
//         <div className="text-[12px]">aldaag haruulna</div>
//       </div>

//       <div className=" w-full h-16 flex justify-center">
//         <button className="w-90 h-10 bg-[#E4E4E7] rounded-md">continue</button>
//       </div>
//     </div>
//   );
// };
