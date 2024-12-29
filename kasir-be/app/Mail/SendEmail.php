<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendEmail extends Mailable
{
    use Queueable, SerializesModels;
    public $total_dg,$customer_id,$code_booking,$booking_sum,$origin_airport,$destination_airport,$flight_date,$volume,$cust_name,$commodity;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($total_dg,$customer_id,$code_booking,$booking_sum,$origin_airport,$destination_airport,$flight_date,$volume,$cust_name,$commodity)
    {
        $this->total_dg = number_format($total_dg,0,',','.');
        $this->customer_id = $customer_id;
        $this->code_booking =$code_booking;
        $this->booking_sum = number_format($booking_sum,0,',','.');
        $this->origin_airport =$origin_airport;
        $this->destination_airport =$destination_airport;
        $this->flight_date =$flight_date;
        $this->volume =number_format($volume,0,',','.');
        $this->kurang_bayar = number_format($total_dg - $booking_sum ,0,',','.');
        $this->cust_name = $cust_name;
        $this->commodity = $commodity;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Approval (SMU) PCP Air Transport')
                    ->view('emails.sendemail')
                    ->with(
                        [
                           'total_dg'           => $this->total_dg,
                           'customer_id'        => $this->customer_id,
                           'code_booking'       => $this->code_booking,
                           'volume'             => $this->volume,
                           'origin'             => $this->origin_airport,
                           'destination'        => $this->destination_airport,
                           'flight_date'        => $this->flight_date,
                           'booking_sum'        => $this->booking_sum,
                           'kurang_bayar'       => $this->kurang_bayar,
                           'cust_name'          => $this->cust_name,
                           'commodity'          => $this->commodity,
                           'website'            => 'www.pcpexpress.com.com',
                        ]);
    }
}