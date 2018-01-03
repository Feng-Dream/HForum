package com.example.hforum.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;

@RequestMapping("/util")
@Controller
public class UtilController {
    @RequestMapping("/getTimeDiff")
    public void getTimeDiff(Long clientNowMs, HttpServletResponse response) throws IOException {
        //获取客户端与服务器的时间戳
        Long timeDiff = new Date().getTime()-clientNowMs;
        PrintWriter out = response.getWriter();
        out.print(timeDiff);
        out.flush();
        out.close();
    }
}
