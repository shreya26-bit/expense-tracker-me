import { getAuth, signInWithPopup } from "firebase/auth";
import { provider } from "../components/firebase/firebase";
import { error } from "console";
import { useRouter } from "next/navigation";

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
      <button type="button" onClick={handleLogin}>
        Login with Google
      </button>
    </>
  );
};
export default LoginWithGoogle;
