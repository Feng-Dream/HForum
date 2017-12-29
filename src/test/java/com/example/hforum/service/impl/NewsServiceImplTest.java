package com.example.hforum.service.impl;

import com.example.hforum.po.NewsVo;
import com.example.hforum.service.NewsService;
import com.example.hforum.utils.PageBean;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"classpath:applicationContext-dao.xml"})
public class NewsServiceImplTest {

    @Autowired
    private NewsService newsService;

    @Before
    public void setUp() throws Exception {
    }

    @Test
    public void list() {
        PageBean pageBean = new PageBean();
        List<NewsVo> list = newsService.list(new NewsVo(), pageBean);
        for (NewsVo v:
                list) {
            System.out.println(v);
        }
    }
}