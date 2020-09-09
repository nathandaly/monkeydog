<?php

namespace App;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use JsonException;
use Laravel\Socialite\Two\AbstractProvider;
use Laravel\Socialite\Two\ProviderInterface;
use Laravel\Socialite\Two\User;

class BattleNetProvider extends AbstractProvider implements ProviderInterface
{
    protected array $fields = [
        'id', 'battletag',
    ];

    /**
     * {@inheritdoc}
     */
    protected $scopes = [];

    /**
     * {@inheritdoc}
     */
    protected $scopeSeparator = '';

    protected $region;

    public function __construct(Request $request, $clientId, $clientSecret, $redirectUrl, $guzzle = [])
    {
        $this->region = Session::get('bnet.region', $this->getRegion());
        parent::__construct($request, $clientId, $clientSecret, $redirectUrl, $guzzle);
    }

    /**
     * {@inheritdoc}
     */
    protected function getAuthUrl($state): string
    {
        return $this->buildAuthUrlFromBase("https://{$this->getRegion()}.battle.net/oauth/authorize", $state);
    }

    /**
     * {@inheritdoc}
     */
    protected function getTokenUrl(): string
    {
        return "https://{$this->getRegion()}.battle.net/oauth/token";
    }

    /**
     * {@inheritdoc}
     * @throws JsonException
     */
    protected function getUserByToken($token)
    {
        $response = $this->getHttpClient()->get("https://{$this->getRegion()}.api.battle.net/account/user", [
            'headers' => [
                'Authorization' => 'Bearer '.$token,
                'fields' => implode(',', $this->fields),
            ],
        ]);

        return json_decode($response->getBody(), true, 512, JSON_THROW_ON_ERROR);
    }

    /**
     * {@inheritdoc}
     */
    protected function mapUserToObject(array $user)
    {
        return (new User())->setRaw($user)->map([
            'id'       => $user['id'],
            'nickname' => $user['battletag'],
            'name'     => null,
            'email'    => null,
            'avatar'   => null,
        ]);
    }

    /**
     * {@inheritdoc}
     */
    protected function getTokenFields($code): array
    {
        return array_merge(parent::getTokenFields($code), [
            'grant_type' => 'authorization_code'
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function scopes($scopes)
    {
        $this->scopes = array_unique(array_filter(array_merge($this->scopes, $scopes)));
        return $this;
    }

    private function getRegion(): string
    {
        return env('SOCIALITE_BATTLENET_REGION', 'eu');
    }
}
