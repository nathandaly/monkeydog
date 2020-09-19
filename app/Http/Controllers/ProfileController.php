<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Profile/Index', [
            'breadcrumbPath' => ['Profile', 'View']
        ]);
    }
}
