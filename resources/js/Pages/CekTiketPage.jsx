import { useForm, usePage } from "@inertiajs/react";

export default function CekTiketPage() {
    const { flash } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        nisn: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/cek-tiket");
    };

    return (
        // Wrapper utama untuk layouting
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                {/* Header halaman */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Cek Tiket Saya
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Silakan masukkan NISN Anda untuk melihat detail tiket.
                    </p>
                </div>

                {/* Menampilkan pesan error dari backend jika ada */}
                {flash.error && (
                    <div
                        className="mb-6 p-4 bg-red-50 text-red-800 border-l-4 border-red-400 rounded-md shadow-sm"
                        role="alert"
                    >
                        {flash.error}
                    </div>
                )}

                {/* Form Pengecekan */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label
                            htmlFor="nisn"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Nomor Induk Siswa Nasional (NISN)
                        </label>
                        <input
                            id="nisn"
                            name="nisn"
                            type="text"
                            placeholder="Ketik NISN Anda di sini"
                            value={data.nisn}
                            onChange={(e) => setData("nisn", e.target.value)}
                            className={`w-full p-3 bg-gray-50 border transition duration-150 ease-in-out
                                        ${
                                            errors.nisn
                                                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                                                : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                        } 
                                        rounded-md shadow-sm`}
                        />
                        {errors.nisn && (
                            <div className="mt-1 text-sm text-red-600">
                                {errors.nisn}
                            </div>
                        )}
                    </div>

                    {/* Tombol Aksi */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md
                                   hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                                   disabled:bg-blue-400 disabled:cursor-not-allowed transition-all duration-200"
                    >
                        {processing ? "Mencari Tiket..." : "Cek Tiket"}
                    </button>
                </form>

                {/* Link Navigasi Kembali */}
                <div className="mt-6 text-center">
                    <a
                        href="/"
                        className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                    >
                        Kembali ke Halaman Utama
                    </a>
                </div>
            </div>
        </div>
    );
}
