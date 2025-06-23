import { useForm, usePage } from "@inertiajs/react";

export default function CekPinPage() {
    const { flash } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        nisn: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Arahkan ke halaman hasil tiket dengan parameter NISN
        post(`/cek-tiket/${data.nisn}`);
    };

    return (
        // Wrapper untuk background dan centering
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Cek Status Tiket & PIN
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Masukkan NISN yang terdaftar untuk melihat detail tiket
                        dan PIN Anda.
                    </p>
                </div>

                {/* Tampilkan flash message jika ada (misal: NISN tidak ditemukan) */}
                {flash.error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-800 border-l-4 border-red-400 rounded-md shadow-sm">
                        {flash.error}
                    </div>
                )}

                {/* Form */}
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
                            type="text"
                            placeholder="Masukkan NISN Anda di sini"
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

                    {/* Tombol Submit */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md
                                   hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                                   disabled:bg-blue-400 disabled:cursor-not-allowed transition-all duration-200"
                    >
                        {processing ? "Mencari..." : "Cek Status"}
                    </button>
                </form>

                {/* Link Alternatif */}
                <div className="mt-6 text-center">
                    <a
                        href="/"
                        className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                    >
                        Belum punya tiket? Ambil di sini
                    </a>
                </div>
            </div>
        </div>
    );
}
