<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office"
    xmlns:v="urn:schemas-microsoft-com:vml" lang="en">

<head>
    <link rel="stylesheet" type="text/css" hs-webfonts="true"
        href="https://fonts.googleapis.com/css?family=Lato|Lato:i,b,bi">
    <title>PCP Air Transport</title>
    <meta property="og:title" content="PCP Air Transport">

    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <style type="text/css">
        a {
            text-decoration: underline;
            color: inherit;
            font-weight: bold;
            color: #253342;
        }

        h1 {
            font-size: 56px;
        }

        h2 {
            font-size: 28px;
            font-weight: 900;
        }

        p {
            font-weight: 100;
        }

        td {
            vertical-align: top;
        }

        #email {
            margin: auto;
            width: 600px;
            background-color: white;
        }

        button {
            font: inherit;
            background-color: #FF7A59;
            border: none;
            padding: 10px;
            text-transform: uppercase;
            letter-spacing: 2px;
            font-weight: 800;
            color: white;
            border-radius: 5px;
            box-shadow: 3px 3px #d94c53;
        }

        .subtle-link {
            font-size: 9px;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #CBD6E2;
        }

        .container {
            background-color: #eeebeb;
            /* Warna abu-abu */
            padding: 20px;
            width: 530px;
            height: 50px;
            
            /* Sesuaikan lebar sesuai kebutuhan */
            /* Sesuaikan margin sesuai kebutuhan */
        }

        .content {
            color: #040404;
            /* Warna teks */
            font-size: 16px;
            /* Ukuran font */
        }

        .container1 {
            background-color: #eeebeb;
            /* Warna abu-abu */
            padding: 5px;
    
            width: 90%;
            /* Sesuaikan lebar sesuai kebutuhan */
            /* Sesuaikan margin sesuai kebutuhan */
        }

        .content1 {
            color: #040404;
            /* Warna teks */
            font-size: 16px;
            /* Ukuran font */
        }

        .button_approval {
            font: inherit;
            background-color: #cb055e;
            border: none;
            padding: 10px;
            text-transform: uppercase;
            letter-spacing: 2px;
            font-weight: 900;
            color: white;
            border-radius: 15px;

        }

    </style>
    </style>

</head>

