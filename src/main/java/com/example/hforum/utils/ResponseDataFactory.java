package com.example.hforum.utils;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 转成layui需要的数据格式并且兼容springmvc
 */
public  class ResponseDataFactory {

    public static PageBean createPageBean(int pageIndex,int pageSize ) {
        PageBean pageBean = new PageBean();
        pageBean.setCurPage(pageIndex);
        pageBean.setPageRecord(pageSize);
        return pageBean;
    }

    public static Map<String, Object> buildResponseDataMap(PageBean pageBean, List list) {
        Map<String,Object> responseData  =new HashMap<>();
        responseData.put("rel",pageBean.isPaginate());
        responseData.put("msg","");
        responseData.put("list",list);
        responseData.put("count",pageBean.getTotalRecord());
        return responseData;
    }
}
