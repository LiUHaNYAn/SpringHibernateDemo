package com.dao.interfaces;

import com.dao.core.BaseDao;
import com.domain.ManagerGroup;

/**
 * Created by 20150831 on 2015/9/17.
 */
public interface ManagerGroupDao extends BaseDao<ManagerGroup> {
    public boolean IsExists(String roleName);
    public  boolean IsExists(String roleName,int roleid);
}
