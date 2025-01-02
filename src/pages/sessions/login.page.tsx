import LoginForm from "../../features/authentication/components/LoginForm";
import Logo from "../../assets/logo.svg"

function LoginPage() {
    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="w-[400px]">
                <div className="w-[250px] mx-auto mb-3">
                    <img src={Logo} width={'100%'} />
                </div>

                <p className="font-[400] text-[16px] text-center mb-3">welcome! to astraops- lets create your account </p>
                <LoginForm />
            </div>
        </div>
    );
}

export default LoginPage;