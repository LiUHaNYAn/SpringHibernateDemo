<%--
  Created by IntelliJ IDEA.
  User: 20150831
  Date: 2015/9/22
  Time: 11:24
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title></title>
</head>
<body>
<div style="padding: 5px;">
  <form id="addForm">
    <input type="hidden" id="action" name="action" value="add" />
    <table class="adm_8" border="0" cellpadding="0" cellspacing="0" width="98%">

      <tr>
        <td class="adm_45" align="right" height="30" width="30%">
          <span class="field-validation-valid">*</span>角色名称：
        </td>
        <td class="adm_42" width="70%" colspan="3">
          <input class="adm_21" id="rolename" name="rolename" type="text" />
        </td>
      </tr>
      <tr>
        <td class="adm_45" align="right" height="30" width="30%">
          <span class="field-validation-valid">*</span>角色描述：
        </td>
        <td class="adm_42" width="70%" colspan="3">
          <textarea id="description" rows="5" cols="40" name="description" ></textarea>
        </td>
      </tr>


    </table>
  </form>
  <p style="text-align: center;">
    <a class="easyui-linkbutton" href="javascript:onAddSubmit()">确认提交</a> <a class="easyui-linkbutton"
                                                                             href="javascript:onClose()">取消</a>
  </p>
</div>
</body>
</html>
