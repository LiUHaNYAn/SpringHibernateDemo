window.onload = function () {
    $("#loading-mask").fadeOut()
};
var onlyOpenTitle = "系统首页";
$(function () {
    InitLeftMenu();
    tabClose();
    tabCloseEven()
});
function InitLeftMenu() {
    $("#nav").accordion({animate: false, fit: true, border: false});
    var a = "";
    $.each(_menus.menus, function (b, d) {
        var c = "";
        c += '<ul class="navlist">';
        $.each(d.menus, function (e, f) {
            c += '<li><div ><a ref="' + f.menuid + '" href="#" rel="' + f.url + '" ><span class="icon ' + f.icon + '" >&nbsp;</span><span class="nav">' + f.menuname + "</span></a></div> ";
            if (f.menus && f.menus.length > 0) {
                c += '<ul class="third_ul">';
                $.each(f.menus, function (g, h) {
                    c += '<li><div><a ref="' + h.menuid + '" href="#" rel="' + h.url + '" ><span class="icon ' + h.icon + '" >&nbsp;</span><span class="nav">' + h.menuname + "</span></a></div> </li>"
                });
                c += "</ul>"
            }
            c += "</li>"
        });
        c += "</ul>";
        $("#nav").accordion("add", {title: d.menuname, content: c, border: false, iconCls: "icon " + d.icon});
        if (b == 0) {
            a = d.menuname
        }
    });
    $("#nav").accordion("select", a);
    $(".navlist li a").click(function () {
        var d = $(this).children(".nav").text();
        var g = $(this).attr("rel");
        var c = $(this).attr("ref");
        var b = $(this).find(".icon").attr("class");
        var e = find(c);
        if (e && e.menus && e.menus.length > 0) {
            $(".third_ul").slideUp();
            var f = $(this).parent().next();
            if (f.is(":hidden")) {
                f.slideDown()
            } else {
                f.slideUp()
            }
        } else {
            addTab(d, g, b);
            $(".navlist li div").removeClass("selected");
            $(this).parent().addClass("selected")
        }
    }).hover(function () {
        $(this).parent().addClass("hover")
    }, function () {
        $(this).parent().removeClass("hover")
    })
}
function getIcon(b) {
    var a = "icon ";
    $.each(_menus.menus, function (c, d) {
        $.each(d.menus, function (e, f) {
            if (f.menuid == b) {
                a += f.icon
            }
        })
    });
    return a
}
function find(a) {
    var b = null;
    $.each(_menus.menus, function (c, d) {
        $.each(d.menus, function (e, f) {
            if (f.menuid == a) {
                b = f
            }
        })
    });
    return b
}
function addTab(b, c, a) {
    if (!$("#tabs").tabs("exists", b)) {
        $("#tabs").tabs("add", {title: b, content: createFrame(c), closable: true, icon: a})
    } else {
        $("#tabs").tabs("select", b);
        $("#mm-tabupdate").click()
    }
    tabClose()
}
function createFrame(b) {
    var a = '<iframe scrolling="auto" frameborder="0"  src="' + b + '" style="width:100%;height:100%;"></iframe>';
    return a
}
function tabClose() {
    $(".tabs-inner").dblclick(function () {
        var a = $(this).children(".tabs-closable").text();
        $("#tabs").tabs("close", a)
    });
    $(".tabs-inner").bind("contextmenu", function (a) {
        $("#mm").menu("show", {left: a.pageX, top: a.pageY});
        var b = $(this).children(".tabs-closable").text();
        $("#mm").data("currtab", b);
        $("#tabs").tabs("select", b);
        return false
    })
}
function tabCloseEven() {
    $("#mm").menu({
        onClick: function (a) {
            closeTab(a.id)
        }
    });
    return false
}
function closeTab(a) {
    var b = $("#tabs").tabs("tabs");
    var d = $("#tabs").tabs("getSelected");
    var c = [];
    $.each(b, function (j, k) {
        c.push($(k).panel("options").title)
    });
    switch (a) {
        case "tabupdate":
            var h = $("#tabs").tabs("getTabIndex", d);
            if (h == 0) {
                return false
            }
            var f = $(d.panel("options").content);
            var g = f.attr("src");
            $("#tabs").tabs("update", {tab: d, options: {content: createFrame(g)}});
            break;
        case "refresh":
            var f = $(d.panel("options").content);
            var g = f.attr("src");
            $("#tabs").tabs("update", {tab: d, options: {content: createFrame(g)}});
            break;
        case "close":
            var h = $("#tabs").tabs("getTabIndex", d);
            if (h == 0) {
                return false
            }
            var e = d.panel("options").title;
            $("#tabs").tabs("close", e);
            break;
        case "closeall":
            $.each(c, function (j, k) {
                if (k != onlyOpenTitle) {
                    $("#tabs").tabs("close", k)
                }
            });
            break;
        case "closeother":
            var e = d.panel("options").title;
            $.each(c, function (j, k) {
                if (k != e && k != onlyOpenTitle) {
                    $("#tabs").tabs("close", k)
                }
            });
            break;
        case "closeright":
            var h = $("#tabs").tabs("getTabIndex", d);
            if (h == b.length - 1) {
                return false
            }
            $.each(c, function (j, k) {
                if (j > h) {
                    if (k != onlyOpenTitle) {
                        $("#tabs").tabs("close", k)
                    }
                }
            });
            break;
        case "closeleft":
            var h = $("#tabs").tabs("getTabIndex", d);
            if (h == 1) {
                return false
            }
            $.each(c, function (j, k) {
                if (j < h) {
                    if (k != onlyOpenTitle) {
                        $("#tabs").tabs("close", k)
                    }
                }
            });
            break;
        case "exit":
            $("#closeMenu").menu("hide");
            break
    }
}
function msgShow(c, a, b) {
    $.messager.alert(c, a, b)
}
function closeCurtAndOpenNew(c, d, b) {
    var a = $("li.tabs-selected span.tabs-title").text();
    $("#tabs").tabs("close", c);
    addTab(c, d, b);
    $("#tabs").tabs("close", a)
};