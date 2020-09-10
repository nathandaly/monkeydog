<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


/**
 * Battle.NET authentication.
 */
Route::get('login/battlenet', 'Api\BattleNetLoginController@redirectToProvider');
Route::get('login/battlenet/callback', 'Api\BattleNetLoginController@handleProviderCallback');

Route::middleware('auth:sanctum')->group(static function () {
    Route::get('/user', static function (Request $request) {
        return $request->user();
    });
});
