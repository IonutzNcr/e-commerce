<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Article extends Model
{
    protected $primaryKey = "id";
    use HasFactory;
    public $timestamps = false;
    protected $fillable = ['subcategories_id','stock','title', 'description','image','price','short_description','popularity','spec', 'highlight'];

    public function subcategory(): BelongsTo
    {
        return $this->belongsTo(Subcategory::class, 'subcategories_id');
    }
    public function variation(): HasMany
    {
        return $this->hasMany(Variation::class,'article_id');
    }
}
