<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

use Laravel\Socialite\Facades\Socialite;

class BattleNetLoginController extends ApiController
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    public function redirectToProvider()
    {
        return Socialite::driver('battlenet')->stateless()->redirect();
    }

    public function handleProviderCallback(Request $request)
    {
        $user = Socialite::driver('battlenet')->userFromToken('EUKaldNPJE2A27Szf4TPubbZTvsoIO2OYO');

        // $user->token;



        return response()->json([
            'success' => true,
            'login_at' => new \DateTime(),
            'user' => $this->guard()->user(),
        ]);
    }

    /**
     * Send the response after the user was authenticated.
     *
     * @param Request $request
     * @return JsonResponse
     */
    protected function sendLoginResponse(Request $request): JsonResponse
    {
        $request->session()->regenerate();

        $this->clearLoginAttempts($request);

        if ($response = $this->authenticated($request, $this->guard()->user())) {
            return $response;
        }

        return response()->json([
            'success' => true,
            'login_at' => new \DateTime(),
            'user' => $this->guard()->user(),
        ]);
    }

    /**
     * Log the user out of the application.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function logout(Request $request): JsonResponse
    {
        $this->guard()->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        if ($response = $this->loggedOut($request)) {
            return $response;
        }

        return response()->json([
            'success' => true,
            'logout_at' => new \DateTime(),
        ]);
    }
}
