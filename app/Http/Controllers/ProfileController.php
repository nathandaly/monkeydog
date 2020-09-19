<?php

namespace App\Http\Controllers;

use App\Resolvers\SocialUserResolver;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    private SocialUserResolver $socialUserResolver;

    public function __construct(SocialUserResolver $socialUserResolver)
    {
        $this->socialUserResolver = $socialUserResolver;
    }

    public function index(): Response
    {
        if (!$user = Auth::user()) {
            redirect('/');
        }

        $linkedSocialAccounts = $user
            ->linkedSocialAccounts()
            ->where(
                'provider_name',
                'battlenet'
            )
            ->first();

        if (!$linkedSocialAccounts) {
            throw new \RuntimeException('Could not find a linked Battle.NET account.');
        }

        $profile = $this->socialUserResolver
            ->resolveUserProfileByProvider(
                'battlenet',
                $linkedSocialAccounts->token
            );

        $characters = collect($profile['wow_accounts'][0]['characters']);
        $charactersByRealm = $characters
            ->groupBy('realm.name')
            ->map(static function ($characters, $realm) {
                return [
                  'realm' => $realm,
                  'characters' => $characters->toArray(),
                ];
            })
            ->values()
            ->toArray()
        ;

        return Inertia::render('Profile/Index', [
            'profile' => $profile,
            'characters' => $charactersByRealm,
            'breadcrumbPath' => ['Profile', 'View']
        ]);
    }
}
