import { useForm, usePage, Link } from "@inertiajs/react";

export default function AmbilPinPage() {
    const { flash, errors } = usePage().props;

    const { data, setData, post, processing } = useForm({
        ticket_code: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/ambil-pin");
    };

    return (
        // Wrapper utama untuk layouting halaman
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                {/* Header halaman */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Formulir Pengambilan PIN
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Masukkan kode tiket unik Anda untuk mengambil PIN.
                    </p>
                </div>

                {/* Menampilkan pesan error dari backend jika ada (misal: kode tidak valid) */}
                {flash.error && (
                    <div
                        className="mb-6 p-4 bg-red-50 text-red-800 border-l-4 border-red-400 rounded-r-md"
                        role="alert"
                    >
                        <p className="font-bold">Gagal!</p>
                        <p>{flash.error}</p>
                    </div>
                )}

                {/* Form Pengambilan PIN */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label
                            htmlFor="ticket_code"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Kode Tiket
                        </label>
                        <input
                            id="ticket_code"
                            name="ticket_code"
                            type="text"
                            placeholder="ABC-123"
                            value={data.ticket_code}
                            onChange={(e) =>
                                setData(
                                    "ticket_code",
                                    e.target.value.toUpperCase()
                                )
                            }
                            // Styling khusus untuk kode: font mono, spasi lebar, teks di tengah
                            className={`w-full p-4 bg-gray-50 border text-center font-mono text-xl tracking-widest
                                        transition duration-150 ease-in-out rounded-md shadow-sm
                                        ${
                                            errors.ticket_code
                                                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                                                : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                        }
                                      `}
                        />
                        {errors.ticket_code && (
                            <div className="mt-2 text-sm text-red-600 text-center">
                                {errors.ticket_code}
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
                        {processing ? "Memproses..." : "Ambil PIN"}
                    </button>
                </form>

                {/* Link Navigasi Tambahan */}
                <div className="mt-6 text-center">
                    <Link
                        href="/cek-tiket"
                        className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                    >
                        Lupa kode tiket? Cek di sini
                    </Link>
                </div>
            </div>
        </div>
    );
}
