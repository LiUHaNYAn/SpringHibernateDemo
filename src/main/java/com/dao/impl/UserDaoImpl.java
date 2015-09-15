package com.dao.impl;

import com.dao.interfaces.UserDao;
import com.domain.UserInfo;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

/**
 * Created by 20150831 on 2015/9/15.
 */
@Repository
public class UserDaoImpl implements UserDao {
    @Autowired
    private SessionFactory sessionFactory;
    @Override
    public void AddEntity(UserInfo model) {
sessionFactory.getCurrentSession().save(model);
    }

    @Override
    public void DeleteEntity(UserInfo model) {
        sessionFactory.getCurrentSession().delete(model);
    }

    @Override
    public void UpdateEntity(UserInfo model) {
        sessionFactory.getCurrentSession().update(model);
    }
}
