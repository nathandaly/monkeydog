<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Providers\RouteServiceProvider;
use App\Resolvers\SocialUserResolver;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class BattleNetLoginController extends ApiController
{
    private SocialUserResolver $socialUserResolver;

    public function __construct(SocialUserResolver $socialUserResolver)
    {
        $this->socialUserResolver = $socialUserResolver;
    }

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
        //$user = Socialite::driver('battlenet')->userFromToken('EUKaldNPJE2A27Szf4TPubbZTvsoIO2OYO');
        $user = Socialite::driver('battlenet')->stateless()->user();

        $linkedSocialAccount = $this->socialUserResolver->resolveUserByProviderCredentials('battlenet', $user->token);

        // $user->token;

        if (!$linkedSocialAccount) {
            return $this->respondFailedLogin();
        }

        Auth::login($linkedSocialAccount);
        $userG = $this->guard()->user();

        return $this->respondSuccess([
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
