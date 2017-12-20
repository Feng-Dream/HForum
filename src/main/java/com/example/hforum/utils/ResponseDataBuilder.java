package com.example.hforum.utils;

import com.github.miemiedev.mybatis.paginator.domain.PageList;

import java.util.HashMap;
import java.util.Map;

/**
 * 转成layui需要的数据格式并且兼容springmvc
 */
public  class  ResponseDataBuilder {

    public static Map<String, Object> buildResponseDataMap(PageList pageList) {
        Map<String,Object> responseData  =new HashMap<>();
        responseData.put("rel",true);
        responseData.put("msg","");
        responseData.put("list",pageList);
        responseData.put("count",pageList.getPaginator().getTotalCount());
        return responseData;
    }
}
