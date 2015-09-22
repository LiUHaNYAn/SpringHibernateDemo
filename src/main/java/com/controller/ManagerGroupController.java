package com.controller;

import com.domain.ManagerGroup;
import com.services.interfaces.ManagerGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

/**
 * Created by 20150831 on 2015/9/17.
 */
@Controller
public class ManagerGroupController {
    @Autowired
    private ManagerGroupService service;
    @RequestMapping("/managergroup/index")
    public ModelAndView Index(){
        return  new ModelAndView("/managergroup/index");
    }
    @RequestMapping("/managergroup/list")
    @ResponseBody
    public List<ManagerGroup> List(String rolename){
        List<ManagerGroup> data=service.GetList(rolename);
        return  data;
    }
    @RequestMapping("/managergroup/groupadd")
    public  ModelAndView GroupAdd(){
        return  new ModelAndView("/managergroup/groupadd");
    }
}
