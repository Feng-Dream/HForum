package com.example.hforum.controller;

import com.example.hforum.service.ImageService;
import com.example.hforum.utils.WebuploaderUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;

@RequestMapping("/image")
@Controller
public class ImageController {
    @Autowired
    private ImageService imageService;

    @RequestMapping("/uploadImages")
    @ResponseBody
    public String[] uploadImages(MultipartFile[] file, HttpServletRequest request) throws IOException {
        String[] fileNames = null;
        try {
            fileNames = WebuploaderUtil.uploads(file, "upload/news", request);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return fileNames;

    }

    @RequestMapping("/downloadImage")
    public void downloadImage(HttpServletRequest request, HttpServletResponse response, String fileName) throws Exception {

        String realPath = request.getSession().getServletContext().getRealPath("/");
        fileName = realPath + "upload/news/" + fileName;
        //获取输入流
        InputStream bis = new BufferedInputStream(new FileInputStream(new File(fileName)));
//        //假如以中文名下载的话
//        String filename = "下载文件.png";
//        //转码，免得文件名中文乱码
//        filename = URLEncoder.encode(filename, "UTF-8");
//        //设置文件下载头
//        response.addHeader("Content-Disposition", "attachment;filename=" + filename);
//        //1.设置文件ContentType类型，这样设置，会自动判断下载文件类型
//        response.setContentType("multipart/form-data");
        BufferedOutputStream out = new BufferedOutputStream(response.getOutputStream());
        int len = 0;
        while ((len = bis.read()) != -1) {
            out.write(len);
            out.flush();
        }
        out.close();
    }
}
