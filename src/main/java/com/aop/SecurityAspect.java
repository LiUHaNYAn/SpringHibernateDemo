package com.aop;

/**
 * Created by wanghy on 2015/9/16.
 */
public class SecurityAspect {
    public  void BeforeExecute(){
        System.out.println("before this method execute!");
    }
    public  void  AfterExecute(){
        System.out.println("after this method execute!");
    }
    public  void  AfterThrowException(){
         System.out.println("AfterThrowException this method execute!");
    }
}
