package com.example.hforum.service.impl;

import com.example.hforum.mapper.NewsMapper;
import com.example.hforum.model.News;
import com.example.hforum.service.NewsService;
import com.example.hforum.utils.PageBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Transactional
@Service
public class NewsServiceImpl implements NewsService {
    @Autowired
    private NewsMapper newsMapper;

    @Override
    public List<News> list(News news, PageBean pageBean) {
        List<News> list = newsMapper.list(news);
        return list;
    }
}
