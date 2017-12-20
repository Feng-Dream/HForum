package com.example.hforum.controller;

import com.example.hforum.model.Channel;
import com.example.hforum.service.ChannelService;
import com.example.hforum.utils.PageBean;
import com.example.hforum.utils.ResponseDataFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;

@RequestMapping("/channel")
@Controller
public class ChannelController {
    @Autowired
    private ChannelService channelService;

    @RequestMapping(value = "/list")
    @ResponseBody
    public Map<String, Object> list(int pageIndex, int pageSize, Channel channel) {

        PageBean pageBean = ResponseDataFactory.createPageBean(pageIndex, pageSize);

        List<Channel> list = channelService.list(channel, pageBean);

        return ResponseDataFactory.buildResponseDataMap(pageBean,list);
    }
}
