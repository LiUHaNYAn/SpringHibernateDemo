package com.services.impl;

import com.dao.interfaces.UserDao;
import com.domain.UserInfo;
import com.services.interfaces.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by 20150831 on 2015/9/15.
 */
public class UserInfoServiceImpl implements UserInfoService {

    @Autowired
    private UserDao userDao;

    @Override
    @Transactional
    public void Register(UserInfo model) {
        userDao.AddEntity(model);
    }
}
