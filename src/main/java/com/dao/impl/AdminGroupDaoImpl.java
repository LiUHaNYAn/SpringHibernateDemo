package com.dao.impl;

import com.dao.interfaces.AdminGroupDao;
import com.domain.AdminGroup;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by 20150831 on 2015/9/16.
 */
@Repository
public class AdminGroupDaoImpl implements AdminGroupDao {
    @Autowired
    private SessionFactory factory;

    @Override
    public List<AdminGroup> GetList(String rolename) {
        return factory.getCurrentSession().createQuery("from AdminGroup as ag where ag.rolename=:rolename").setParameter("rolename", rolename).list();
    }

    @Override
    public boolean IsExists(String rolename) {
        return factory.getCurrentSession().createQuery("from AdminGroup as ag where ag.rolename=:rolename").setParameter("rolename", rolename).list().size() > 0;
    }

    @Override
    public void AddEntity(AdminGroup model) {
        factory.getCurrentSession().save(model);
    }

    @Override
    public void DeleteEntity(AdminGroup model) {
        factory.getCurrentSession().delete(model);
    }

    @Override
    public void UpdateEntity(AdminGroup model) {
        factory.getCurrentSession().update(model);
    }
}
