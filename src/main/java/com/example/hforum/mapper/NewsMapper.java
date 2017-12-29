package com.example.hforum.mapper;

import com.example.hforum.model.News;
import com.example.hforum.po.BridgePo;
import com.example.hforum.po.NewsVo;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface NewsMapper {
    int deleteByPrimaryKey(Long newsId);

    int insert(News record);

    int insertSelective(News record);

    News selectByPrimaryKey(Long newsId);

    int updateByPrimaryKeySelective(News record);

    int updateByPrimaryKeyWithBLOBs(News record);

    int updateByPrimaryKey(News record);

    List<NewsVo> list(NewsVo newsVo);

    int insertNewsChannel(BridgePo bridgePo);
}