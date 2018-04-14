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
			<button type="button" class="btn btn-primary">（首选项）Primary</button>
			<button type="button" class="btn btn-danger">（危险）Danger</button>
		  </div>			
		</div>
		<!-- 列表 -->
		<div class = "row">
		  <div>
			<table class="table table-hover">
			 	<tr>
			 		<th>#</th>
			 		<th>empName</th>
			 		<th>gender</th>
			 		<th>email</th>
			 		<th>dept</th>
			 		<th>操作</th>			 		
			 	</tr>
			 	<c:forEach items="${pageInfo.list }" var="emp">
			 	<tr>
			 		<td>${emp.empId }</td>
			 		<td>${emp.empName }</td>
			 		<td>${emp.gender=="M"?"男":"女" }</td>
			 		<td>${emp.email }</td>
			 		<td>${emp.dId }</td>
			 		<td>
			 			<button type="button" class="btn btn-default btn-sm" aria-label="Left Align">
  							<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
  							编辑
						</button>
			 			<button type="button" class="btn btn-default btn-sm" aria-label="Left Align">
  							<span class="glyphicon glyphicon-trash " aria-hidden="true"></span>
  							删除
						</button>
			 		</td>
			 		</c:forEach>
			 	</tr>
			</table>
		  </div>
		</div>
		<!-- 信息 -->
		<div class = "row">
			<!-- 分页文字信息 -->
			<div class="col-md-6">
				当前${ pageInfo.pageNum }页 ,总${pageInfo.pages }页,总${ pageInfo.total }条记录
			</div>
			<!-- 分页条信息 -->
			<div class="col-md-6">
				<nav aria-label="Page navigation">
				  <ul class="pagination">
				  <li><a href="${APP_PATH}/emps?pn=1">首页</a></li>
				  <c:if test="${pageInfo.hasPreviousPage }">				  	
				    <li>
				      <a href="${APP_PATH}/emps?pn=${pageInfo.pageNum-1 }" aria-label="Previous">
				        <span aria-hidden="true">&laquo;</span>
				      </a>
				    </li>
				  </c:if>
				    <c:forEach items="${ pageInfo.navigatepageNums }" var="page_Num">
				    	<c:if test="${page_Num==pageInfo.pageNum }">
				    		<li class="active"><a href="#">${page_Num }</a></li>
				    	</c:if>
				    	<c:if test="${page_Num!=pageInfo.pageNum }">
				    		<li ><a href="${APP_PATH}/emps?pn=${page_Num }">${page_Num }</a></li>
				    	</c:if>
				    	
				    </c:forEach>
					<c:if test="${pageInfo.hasNextPage }">
					    <li>
					      <a href="${APP_PATH}/emps?pn=${pageInfo.pageNum+1 }" aria-label="Next">
					        <span aria-hidden="true">&raquo;</span>
					      </a>
					    </li>
					   
				    </c:if>
				     	<li><a href="${APP_PATH}/emps?pn=${pageInfo.pages}">末页</li>
				  </ul>
				</nav>
			</div>
		</div>
	</div>
	
</body>
</html>