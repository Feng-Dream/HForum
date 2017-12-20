package com.example.hforum.mapper;

import com.example.hforum.model.Channel;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChannelMapper {
    int deleteByPrimaryKey(Integer channelId);

    int insert(Channel record);

    int insertSelective(Channel record);

    Channel selectByPrimaryKey(Integer channelId);

    int updateByPrimaryKeySelective(Channel record);

    int updateByPrimaryKey(Channel record);

    List<Channel> list(Channel channel);
}