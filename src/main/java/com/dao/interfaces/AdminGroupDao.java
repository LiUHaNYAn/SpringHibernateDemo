package com.dao.interfaces;

import com.dao.core.BaseDao;
import com.domain.AdminGroup;

import java.util.List;

/**
 * Created by 20150831 on 2015/9/16.
 */
public interface AdminGroupDao extends BaseDao<AdminGroup> {
    List<AdminGroup> GetList(String rolename);

    boolean IsExists(String rolename);
}