<body bgcolor="#F5F8FA"
    style="width: 75%; margin: auto 0; padding:0; font-family:Lato, sans-serif; font-size:18px; color:#33475B; word-break:break-word">

    <! View in Browser Link -->

        <div id="email">



            <! Banner -->
                <table role="presentation" width="100%" style=" overflow: hidden; " bgcolor="#67c8fc">
                    <tr>
                        <td align="left" style="color: white;  height: 50px;">
                            <img src="https://pcpexpress.com/images/pcp/gsa2.png" alt="" width="200">
                        </td>
                        <td align="right" style="padding:15px; color:white;">
                           {{$flight_date}}
                            <br />
                            Nomor Booking : {{$code_booking}}
                        </td>
                    </tr>
                </table>


                <! First Row -->

                    <table role="presentation" border="0" cellpadding="0" cellspacing="10px">
                        <tr>
                            <td>
                                <p style="text-align: justify;"> Hai {{$cust_name}} dari <b>{{$customer_id}}</b>,</p>
                                <p style="text-align: justify;">
                                    Biaya Cargo Anda mengalami perubahan di akibatkan oleh adanya barang yang termasuk
                                    kategori {{$commodity}}.
                                </p>
                                <p style="text-align: justify;">
                                    Batas Waktu persetujuan 3 (tiga) jam terhitung sejak booking cargo Anda lakukan.</p>
                                <p style="text-align: justify;"> Silahkan melakukan persetujuan atas perubahan biaya
                                    tersebut sesuai detail di bawah. Abaikan pemberitahuan ini jika Anda tidak setuju
                                    atas perubahan biaya yang terjadi (perubahan biaya akan mengurangi saldo deposit
                                    anda).</p>
                                <center>
                                    <div class="container">
                                        <div class="content">
                                            <span style="margin-right: 250px;"><b>Total kurang bayar</b> </span>
                                            <b>Rp {{$kurang_bayar}}</b>
                                        </div>
                                    </div>
                                </center>
                                <br />
                                <span><b>Rincian Booking</b></span>
                                <div class="container1">
                                    <div class="content">
                                      <table style="border-collapse: collapse; width: 100%;">
                                        <tr>
                                            <td style="text-align: left; border-top: 1px solid #ccc; border-left: 1px solid #ccc;padding: 4px;">Departure - Destination</td>
                                            <td style="text-align: right; border-top: 1px solid #ccc;border-right: 1px solid #ccc;  padding: 4px;">{{$origin}} - {{$destination}}</td>
                                        </tr>
                                    </table>
                                    
                                        <table  style="border-collapse: collapse; width: 100%;">
                                            <tr>
                                                <td style=" text-align: left; border-left: 1px solid #ccc; padding: 4px;">Flight Date</td>
                                                <td style=" text-align: right; border-right: 1px solid #ccc;  padding: 4px;">{{$flight_date}}</td>
                                            </tr>
                                        </table>
                                        <table  style="border-collapse: collapse; width: 100%;">
                                            <tr>
                                                <td style=" text-align: left;  border-left: 1px solid #ccc; padding: 4px;">Volume (KG)</td>
                                                <td style=" text-align: right; border-right: 1px solid #ccc;  padding: 4px;">{{$volume}} Kg</td>
                                            </tr>
                                        </table>
                                        <table  style="border-collapse: collapse; width: 100%;">
                                            <tr>
                                                <td style=" text-align: left;  border-left: 1px solid #ccc; border-bottom: 1px solid #ccc;padding: 4px;">Category (Berubah dari General
                                                    Cargo)</td>
                                                <td style=" text-align: right; border-right: 1px solid #ccc;  padding: 4px;border-bottom: 1px solid #ccc;">{{$commodity}}</td>
                                            </tr>
                                        </table>

                                    </div>
                                </div>
                                <br />
                                <span><b>Rincian Pembayaran</b></span>
                                <div class="container1">
                                    <div class="content">
                                        <table  style="border-collapse: collapse; width: 100%;">
                                            <tr>
                                                <td style=" text-align: left; border-top: 1px solid #ccc; border-left: 1px solid #ccc; padding: 4px;">Change pada saat booking</td>
                                                <td style=" text-align: right; border-top: 1px solid #ccc;border-right: 1px solid #ccc; padding: 4px;">RP. {{$booking_sum}}</td>
                                            </tr>
                                        </table>
                                        <table  style="border-collapse: collapse; width: 100%;">
                                            <tr>
                                                <td style=" text-align: left; border-left: 1px solid #ccc; padding: 4px;">Koreksi surchage {{$commodity}}
                                                </td>
                                                <td style=" text-align: right; border-right: 1px solid #ccc;  padding: 4px;">Rp. {{$total_dg}}</td>
                                            </tr>
                                        </table>
                                        <table  style="border-collapse: collapse; width: 100%;">
                                            <tr>
                                                <td style=" text-align: left; border-left: 1px solid #ccc; padding: 4px; border-bottom: 1px solid #ccc;">Total kurang Bayar</td>
                                                <td style=" text-align: right; border-top: 1px solid #ccc;border-right: 1px solid #ccc;  padding: 4px; border-bottom: 1px solid #ccc;">Rp. {{$kurang_bayar}}</td>
                                            </tr>
                                        </table>


                                    </div>
                                </div>
                                <br />
                                <a class="button_approval" href="https://gsa.pcpexpress.com/admin/booking">
                                    Setuju Bayar
                                </a>
                                <p><i>* dengan menekan tombol SETUJU BAYAR maka anda menyetujui kekurangan atas
                                        pembayaran akan langsung di potong dari deposit</i> </p>

                            </td>
                        </tr>
                    </table>

                    <! Second Row with Two Columns-->


                        </table>
        </div>
</body>

</html>
