package com.dao.impl;

import com.dao.interfaces.ManagerGroupDao;
import com.domain.ManagerGroup;
import org.hibernate.SessionFactory;
import org.hibernate.envers.Audited;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by 20150831 on 2015/9/17.
 */
@Repository
public class ManagerGroupDaoImpl extends DaoImplBase implements ManagerGroupDao {

    @Override
    public void AddEntity(ManagerGroup model) {
        this.getSessionFactory().getCurrentSession().save(model);
    }

    @Override
    public void DeleteEntity(ManagerGroup model) {
        this.getSessionFactory().getCurrentSession().delete(model);
    }

    @Override
    public void UpdateEntity(ManagerGroup model) {
        this.getSessionFactory().getCurrentSession().update(model);
    }

    @Override
    public boolean IsExists(String roleName) {
        return this.getSessionFactory().getCurrentSession().createQuery("from ManagerGroup as mg where mg.rolename=:rolename").setParameter("rolename",roleName).list().size()>0;
    }
}
