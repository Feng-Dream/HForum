package com.example.hforum.service;

import com.example.hforum.model.News;
import com.example.hforum.utils.PageBean;

import java.util.List;

public interface NewsService {
    public List<News> list(News news, PageBean pageBean);
}
