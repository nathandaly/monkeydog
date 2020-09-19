<?php

declare(strict_types=1);

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @method static where(string $string, string $provider)
 */
class LinkedSocialAccount extends Model
{
    protected $fillable = [
        'provider_id',
        'provider_name',
        'token',
        'scopes',
        'created_at',
        'updated_at',
        'expires_at',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
