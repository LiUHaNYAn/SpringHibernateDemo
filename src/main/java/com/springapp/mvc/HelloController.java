package com.springapp.mvc;

import com.domain.UserInfo;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/")
public class HelloController {
	@Autowired
	private SessionFactory factory;
	@RequestMapping(method = RequestMethod.GET)
	public String printWelcome(ModelMap model) {
	Session session= factory.openSession();
		UserInfo userInfo=new UserInfo();
		userInfo.setUserName("防御条约try");
		userInfo.setPassword("发士大夫");
		session.save(userInfo);
		model.addAttribute("message", "Hello world!");
		return "hello";
	}
}