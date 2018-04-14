var totolRecord,currentPage;
		//1.加载完成后，直接发送一个ajax请求，要分页到数据
		$(function(){
			to_page(1);
		});
		function to_page(pn){
			$.ajax({
				url:"emps",
				data:"pn="+pn,
				type:"GET",
				success:function(result){
					 //console.log(result);
					//1.解析并显示数据
					build_emps_table(result);
					//2.解析并显示分页信息
					build_page_info(result);
					//3.解析显示分页条
					build_page_nav(result);
					
				}
			})
		}
		//显示table
		function build_emps_table(result){
			$("#emps_table tbody").empty();
			var emps=result.extend.pageInfo.list;
			$.each(emps,function(index,item){
				/* 创建tr元素 */
				var checkBoxTd = $("<td><input type='checkbox' class='check_item'/></td>");
				var empIdTd = $("<td></td>").append(item.empId);
				var empNameTd = $("<td></td>").append(item.empName);
				var empGenderTd = $("<td></td>").append(item.gender=="M"?"男":"女");
				var empEmailTd = $("<td></td>").append(item.email);
				var empDeptNameTd = $("<td></td>").append(item.department.deptName);
				/* 		
					<button type="button" class="btn btn-default btn-sm" aria-label="Left Align">
 							<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
 							编辑
					</button> 
  				*/
				
				var editBtn=$("<button></button>").addClass("btn btn-default btn-sm edit_btn")
				.append($("<span></span>").addClass("glyphicon glyphicon-pencil")).append("编辑");
  				/* 增加id属性 */
  				editBtn.attr("edit-id",item.empId);
				var delBtn=$("<button></button>").addClass("btn btn-danger btn-sm delete_btn")
				.append($("<span></span>").addClass("glyphicon glyphicon-trash")).append("删除");
				delBtn.attr("del-id",item.empId);
				var btnTd=$("<td></td>").append(editBtn).append(" ").append(delBtn);
				//append方法还是返回原来的元素
				$("<tr></tr>").append(checkBoxTd)
				.append(empIdTd)
				.append(empNameTd)
				.append(empGenderTd)
				.append(empEmailTd)
				.append(empDeptNameTd)
				.append(btnTd)
				.appendTo("#emps_table tbody");
			})
		}

		
		//解析显示分页信息
		function build_page_info(result){
			$("#page_info_area").empty();
			$("#page_info_area").append("当前"+result.extend.pageInfo.pageNum+"页 ,总"+
					result.extend.pageInfo.pages+"页,总"+
					result.extend.pageInfo.total+"条记录");
			totolRecord=result.extend.pageInfo.total;
			currentPage = result.extend.pageInfo.pageNum;
		}
		//解析显示分页条,点击分页去下一页
		function build_page_nav(result){
			$("#page_nav_area").empty();
			//构建元素
			var ul=$("<ul></ul>").addClass("pagination");
			var firstPageLi=$("<li></li>").append($("<a></a>").append("首页").attr("href","#"));
			var prePageLi=$("<li></li>").append($("<a></a>").append("&laquo;"));
			if(!result.extend.pageInfo.hasPreviousPage){
				firstPageLi.addClass("disabled");
				prePageLi.addClass("disabled");
			}else{
				//为元素添加点击翻页事件
				/* 首页 */
				firstPageLi.click(function(){
					to_page(1);
				});
				/* 前一页 */
				prePageLi.click(function(){
					to_page(result.extend.pageInfo.pageNum-1);
				});
				
			}
			var nextPageLi=$("<li></li>").append($("<a></a>").append("&raquo;"));			
			var lastPageLi=$("<li></li>").append($("<a></a>").append("末页").attr("href","#"));
			if(!result.extend.pageInfo.hasNextPage){
				nextPageLi.addClass("disabled");
				lastPageLi.addClass("disabled");
			}else{
				nextPageLi.click(function(){
					to_page(result.extend.pageInfo.pageNum+1);
				});
				
				lastPageLi.click(function(){
					to_page(result.extend.pageInfo.pages);
				});
			};
			
			ul.append(firstPageLi).append(prePageLi);
			//item 1,2,3,4,5
			$.each(result.extend.pageInfo.navigatepageNums,function(index,item){
				var numLi=$("<li></li>").append($("<a></a>").append(item));
				if(result.extend.pageInfo.pageNum == item){
					numLi.addClass("active");
				}
				numLi.click(function(){
					to_page(item);
				})
				ul.append(numLi);
			});
			//添加下一页和末页提示
			ul.append(nextPageLi).append(lastPageLi);
			//把ul加入到nav中
			var navEle=$("<nav></nav>").append(ul);
			//添加到导航条
			navEle.appendTo("#page_nav_area");
	
		}
		
		
		//点击新增按钮弹出模态框
		$("#emp_add_modal_btn").click(function(){
			//清除表单数据重置(数据+样式)
			//$("#empAddModal form")[0].reset();
			reset_form("#empAddModal form");
			//发送ajax请求，获取deptName
			getDepts("#dept_add_select");	
			$("#empAddModal").modal({
				backdrop:"static"
			});
		})
		function reset_form(ele){
			//数据清除
			$(ele)[0].reset();
			//样式
			$(ele).find("*").removeClass("has-error has-success");
			$(ele).find(".help-block").text("");
		}
		function getDepts(ele){
			//清空下拉列表的值
			$(ele).empty();
			$.ajax({
				url:"depts",
				type:"GET",
				success:function(result){
					$.each(result.extend.depts,function(index,item){
						var optionEle=$("<option></option>").append(item.deptName).attr("value",this.deptId);
						$(ele).append(optionEle);
					});
				}
			})
		}
		
		function validate_add_form(){
			//1.拿到要校验的数据，使用正则表达式
			/*------------Name-----------------*/
			var empName = $("#empName_add_input").val();
			//2.正则表达式
			var regName =  /(^[A-Za-z0-9]{6,16}$)|(^[\u2E80-\u9FFF]{2,5}$)/;
			//alert(regName.test(empName));
			if(!regName.test(empName)){
				//清空这个元素之前的样式
				show_validate_msg("#empName_add_input","error","名字必须是2-5个中文或者6-16位英文数字组合")
				//alert("用户名可以是2-5位中文，或者6-16位英文和数字的集合")				
				return false;
			}else{
				show_validate_msg("#empName_add_input","success","")
			}
			/*------------email-----------------*/
			var email = $("#email_add_input").val();
			//alert(email);
			var regEmail = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
			if (!regEmail.test(email)) {
				show_validate_msg("#email_add_input","error","邮箱格式不正确");
				return false;
			}else{
				show_validate_msg("#email_add_input","success","");
			}
			return true;
			
			
		}
		
		function show_validate_msg(ele,status,msg){
			//清除状态
			$(ele).parent().removeClass("has-success has-error");
			$(ele).next("span").text("");
			
			if("success"==status){
				$(ele).parent().addClass("has-success");
				$(ele).next("span").text(msg);
			}else{
				$(ele).parent().addClass("has-error");
				$(ele).next("span").text(msg);
				 
			}
			}
		
		/* 检测用户名是否可用 */
		$("#empName_add_input").change(function(){
			//发送ajax请求是否可用
			var empName = this.value;
			$.ajax({
				url:"checkUser",
				data:"empName="+empName,
				type:"POST",
				success:function(result){
					if(result.code==100){
						show_validate_msg
						show_validate_msg("#empName_add_input","success","");
						$("#emp_save_btn").attr("ajax-va","success");
					}else{
						show_validate_msg("#empName_add_input","error",result.extend.va_msg);
						$("#emp_save_btn").attr("ajax-va","error");
					}
				}
			})
		})
		/* 新增保存的ajax put请求 */
		$("#emp_save_btn").click(function(){
			//1.模态框中填写的表单数据提交给服务器进行保存
			//2.进行校验
		    if(!validate_add_form()){
				return false;
			} 
			//1.之前的ajax用户名校验是否成功
			if($(this).attr("ajax-va")=="error"){
				return false;
			}
			//2.发送ajax请求保存员工	
			
			$.ajax({
				url:"emp",
				type:"POST",
				data:$("#empAddModal form" ).serialize(),
				success:function(result){
					//alert(result.msg);
					if(result.code=="100"){
						//1.关闭模态框
						$("#empAddModal").modal("hide");
						//2.最后一页，显示保存的数据
						//发送ajax请求显示最后行结果
						//总记录数
						to_page(totolRecord);
					}else{
						//显示失败信息
						console.log(result);
						if(undefined!=result.extend.errorFields.email){
							//显示邮箱错误信息
							show_validate_msg("#email_add_input","error",result.extend.errorFields.email)
						}
						if(undefined!=result.extend.errorFields.empName){
							//显示邮箱错误信息
							show_validate_msg("#emp_add_input","error",result.extend.errorFields.empName)
						}
					}

				}
			}) 
		})
		
		//1.按钮创建之前就绑定了，
		//创建按钮的时候绑定事件
		//绑定单击live,新的jquery没有live，用on方法
		$(document).on("click",".edit_btn",function(){
			
			//1.查询员工信息，显示员工信息
			getDepts("#empUpdateModal select");			
			getEmp($(this).attr("edit-id"));
			//2.把员工id传递给更新按键的属性
			$("#emp_update_btn").attr("edit-id",$(this).attr("edit-id"));
			
			$("#empUpdateModal").modal({
				backdrop:"static"
			})
			
		})
		
		//查询员工信息，显示员工信息
		function getEmp(id){
			$.ajax({
				url:"emp/"+id,
				type:"GET",
				success:function(result){
					//将请求得到的信息回显到参数标签中
					var empData = result.extend.emp;
					$("#empName_update_input").val(empData.empName);
					$("#email_update_input").val(empData.email);
					$("#empUpdateModal input[name=gender]").val([empData.gender]);
					$("#empUpdateModal select").val([empData.dId]);	
				}
				
			});
		};
		/* 点击更新员工 */
		$("#emp_update_btn").click(function(){
			//1.验证邮箱是否违法
			/*------------email-----------------*/
			var email = $("#email_update_input").val();
			//alert(email);
			var regEmail = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
			if (!regEmail.test(email)) {
				show_validate_msg("#email_update_input","error","邮箱格式不正确");
				return false;
			}else{
				show_validate_msg("#email_update_input","success","");
			}
			
			//2.发送ajax请求
 			$.ajax({
				url:"emp/"+$(this).attr("edit-id"),
				type:"POST",
				data:$("#empUpdateModal form").serialize()+"&_method=PUT",
				success:function(result){
					$("#empUpdateModal").modal("hide");
					to_page(currentPage);
				}
			}); 
		});
		
		/* 列表单个删除 */
		$(document).on("click",".delete_btn",function(){
			//1.获取员工姓名
			var empName=$(this).parents("tr").find("td:eq(2)").text();
			//2、获取删除的id
			var empId = $(this).attr("del-id");
			
			if(confirm("确认删除【"+empName+"】")){
				//确认，发送ajax请求删除
				$.ajax({
					url:"emp/"+empId,
					type:"DELETE",
					success:function(result){
						to_page(currentPage);
					}
				});
			}
			
		});
		/* checkall全选全不选 */
		$("#check_all").click(function(){
			//attr获取checked是undefined,原生的属性：prop 自定义：attr
			//alert($(this).prop("checked"));
			$(".check_item").attr("checked",$(this).prop("checked"))
		})
		//check_item
		$(document).on("click",".check_item",function(){
			//判断当前选择中的元素是否为5个
			var flag = $(".check_item:checked").length==$(".check_item").length;
			$("#check_all").prop("checked",flag);			
		});
		
		//点击全部删除，就批量删除
		$("#emp_delete_all_btn").click(function(){
			 //$(".check_item:checked")
			 var empNames=""
			 var del_idstr=""
			 $.each($(".check_item:checked"),function(){
				 empNames += $(this).parents("tr").find("td:eq(2)").text()+",";
				 del_idstr += $(this).parents("tr").find("td:eq(1)").text()+"-";
			 })
			 empNames = empNames.substring(0,empNames.length-1);
			 del_idstr = del_idstr.substring(0,del_idstr.length-1);
			 if(confirm("确认删除【"+empNames+"】")){
				 //发送ajax请求
				 $.ajax({
					 url:"emp/"+del_idstr,
					 type:"DELETE",
					 success:function(result){
						 to_page(currentPage);
					 }
				 })
			 }
		})