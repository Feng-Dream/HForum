package com.example.hforum.controller;

import com.example.hforum.model.Channel;
import com.example.hforum.service.ChannelService;
import com.example.hforum.utils.ResponseDataBuilder;
import com.github.miemiedev.mybatis.paginator.domain.PageList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;

@RequestMapping("/channel")
@Controller
public class ChannelController {
    @Autowired
    private ChannelService channelService;//555

    @RequestMapping(value = "/list")
    @ResponseBody
    public Map<String, Object> list(int pageIndex, int pageSize, Channel channel) {

        PageList<Channel> pageList = channelService.list(pageIndex,pageSize,channel);

        return ResponseDataBuilder.buildResponseDataMap(pageList);
    }
}
