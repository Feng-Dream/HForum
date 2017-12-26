package com.example.hforum.mapper;

import com.example.hforum.model.AduitRecord;

public interface AduitRecordMapper {
    int deleteByPrimaryKey(Long aduitId);

    int insert(AduitRecord record);

    int insertSelective(AduitRecord record);

    AduitRecord selectByPrimaryKey(Long aduitId);

    int updateByPrimaryKeySelective(AduitRecord record);

    int updateByPrimaryKey(AduitRecord record);


}