import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Input from "@/components/shared/Input";
import toast from "react-hot-toast";
import { useAuth } from "@/store/auth";

const Register = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const { storeTokenInLS } = useAuth();
    // Mutate question
    //   const { mutate: useEmailLogin } = useMutation({
    //     mutationFn: (formData: object) => loginUser(formData),
    //     onSuccess: (user) => {
    //       queryClient.setQueryData(["user"], user.user);
    //       navigate("/");
    //       toast.success("Logged In.", {
    //         position: "bottom-center",
    //       });
    //     },
    //     onError: (error) => {
    //       toast.error(error.message, {
    //         position: "bottom-center",
    //       });
    //     },
    //   });

    // const { mutate: useGoogleLogin } = useMutation({
    //     mutationFn: (response: any) => loginUsingGoogle(response),
    //     onSuccess: (user) => {
    //         queryClient.setQueryData(["user"], user.user);
    //         navigate("/");
    //         toast.success("Logged In.", {
    //             position: "bottom-center",
    //         });
    //     },
    //     onError: (error) => {
    //         toast.error(error.message, {
    //             position: "bottom-center",
    //         });
    //     },
    // });

    const registerHandler = async (formData: any) => {
        try {
            const response = await fetch("http://localhost:3000/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const responseData = await response.json();
                toast.success("Registration Successful");
                storeTokenInLS(responseData.token);
                navigate("/login");
            } else {
                console.log("error inside response ", "error");
            }
        } catch (error) {
            console.error("Error", error);
        }
    };

    return (
        <div className="h-screen bg-[#434343]">
            <h1 className=" bg-white py-2 text-center text-2xl font-bold uppercase tracking-widest text-black ">
                Register
            </h1>
            <div className="mx-auto my-10 w-96 rounded border bg-white p-10 text-black">
                <form onSubmit={handleSubmit(registerHandler)}>
                    <label htmlFor="email">Name</label>
                    <Input
                        type="name"
                        {...register("name")}
                        className="my-2 border text-black"
                    />
                    <label htmlFor="email">Email</label>
                    <Input
                        type="email"
                        {...register("email")}
                        className="my-2 border text-black"
                    />
                    <label htmlFor="email">Password</label>
                    <Input
                        type="password"
                        {...register("password")}
                        className="my-2 border text-black"
                    />
                    <div className="my-5 flex flex-col items-center justify-center space-y-5">
                        <Button type="submit">Register</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;