package com.example.hforum.global;

import java.util.LinkedHashMap;

public class FilterChainDefinitionMapBuilder {
    /**
     * 配置哪些页面需要受保护. 以及访问这些页面需要的权限. 1). anon 可以被匿名访问 2). authc 必须认证(即登录)后才可能访问的页面.
     * 3). logout 登出. 4). roles 角色过滤器 配置顺序：前面的优先匹配,会覆盖后面的
     */
    public LinkedHashMap<String, String> buildFilterChainDefinitionMap() {
        LinkedHashMap<String, String> map = new LinkedHashMap<>();

        map.put("/back-stage/login.jsp", "anon");
        map.put("/user/login.action", "anon");
        map.put("/res/**", "anon");
        map.put("/front-desk/index.jsp", "anon");
        map.put("/front-desk/login.jsp", "anon");
        map.put("/common/403.jsp", "anon");
        map.put("/common/404.jsp", "anon");
        map.put("/common/405.jsp", "anon");
        map.put("/common/500.jsp", "anon");
        map.put("/common/common.jsp", "anon");
        //map.put("/shiro/logout", "logout");
        map.put("/back-stage/manage/**", "authc,roles[后台人员]");

        map.put("/**", "anon");

        return map;
    }

}
