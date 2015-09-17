package com.services.interfaces;

import com.common.ServiceResult;
import com.dto.ManagerGroupDto;

/**
 * Created by 20150831 on 2015/9/17.
 */
public interface ManagerGroupService {
    public ServiceResult AddManagerGroup(ManagerGroupDto model);
    public  ServiceResult EditManagerGroup(ManagerGroupDto model);
}
