package com.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by wanghy on 2015/9/15.
 */
@Controller
@RequestMapping("/")
public class HomeController {
    @RequestMapping("/")
    public ModelAndView Index() {
        return new ModelAndView("/home/index");
    }
}
