package com.example.hforum.utils;

import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.util.ArrayList;
import java.util.List;

public class WebuploaderUtil {
    private String allowSuffix = "jpg|png|gif|jpeg|bmp";//允许文件格式
    private long allowSize = 2L;//允许文件大小 MB
    private String fileName;
    private String[] fileNames;

    public String getAllowSuffix() {
        return allowSuffix;
    }

    public void setAllowSuffix(String allowSuffix) {
        this.allowSuffix = allowSuffix;
    }

    public long getAllowSize() {
        return allowSize * 1024 * 1024;
    }

    public void setAllowSize(long allowSize) {
        this.allowSize = allowSize;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String[] getFileNames() {
        return fileNames;
    }

    public void setFileNames(String[] fileNames) {
        this.fileNames = fileNames;
    }

    public List<String> uploads(MultipartFile[] files, String destDir, HttpServletRequest request) throws Exception {
        String path = request.getContextPath();
        String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path;
        List<String> fileNewNames =new ArrayList<>(files.length);
        try {
            fileNames = new String[files.length];
            int index = 0;
            for (MultipartFile file : files) {
                String originalFilename = file.getOriginalFilename();// file.getOriginalFilename()是得到上传时的文件名
                String suffix = originalFilename.substring(originalFilename.lastIndexOf(".")+1);
                int length = getAllowSuffix().indexOf(suffix);
                if(length == -1){
                    throw new Exception("请上传允许格式的文件");
                }
                if(file.getSize() > getAllowSize()){
                    throw new Exception("您上传的文件大小已经超出范围");
                }
                String realPath = request.getSession().getServletContext().getRealPath("/");
                File destFile = new File(realPath+destDir);
                if(!destFile.exists()){
                    destFile.mkdirs();
                }
               // String fileNewName = IDUtil.createUUID()+"."+suffix;
                //不加后缀名
                String fileNewName = IDUtil.createUUID();
                fileNewNames.add(fileNewName);
                File f = new File(destFile.getAbsoluteFile()+"\\"+fileNewName);
                //MultipartFile自带的解析方法
                file.transferTo(f);
                f.createNewFile();
                fileNames[index++] =basePath+destDir+fileNewName;
            }
            return fileNewNames;
        } catch (Exception e) {
            throw e;
        }
    }
}
