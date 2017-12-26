package com.example.hforum.service.impl;

import com.example.hforum.mapper.ImageMapper;
import com.example.hforum.model.Image;
import com.example.hforum.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ImageServiceImpl  implements ImageService{
    @Autowired
    private ImageMapper imageMapper;
    @Override
    public  Integer[] uploadImages(Image image) {
       // int insert = imageMapper.insert(image);
        return null;
    }
}
