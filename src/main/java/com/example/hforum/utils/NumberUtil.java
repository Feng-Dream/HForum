package com.example.hforum.utils;

import java.util.Random;

/**
 * 生成指定区间的随机数
 */
public class NumberUtil {
	public static int createNumber(int min,int max) {
		Random random = new Random();
		int no = random.nextInt(max) % (max - min + 1) + min;
		return no;
	}
}
