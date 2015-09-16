function edit(gridid, windowid, filed, url) {
    var row = $("#" + gridid).datagrid("getSelected");
    if (!row) {
        $.messager.alert('消息', '你没有选择数据', 'error');
        return;
    }
    $('#' + windowid).window('open');
    $('#' + windowid).window('refresh', url + row[filed]);
}

function grid(url, columns, searchformid) {
    if (searchformid != null && searchformid != "") {
        url += "?" + $("#" + searchformid).serialize();
    }
    $('#gdgrid').datagrid({
        url: url,
        method: 'post',
        pagination: true,
        rownumbers: true,
        fitColumns: true,
        singleSelect: true,
        pageList: [15, 30, 45, 60],
        pageSize: 15,
        columns: columns
    });
}
function ajaxdelete(t, f, indexid, gridid, handler) {
    var row = $("#" + gridid).datagrid("getSelected");
    if (!row) {
        $.messager.alert('消息', '你没有选择数据', 'error');
        return;
    }
    $.messager.confirm("提示", "你确定要执行此操作么？", function (r) {
        if (r) {
            var d = {"t": t, "f": f, "v": row[indexid]};
            $.post("/Ajax/Delete.ashx", d, function (data) {
                if (data.IsSuccess) {
                    $.messager.alert('消息', '操作成功！', 'info', function () {
                        handler();
                    });
                } else {
                    $.messager.alert('消息', data.Message, 'error');
                }
            }, "json");
        }
    });
}

function commondelete(url, gdgrid, indexid, handler) {
    var row = $("#" + gdgrid).datagrid("getSelected");
    if (!row) {
        $.messager.alert('消息', '你没有选择数据', 'error');
        return;
    }
    $.messager.confirm("提示", "你确定要执行此操作么？", function (r) {
        if (r) {
            var d = {"action": "delete", "id": row[indexid]};
            $.post(url, d, function (data) {
                if (data.IsSuccess) {
                    $.messager.alert('消息', '操作成功！', 'info', function () {
                        handler();
                    });
                } else {
                    $.messager.alert('消息', data.Message, 'error');
                }
            }, "json");
        }
    });
}


function initProvinceSelect(targetId, defaultvalue) {
    $.get("/Ajax/GetAllProvince.ashx", null, function (data) {
        var pro = "";
        pro += '<option value="">' + defaultvalue + '</option>';
        for (var i = 0; i < data.length; i++) {
            pro += '<option value=' + data[i].codeid + '>';
            pro += data[i].cityname;
            pro += '</option>';
        }
        $("#" + targetId).append(pro);

    }, "json");
}

function initProvinceSelectValue(targetId, defaultvalue, value) {
    $.get("/Ajax/GetAllProvince.ashx", null, function (data) {
        var pro = "";
        pro += '<option value="">' + defaultvalue + '</option>';
        for (var i = 0; i < data.length; i++) {
            pro += '<option value=' + data[i].codeid + '>';
            pro += data[i].cityname;
            pro += '</option>';
        }
        $("#" + targetId).append(pro);
        if (value != null && value != "") {
            $("#" + targetId).val($.trim(value));
        }
    }, "json");
}

function bindWindow() {
    $("[id$=window]").window({
        modal: true,
        collapsible: false,
        minimizable: false,
        maximizable: false,
        closed: true
    });
}

function inArray(needle, array, bool) {
    if (typeof needle == "string" || typeof needle == "number") {
        for (var i in array) {
            if (needle == array[i]) {
                if (bool) {
                    return i;
                }
                return true;
            }
        }
    }
    return false;
}

/* messager */
/* 显示验证时的错误消息 */
function showValidateMessage(message) {
    $.messager.show({
        title: '错误提示',
        msg: '<span style="color:red;">*' + message + '</span>',
        showType: 'fade',
        style: {
            right: '',
            top: document.body.scrollTop + document.documentElement.scrollTop,
            bottom: ''
        }
    });
}
/* 显示普通的警告信息 */
function showWarningMessage(message) {
    $.messager.show({
        title: '警告',
        msg: '<span style="color:red;">*' + message + '</span>',
        showType: 'fade',
        style: {
            right: '',
            top: document.body.scrollTop + document.documentElement.scrollTop,
            bottom: ''
        }
    });
}

/* function */
function stringToArray(str) {
    return str.split(',');
}

function arrayToString(arr) {
    return arr.join(',');
}

function arrayRemoveItem(arr, item) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == item) {
            arr.splice(i, 1);
            break;
        }
    }
}


/* upload */
function initWindow(path) {
    $("[id=filewin]").window({
        modal: true,
        collapsible: false,
        minimizable: false,
        maximizable: false,
        closed: true,
        width: 600,
        height: 500,
        title: "上传图片"
    });
}

