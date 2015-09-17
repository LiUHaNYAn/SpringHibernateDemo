package com.aop;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;

import java.util.Date;

/**
 * Created by wanghy on 2015/9/16.
 */
//@Aspect
public class SecurityAspect {

//    @Pointcut("execution(* com.services.interfaces.UserInfoService.Register(..))")
//    public  void  performance(){
//
//    }

    public  void BeforeExecute(){
        System.out.println("before this method execute!");
    }
    public  void  AfterExecute(){
        System.out.println("after this method execute!");
    }
    public  void  AfterThrowException(){
         System.out.println("AfterThrowException this method execute!");
    }
    public  void  AroundAdvice(ProceedingJoinPoint joinPoint){
        try {
            System.out.println("环绕通知开始："+new Date().toString());
            joinPoint.proceed();
            System.out.println("环绕通知结束：" + new Date().toString());
        } catch (Throwable throwable) {
            throwable.printStackTrace();
        }
    }
}
