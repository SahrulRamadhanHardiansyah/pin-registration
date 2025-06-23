import EditTicketModal from "@/Components/EditTicketModal";
import { usePage, Link, router } from "@inertiajs/react";
import { useState } from "react";

// Helper function untuk konfirmasi sebelum delete
const handleDelete = (e, ticketId) => {
    e.preventDefault();
    if (confirm("Apakah Anda yakin ingin menghapus tiket ini?")) {
        router.delete(`/admin/ticket/${ticketId}`);
    }
};

export default function AdminDashboard({ registrants, search }) {
    const [query, setQuery] = useState(search || "");
    const { flash } = usePage().props;

    const [showModal, setShowModal] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);

    const handleEditClick = (ticket) => {
        setSelectedTicket(ticket);
        setShowModal(true);
    };

    const handleSave = (updatedData) => {
        router.put(`/admin/ticket/${selectedTicket.id}`, {
            tanggal_pengambilan_pin: updatedData.date,
        });
        setShowModal(false);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            "/admin",
            { search: query },
            { preserveState: true, replace: true }
        );
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="p-4 sm:p-6 lg:p-8">
                {/* Header Utama Dashboard */}
                <div className="sm:flex sm:items-center sm:justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Dashboard Admin
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Kelola semua data pendaftar tiket.
                        </p>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-4 flex items-center gap-x-3">
                        <Link
                            href="/admin/pin-period"
                            className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Atur Periode Pengambilan PIN
                        </Link>
                        <Link
                            as="button"
                            href="/logout"
                            method="post"
                            className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md shadow-sm text-sm font-medium hover:bg-red-700"
                        >
                            Logout
                        </Link>
                    </div>
                </div>

                {/* Container utama untuk tabel dan kontrolnya */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    {/* Flash Message */}
                    {flash.success && (
                        <div
                            className="mb-4 p-4 bg-green-50 text-green-800 border-l-4 border-green-400 rounded-r-md"
                            role="alert"
                        >
                            <p className="font-bold">Sukses</p>
                            <p>{flash.success}</p>
                        </div>
                    )}

                    {/* Panel Kontrol: Pencarian & Ekspor */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
                        <form
                            onSubmit={handleSearch}
                            className="w-full sm:w-auto"
                        >
                            <div className="relative">
                                <svg
                                    className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                                    />
                                </svg>
                                <input
                                    type="text"
                                    name="search"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    className="w-full sm:w-80 border-gray-300 rounded-md shadow-sm pl-10 p-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Cari nama, NISN, email..."
                                />
                            </div>
                        </form>
                        <div className="flex items-center gap-x-3">
                            <a
                                href="/admin/export-csv"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md shadow-sm text-sm font-medium hover:bg-green-700"
                            >
                                Ekspor CSV
                            </a>
                            <a
                                href="/admin/export-pdf"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md shadow-sm text-sm font-medium hover:bg-red-700"
                            >
                                Ekspor PDF
                            </a>
                        </div>
                    </div>

                    {/* Tabel Data */}
                    <div className="overflow-x-auto border border-gray-200 rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Nama
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        NISN
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Asal Sekolah
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Jadwal
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Antrian
                                    </th>
                                    <th
                                        scope="col"
                                        className="relative px-6 py-3"
                                    >
                                        <span className="sr-only">Aksi</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {registrants.map((r) => (
                                    <tr key={r.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {r.nama}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {r.nisn}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {r.asal_sekolah}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {r.tanggal_pengambilan_pin}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {r.nomor_antrian}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                                            <button
                                                onClick={() =>
                                                    handleEditClick(r)
                                                }
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={(e) =>
                                                    handleDelete(e, r.id)
                                                }
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                Hapus
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <EditTicketModal
                show={showModal}
                onClose={() => setShowModal(false)}
                ticket={selectedTicket}
                onSave={handleSave}
            />
        </div>
    );
}
