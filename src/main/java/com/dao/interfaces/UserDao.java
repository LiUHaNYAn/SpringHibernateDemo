package com.dao.interfaces;

import com.dao.core.BaseDao;
import com.domain.UserInfo;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Created by 20150831 on 2015/9/15.
 */
public interface UserDao extends BaseDao<UserInfo> {

}
