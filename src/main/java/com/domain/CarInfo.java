package com.domain;


import javax.persistence.*;

/**
 * Created by 20150831 on 2015/9/16.
 */
@Entity
public class CarInfo extends IEntity {
    @javax.persistence.Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int Id;
    @Column(nullable = false,unique = true,length = 20,columnDefinition = "varchar(20)",name = "username")
    private String CarNo;
    public String getCarNo() {
        return CarNo;
    }

    public void setCarNo(String carNo) {
        CarNo = carNo;
    }

    public int getId() {
        return Id;
    }

    public void setId(int id) {
        Id = id;
    }


}
