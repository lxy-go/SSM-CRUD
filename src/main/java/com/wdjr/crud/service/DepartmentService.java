package com.wdjr.crud.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wdjr.crud.bean.Department;
import com.wdjr.crud.dao.DepartmentMapper;

@Service
public class DepartmentService {

	@Autowired
	DepartmentMapper departmentMapper;
	//获取所有部门信息
	public List<Department> getDepts() {
		// 获取所有员工对象
		return departmentMapper.selectByExample(null);
	}
}
