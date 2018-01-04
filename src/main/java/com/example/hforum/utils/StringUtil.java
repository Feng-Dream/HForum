package com.example.hforum.utils;

import cn.com.webxml.ArrayOfString;
import cn.com.webxml.WeatherWebService;
import cn.com.webxml.WeatherWebServiceSoap;

import java.util.List;

public class StringUtil {
	/** 判断字符串是否有值，如果为null或者是空字符串或者只有空格或者为"null"字符串，则返回true，否则则返回false */
	public static boolean isEmpty(String value) {
		if (value != null && !"".equalsIgnoreCase(value.trim()) && !"null".equalsIgnoreCase(value.trim())) {
			return false;
		} else {
			return true;
		}
	}

	public static void main(String[] args) {

		WeatherWebService weatherWebService = new WeatherWebService();
		WeatherWebServiceSoap weatherWebServiceSoap = weatherWebService.getWeatherWebServiceSoap();
		ArrayOfString array = weatherWebServiceSoap.getWeatherbyCityName("郴州");
		List<String> list = array.getString();
		int i = 0;
		for(String str:list){
			System.out.println(i++ + ": "+ str);
		}
	}
}
