<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\Stripe;
use App\Models\User;

class PaymentController extends Controller
{
    public function get_config()
    {
        return response()->json([
            'publishableKey' => config('services.stripe.key')
        ]);
    } 

    public function createPaymentIntent(Request $request)
    {
        Stripe::setApiKey(config('services.stripe.secret'));

        $paymentIntent = \Stripe\PaymentIntent::create([
            'currency' => 'eur',
            'amount' => $request->price,
            'customer' => $request->stripe_id,
            'setup_future_usage' => 'off_session',
            'automatic_payment_methods' => ['enabled' => true],
        ]);

        return response()->json([
            'clientSecret' => $paymentIntent->client_secret
        ]);
    }
}