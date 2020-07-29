<?php
   
namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseController as BaseController;   
use Illuminate\Http\Request;
use App\Comment;
use Validator;
   
class CommentController extends BaseController
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
		
		
		$input = $request->all();


        $validator = Validator::make($input, [
            'body' => 'required'
        ]);


        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }

		$input['user_id'] = auth()->user()->id;
        $comment = Comment::create($input);


        return $this->sendResponse($comment->toArray(), 'Comment created successfully.');
		
		
		
    	
    }
}