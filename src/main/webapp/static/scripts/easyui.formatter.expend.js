function easyui_formatterdate(value, row, index) {
    if (value) {
        if (value == "" || value == "undefined") {
            return "暂无";
        }
        if (value == "0001-01-01T00:00:00") {
            return "暂无";
        }
        if (value == "0001-01-01t00:00:00") {
            return "暂无";
        }
        var i = value.indexOf(".");
        if (i != -1) {
            value = value.substr(0, i);
        }

        return value.replace("t", " ").replace("T", " ");
        return value;
    } else {
        return "";
    }

}