package com.example.hforum.controller;

import com.example.hforum.model.News;
import com.example.hforum.service.NewsService;
import com.example.hforum.utils.PageBean;
import com.example.hforum.utils.ResponseDataFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;

@RequestMapping("/news")
@Controller
public class NewsController {
    private NewsService newsService;

    @RequestMapping(value = "/list")
    @ResponseBody
    public Map<String, Object> list(Integer page, Integer limit, Boolean paginate, News news) {

        PageBean pageBean = ResponseDataFactory.createPageBean(page, limit, paginate);

        List<News> list = newsService.list(news, pageBean);

        return ResponseDataFactory.buildResponseDataMap(pageBean, list);
    }
}
