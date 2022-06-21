<?php

namespace App\Http\Middleware;

use Closure;
use Error;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EnsureIsProducteur
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {

    try {            
    $token = \Laravel\Sanctum\PersonalAccessToken::findToken($request->header('token'));
    // Get the assigned user
    $user = $token->tokenable;
        if ($user) {
                $request->user = $user;
                return $next($request);
            } else {return response()->json(['error'=>"usernotfind"], 401);}
            
        } catch (\Exception $e){
                    return response()->json(['error'=>$e->getMessage()], 401);
    }
}
}