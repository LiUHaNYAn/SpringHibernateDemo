package com.domain;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by 20150831 on 2015/9/15.
 */
@Entity
public class UserInfo extends IEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int Id;
    @Column(nullable = false,unique = true,length = 20,columnDefinition = "varchar(20)",name = "username")
    private String UserName;
    @Column(nullable = false,unique = false,length = 200,columnDefinition = "varchar(200)",name = "password")
    private String Password;
    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false,unique = false,name = "createtime")
    private Date createtime;

    public int getId() {
        return Id;
    }

    public void setId(int id) {
        Id = id;
    }

    public String getUserName() {
        return UserName;
    }

    public void setUserName(String userName) {
        UserName = userName;
    }

    public String getPassword() {
        return Password;
    }

    public void setPassword(String password) {
        Password = password;
    }

    public Date getCreatetime() {
        return createtime;
    }

    public void setCreatetime(Date createtime) {
        this.createtime = createtime;
    }
}
