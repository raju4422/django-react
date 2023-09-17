<?php
class Master_model extends CI_Model {

public function get_all($select,$where,$table){

    if ($select != null) {
        if (is_array($select)) {
            foreach ($select as $key => $value) {
                $this->db->select($value);
            }
        }
    }
    if ($where != null) {
        if (is_array($where)) {
            foreach ($where as $key => $value) {
                $this->db->where($key, $value);
            }
        }
    }
    $res = $this->db->get($table);
    return $res->result();
}

public function get_single($select,$where,$table){

    if ($select != null) {
        if (is_array($select)) {
            foreach ($select as $key => $value) {
                $this->db->select($value);
            }
        }
    }
    if ($where != null) {
        if (is_array($where)) {
            foreach ($where as $key => $value) {
                $this->db->where($key, $value);
            }
        }
    }
    $res = $this->db->get($table);
    return $res->row();
}

public function count($where_clause, $tblname)
{
    $this->db->select("count(*)");
    if ($where_clause != null) {
        if (is_array($where_clause)) {
            foreach ($where_clause as $key => $value) {
                $this->db->where($key, $value);
            }
        }
    }
    $res = $this->db->get($tblname);
    $record=0;
    foreach($res->result() as $data){
        foreach ($data as $key => $value) {
            if($key=="count(*)"){
                $record=$value;
            }
        }
    }
    return $record;
}
}
?>