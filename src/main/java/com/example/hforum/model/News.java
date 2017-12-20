package com.example.hforum.model;

import java.io.Serializable;
import java.util.Date;

public class News implements Serializable{
    private Long newsId;

    private String newsTitle;

    private String newsFrom;

    private Date createTime;

    private Long createUserId;

    private Date forReviewTime;

    private Long aduitUserId;

    private Date releaseTime;

    private Date soldoutTime;

    private Long soldoutUserId;

    private Integer newsThumb;

    private Integer newsStatus;

    private Integer layoutType;

    private String aduitFailureCause;

    private String newsContent;

    public Long getNewsId() {
        return newsId;
    }

    public void setNewsId(Long newsId) {
        this.newsId = newsId;
    }

    public String getNewsTitle() {
        return newsTitle;
    }

    public void setNewsTitle(String newsTitle) {
        this.newsTitle = newsTitle == null ? null : newsTitle.trim();
    }

    public String getNewsFrom() {
        return newsFrom;
    }

    public void setNewsFrom(String newsFrom) {
        this.newsFrom = newsFrom == null ? null : newsFrom.trim();
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Long getCreateUserId() {
        return createUserId;
    }

    public void setCreateUserId(Long createUserId) {
        this.createUserId = createUserId;
    }

    public Date getForReviewTime() {
        return forReviewTime;
    }

    public void setForReviewTime(Date forReviewTime) {
        this.forReviewTime = forReviewTime;
    }

    public Long getAduitUserId() {
        return aduitUserId;
    }

    public void setAduitUserId(Long aduitUserId) {
        this.aduitUserId = aduitUserId;
    }

    public Date getReleaseTime() {
        return releaseTime;
    }

    public void setReleaseTime(Date releaseTime) {
        this.releaseTime = releaseTime;
    }

    public Date getSoldoutTime() {
        return soldoutTime;
    }

    public void setSoldoutTime(Date soldoutTime) {
        this.soldoutTime = soldoutTime;
    }

    public Long getSoldoutUserId() {
        return soldoutUserId;
    }

    public void setSoldoutUserId(Long soldoutUserId) {
        this.soldoutUserId = soldoutUserId;
    }

    public Integer getNewsThumb() {
        return newsThumb;
    }

    public void setNewsThumb(Integer newsThumb) {
        this.newsThumb = newsThumb;
    }

    public Integer getNewsStatus() {
        return newsStatus;
    }

    public void setNewsStatus(Integer newsStatus) {
        this.newsStatus = newsStatus;
    }

    public Integer getLayoutType() {
        return layoutType;
    }

    public void setLayoutType(Integer layoutType) {
        this.layoutType = layoutType;
    }

    public String getAduitFailureCause() {
        return aduitFailureCause;
    }

    public void setAduitFailureCause(String aduitFailureCause) {
        this.aduitFailureCause = aduitFailureCause == null ? null : aduitFailureCause.trim();
    }

    public String getNewsContent() {
        return newsContent;
    }

    public void setNewsContent(String newsContent) {
        this.newsContent = newsContent == null ? null : newsContent.trim();
    }
}