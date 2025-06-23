<!DOCTYPE html>
<html>
<head>
    <title>Daftar Tiket Pengambilan PIN</title>
    <style>
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid black; padding: 8px; text-align: left; }
    </style>
</head>
<body>
    <h2>Daftar Tiket Pengambilan PIN</h2>
    <table>
        <thead>
            <tr>
                <th>Nama</th>
                <th>NISN</th>
                <th>Asal Sekolah</th>
                <th>Nomor HP</th>
                <th>Email</th>
                <th>Jadwal Pengambilan</th>
                <th>Nomor Antrian</th>
            </tr>
        </thead>
        <tbody>
            @foreach($registrants as $r)
            <tr>
                <td>{{ $r->nama }}</td>
                <td>{{ $r->nisn }}</td>
                <td>{{ $r->asal_sekolah }}</td>
                <td>{{ $r->nomor_hp }}</td>
                <td>{{ $r->email }}</td>
                <td>{{ $r->tanggal_pengambilan_pin }}</td>
                <td>{{ $r->nomor_antrian }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>
