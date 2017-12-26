package com.example.hforum.model;

import java.util.Date;

public class AduitRecord {
    private Long aduitId;

    private Long aduitNewsId;

    private Date forReviewTime;

    private Date soldoutTime;

    private Long soldoutUserId;

    private String aduitFailureCause;

    private Long aduitUserId;

    private Integer aduitNewsVersion;

    private Integer aduitResult;

    public Long getAduitId() {
        return aduitId;
    }

    public void setAduitId(Long aduitId) {
        this.aduitId = aduitId;
    }

    public Long getAduitNewsId() {
        return aduitNewsId;
    }

    public void setAduitNewsId(Long aduitNewsId) {
        this.aduitNewsId = aduitNewsId;
    }

    public Date getForReviewTime() {
        return forReviewTime;
    }

    public void setForReviewTime(Date forReviewTime) {
        this.forReviewTime = forReviewTime;
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

    public String getAduitFailureCause() {
        return aduitFailureCause;
    }

    public void setAduitFailureCause(String aduitFailureCause) {
        this.aduitFailureCause = aduitFailureCause == null ? null : aduitFailureCause.trim();
    }

    public Long getAduitUserId() {
        return aduitUserId;
    }

    public void setAduitUserId(Long aduitUserId) {
        this.aduitUserId = aduitUserId;
    }

    public Integer getAduitNewsVersion() {
        return aduitNewsVersion;
    }

    public void setAduitNewsVersion(Integer aduitNewsVersion) {
        this.aduitNewsVersion = aduitNewsVersion;
    }

    public Integer getAduitResult() {
        return aduitResult;
    }

    public void setAduitResult(Integer aduitResult) {
        this.aduitResult = aduitResult;
    }
}