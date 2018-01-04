package com.example.hforum.controller;

import cn.com.webxml.ArrayOfString;
import cn.com.webxml.WeatherWebService;
import cn.com.webxml.WeatherWebServiceSoap;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;
import java.util.List;

@RequestMapping("/util")
@Controller
public class UtilController {
    @RequestMapping("/getTimeDiff")
    public void getTimeDiff(Long clientNowMs, HttpServletResponse response) throws IOException {
        //获取客户端与服务器的时间戳
        Long timeDiff = new Date().getTime() - clientNowMs;
        PrintWriter out = response.getWriter();
        out.print(timeDiff);
        out.flush();
        out.close();
    }

    @RequestMapping("/weather/{cityName}")
    @ResponseBody
    public List<String> weather(@PathVariable String cityName) {
        WeatherWebService weatherWebService = new WeatherWebService();
        WeatherWebServiceSoap weatherWebServiceSoap = weatherWebService.getWeatherWebServiceSoap();
        ArrayOfString array = weatherWebServiceSoap.getWeatherbyCityName(cityName);
        List<String> list = array.getString();
        return list;
    }
}
