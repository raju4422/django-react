<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class User extends MyController {

   public function __construct() {
    parent::__construct();
        Header('Access-Control-Allow-Origin: *'); //for allow any domain, insecure
        Header('Access-Control-Allow-Headers: *'); //for allow any headers, insecure
        Header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE'); //method allowed  
    }

    public function user_auth(){
        $email = $this->input->post('email');
        $password = $this->input->post('password');
        if(!empty($email) && !empty($password)){
            $count = $this->Master_model->count(array('email'=>$email,'password'=>$password),'users');
            if($count==1){
                $user_data = $this->Master_model->get_single(array(),array('email'=>$email,'password'=>$password),'users');
                $session_data = array( 
                    'id'=>$user_data->id,
                    'name'  => $user_data->name, 
                    'email'     => $user_data->email,
                    'is_active' => $user_data->is_active,
                    'logged_in' => TRUE
                );  
                $this->session->set_userdata($session_data);
                $resdata = array('flag'=>1,'data'=>$session_data,'is_logged_in'=>true);
            }elseif($count==0){
                $resdata = array('flag'=>1,'msg'=>'User Not found..');
            }else{
                $resdata = array('flag'=>1,'msg'=>'More Users present with this mail');
            }
        }else{
            if(empty($email)){
                $resdata = array('flag'=>1,'msg'=>'Please Enter Email');
            }elseif(empty($password)){
                $resdata = array('flag'=>1,'msg'=>'Please Enter Password');
            }
        }
        echo json_encode($resdata);
    }
}

?>