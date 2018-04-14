package com.wdjr.crud.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wdjr.crud.bean.Employee;
import com.wdjr.crud.bean.EmployeeExample;
import com.wdjr.crud.bean.EmployeeExample.Criteria;
import com.wdjr.crud.dao.EmployeeMapper;

@Service
public class EmployeeService {

//	注入do
	@Autowired
	EmployeeMapper  employeeMapper;
	
	public List<Employee> getAll() {
		// 获取所有员工对象
		return employeeMapper.selectByExampleWithDept(null);
	}

	/* 员工保存方法 */	
	public void saveEmp(Employee employee) {
		
		employeeMapper.insertSelective(employee);
	}
	
	/* 员工是否存在 */	
	public boolean checkUser(String empName) {
		EmployeeExample example = new EmployeeExample();
		Criteria criteria = example.createCriteria();
		criteria.andEmpNameEqualTo(empName);
		long count = employeeMapper.countByExample(example);
		return count==0;
	}

	/* 查询员工  */
	public Employee getEmp(Integer id) {
		Employee emp = employeeMapper.selectByPrimaryKey(id);
		return emp;
	}
	
	/* 保存更新员工 */
	public void updateEmp(Employee employee) {
		
		employeeMapper.updateByPrimaryKeySelective(employee);
	}
	/* 删除员工 */
	public void deleteEmp(Integer id) {
		
		employeeMapper.deleteByPrimaryKey(id);
	}
	
	//批量删除
	public void delteBatch(List<Integer> ids) {
		EmployeeExample example = new EmployeeExample();
		Criteria creatia = example.createCriteria();
		//delete from xx where emp_id in (1,2,3)
		creatia.andEmpIdIn(ids);
		employeeMapper.deleteByExample(example);
		
	}
}
