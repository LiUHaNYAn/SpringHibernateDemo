package com.services.interfaces;

import com.common.ServiceResult;
import com.dto.ManagerGroupAddDto;

/**
 * Created by 20150831 on 2015/9/17.
 */
public interface ManagerGroupService {
    public ServiceResult AddManagerGroup(ManagerGroupAddDto model);
}
