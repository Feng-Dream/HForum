package com.example.hforum.service.impl;

import com.example.hforum.mapper.ChannelMapper;
import com.example.hforum.model.Channel;
import com.example.hforum.service.ChannelService;
import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import com.github.miemiedev.mybatis.paginator.domain.PageList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChannelServiceImpl implements ChannelService {
    @Autowired
    private ChannelMapper channelMapper;

    @Override
    public PageList<Channel> list(int pageIndex, int pageSize, Channel channel) {
        PageBounds pageBounds = new PageBounds(pageIndex, pageSize);
        PageList<Channel> list = channelMapper.list(channel,pageBounds);
        return list;
    }
}
