<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendEmail extends Mailable
{
    use Queueable, SerializesModels;
    public $total_dg,$customer_id,$code_booking;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($total_dg,$customer_id,$code_booking)
    {
        $this->total_dg = number_format($total_dg,0,',','.');
        $this->customer_id = $customer_id;
        $this->code_booking =$code_booking;
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
                           'total_dg'            => $this->total_dg,
                           'customer_id'        => $this->customer_id,
                           'code_booking'       => $this->code_booking,
                           'website'           => 'www.pcpexpress.com.com',
                        ]);
    }
}