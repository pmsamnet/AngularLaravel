<?php
   
namespace App\Http\Controllers\API;
   
use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Post;
use Validator;
   
class PostController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $posts = Post::all();
    
		return $this->sendResponse($posts->toArray(), 'Posts retrieved successfully.');
       
    }
   
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('posts.create');
    }
    
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
            'title' => 'required',
            'body' => 'required'
        ]);


        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }


        $post = Post::create($input);


        return $this->sendResponse($post->toArray(), 'Post created successfully.');
    	
    }
    
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
		
		$post = Post::with(['comments.user','comments.replies'])->find($id);
		
        if (is_null($post)) {
            return $this->sendError('Post not found.');
        }

		$response = [
            'success' => true,
            'data'    => $post,
            'message' => 'Post retrieved successfully.',
        ];
  //      return $this->sendResponse($post, 'Post retrieved successfully.');
		return response()->json($response,200);
    	
    }
}