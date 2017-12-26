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
import java.net.URLEncoder;

@RequestMapping("/image")
@Controller
public class ImageController {
    @Autowired
    private ImageService imageService;

    @RequestMapping("/uploadImages")
    @ResponseBody
    public String  uploadImages(MultipartFile[] file, HttpServletRequest request) throws IOException {
        String flag=null;
        try {
            WebuploaderUtil webuploaderUtil=new WebuploaderUtil();
            webuploaderUtil.uploads(file, "upload/news", request);
            flag=webuploaderUtil.getFileName();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return flag;

    }
    @RequestMapping("/down")
    public void down(HttpServletRequest request,HttpServletResponse response) throws Exception{
        System.out.println("aaa");
        //模拟文件，myfile.txt为需要下载的文件
        String fileName = request.getSession().getServletContext().getRealPath("upload")+"/555.png";
        //获取输入流
        InputStream bis = new BufferedInputStream(new FileInputStream(new File(fileName)));
        //假如以中文名下载的话
        String filename = "下载文件.png";
        //转码，免得文件名中文乱码
        filename = URLEncoder.encode(filename,"UTF-8");
        //设置文件下载头
        response.addHeader("Content-Disposition", "attachment;filename=" + filename);
        //1.设置文件ContentType类型，这样设置，会自动判断下载文件类型
        response.setContentType("multipart/form-data");
        BufferedOutputStream out = new BufferedOutputStream(response.getOutputStream());
        int len = 0;
        while((len = bis.read()) != -1){
            out.write(len);
            out.flush();
        }
        out.close();
    }
}
