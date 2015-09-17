package com.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by 20150831 on 2015/9/17.
 */
@Controller
public class ManagerGroupController {
    @RequestMapping("/managergroup/index")
    public ModelAndView Index(){
        return  new ModelAndView("/managergroup/index");
    }
}
