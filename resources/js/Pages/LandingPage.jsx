import { useForm, usePage } from "@inertiajs/react";

// Komponen kecil untuk merapikan kode input field
const FormInput = ({
    label,
    name,
    value,
    onChange,
    error,
    type = "text",
    placeholder,
}) => (
    <div>
        <label
            htmlFor={name}
            className="block text-sm font-medium text-gray-700 mb-1"
        >
            {label}
        </label>
        <input
            id={name}
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`w-full p-3 bg-gray-50 border transition duration-150 ease-in-out
                        ${
                            error
                                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                                : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        } 
                        rounded-md shadow-sm`}
        />
        {error && <div className="mt-1 text-sm text-red-600">{error}</div>}
    </div>
);

export default function LandingPage({ pinPeriod, availableDates }) {
    const { flash } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        nama: "",
        nisn: "",
        asal_sekolah: "",
        nomor_hp: "",
        email: "",
        tanggal_registrasi: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/ambil-tiket");
    };

    return (
        // Wrapper untuk memberikan background dan centering pada halaman
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl">
                {/* Header */}
                <div className="text-center mb-2">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Ambil Tiket Pengambilan PIN
                    </h1>
                </div>

                {pinPeriod ? (
                    <p className="text-center text-gray-500 mb-6">
                        Periode pengambilan tiket: {pinPeriod.start_date} s.d.{" "}
                        {pinPeriod.end_date}
                    </p>
                ) : (
                    <p className="text-center text-red-500 bg-red-50 p-3 rounded-md mb-6">
                        Periode pengambilan tiket belum diatur.
                    </p>
                )}

                {/* Flash Message */}
                {flash.success && (
                    <div className="mb-6 p-4 bg-green-50 text-green-800 border-l-4 border-green-400 rounded-md shadow-sm">
                        {flash.success}
                    </div>
                )}

                {/* Instruksi Tata Cara Pengambilan PIN */}
                <div className="mb-8 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-md shadow">
                    <h2 className="text-lg font-semibold text-blue-700 mb-2">
                        Tata Cara Pengambilan PIN
                    </h2>
                    <ol className="list-decimal list-inside text-gray-700 space-y-2 text-sm leading-relaxed">
                        <li>
                            Isi data diri dengan lengkap dan benar pada form di
                            bawah ini.
                        </li>
                        <li>
                            Pilih tanggal pengambilan PIN yang masih tersedia.
                        </li>
                        <li>
                            Pastikan nomor HP aktif dan bisa dihubungi
                            (disarankan WhatsApp).
                        </li>
                        <li>
                            Setelah berhasil, Anda akan mendapatkan kode tiket
                            dan nomor antrian.
                        </li>
                        <li>
                            Bawa kode tiket Anda saat pengambilan PIN di lokasi
                            yang telah ditentukan.
                        </li>
                        <li>
                            Gunakan halaman{" "}
                            <a
                                href="/cek-tiket"
                                className="font-medium text-blue-600 hover:underline"
                            >
                                "Cek Tiket"
                            </a>{" "}
                            untuk melihat tiket Anda jika lupa.
                        </li>
                    </ol>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <FormInput
                        label="Nama Lengkap"
                        name="nama"
                        placeholder="Masukkan nama lengkap Anda"
                        value={data.nama}
                        onChange={(e) => setData("nama", e.target.value)}
                        error={errors.nama}
                    />

                    <FormInput
                        label="NISN"
                        name="nisn"
                        placeholder="Contoh: 0012345678"
                        value={data.nisn}
                        onChange={(e) => setData("nisn", e.target.value)}
                        error={errors.nisn}
                    />

                    <FormInput
                        label="Asal Sekolah"
                        name="asal_sekolah"
                        placeholder="Contoh: SMPN 1 Bangil"
                        value={data.asal_sekolah}
                        onChange={(e) =>
                            setData("asal_sekolah", e.target.value)
                        }
                        error={errors.asal_sekolah}
                    />

                    <FormInput
                        label="Nomor HP (WhatsApp Aktif)"
                        name="nomor_hp"
                        type="tel"
                        placeholder="Contoh: 081234567890"
                        value={data.nomor_hp}
                        onChange={(e) => setData("nomor_hp", e.target.value)}
                        error={errors.nomor_hp}
                    />

                    <FormInput
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="contoh@email.com"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        error={errors.email}
                    />

                    <div>
                        <label
                            htmlFor="tanggal_registrasi"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Pilih Tanggal Pengambilan
                        </label>
                        <select
                            id="tanggal_registrasi"
                            name="tanggal_registrasi"
                            value={data.tanggal_registrasi}
                            onChange={(e) =>
                                setData("tanggal_registrasi", e.target.value)
                            }
                            className={`w-full p-3 bg-gray-50 border transition duration-150 ease-in-out
                                        ${
                                            errors.tanggal_registrasi
                                                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                                                : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                        } 
                                        rounded-md shadow-sm`}
                        >
                            <option value="">
                                -- Pilih Tanggal yang Tersedia --
                            </option>
                            {availableDates.map((date) => (
                                <option key={date} value={date}>
                                    {date}
                                </option>
                            ))}
                        </select>
                        {errors.tanggal_registrasi && (
                            <div className="mt-1 text-sm text-red-600">
                                {errors.tanggal_registrasi}
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
                        {processing ? "Memproses..." : "Ambil Tiket"}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <a
                        href="/cek-tiket"
                        className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                    >
                        Sudah punya tiket? Cek di sini
                    </a>
                </div>
            </div>
        </div>
    );
}
