package com.dto;

/**
 * Created by 20150831 on 2015/9/16.
 */
public class ManagerGroupAddDto extends BaseDto {
    private String rolename;
    private String description;

    public String getRolename() {
        return rolename;
    }

    public void setRolename(String rolename) {
        this.rolename = rolename;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
