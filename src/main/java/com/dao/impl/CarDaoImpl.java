package com.dao.impl;

import com.dao.interfaces.CarDao;
import com.domain.CarInfo;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 * Created by 20150831 on 2015/9/16.
 */
@Repository
public class CarDaoImpl implements CarDao {
    @Autowired
    private SessionFactory sessionFactory;

    @Override
    public void AddEntity(CarInfo model) {
        sessionFactory.getCurrentSession().save(model);
    }

    @Override
    public void DeleteEntity(CarInfo model) {

    }

    @Override
    public void UpdateEntity(CarInfo model) {

    }
}
