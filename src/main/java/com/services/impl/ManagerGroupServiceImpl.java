package com.services.impl;

import com.common.ResultCode;
import com.common.ServiceResult;
import com.dao.interfaces.ManagerGroupDao;
import com.domain.ManagerGroup;
import com.dto.ManagerGroupDto;
import com.services.interfaces.ManagerGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.nio.file.Files;
import java.util.Date;

/**
 * Created by 20150831 on 2015/9/17.
 */
@Service
public class ManagerGroupServiceImpl implements ManagerGroupService {
    @Autowired
    private ManagerGroupDao dao;
    @Override
    @Transactional
    public ServiceResult AddManagerGroup(ManagerGroupDto model) {
        ServiceResult result=new ServiceResult();
        if(dao.IsExists(model.getRolename())){
            result.setMsg(ResultCode.UserExists.getName());
            result.setResultcode(ResultCode.UserExists);
        }else{
            try{
                ManagerGroup group=new ManagerGroup();
                group.setIsdelete(0);
                group.setRolename(model.getRolename());
                group.setDescription(model.getDescription());
                group.setCreatetime(new Date());
                dao.AddEntity(group);
                result.setMsg(ResultCode.Success.getName());
                result.setResultcode(ResultCode.Success);

            }catch (Exception ex){
                result.setMsg(ex.getMessage());
                result.setResultcode(ResultCode.Fail);
            }
        }
        return  result;
    }

    @Override
    @Transactional
    public ServiceResult EditManagerGroup(ManagerGroupDto model) {
        ServiceResult result=new ServiceResult();
        try{
                ManagerGroup group=new ManagerGroup();
                group.setIsdelete(model.getIsdelete());
                group.setGroupid(model.getGroupid());
                group.setRolename(model.getRolename());
                group.setDescription(model.getDescription());
                group.setCreatetime(new Date());
                dao.UpdateEntity(group);
                result.setMsg(ResultCode.Success.getName());
                result.setResultcode(ResultCode.Success);
            }catch (Exception ex){
                result.setMsg(ex.getMessage());
                result.setResultcode(ResultCode.Fail);
            }
        return  result;
    }
}
