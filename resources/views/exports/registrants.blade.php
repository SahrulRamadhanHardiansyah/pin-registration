<!DOCTYPE html>
<html>
<head>
    <title>Data Registrants</title>
    <style>
        table { width: 100%; border-collapse: collapse; }
        table, th, td { border: 1px solid black; }
        th, td { padding: 8px; text-align: left; }
    </style>
</head>
<body>
    <h2>Data Registrants</h2>
    <table>
        <thead>
            <tr>
                <th>Nama</th>
                <th>NISN</th>
                <th>Asal Sekolah</th>
                <th>Nomor HP</th>
                <th>Email</th>
                <th>PIN</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($registrants as $r)
                <tr>
                    <td>{{ $r->nama }}</td>
                    <td>{{ $r->nisn }}</td>
                    <td>{{ $r->asal_sekolah }}</td>
                    <td>{{ $r->nomor_hp }}</td>
                    <td>{{ $r->email }}</td>
                    <td>{{ $r->pin }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>
