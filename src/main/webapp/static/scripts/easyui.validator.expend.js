//常用验证方式扩展
$.extend($.fn.validatebox.defaults.rules, {
    gtzero: {
        validator: function (value, param) {
            return /^\d+/.test(value) && value > 0;
        },
        message: '请输入大于0的数字。'
    },
    num: {
        validator: function (value, param) {
            value = Math.abs(value);
            return /^\d+/.test(value);
        },
        message: '请输入数字。'
    },
    pnum: {
        validator: function (value, param) {
            return /^\d+$/.test(value);
        },
        message: '请输入整正数。'
    },
    chs: {
        validator: function (value, param) {
            return /^[\u0391-\uFFE5]+$/.test(value);
        },
        message: '请输入汉字。'
    },
    chname: {
        validator: function (value, param) {
            return /^[赵钱孙李周吴郑王冯陈褚卫蒋沈韩杨朱秦尤许何吕施张孔曹严华金魏陶姜戚谢邹喻柏水窦章云苏潘葛奚范彭郎鲁韦昌马苗凤花方俞任袁柳酆鲍史唐费廉岑薛雷贺倪汤滕殷罗毕郝邬安常乐于时傅皮卞齐康伍余元卜顾孟平黄和穆萧尹姚邵湛汪祁毛禹狄米贝明臧计伏成戴谈宋茅庞熊纪舒屈项祝董梁杜阮蓝闵席季麻强贾路娄危江童颜郭梅盛林刁钟徐邱骆高夏蔡田樊胡凌霍虞万支柯昝管卢莫柯房裘缪干解应宗丁宣贲邓郁单杭洪包诸左石崔吉钮龚程嵇邢滑裴陆荣翁荀羊于惠甄曲家封芮羿储靳汲邴糜松井段富巫乌焦巴弓牧隗山谷车侯宓蓬全郗班仰秋仲伊宫宁仇栾暴甘钭历戎祖武符刘景詹束龙叶幸司韶郜黎蓟溥印宿白怀蒲邰从鄂索咸籍赖卓蔺屠蒙池乔阳郁胥能苍双闻莘党翟谭贡劳逄姬申扶堵冉宰郦雍却璩桑桂濮牛寿通边扈燕冀浦尚农温别庄晏柴瞿阎充慕连茹习宦艾鱼容向古易慎戈廖庾终暨居衡步都耿满弘匡国文寇广禄阙东欧殳沃利蔚越夔隆师巩厍聂晁勾敖融冷訾辛阚那简饶空曾毋沙乜养鞠须丰巢关蒯相查后荆红游竺权逮盍益桓公上赫皇澹淳太轩令宇长盖况闫].{1,5}$/.test(value);
        },
        message: '请输入正确中文名。'
    },
    enname: {
        validator: function (value, param) {
            var len = $.trim(value).length;
            return /^\w+[\w\s]+\w+$/.test(value) && len >= 2 && len <= 20;
        },
        message: '请输入正确英文名。'
    },
    name: {
        validator: function (value, param) {
            var ch = /^[赵钱孙李周吴郑王冯陈褚卫蒋沈韩杨朱秦尤许何吕施张孔曹严华金魏陶姜戚谢邹喻柏水窦章云苏潘葛奚范彭郎鲁韦昌马苗凤花方俞任袁柳酆鲍史唐费廉岑薛雷贺倪汤滕殷罗毕郝邬安常乐于时傅皮卞齐康伍余元卜顾孟平黄和穆萧尹姚邵湛汪祁毛禹狄米贝明臧计伏成戴谈宋茅庞熊纪舒屈项祝董梁杜阮蓝闵席季麻强贾路娄危江童颜郭梅盛林刁钟徐邱骆高夏蔡田樊胡凌霍虞万支柯昝管卢莫柯房裘缪干解应宗丁宣贲邓郁单杭洪包诸左石崔吉钮龚程嵇邢滑裴陆荣翁荀羊于惠甄曲家封芮羿储靳汲邴糜松井段富巫乌焦巴弓牧隗山谷车侯宓蓬全郗班仰秋仲伊宫宁仇栾暴甘钭历戎祖武符刘景詹束龙叶幸司韶郜黎蓟溥印宿白怀蒲邰从鄂索咸籍赖卓蔺屠蒙池乔阳郁胥能苍双闻莘党翟谭贡劳逄姬申扶堵冉宰郦雍却璩桑桂濮牛寿通边扈燕冀浦尚农温别庄晏柴瞿阎充慕连茹习宦艾鱼容向古易慎戈廖庾终暨居衡步都耿满弘匡国文寇广禄阙东欧殳沃利蔚越夔隆师巩厍聂晁勾敖融冷訾辛阚那简饶空曾毋沙乜养鞠须丰巢关蒯相查后荆红游竺权逮盍益桓公上赫皇澹淳太轩令宇长盖况闫].{1,5}$/.test(value);
            var en = /^\w+[\w\s]+\w+$/.test(value);
            return ch | en;
        },
        message: '请输入正确中文名或英文名。'
    },
    zip: {
        validator: function (value, param) {
            return /^[1-9]\d{5}$/.test(value);
        },
        message: '请输入正确的邮政编码。'
    },
    tel: {
        validator: function (value, param) {
            return /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$|(^((\(\d{2,3}\))|(\d{3}\-))?(13|14|15|18)\d{9}$)/.test(value);
        },
        message: '请输入正确的固定电话或手机号码。'
    },
    phone: {
        validator: function (value, param) {
            return /^[-0-9]{11,16}$/.test(value);
        },
        message: '请输入正确的固定电话号码。'
    },
    mobile: {
        validator: function (value, param) {
            return /^((\(\d{2,3}\))|(\d{3}\-))?(13|14|15|18)\d{9}$/.test(value);
        },
        message: '请输入正确的手机号码。'
    },
    equalTo: {
        validator: function (value, param) {
            var oldval = $("#" + param[0]).val();
            return value == oldval;
        },
        message: '两次输入的内容不一致，请重新输入。'
    },
    en: {
        validator: function (value, param) {
            var p = /^[a-zA-Z\s()]+$/;
            return p.test(value);
        },
        message: '请输入英文字母。'
    }
});