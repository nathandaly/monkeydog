<?php

declare(strict_types=1);

namespace App\Services\Social;

use App\Contracts\SocialProviderContract;
use App\User;
use App\LinkedSocialAccount;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use JsonException;
use Laravel\Socialite\Two\User as ProviderUser;

class BattleNetAccountsService implements SocialProviderContract
{
    public const PROVIDER = 'battlenet';

    private Client $httpClient;

    public function __construct()
    {
        $this->httpClient = new Client([
           'timeout' => 2.14,
        ]);
    }

    /**
     * Find or create user instance by provider user instance and provider name.
     *
     * @param ProviderUser $providerUser
     *
     * @return User
     */
    public function findOrCreate(ProviderUser $providerUser): User
    {
        $linkedSocialAccount = LinkedSocialAccount::where('provider_name', self::PROVIDER)
            ->where('provider_id', $providerUser->getId())
            ->first();

        if ($linkedSocialAccount) {
            return $linkedSocialAccount->user;
        }

        $user = null;

        if ($username = $providerUser->getNickname()) {
            $user = User::where('username', $username)->first();
        }

        if (!$user) {
            $user = User::create([
                'name' => $providerUser->getName() ?? $providerUser->getNickname(),
                'username' => $providerUser->getNickname(),
            ]);
        }

        $user->linkedSocialAccounts()->create([
            'provider_id' => $providerUser->getId(),
            'provider_name' => self::PROVIDER,
            'token' => $providerUser->token,
            'scopes' => 'wow.profile',
            //'expires_at' => '', // TODO: Is this needed with get user by access token?
        ]);

        return $user;
    }

    /**
     * @param string $token
     * @return mixed|null
     * @throws JsonException
     */
    public function getUserProfile(string $token)
    {
        try {
            $response = $this->httpClient->request(
                'GET', 'https://' . config('services.battlenet.region') . '.api.blizzard.com/profile/user/wow?locale=en_US',
                [
                    'headers' => [
                        'Battlenet-Namespace' => 'profile-eu',
                        'Authorization' => 'Bearer ' . $token,
                    ],
                    'timeout' => 3.14,
                ]
            );

            $result = $response->getBody()->getContents();
        } catch (\Exception $e) {
            throw new \RuntimeException($e->getMessage());
        } catch (GuzzleException $e) {
            throw new \RuntimeException($e->getMessage());
        }

        return json_decode($result, true, 512, JSON_THROW_ON_ERROR);
    }
}
