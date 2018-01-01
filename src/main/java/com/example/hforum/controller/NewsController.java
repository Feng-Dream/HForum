package com.example.hforum.controller;

import com.example.hforum.model.Channel;
import com.example.hforum.model.News;
import com.example.hforum.model.NewsRecord;
import com.example.hforum.po.BridgePo;
import com.example.hforum.po.NewsVo;
import com.example.hforum.service.ChannelService;
import com.example.hforum.service.ImageService;
import com.example.hforum.service.NewsRecordService;
import com.example.hforum.service.NewsService;
import com.example.hforum.utils.PageBean;
import com.example.hforum.utils.ResponseDataFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RequestMapping("/news")
@Controller
public class NewsController {
    @Autowired
    private NewsService newsService;
    @Autowired
    private ChannelService channelService;
    @Autowired
    private NewsRecordService newsRecordService;
    @Autowired
    private ImageService imageService;


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

        List<News> newsList = newsService.list(newsVo, pageBean);
        List<NewsVo> newsVoList = new ArrayList<>();

        NewsVo nv = null;
        if (newsList != null) {
            for (News n :
                    newsList) {
                nv = new NewsVo();

                Long newsId = n.getNewsId();
                nv.setNews(n);

                List<Channel> channels = channelService.selectByNewsId(newsId);
                nv.setChannels(channels);

                NewsRecord newsRecord = newsRecordService.selectByNewsId(newsId);
                nv.setNewsRecord(newsRecord);

//                List<Image> images = imageService.selectByNewsId(newsId);
//                nv.setImages(images);

                newsVoList.add(nv);
            }
        }

        return ResponseDataFactory.buildResponseDataMap(pageBean, newsVoList);
    }


    @RequestMapping(value = "/load/{newsId}")
    public String load(@PathVariable Long newsId, HttpServletResponse response, Model model) {
        NewsVo newsVo = newsService.load(newsId);
        model.addAttribute("editNewsVo", newsVo);
        return "back/manage/news/edit-news";
    }

    @RequestMapping(value = "/edit")
    public void edit(@RequestBody NewsVo newsVo, HttpServletResponse response) throws IOException {
        News news = newsVo.getNews();
        newsService.updateByPrimaryKeySelective(news);
        int result = 1;
        NewsRecord newsRecord = newsVo.getNewsRecord();
        if (newsRecord.getAduitResult() == 1) {
            //送审
            newsRecord.setForReviewTime(new Date());
            result = 2;
        }
        newsRecordService.updateByPrimaryKeySelective(newsRecord);
        //更新桥接表
        newsService.deleteNewsChannelByNewsId(news.getNewsId());
        List<Channel> channels = newsVo.getChannels();
        if (channels != null && channels.size() > 0) {
            for (Channel channel : channels
                    ) {
                newsService.insertNewsChannel(new BridgePo(news.getNewsId(), channel.getChannelId()));
            }
        }
        PrintWriter out = response.getWriter();
        out.print(result);
        out.flush();
        out.close();
    }

}
