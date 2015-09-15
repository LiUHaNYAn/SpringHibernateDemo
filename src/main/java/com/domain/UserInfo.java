package com.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import  javax.persistence.Id;
/**
 * Created by 20150831 on 2015/9/15.
 */
@Entity
public class UserInfo extends IEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private  int Id;
    private String UserName;
    private  String Password;

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
}
