package com.example.hforum.po;

import com.example.hforum.model.Channel;
import com.example.hforum.model.Image;
import com.example.hforum.model.News;
import com.example.hforum.model.NewsRecord;

import java.io.Serializable;
import java.util.List;

public class NewsVo implements Serializable{

    private News news;

    private NewsRecord newsRecord;

    private List<Image> images;

    private  List<Channel> channels;

    public News getNews() {
        return news;
    }

    public void setNews(News news) {
        this.news = news;
    }

    public NewsRecord getNewsRecord() {
        return newsRecord;
    }

    public void setNewsRecord(NewsRecord newsRecord) {
        this.newsRecord = newsRecord;
    }

    public List<Image> getImages() {
        return images;
    }

    public void setImages(List<Image> images) {
        this.images = images;
    }

    public List<Channel> getChannels() {
        return channels;
    }

    public void setChannels(List<Channel> channels) {
        this.channels = channels;
    }

    @Override
    public String toString() {
        return "NewsVo{" +
                "news=" + news +
                ", newsRecord=" + newsRecord +
                ", images=" + images +
                ", channels=" + channels +
                '}';
    }
}
