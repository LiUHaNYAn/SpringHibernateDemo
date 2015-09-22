package com.services.interfaces;

import com.common.ServiceResult;
import com.domain.ManagerGroup;
import com.dto.ManagerGroupDto;

import java.util.List;

/**
 * Created by 20150831 on 2015/9/17.
 */
public interface ManagerGroupService {
    public ServiceResult AddManagerGroup(ManagerGroupDto model);
    public  ServiceResult EditManagerGroup(ManagerGroupDto model);
    public List<ManagerGroup> GetList(String roleName);
}
