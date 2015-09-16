package com.services.impl;

import com.common.ServiceResult;
import com.dao.interfaces.AdminGroupDao;
import com.domain.AdminGroup;
import com.services.interfaces.AdminGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by 20150831 on 2015/9/16.
 */
@Service
public class AdminGroupServiceImpl implements AdminGroupService {
    @Autowired
    private AdminGroupDao adminGroupDao;

    @Override
    @Transactional(propagation = Propagation.REQUIRED)
    public ServiceResult AddAdminGroup(AdminGroup model) {
        ServiceResult result = new ServiceResult();
        if (adminGroupDao.IsExists(model.getRolename())) {
            result.setResultcode(-1);
            result.setMsg("此用户名已经存在");
        } else {
            try {
                adminGroupDao.AddEntity(model);
                result.setMsg("");
                result.setResultcode(0);
            } catch (Exception ex) {
                result.setMsg(ex.getMessage());
                result.setResultcode(-2);
            }
        }
        return result;

    }
}
