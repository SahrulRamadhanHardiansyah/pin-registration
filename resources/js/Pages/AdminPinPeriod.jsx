import { useForm, usePage, Link } from "@inertiajs/react";

export default function AdminPinPeriod({ period }) {
    const { flash } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        start_date: period?.start_date || "",
        end_date: period?.end_date || "",
        max_ticket_per_day: period?.max_ticket_per_day || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/admin/pin-period");
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="p-4 sm:p-6 lg:p-8">
                {/* Wrapper utama dalam bentuk card */}
                <div className="max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg">
                    {/* Header Halaman */}
                    <div className="flex justify-between items-start mb-6 pb-4 border-b border-gray-200">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                                Atur Periode Pengambilan PIN
                            </h1>
                            <p className="mt-1 text-sm text-gray-500">
                                Tentukan rentang tanggal dan kuota harian untuk
                                pendaftaran tiket.
                            </p>
                        </div>
                        <Link
                            href="/admin"
                            className="hidden sm:inline-flex items-center ml-4 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Kembali
                        </Link>
                    </div>

                    {/* Pesan Sukses */}
                    {flash.success && (
                        <div
                            className="mb-6 p-4 bg-green-50 text-green-800 border-l-4 border-green-400 rounded-r-md"
                            role="alert"
                        >
                            <p className="font-bold">Pengaturan Disimpan!</p>
                            <p>{flash.success}</p>
                        </div>
                    )}

                    {/* Informasi Periode Saat Ini */}
                    {period && (
                        <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <h3 className="font-semibold text-blue-800">
                                Periode yang Sedang Aktif
                            </h3>
                            <div className="mt-2 text-sm text-blue-700 grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                                <p>
                                    <strong>Mulai:</strong> {period.start_date}
                                </p>
                                <p>
                                    <strong>Selesai:</strong> {period.end_date}
                                </p>
                                <p className="col-span-2">
                                    <strong>Maks. Tiket per Hari:</strong>{" "}
                                    {period.max_ticket_per_day}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Form Pengaturan */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label
                                    htmlFor="start_date"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Tanggal Mulai
                                </label>
                                <input
                                    id="start_date"
                                    type="date"
                                    value={data.start_date}
                                    onChange={(e) =>
                                        setData("start_date", e.target.value)
                                    }
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2.5 bg-gray-50"
                                />
                                {errors.start_date && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.start_date}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor="end_date"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Tanggal Selesai
                                </label>
                                <input
                                    id="end_date"
                                    type="date"
                                    value={data.end_date}
                                    onChange={(e) =>
                                        setData("end_date", e.target.value)
                                    }
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2.5 bg-gray-50"
                                />
                                {errors.end_date && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.end_date}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="max_ticket_per_day"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Maksimum Tiket per Hari
                            </label>
                            <input
                                id="max_ticket_per_day"
                                type="number"
                                placeholder="Contoh: 100"
                                value={data.max_ticket_per_day}
                                onChange={(e) =>
                                    setData(
                                        "max_ticket_per_day",
                                        e.target.value
                                    )
                                }
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2.5 bg-gray-50"
                            />
                            {errors.max_ticket_per_day && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.max_ticket_per_day}
                                </p>
                            )}
                        </div>

                        {/* Tombol Aksi */}
                        <div className="pt-5 flex justify-end">
                            <button
                                type="submit"
                                className="px-6 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400"
                                disabled={processing}
                            >
                                {processing
                                    ? "Menyimpan..."
                                    : "Simpan Pengaturan"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
