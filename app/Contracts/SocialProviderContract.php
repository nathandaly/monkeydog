<?php

declare(strict_types=1);

namespace App\Contracts;

use App\User;
use Laravel\Socialite\Two\User as ProviderUser;

interface SocialProviderContract
{
    public function findOrCreate(ProviderUser $providerUser): User;
}
