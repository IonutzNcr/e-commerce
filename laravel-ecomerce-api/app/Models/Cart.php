<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Cart extends Model
{
    protected $primaryKey = 'id';
    use HasFactory;
    public $timestamps = false;
    protected $fillable = ['users_id'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, "users_id");
    }

    public function article()
    {
        return $this->belongsTo(Article::class, 'articles_id');
    }
}
