package com.example.hforum.service;

import com.example.hforum.model.Channel;
import com.github.miemiedev.mybatis.paginator.domain.PageList;

public interface ChannelService {
    public PageList<Channel> list(int pageIndex, int pageSize, Channel channel);
}
