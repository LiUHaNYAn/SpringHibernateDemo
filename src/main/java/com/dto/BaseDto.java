package com.dto;

/**
 * Created by 20150831 on 2015/9/16.
 */
public abstract class BaseDto {
    private  String noncestr;
    private  String timestamp;
    private  String sign;

    public String getNoncestr() {
        return noncestr;
    }

    public void setNoncestr(String noncestr) {
        this.noncestr = noncestr;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public String getSign() {
        return sign;
    }

    public void setSign(String sign) {
        this.sign = sign;
    }
}
