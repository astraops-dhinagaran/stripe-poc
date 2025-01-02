export default function Header() {

    const logoutUser = (event: any) => {
        event.preventDefault();
        localStorage.removeItem('auth_token');
        localStorage.removeItem('is_authenticated');
        localStorage.removeItem('user_role');
        localStorage.removeItem('user_name')
        localStorage.removeItem('user_id');
        localStorage.removeItem('user_email');
        window.location.reload();
    }
    return (
        <div className="h-[60px] flex items-center justify-between px-[25px] bg-blue-100">
            <p>Welcome to Astraops !!!</p>
            <div className="flex items-center gap-4">
                <div className="w-[50px] h-[50px] rounded-full bg-gray-300">

                </div>
                <button onClick={logoutUser}>Logout</button>
            </div>
        </div>
    );
}