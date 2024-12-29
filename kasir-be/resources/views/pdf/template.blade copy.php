<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous">
<style>
     @page {
            size: A4 landscape;
            margin: 0;
        }
        body {
            width: 290mm; /* Panjang A4 dalam landscape */
            height: 210mm; /* Lebar A4 dalam landscape */
            margin: 0; /* Atur margin sesuai kebutuhan */
            padding: 10;
            font-size:8;
        }
        .font {
            font-size: 10px;
        }
        .table-bordered th,
        .table-bordered td {
            border: 1px solid black; /* Menambahkan garis batas pada setiap sel */
            padding: 5px; /* Memberikan padding pada sel */
        }
        
        
</style>
</head>
<body>
    <div>
        <img src="https://pcpexpress.com/images/pcp/1_Logo_PCP_Express200.png" alt="">
        <div class="font">JL. PULOGADUNG NO. 26 KAWASAN JIEP JAKARTA TIMUR</div>
        <div class="font">Phone +622150888585 / +622150888787, Fax +622129765230</div>
        <div class="font">Webiste : www.pcpexpress.com </div>
    </div>
    <table class="mt-2">
        <tr>
            <td style="padding-right: 30px;">Account No.</td>
            <td style="padding-right: 150px;">: {{$data->customer_id}}</td>
            <td style="padding-right: 30px;">Inv Perdom Date</td>
            <td style="padding-right: 10px;">: </td>
        </tr>
    </table>
    <table>
        <tr>
            <td style="padding-right: 15px;">Account Name.</td>
            <td style="padding-right: 150px;">: {{$data->customer_id}}</td>
            <td style="padding-right: 38px;">Inv Perdom No</td>
            <td style="padding-right: 10px;">: </td>
        </tr>
    </table>
    <center  style="margin-top: 10px; margin-bottom:10px;">INVOICE PROFORMA REPORT</center>
    <table class="table table-bordered table-sm mt-1" style="font-size: 7px;">
   
            <tr>
                <th>Tanggal</th>
                <th>SMU</th>
                <th>Bandara Asal</th>
                <th>Tujuan Bandara</th>
                <th>Nama Pengirim</th>
                <th>No Referensi</th>
                <th>Jumlah KG</th>
                <th>Harga Satuan</th>
                <th>Jumlah Bruto</th>
                <th>Potongan</th>
                <th>Jumlah Netto</th>
                <th>Other Charge</th>
                <th>Surchage</th>
                <th>Value Of Goods</th>
                <th>PPN</th>
                <th>PPh</th>
                <th>Total Tagihan</th>
            </tr>
       
            @foreach($inv_perfom_detail as $detail)
            <tr>
                <td>{{$detail->flight_date}}</td>
                <td>{{$detail->no_smu}}</td>
                <td>{{$detail->origin_airport}}</td>
                <td>{{$detail->destination_airport}}</td>
                <td>{{$detail->company_name}}</td>
                <td>{{$detail->reference_no}}</td>
                <td>{{$detail->weight_charge}}</td>
                <td>1</td>
                <td>2</td>
                <td>{{$detail->weight_charge}}</td>
                <td>0</td>
                <td>{{$detail->weight_charge}}</td>
                <td>{{$detail->total_other_charge}}</td>
                <td>0</td>
                <td>{{$detail->tax}}</td>
                <td>{{$detail->tax_pph}}</td>
                <td>300.000.000</td>
            </tr>
            @endforeach
  
        <tr>
            <td colspan="6">Grand Total</td>
            <!-- Tambahkan logika atau perhitungan untuk nilai total di sini -->
            <td>Total KG</td>
            <td>Total Harga Satuan</td>
            <td>Total Harga Satuan</td>
            <td>Total Potongan</td>
            <td>Total Jumlah Netto</td>
            <td>Total Harga Satuan</td>
            <td>Total Surchage</td>
            <td>Total Value Of Goods</td>
            <td>Total Harga Satuan</td>
            <td>Total Harga Satuan</td>
            <td>Total Harga Satuan</td>
        </tr>
    </table>
</body>
</html>