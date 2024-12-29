<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous">
    {{-- <style>
        table {
            border-collapse: collapse;
            width: 100%;
        }
        th, td {
            border: 1px solid black;
            padding: 8px;
        }
    </style> --}}

</head>
<body style="font-size: 5.3;">
        <div class="row">
            <div class="col-md-12">
                <h4>Cargo Sales Report</h4>
            </div>
        </div>
        <table>
            <tr>
                <td width="100">Account Number</td>
                <td>:</td>
                <td>{{$head_transactions->shipper_account_number}}</td>
            </tr>
        </table>
        <table>
            <tr>
                <td width="100">Account Name</td>
                <td>:</td>
                <td>{{$head_transactions->customer->company_name ?? 'N/A'}}</td>
            </tr>
        </table>
        <table>
            <tr>
                <td width="100">Periode</td>
                <td>:</td>
                <td>{{$start_date}} s/d {{$end_date}}</td>
            </tr>
        </table>
        <table>
            <tr>
                <td width="100">Report Type</td>
                <td>:</td>
                <td>Sales By Customer</td>
            </tr>
        </table>
        <table>
                <tr style="  border: 0.5px solid black;
                padding: 2px;" class="text-center">
                    <th>Account Number</th>
                    <th>Account Name</th>
                    <th>Booking Date</th>
                    <th>Booking Number</th>
                    <th>POS Date</th>
                    <th>Flight Date</th>
                    <th>Departure & Destination</th>
                    <th>AWB/SMU</th>
                    <th>Pay Type</th>
                    <th>Volume</th>
                    <th>Total Billing</th>
                    <th>Weight Charge</th>
                    <th>Rate/Kg</th>
                    <th>Valuation Charge</th>
                    <th>Surchage Heavy Wight</th>
                    <th>Other Charge</th>
                    <th>VAT</th>
                    <th>PPh</th>
                    <th>Product</th>
                    <th>Commodity Item</th>
                    <th>Rate Class</th>
                    <th>Flight No</th>
                </tr>
                @foreach($transactions as $tr)
                <tr class="text-center"> 
                    <td>{{$tr->shipper_account_number ?? null}}</td>
                    <td>{{$tr->customer->company_name ?? null}}</td>
                    <td>{{$tr->booking->created_at ?? null}}</td>
                    <td>{{$tr->booking_code ?? null}}</td>
                    <td>{{$tr->created_at ?? null}}</td>
                    <td>{{$tr->flight_date ?? null}}</td>
                    <td>{{$tr->dest_airport->IATAName ?? null}}</td>
                    <td>{{$tr->no_smu ?? null}}</td>
                    <td>{{$tr->pay_type_id ?? null}}</td>
                    <td>{{$tr->total_kg ?? null}} Kg</td>
                    <td>{{number_format($tr->grand_total ?? null,0,',','.')}} </td>
                    <td>{{number_format($tr->weight_charge ?? null,0,',','.')}}</td>
                    <td>{{number_format($tr->rate ?? null,0,',','.')}}</td>
                    <td>15.000</td>
                    <td>{{number_format($tr->surchage_hw ?? null,0,',','.')}}</td>
                    <td>{{number_format($tr->total_other_charge ?? null,0,',','.')}}</td>
                    <td>{{number_format($tr->tax ?? null,0,',','.')}}</td>
                    <td>{{number_format($tr->tax_pph ?? null,0,',','.')}}</td>
                    <td>General Cargo</td>
                    <td>F</td>
                    <td>Accecories</td>
                    <td>RO-1241</td>
        
                </tr>
                @endforeach
                <tr class="text-center" style="font-weight: bold; background-color:rgb(185, 184, 184)">
                    <td colspan="9" class="text-right">Grand Total</td>
                    <!-- Tambahkan logika atau perhitungan untuk nilai total di sini -->
                    <td>{{$sum_transaction->total_kg}} Kg</td>
                    <td>{{number_format($sum_transaction->grand_total ?? null,0,',','.')}} </td>
                    <td>{{number_format($sum_transaction->weight_charge ?? null,0,',','.')}} </td>
                    <td>{{number_format($sum_transaction->rate ?? null,0,',','.')}} </td>
                    <td>{{number_format($sum_transaction->valuation_charge ?? null,0,',','.')}} </td>
                    <td>{{number_format($sum_transaction->surchage_hw ?? null,0,',','.')}} </td>
                    <td>{{number_format($sum_transaction->total_other_charge ?? null,0,',','.')}} </td>
                    <td>{{number_format($sum_transaction->tax ?? null,0,',','.')}} </td>
                    <td>{{number_format($sum_transaction->tax_pph ?? null,0,',','.')}} </td>
                    <td>General Cargo</td>
                    <td>F</td>
                    <td>Accessories</td>
                    <td>RO-164</td>
                </tr>
        </table>
 
</body>
</html>