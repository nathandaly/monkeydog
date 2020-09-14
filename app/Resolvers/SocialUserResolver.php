<?php

declare(strict_types=1);

namespace App\Resolvers;

use App\Contracts\SocialProviderContract;
use App\Services\Social\BattleNetAccountsService;
use Coderello\SocialGrant\Resolvers\SocialUserResolverInterface;
use Exception;
use Illuminate\Contracts\Auth\Authenticatable;
use Laravel\Socialite\Facades\Socialite;

class SocialUserResolver implements SocialUserResolverInterface
{
    /**
     * Resolve user by provider credentials.
     *
     * @param string $provider
     * @param string $accessToken
     *
     * @return Authenticatable|null
     */
    public function resolveUserByProviderCredentials(string $provider, string $accessToken): ?Authenticatable
    {
        $providerUser = null;

        try {
            $providerUser = Socialite::driver($provider)->userFromToken($accessToken);
        } catch (Exception $exception) {}

        if ($providerUser) {
            return ($this->delegateSocialResolver($provider))->findOrCreate($providerUser);
        }

        return null;
    }

    public function delegateSocialResolver(string $provider): ?SocialProviderContract
    {
        $implementation = null;

        switch ($provider) {
            case 'battlenet':
                $implementation = new BattleNetAccountsService();
                break;
            default:
                throw new \RuntimeException('Unknown social authentication provider.');
        }

        return $implementation;
    }
}
