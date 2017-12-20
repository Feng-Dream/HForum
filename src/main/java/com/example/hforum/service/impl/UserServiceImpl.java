package com.example.hforum.service.impl;

import com.example.hforum.mapper.UserMapper;
import com.example.hforum.model.User;
import com.example.hforum.service.UserService;
import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import com.github.miemiedev.mybatis.paginator.domain.PageList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserMapper userMapper;

    @Override
    public void add(User user) {
        userMapper.insertSelective(user);
    }

    @Override
    public User login(User user) {
        return userMapper.loadSelective(user);
    }

    @Override
    public PageList<User> list(int pageIndex, int pageSize, User user) {
        PageBounds pageBounds = new PageBounds(pageIndex, pageSize);
        PageList<User> list = userMapper.list(user,pageBounds);
        return list;
    }

}