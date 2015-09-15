package com.dao.core;

import com.domain.IEntity;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Created by 20150831 on 2015/9/15.
 */
public   interface BaseDao<T extends IEntity> {
    public void AddEntity(T model);
    public  void  DeleteEntity( T model);
    public  void  UpdateEntity( T model);
}
