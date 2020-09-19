<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', static function() {
    return Inertia::render('Landing/Index', [
        'breadcrumbPath' => []
    ]);
})->name('page.landing');

/**
 * Battle.NET authentication.
 */
Route::get('login/battlenet', 'Auth\BattleNetLoginController@redirectToProvider');
Route::get('login/battlenet/callback', 'Auth\BattleNetLoginController@handleProviderCallback');

Auth::routes();

Route::get('/profile', 'ProfileController@index')
    ->middleware('auth')
    ->name('page.profile');
