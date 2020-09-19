<?php

declare(strict_types=1);

namespace App\Resolvers;

use App\Contracts\SocialProviderContract;
use App\Services\Social\BattleNetAccountsService;
use Coderello\SocialGrant\Resolvers\SocialUserResolverInterface;
use Exception;
use Illuminate\Contracts\Auth\Authenticatable;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Two\User as ProviderUser;

/**
 * Class SocialUserResolver
 * @package App\Resolvers
 */
class SocialUserResolver implements SocialUserResolverInterface
{
    /**
     * Resolve user by provider credentials.
     *
     * @param string $provider
     *
     * @param string $accessToken
     * @return Authenticatable|null
     */
    public function resolveUserByProviderCredentials(string $provider, string $accessToken): ?Authenticatable
    {
        if ($providerUser = $this->resolveProviderUser($provider, $accessToken)) {
            return ($this->delegateSocialResolver($provider))->findOrCreate($providerUser);
        }

        return null;
    }

    /**
     * @param string $provider
     * @param string $accessToken
     * @return |null
     */
    public function resolveUserProfileByProvider(string $provider, string $accessToken)
    {
        if ($providerUser = $this->resolveProviderUser($provider, $accessToken)) {
            return ($this->delegateSocialResolver($provider))->getUserProfile($accessToken);
        }

        return null;
    }

    /**
     * @param string $provider
     * @return SocialProviderContract|null
     */
    private function delegateSocialResolver(string $provider): ?SocialProviderContract
    {
        $implementation = null;

        switch ($provider) {
            case 'battlenet':
                $implementation = new BattleNetAccountsService();
                break;
            case 'discord':
                throw new \RuntimeException('Discord not yet implemented.');
            default:
                throw new \RuntimeException('Unknown social authentication provider.');
        }

        return $implementation;
    }

    /**
     * @param string $provider
     * @param string $accessToken
     * @return ProviderUser|null
     */
    private function resolveProviderUser(string $provider, string $accessToken): ?ProviderUser
    {
        $providerUser = null;

        try {
            $providerUser = Socialite::driver($provider)->userFromToken($accessToken);
        } catch (Exception $exception) {}

        return $providerUser;
    }
}
