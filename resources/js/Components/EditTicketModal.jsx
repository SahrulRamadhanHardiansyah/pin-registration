import { useEffect, Fragment } from "react";
import React from "react";
import { Transition } from "@headlessui/react";

export default function EditTicketModal({ show, onClose, ticket, onSave }) {
    const [formData, setFormData] = React.useState({
        date: "",
    });

    useEffect(() => {
        if (ticket) {
            setFormData({
                date: ticket.tanggal_pengambilan_pin || "",
            });
        }
    }, [ticket]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    // Logika tidak diubah, hanya ditambahkan wrapper transisi
    return (
        <Transition show={show} as={Fragment}>
            <div className="fixed inset-0 z-50 overflow-y-auto">
                <div className="min-h-screen px-4 text-center">
                    {/* Overlay */}
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div
                            className="fixed inset-0 bg-black/60"
                            onClick={onClose}
                        />
                    </Transition.Child>

                    {/* Centering trick */}
                    <span
                        className="inline-block h-screen align-middle"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>

                    {/* Konten Modal */}
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                            {/* Header Modal */}
                            <div className="flex items-start justify-between">
                                <h2 className="text-lg font-medium leading-6 text-gray-900">
                                    Edit Tanggal Tiket
                                </h2>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="p-1 text-gray-400 rounded-full hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>

                            {/* Info Pendaftar */}
                            <div className="mt-2 text-sm text-gray-500">
                                <p>
                                    Nama:{" "}
                                    <span className="font-semibold text-gray-700">
                                        {ticket?.nama}
                                    </span>
                                </p>
                                <p>
                                    NISN:{" "}
                                    <span className="font-semibold text-gray-700">
                                        {ticket?.nisn}
                                    </span>
                                </p>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="mt-4">
                                <div>
                                    <label
                                        htmlFor="date-input"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Tanggal Pengambilan PIN
                                    </label>
                                    <input
                                        id="date-input"
                                        type="date"
                                        value={formData.date}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                date: e.target.value,
                                            })
                                        }
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2.5 bg-gray-50"
                                        required
                                    />
                                </div>

                                {/* Footer Tombol Aksi */}
                                <div className="mt-6 flex justify-end gap-x-3">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        Simpan Perubahan
                                    </button>
                                </div>
                            </form>
                        </div>
                    </Transition.Child>
                </div>
            </div>
        </Transition>
    );
}
