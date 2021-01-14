package org.SGH.controller;

import java.sql.Connection;
import java.sql.DriverManager;

import org.junit.Test;

public class test {

	private static final String DRIVER = "com.mysql.jdbc.Driver";
	private static final String URL = "jdbc:mysql://localhost:3306/sgh?serverTimezone=Asia/Seoul";
	private static final String USER = "root";
	private static final String PASSWORD = "1234";

	@Test
	public void test1() throws Exception {
		Class.forName(DRIVER);

		try (Connection con = DriverManager.getConnection(URL, USER, PASSWORD)) {

			System.out.println(con+"야호~~~~~");

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
