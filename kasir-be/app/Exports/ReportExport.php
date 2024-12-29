<?php

namespace App\Exports;

use App\Models\Transaction;
use Maatwebsite\Excel\Concerns\FromCollection;

class ReportExport implements FromCollection
{
   
    protected $start_date;
    protected $end_date;
    protected $payment_type_id;
    protected $shipper_account_number;
    protected $airport_departure_id;
    public function __construct($start_date, $end_date, $payment_type_id,$shipper_account_number, $airport_departure_id)
    {
        $this->start_date = $start_date;
        $this->end_date   = $end_date;
        $this->payment_type_id = $payment_type_id;
        $this->shipper_account_number  = $shipper_account_number;
        $this->airport_departure_id = $airport_departure_id;
    }

    public function collection()
    {
        return Transaction::whereBetween('flight_date',[$this->start_date,$this->end_date])
        ->where('pay_type_id',$this->payment_type_id)
        ->where('shipper_account_number',$this->shipper_account_number)
        ->where('airport_departure_id',$this->airport_departure_id)
        ->get();

    }
}
