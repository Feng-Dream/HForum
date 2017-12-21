package com.example.hforum.service.impl;

import com.example.hforum.mapper.ChannelMapper;
import com.example.hforum.model.Channel;
import com.example.hforum.service.ChannelService;
import com.example.hforum.utils.PageBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChannelServiceImpl implements ChannelService {
    @Autowired
    private ChannelMapper channelMapper;

    @Override
    public List<Channel> list(Channel channel, PageBean pageBean) {
        List<Channel> list = channelMapper.list(channel);
        return list;
    }

    @Override
    public int edit(Channel record) {
      return channelMapper.updateByPrimaryKeySelective(record);
    }
}
