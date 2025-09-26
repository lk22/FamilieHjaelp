<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Child extends Model
{
    protected $table = 'parent_childrens';
    protected $fillable = [
        "profile_id",
        "firstname",
        "middlename",
        "lastname",
        "gender",
        "has_interests",
        "age",
        "create_id",
        "updated_id"
    ];

    protected $dates = ['created_at', 'updated_at'];
    protected $guarded = ["profile_id"];
    protected $hidden = ["profile_id"];

    public function profile(){
        $this->belongsTo(Profile::class, 'profile_id', 'id');
    }
}
