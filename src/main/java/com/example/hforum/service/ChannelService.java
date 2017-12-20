package com.example.hforum.service;

import com.example.hforum.model.Channel;
import com.example.hforum.utils.PageBean;

import java.util.List;

public interface ChannelService {
    public List<Channel> list(Channel channel,PageBean pageBean);
}
