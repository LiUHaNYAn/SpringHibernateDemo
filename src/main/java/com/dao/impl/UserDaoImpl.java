package com.dao.impl;

import com.dao.interfaces.UserDao;
import com.domain.UserInfo;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Created by 20150831 on 2015/9/15.
 */
public class UserDaoImpl implements UserDao {
    @Autowired
    private SessionFactory sessionFactory;
    @Override
    public void AddEntity(UserInfo model) {
sessionFactory.openSession().save(model);
    }

    @Override
    public void DeleteEntity(UserInfo model) {
        sessionFactory.openSession().delete(model);
    }

    @Override
    public void UpdateEntity(UserInfo model) {
        sessionFactory.openSession().update(model);
    }
}
