<?php
   
namespace App\Http\Controllers;
   
use Illuminate\Http\Request;
use App\Post;
   
class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $posts = Post::all();
    
        return view('posts.index', compact('posts'));
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
    	$request->validate([
            'title'=>'required',
            'body'=>'required',
        ]);
    
        Post::create($request->all());
    
        return redirect()->route('posts.index');
    }
    
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
    	$post = Post::with(['comments.user','comments.replies'])->find($id);
		/*
		foreach($post->comments as $comments){
			echo "<pre>";print_r($comments->user); echo "</pre>"; exit;
		}
		echo "<pre>";print_r($post->comments); echo "</pre>"; exit;
		*/
		//echo "<pre>"; print_R(response()->json($post,200)); echo "</pre>"; exit;
        return view('posts.show', compact('post'));
    }
}