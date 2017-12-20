package com.example.hforum.utils;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 转成layui需要的数据格式并且兼容springmvc
 */
public  class ResponseDataFactory {

    public static PageBean createPageBean(int curPage,int pageRecord) {
        PageBean pageBean = new PageBean();
        pageBean.setCurPage(curPage);
        pageBean.setPageRecord(pageRecord);
        return pageBean;
    }

    public static Map<String, Object> buildResponseDataMap(PageBean pageBean, List list) {
        Map<String,Object> responseData  =new HashMap<>();
      //  responseData.put("rel",pageBean.isPaginate());
        responseData.put("code",0);//返回的数据状态 0表示正常
        responseData.put("msg","");
        responseData.put("data",list);
        responseData.put("count",pageBean.getTotalRecord());
        return responseData;
    }
}
