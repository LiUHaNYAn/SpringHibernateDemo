package com.controller;

import com.common.ServiceResult;
import com.domain.AdminGroup;
import com.dto.AdminGroupAddDto;
import com.services.interfaces.AdminGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.Date;


/**
 * Created by 20150831 on 2015/9/16.
 */
@Controller
public class AdminGroupController {
    @Autowired
    private AdminGroupService service;

    @RequestMapping("/admingroup")
    public ModelAndView Index() {
        return new ModelAndView("admingroup/index");
    }

    @RequestMapping("/admingroup/add")
    @ResponseBody
    public ServiceResult AdminGroupAdd(AdminGroupAddDto model) {
        AdminGroup adminGroup = new AdminGroup();
        adminGroup.setCreatetime(new Date());
        adminGroup.setDescription(model.getDescription());
        adminGroup.setRolename(model.getRolename());
        adminGroup.setIsdelete(0);
        return service.AddAdminGroup(adminGroup);
    }
}
