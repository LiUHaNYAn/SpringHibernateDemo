package com.domain;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by 20150831 on 2015/9/17.
 */
public class ManagerGroup extends  IEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int groupid;
    @Column(name = "rolename", nullable = false, length = 50, columnDefinition = "varchar(50)", unique = true)
    private String rolename;
    @Column(name = "description", nullable = false, length = 150, columnDefinition = "varchar(150)",unique = false)
    private String description;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "createtime", nullable = false)
    private Date createtime;
    private int isdelete;

    public Date getCreatetime() {
        return createtime;
    }

    public void setCreatetime(Date createtime) {
        this.createtime = createtime;
    }

    public int getGroupid() {
        return groupid;
    }

    public void setGroupid(int groupid) {
        this.groupid = groupid;
    }

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

    public int getIsdelete() {
        return isdelete;
    }

    public void setIsdelete(int isdelete) {
        this.isdelete = isdelete;
    }
}
