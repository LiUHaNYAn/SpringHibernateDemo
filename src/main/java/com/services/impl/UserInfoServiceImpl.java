package com.services.impl;

import com.dao.interfaces.CarDao;
import com.dao.interfaces.UserDao;
import com.domain.CarInfo;
import com.domain.UserInfo;
import com.services.interfaces.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by 20150831 on 2015/9/15.
 */
@Service
public class UserInfoServiceImpl implements UserInfoService {

    @Autowired
    private UserDao userDao;
    @Autowired
    private CarDao carDao;

    @Override
    @Transactional(propagation = Propagation.REQUIRED)
    public void Register(UserInfo model) {
        userDao.AddEntity(model);

    }
}
