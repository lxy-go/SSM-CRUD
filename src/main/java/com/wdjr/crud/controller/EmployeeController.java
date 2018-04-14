package com.wdjr.crud.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.wdjr.crud.bean.Employee;
import com.wdjr.crud.bean.Msg;
import com.wdjr.crud.service.EmployeeService;

/*
 * 处理CRUD请求
 * */

@Controller
public class EmployeeController {
	
	@Autowired
	EmployeeService employeeService;
	
	/*导入jackson,负责将对象转成json
	 * @ResponseBody
	 * */
	
	/* 员工删除
	 * 批量删除 ：1-2-3
	 * 单个删除：1
	 *  */
	@ResponseBody
	@RequestMapping(value="/emp/{ids}",method=RequestMethod.DELETE)
	public Msg deleteEmp(@PathVariable("ids")String ids) {
		//如果存在 - 就是批量删除
		if(ids.contains("-")) {
			List<Integer> del_ids = new ArrayList<>();
			String[] str_id = ids.split("-");
			for (String string : str_id) {
				del_ids.add(Integer.parseInt(string));
			}
			employeeService.delteBatch(del_ids);
		}else {
			Integer id = Integer.parseInt(ids);
			employeeService.deleteEmp(id);
		}
				
		return Msg.sucess();
	}
	
	/* 保存员工数据,
	 * 如果直接发送ajax的请求，请求除了empId 剩下全是null
	 * 原因：
	 * tomcat：
	 * 1.将请求体中的数据，封装一个Map
	 * 2.request.getParameter("empName")就会从这个map中取值
	 * 3.SpringMVC封装POJO对象的时候。
	 *   会把每个属性的值 request.getParamter("email");
	 * 
	 * ajax的PUT方法，tomcat看是PUT请求，就不会封装请求体数据为map,POST才封装请求体为map
	 *   */
	@ResponseBody
	@RequestMapping(value="/emp/{empId}",method=RequestMethod.PUT)
	public Msg updateEmp(Employee employee) {
		employeeService.updateEmp(employee);
		return Msg.sucess();
	}
	
	
	/* @PathVariable:指定在链接 接受id参数 */
	@RequestMapping(value="/emp/{id}",method=RequestMethod.GET)
	@ResponseBody
	public Msg getEmp(@PathVariable("id")Integer id) {
		
		Employee employee = employeeService.getEmp(id);
		
		return Msg.sucess().add("emp", employee);
	}
	
	
	/* -----检查用户是否存在 ------ */
	@RequestMapping(value="/checkUser")
	@ResponseBody
	public Msg checkuser(@RequestParam("empName")String empName) {
		//后端校验
//		String regx="(^[A-Za-z0-9]{6,16}$)|(^[\\u2E80-\\u9FFF]{2,5}$)";
//		if(!empName.matches(regx)) {
//			return Msg.fail().add("va_msg", "用户名必须是是2-5位中文，或者6-16位英文和数字的集合!!!");
//		}
		//重复校验
		boolean b = employeeService.checkUser(empName);
		
		if(b) {
			return Msg.sucess();
		}else {
			return Msg.fail().add("va_msg", "用户名已存在!!!");
		}
		
	}
	
	
	  	
	/* ---保存员工数据----- */
	@RequestMapping(value="emp",method=RequestMethod.POST)
	@ResponseBody
	public Msg saveEmp(@Valid Employee employee ,BindingResult result) {
		if(result.hasErrors()) {
			//检验失败
			Map<String, Object> map = new HashMap<>();
			List<FieldError> errors = result.getFieldErrors();
			for (FieldError fieldError : errors) {
				System.out.println("错误的字段名"+fieldError.getField());
				System.out.println("错误的信息"+fieldError.getDefaultMessage());
				map.put(fieldError.getField(), fieldError.getDefaultMessage());
			}
			return Msg.fail().add("errorFields", map);
		}else {
			//检验成功
			employeeService.saveEmp(employee);
			return Msg.sucess();
		}

	}
	
	
	/* -------分页查询------ */
	@RequestMapping("/emps")
	@ResponseBody
	public Msg getEmpsWithJson(@RequestParam(value="pn",defaultValue="1")Integer pn) {
		
		//查询之前只需要调用(pn,分页容量)
		PageHelper.startPage(pn,5);
		//紧接着就是分页查询
		
     	List<Employee> emps = employeeService.getAll();
     	//使用PI包装结果，只需要将pageInfo交给页面就可以
     	//封装了详细的分页信息，包括查询数据,连续传入5页
		PageInfo page = new PageInfo(emps,5);
		
		return Msg.sucess().add("pageInfo", page);
	}
	/*
	 * 查询所有员工
	 * */
/*	@RequestMapping("/emps")
	public  String getEmps(@RequestParam(value="pn",defaultValue="1")Integer pn,Model model) {
		//查询之前只需要调用(pn,分页容量)
		PageHelper.startPage(pn,5);
		//紧接着就是分页查询
		
     	List<Employee> emps = employeeService.getAll();
     	//使用PI包装结果，只需要将pageInfo交给页面就可以
     	//封装了详细的分页信息，包括查询数据,连续传入5页
		PageInfo page = new PageInfo(emps,5);
		model.addAttribute("pageInfo", page);
		System.out.println("到达emps");
		return "list";
	}*/
}
