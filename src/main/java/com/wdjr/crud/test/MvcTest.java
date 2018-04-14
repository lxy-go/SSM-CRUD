package com.wdjr.crud.test;

import java.util.Iterator;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.github.pagehelper.PageInfo;
import com.wdjr.crud.bean.Employee;

/*
 * 使用Spring单元测试请求功能，请求crud请求的正确性
 * Spring4需要servlet3.0以上
 * */
@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@ContextConfiguration(locations= {"classpath:applicationContext.xml","classpath:spring-mvc.xml"})
public class MvcTest {
	//传入springmvc的ioc,正常不能注入ioc容器自己，所以在类前加@WebAppConfiguration
	@Autowired
	WebApplicationContext context;
	//1.虚拟mvc请求，获取处理的结果
	MockMvc mockMvc;
	
	@Before
	public void initMokcMvc() {
		
		mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
	}
	@Test
	public  void testPage() throws Exception {
		// 模拟get请求,输入参数，返回值
		MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/emps").param("pn", "1")).andReturn();
		
		//请求成功以后，请求域中有pageInfo;去除pageInfo进行验证
		MockHttpServletRequest request = result.getRequest();
		
		PageInfo pi = (PageInfo) request.getAttribute("pageInfo");
		System.out.println("当前页码："+pi.getPageNum());
		System.out.println("总页码： "+pi.getPages());
		System.out.println("总记录数："+pi.getTotal());
		System.out.println("在页面需要连续显示的页码：");
		int[] numbers = pi.getNavigatepageNums();
		for (int i:numbers) {
			System.out.println("  "+i);
		}
		//获取员工数据
		List<Employee> list = pi.getList();
		for(Employee emp:list) {
			System.out.println("ID:"+emp.getEmpId()+"\t"+"name: "+emp.getEmpName());
		}
	}
}
