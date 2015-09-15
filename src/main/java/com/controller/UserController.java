package com.controller;

import com.domain.UserInfo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by 20150831 on 2015/9/15.
 */
@Controller
public class UserController {
    @RequestMapping("/user/info")
    @ResponseBody
    public UserInfo UserInfo() {
        UserInfo userInfo = new UserInfo();
        userInfo.setUserName("防御条约try");
        userInfo.setPassword("发士大夫");
        return userInfo;
    }

    @RequestMapping("/user/list")
    public ModelAndView UserList() {
        return new ModelAndView("/user/list");
    }

}
