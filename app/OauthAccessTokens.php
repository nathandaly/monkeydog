<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OauthAccessTokens extends Model
{
    protected $fillable = [
        'name',
        'email',
        'username',
        'password',
    ];
}
