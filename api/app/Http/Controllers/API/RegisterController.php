<?php


namespace App\Http\Controllers\API;


use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use App\User;
use Illuminate\Support\Facades\Auth;
use Validator;
use Carbon\Carbon;



class RegisterController extends BaseController
{
    /**
     * Register api
     *
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
		
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
           /* 'c_password' => 'required|same:password',*/
        ]);


        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }

		
        $input = $request->all();
		
        $input['password'] = bcrypt($input['password']);
		try{
			$user = User::create($input);
		}catch(Exception $e){
			
		}
		
		
		
		//$user = $request->user();
		
       /*
		if($user->id){
			$emp_data['token'] =  $user->createToken('MyApp')->accessToken;
			$emp_data['name'] = $user->name;
			$emp_data['email'] = $user->email;
			$emp_data['id'] = $user->id;
			$emp_data['expire_at'] = strtotime($expire);
			$success['token'] =  base64_encode(json_encode($emp_data));
		}
		*/
		$success['name'] = $user->name;
		$success['token'] = $user->createToken('MyApp')->accessToken;
		
        return $this->sendResponse($success, 'User register successfully.');
    }
	
	
	 public function login(Request $request)
    {
		
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);
		
		if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }

		$credentials = request(['email', 'password']);
        if(!Auth::attempt($credentials)){
			return $this->sendError('Unauthorized', '401'); 
		}
            /*
		$expire = Carbon::parse(
                $tokenResult->token->expires_at
            )->toDateTimeString();
			*/
		$expire=date('Y-m-d H:i:s', strtotime('+1 hour'));
		$user = $request->user();
       /*
		if($user->id){
			$emp_data['token'] =  $user->createToken('MyApp')->accessToken;
			$emp_data['name'] = $user->name;
			$emp_data['email'] = $user->email;
			$emp_data['id'] = $user->id;
			$emp_data['expire_at'] = strtotime($expire);
			$success['token'] =  base64_encode(json_encode($emp_data));
		}
		*/
		$success['token'] =   $user->createToken('MyApp')->accessToken;
		$success['name'] =   $user->name;
        return $this->sendResponse($success, 'User Login successfully.');
				
    }
	
}