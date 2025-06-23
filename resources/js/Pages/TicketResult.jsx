import React from "react";

// Komponen kecil untuk menampilkan baris informasi agar lebih rapi
const InfoRow = ({ label, value, valueClassName = "text-gray-900" }) => (
    <div className="flex justify-between py-3 border-b border-gray-200">
        <dt className="text-sm font-medium text-gray-500">{label}</dt>
        <dd className={`text-sm font-semibold ${valueClassName}`}>{value}</dd>
    </div>
);

export default function TicketResult({ registrant }) {
    // Fungsi untuk memicu dialog cetak browser
    const handlePrint = () => {
        window.print();
    };

    return (
        // Wrapper utama dengan background dan centering
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4 print:bg-white print:p-0">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md print:shadow-none print:rounded-none">
                {/* Header Tiket */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Tiket Pengambilan PIN
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Harap simpan dan tunjukkan tiket ini kepada panitia.
                    </p>
                </div>

                {/* Informasi Registrant */}
                <div className="mb-6">
                    <dl>
                        <InfoRow label="Nama Lengkap" value={registrant.nama} />
                        <InfoRow label="NISN" value={registrant.nisn} />
                        <InfoRow
                            label="Jadwal Pengambilan"
                            value={registrant.tanggal_pengambilan_pin}
                        />
                    </dl>
                </div>

                {/* Bagian Utama Tiket (Nomor Antrian & Kode) */}
                <div className="grid grid-cols-2 gap-4 text-center bg-gray-50 p-4 rounded-lg mb-6">
                    <div>
                        <p className="text-sm font-semibold text-gray-500">
                            NOMOR ANTRIAN
                        </p>
                        <p className="text-5xl font-bold text-blue-600">
                            {registrant.nomor_antrian}
                        </p>
                    </div>
                    <div className="border-l border-gray-200 pl-4">
                        <p className="text-sm font-semibold text-gray-500">
                            KODE TIKET
                        </p>
                        <p className="font-mono text-2xl font-bold text-gray-800 tracking-wider bg-gray-200 p-2 rounded-md">
                            {registrant.ticket_code}
                        </p>
                    </div>
                </div>

                {/* Status PIN */}
                <div className="mt-6">
                    {registrant.pin ? (
                        <div className="p-4 bg-green-50 text-green-800 rounded-lg text-center">
                            <p className="font-semibold">
                                PIN Anda sudah tersedia!
                            </p>
                            <p className="text-2xl font-bold mt-2 tracking-widest">
                                {registrant.pin}
                            </p>
                        </div>
                    ) : (
                        <div className="p-4 bg-yellow-50 text-yellow-800 rounded-lg text-center">
                            <p className="font-semibold">
                                PIN Anda belum tersedia.
                            </p>
                            <p className="text-sm">
                                PIN akan muncul di sini setelah diverifikasi
                                oleh panitia.
                            </p>
                        </div>
                    )}
                </div>

                {/* Tombol Aksi */}
                <div className="mt-8 space-y-3 print:hidden">
                    <button
                        onClick={handlePrint}
                        className="w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md
                                   hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                                   transition-all duration-200"
                    >
                        Cetak atau Simpan sebagai PDF
                    </button>
                    <a
                        href="/"
                        className="block w-full text-center px-4 py-3 bg-white text-blue-600 border border-blue-600 font-semibold rounded-md
                                   hover:bg-blue-50 transition-all duration-200"
                    >
                        Kembali ke Beranda
                    </a>
                </div>
            </div>
        </div>
    );
}
