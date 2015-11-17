package com.aop;

/**
 * Created by wanghy on 2015/11/17.
 */
public class Audience {
    public  void  TakeSeat(){
        System.out.println("Play is going ,Please SeatDown");
    }
    public  void  EnterRoom(){
        System.out.println("Play is going ,Please Come in");
    }
    public  void  Applaud(){
        System.out.println("Oh,Wonderful");
    }
    public  void  Leave(){
        System.out.println("Play is over ,Please Leave your seat");
    }


}
