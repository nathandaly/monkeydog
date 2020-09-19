<?php

declare(strict_types=1);

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Resolvers\SocialUserResolver;
use App\User;
use http\Exception\RuntimeException;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class BattleNetLoginController extends Controller
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
        // Get last access token and attempt it.
        $user = Socialite::driver('battlenet')->stateless()->user();

        $linkedSocialAccount = $this->socialUserResolver
            ->resolveUserByProviderCredentials(
                'battlenet', $user->token);

        if (!$linkedSocialAccount) {
            throw new RuntimeException('No linked Battle.NET account found.');
        }

        $token = $this->authToken($linkedSocialAccount);

        return redirect('/');
    }

    /**
     * Send the response after the user was authenticated.
     *
     * @param Authenticatable $linkedSocialAccount
     * @return JsonResponse
     */
    protected function authToken(Authenticatable $linkedSocialAccount): string
    {
        Auth::login($linkedSocialAccount);
        /** @var User $user */
        $user = $this->guard()->user();
        return $user->createToken(
            'battlenet__' . $user->username,
            [
                'profile:view',
                'profile:edit',
                'profile:delete',
            ]
        )->plainTextToken;
    }

    /**
     * Log the user out of the application.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function revoke(Request $request): JsonResponse
    {
        /** @var User $user */
        $user = $this->guard()->user();
        $token = $user->currentAccessToken()->delete();
        $this->guard()->logout();

        return response()->json([
            'success' => true,
            'logout_at' => new \DateTime(),
        ]);
    }
}
