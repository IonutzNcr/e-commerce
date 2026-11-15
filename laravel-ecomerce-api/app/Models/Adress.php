<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Adress extends Model
{
    protected $table = 'user_adress';
    protected $primaryKey = "id";
    use HasFactory;
    public $timestamps = false;
    protected $fillable = ['user_id','adress','adress2', 'zipcode','city', 'country'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'id');
    }

}
