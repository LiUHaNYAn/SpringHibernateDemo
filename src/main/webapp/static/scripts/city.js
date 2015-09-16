function initCitySelect(targetId, defaultvalue, pid, value) {
    $.get("/Ajax/GetCitys.ashx", {"pid": pid}, function (data) {
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

function citySelectChange(actionSelect, targetSelect, targetSelect1, defaultvalue) {
    $("#" + actionSelect).change(function () {
        var pid = $(this).val();
        if (pid != "") {
            $.get("/Ajax/GetCitys.ashx", {"pid": pid}, function (data) {
                $("#" + targetSelect).empty();
                $("#" + targetSelect).append('<option value="">' + defaultvalue + '</option>');
                if (targetSelect1 != null || targetSelect1 == "") {
                    $("#" + targetSelect1).empty();
                    $("#" + targetSelect1).append('<option value="">' + defaultvalue + '</option>');
                }
                var pro = "";
                for (var i = 0; i < data.length; i++) {
                    pro += '<option value=' + data[i].codeid + '>';
                    pro += data[i].cityname;
                    pro += '</option>';
                }
                $("#" + targetSelect).append(pro);
            }, "json");
        } else {
            $("#" + targetSelect).empty();
            $("#" + targetSelect).append('<option value="">' + defaultvalue + '</option>');
            if (targetSelect1 != null || targetSelect1 == "") {
                $("#" + targetSelect1).empty();
                $("#" + targetSelect1).append('<option value="">' + defaultvalue + '</option>');
            }
        }
    });
}