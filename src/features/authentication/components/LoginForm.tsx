import { zodResolver } from "@hookform/resolvers/zod";
import { InputText } from "primereact/inputtext";
import { FieldValues, useForm } from "react-hook-form";
import { LoginFormSchema } from "../schemas/login.schema";
import { Button } from "primereact/button";
import { PostAxiosService } from "../../../libs/axiosservice/axios.service";
import { loginEndPoint } from "../authentication.endpoints";

function LoginForm() {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>(
        {
            resolver: zodResolver(LoginFormSchema)
        }
    );

    const onSubmit = async (data: FieldValues) => {
        let response = await PostAxiosService({
            url: loginEndPoint,
            body: data,
        })

        if (response != null) {
            localStorage.setItem('auth_token', response.access_token)
            localStorage.setItem('is_authenticated', 'true')
            localStorage.setItem('user_role', response.role)
            localStorage.setItem('user_name', response.userName)
            localStorage.setItem('user_id', response.userName)
            localStorage.setItem('user_email', response.email)
            window.location.reload()
        }

    }


    return (
        <div className="">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="my-[10px]">
                    <InputText
                        id="email"
                        placeholder="Email"
                        {...register('email')} />

                    {
                        errors.email && <small className="text-red-600">{errors.email?.message as string}</small>
                    }

                </div>
                <div className="my-[10px]">
                    <InputText
                        id="password"
                        placeholder="Password"
                        type="password"
                        {...register('password')}
                    />

                    {
                        errors.password && <small className="text-red-600">{errors.password?.message as string}</small>
                    }

                </div>
                <Button type="submit" label="Submit" className="mt-2 w-full" />
            </form>
        </div>
    );
}

export default LoginForm;