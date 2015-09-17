package com.common;

/**
 * Created by 20150831 on 2015/9/16.
 */
public class ServiceResult {
    private ResultCode resultcode;
    private String msg;
    private Object data;

    public ResultCode getResultcode() {
        return resultcode;
    }

    public void setResultcode(ResultCode resultcode) {
        this.resultcode = resultcode;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
