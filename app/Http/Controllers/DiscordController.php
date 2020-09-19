<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class DiscordController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Discord/Index', [
            'invite' => 'https://discord.com/invite/k7274Yy',
            'breadcrumbPath' => ['Discord'],
        ]);
    }
}
