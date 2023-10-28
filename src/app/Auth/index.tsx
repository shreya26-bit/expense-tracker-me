import { getAuth, signInWithPopup } from "firebase/auth";
import { provider } from "../components/firebase/firebase";
import { error } from "console";
import { useRouter } from "next/navigation";
import {FcGoogle} from "react-icons/fc"

const LoginWithGoogle = () => {
  const router = useRouter();
  const auth = getAuth();
  const handleLogin = () => {
    console.log("login clicked");
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        router.push("/dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
   
    <h1 className="text-white text-4xl text-center  mt-60">Login to Your Account</h1>
   
      <div className="flex justify-center mt-8">
      <div className=" flex  border-[1px] rounded-full  justify-center items-center w-[20%] hover:bg-white  hover:cursor-pointer">
    {/* <div className="w-40 h-40 bg-red-600"> */}
    <div className="p-1 mx-2  " ><FcGoogle size={30} /></div>
      <button type="button" onClick={handleLogin} className="text-white hover:text-red-400 p-3 text-[20px] ">
        Login with Google
      </button>
    </div>
    </div>
{/* </div> */}
    
    </>
  );
};
export default LoginWithGoogle;
