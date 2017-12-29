package com.example.hforum.service;

import com.example.hforum.po.NewsVo;
import com.example.hforum.utils.PageBean;

import java.util.List;

public interface NewsService {

    public int add(NewsVo newsVo);

    public List<NewsVo> list( NewsVo newsVo, PageBean pageBean);
}
