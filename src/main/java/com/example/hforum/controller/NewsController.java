package com.example.hforum.controller;

import com.example.hforum.po.NewsVo;
import com.example.hforum.service.NewsService;
import com.example.hforum.utils.PageBean;
import com.example.hforum.utils.ResponseDataFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.Map;

@RequestMapping("/news")
@Controller
public class NewsController {
    @Autowired
    private NewsService newsService;

    @RequestMapping(value = "/add")
    public void add(@RequestBody NewsVo newsVo, HttpServletResponse response) throws IOException {

        int i = newsService.add(newsVo);
        PrintWriter out = response.getWriter();
        out.print(i);
        out.flush();
        out.close();
    }


    @RequestMapping(value = "/list")
    @ResponseBody
    public Map<String, Object> list(Integer page, Integer limit, Boolean paginate, NewsVo newsVo) {

        PageBean pageBean = ResponseDataFactory.createPageBean(page, limit, paginate);

        List<NewsVo> list = newsService.list(newsVo, pageBean);

        return ResponseDataFactory.buildResponseDataMap(pageBean, list);
    }
}
