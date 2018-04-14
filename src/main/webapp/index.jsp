<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
  
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>员工列表</title>
<!-- 项目路径，以/开始没有以/结束     /ssm-crud -->
<% 
	pageContext.setAttribute("APP_PATH", request.getContextPath());
%>

<!-- web的路径
不以 /开始的路径，找资源是以当前的路径为基准，经常出问题

推荐 /开始，找资源不是当前路径，是服务器路径为基准(http://localhost:3306):需要加上项目名
http://localhost:3306/crud

 -->
 
<script  src="${APP_PATH}/static/js/jquery-1.8.1.min.js"></script>
<link href="${APP_PATH}/static/css/bootstrap.min.css" rel="stylesheet">
<script  src="${APP_PATH}/static/js/bootstrap.min.js"></script>
</head>
<body>

	<!-- 员工编辑的模态框 -->
	<div class="modal fade" id="empUpdateModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title" id="myModalLabel">员工修改</h4>
	      </div>
	      
	      <div class="modal-body">
	        <form class="form-horizontal">
			  <div class="form-group">
			    <label for="empName_add_input" class="col-sm-2 control-label">empName</label>
			    <div class="col-sm-10">
			      <input type="text" name="empName" class="form-control" id="empName_update_input" placeholder="员工姓名">
			      <span class="help-block"></span>
			    </div>
			  </div>
			  
			  <div class="form-group">
			    <label for="email_add_input" class="col-sm-2 control-label">Email</label>
			    <div class="col-sm-10">
			      <input type="text" name="email" class="form-control" id="email_update_input" placeholder="员工邮箱">
			      <span class="help-block"></span>
			    </div>
			  </div>
			  
			  <div class="form-group">
			    <label for="gender_update_input" class="col-sm-2 control-label">Gender</label>
			    <div class="col-sm-10">
			      <label class="radio-inline">
				  	<input type="radio" name="gender" id="gender1_update_input" value="M" checked="checked"> 男
				  </label>
				  <label class="radio-inline">
				  	<input type="radio" name="gender" id="gender1_update_input" value="F"> 女
				  </label>
			    </div>
			  </div>
			  
			  <div class="form-group">
			    <label  class="col-sm-2 control-label">deptName</label>
			    <div class="col-sm-4">
					<select class="form-control" name="dId" id="dept_update_select">

					</select>
			    </div>
			  </div>
			</form>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
	        <button type="button" class="btn btn-primary" id="emp_update_btn">更新</button>
	      </div>
	    </div>
	  </div>
	</div>
	

	<!-- 员工添加的模态框 -->
	<div class="modal fade" id="empAddModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title" id="myModalLabel">员工添加</h4>
	      </div>
	      
	      <div class="modal-body">
	        <form class="form-horizontal">
			  <div class="form-group">
			    <label for="empName_add_input" class="col-sm-2 control-label">empName</label>
			    <div class="col-sm-10">
			      <input type="text" name="empName" class="form-control" id="empName_add_input" placeholder="员工姓名">
			      <span class="help-block"></span>
			    </div>
			  </div>
			  
			  <div class="form-group">
			    <label for="email_add_input" class="col-sm-2 control-label">Email</label>
			    <div class="col-sm-10">
			      <input type="text" name="email" class="form-control" id="email_add_input" placeholder="员工邮箱">
			      <span class="help-block"></span>
			    </div>
			  </div>
			  
			  <div class="form-group">
			    <label for="gender_add_input" class="col-sm-2 control-label">Gender</label>
			    <div class="col-sm-10">
			      <label class="radio-inline">
				  	<input type="radio" name="gender" id="gender1_add_input" value="M" checked="checked"> 男
				  </label>
				  <label class="radio-inline">
				  	<input type="radio" name="gender" id="gender1_add_input" value="F"> 女
				  </label>
			    </div>
			  </div>
			  
			  <div class="form-group">
			    <label  class="col-sm-2 control-label">deptName</label>
			    <div class="col-sm-4">
					<select class="form-control" name="dId" id="dept_add_select">

					</select>
			    </div>
			  </div>
			</form>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
	        <button type="button" class="btn btn-primary" id="emp_save_btn">保存</button>
	      </div>
	    </div>
	  </div>
	</div>
	
	<!-- 搭建显示list -->
	<div class = "container">
		<!-- 标题 -->
		<div class="row">
			<div class="col-md-12">
				<h1>SSM-CRUD</h1>
			</div>
		</div>
		<!-- 按钮 -->
		<div class = "row">
		  <div class="col-md-4 col-md-offset-8">
			<button type="button" class="btn btn-primary" id="emp_add_modal_btn">新增</button>
			<button type="button" class="btn btn-danger " id ="emp_delete_all_btn">删除</button>
		  </div>			
		</div>
		<!-- 列表 -->
		<div class = "row">
		  <div>
			<table class="table table-hover" id="emps_table">
				<thead>
				 	<tr>
				 		<th><input type="checkbox" id="check_all"></th>
				 		<th>#</th>
				 		<th>empName</th>
				 		<th>gender</th>
				 		<th>email</th>
				 		<th>dept</th>
				 		<th>操作</th>			 		
				 	</tr>
			 	</thead>
			 	<tbody>
				 	<tr>
				 		
				 	</tr>
			 	</tbody>
			</table>
		  </div>
		</div>
		<!-- 信息 -->
		<div class = "row">
			<!-- 分页文字信息 -->
			<div class="col-md-6" id="page_info_area">
				
			</div>
			<!-- 分页条信息 -->
			<div class="col-md-6" id="page_nav_area">
				
			</div>
		</div>
	</div>
	<script type="text/javascript" src="${APP_PATH}/static/js/index.js"></script>
</body>
</html>