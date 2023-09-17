<?php

class MyController extends CI_Controller
{
    public function __construct()
	{
		parent::__construct();
        if(empty($this->session->userdata("id")) || $this->session->userdata("is_actve")==0)
		{
            $resdata = array('flag'=>1,'logged_in'=>FALSE);
            echo json_encode($resdata);die;
		}else{
            $userdata = $this->Master_model->get_single(array(),array('id'=>$this->session->userdata("id")),'users');
            if(!empty($userdata)){
              // set session data
            }else{
                $resdata = array('flag'=>1,'logged_in'=>FALSE,'msg'=>'User not Found');
                echo json_encode($resdata);die;
            }
        }
    }
}
?>
