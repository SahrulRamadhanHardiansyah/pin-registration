export default function Welcome({ canLogin, laravelVersion, phpVersion }) {
    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">
                Selamat Datang di Sistem Pengambilan PIN
            </h1>

            {canLogin && (
                <a
                    href={route("login")}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Login Admin
                </a>
            )}

            <div className="mt-4">
                <p>Laravel Version: {laravelVersion}</p>
                <p>PHP Version: {phpVersion}</p>
            </div>
        </div>
    );
}
