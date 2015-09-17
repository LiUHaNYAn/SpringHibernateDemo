package com.common;

/**
 * Created by 20150831 on 2015/9/17.
 */
public enum ResultCode {
    Success("成功", 0), Fail("失败", -1), UserExists("用户已经存在", -2);
    private String name;
    private int index;
    private ResultCode(String name, int index) {
        this.name = name;
        this.index = index;
    }

    // 普通方法
    public static String getName(int index) {
        for (ResultCode c : ResultCode.values()) {
            if (c.getIndex() == index) {
                return c.name;
            }
        }
        return null;
    }

    // get set 方法
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getIndex() {
        return index;
    }

    public void setIndex(int index) {
        this.index = index;
    }
}
