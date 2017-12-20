package com.example.hforum.service;

import com.example.hforum.model.User;
import com.github.miemiedev.mybatis.paginator.domain.PageList;

public interface UserService {
	public void add(User user);

	public User login(User user);

	public PageList<User> list(int pageIndex, int pageSize, User user);

}
