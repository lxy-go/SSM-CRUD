package com.wdjr.crud.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.wdjr.crud.bean.Department;
import com.wdjr.crud.bean.Msg;
import com.wdjr.crud.service.DepartmentService;

/**
 * 处理和部门有关的请求
 * 
 */

@Controller
public class DepartmentController {
	
	@Autowired
	DepartmentService departmentservice;
	
	/*
	 * 返回所有部门信息
	 * */	
	@RequestMapping("/depts")
	@ResponseBody
	public Msg getDepts() {
		
		List<Department> depts = departmentservice.getDepts();
		return Msg.sucess().add("depts", depts);
	}
	
}
