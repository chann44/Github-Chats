const Login = () => {
    const GITHUB_CLIENT_ID = "5caf3cf55e98184c29f8";
    const gitHubRedirectURL = "http://localhost:4000/api/auth/github";
    const path = "/";
    return (
        <>
            <div className="min-h-screen w-full  flex items-center justify-center">
                <div className="bg-secondary flex flex-col items-center w-full md:max-w-md py-28 space-y-4" >
                    <h1 className="text-4xl">Github Chats</h1>
                    <img src="/github.svg" alt="" />
                    <a
                        href={`https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${gitHubRedirectURL}?path=${path}&scope=user:email`}
                    >
                        <button className="bg-primary px-6 py-3">continue with github</button>
                    </a>

                </div>
            </div>
        </>
    )
}

export default Login;