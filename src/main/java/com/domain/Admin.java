package com.domain;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by 20150831 on 2015/9/16.
 */
@Entity
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private  int adminid;
    @Column(name = "adminname",nullable = false,length = 50,columnDefinition = "varchar(50)",unique = true)
    private String adminName;
    @Column(name = "password",nullable = false,length = 200,columnDefinition = "varchar(200)")
    private  String password;
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "createtime",nullable = false)
    private Date createTime;
    @ManyToOne(targetEntity = AdminGroup.class,fetch = FetchType.LAZY)
    @JoinColumn(name = "groupid",referencedColumnName = "groupid")
    private AdminGroup adminGroup;
    @Column(name = "telphone",nullable = false,length = 11,columnDefinition = "varchar(11)",unique = true)
    private  String telphone;
    @Column(name = "jobnumber",nullable = false,length = 10,columnDefinition = "varchar(10)",unique = true)
    private String jobnumber;
    @Column(name = "isdelete",nullable = false,columnDefinition = "default 0")
    private  int isdelete;

    public int getAdminid() {
        return adminid;
    }

    public void setAdminid(int adminid) {
        this.adminid = adminid;
    }

    public String getAdminName() {
        return adminName;
    }

    public void setAdminName(String adminName) {
        this.adminName = adminName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public AdminGroup getAdminGroup() {
        return adminGroup;
    }

    public void setAdminGroup(AdminGroup adminGroup) {
        this.adminGroup = adminGroup;
    }

    public String getTelphone() {
        return telphone;
    }

    public void setTelphone(String telphone) {
        this.telphone = telphone;
    }

    public String getJobnumber() {
        return jobnumber;
    }

    public void setJobnumber(String jobnumber) {
        this.jobnumber = jobnumber;
    }

    public int getIsdelete() {
        return isdelete;
    }

    public void setIsdelete(int isdelete) {
        this.isdelete = isdelete;
    }


}
