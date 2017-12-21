package com.example.hforum.controller;

import com.example.hforum.model.Channel;
import com.example.hforum.service.ChannelService;
import com.example.hforum.utils.PageBean;
import com.example.hforum.utils.ResponseDataFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.Map;

@RequestMapping("/channel")
@Controller
public class ChannelController {
    @Autowired
    private ChannelService channelService;

    @RequestMapping(value = "/list")
    @ResponseBody
    public Map<String, Object> list(Integer page, Integer limit, Boolean paginate, Channel channel) {

        PageBean pageBean = ResponseDataFactory.createPageBean(page, limit,paginate);

        List<Channel> list = channelService.list(channel, pageBean);

        return ResponseDataFactory.buildResponseDataMap(pageBean, list);
    }
    @RequestMapping(value = "/edit",method = RequestMethod.POST)
    public void edit(Channel channel,HttpServletResponse response) throws IOException {
        int i = channelService.edit(channel);
        //这句话的意思，是让浏览器用utf8来解析返回的数据
        response.setHeader("Content-type", "text/html;charset=UTF-8");
        //这句话的意思，是告诉servlet用UTF-8转码，而不是用默认的ISO8859
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        if(i==1){
            out.print(0);
        }else{
            out.print(1);
        }
        out.flush();
        out.close();
    }
}
