/**
 * Copyright &copy; 2012-2014 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.thinkgem.jeesite.common.utils;

import java.text.ParseException;
import java.util.Calendar;
import java.util.Date;

/**
 * 报表日期工具类, 继承org.apache.commons.lang.time.DateUtils类
 * @author xiaocai
 * @version 2016-3-7
 */
public class ChartDateUtils extends org.apache.commons.lang3.time.DateUtils {

	public static final String day="day";
	public static final String week="week";
	public static final String month="month";
	
	
	
	/**
	 * 根据选中的号数获取对应的开始时间
	 * @param day
	 * @return
	 */
	@SuppressWarnings("deprecation")
	public static Date getMonthEndDateByDay(int day){
		Date d = new Date();
		int days = d.getDate();
		Calendar c = Calendar.getInstance();
		c.set(Calendar.DAY_OF_MONTH, day);
		if(days<=day){	//送进来的天数小于等于当前天数。所以开始时间是上一个月
			c.set(Calendar.MONTH, (d.getMonth()-1));
		}
		return c.getTime();
	}
	
	/**
	 * 根据选择的周几获取对应的开始时间
	 * @param week
	 * @return
	 */
	@SuppressWarnings("deprecation")
	public static Date getEndDateByWeek(int week){
		Date d = new Date();
		int weeks = d.getDay();
		Calendar c = Calendar.getInstance();
		if(weeks<=week){	//送进来的天数小于等于当前天数。所以开始时间是上周
			c.set(Calendar.DAY_OF_WEEK,(week+1));
			c.add(Calendar.DATE, -7);
		}else{
			c.set(Calendar.DAY_OF_WEEK,(week+1));
		}
		return DateUtils.parseDate(DateUtils.formatDate(c.getTime(), DateUtils.YMD)+" 23:59:59", DateUtils.YMD_HMS);
	}
	public static Date getEndDate(Date d){
		if(d==null){
			d = new Date();
		}
		return DateUtils.parseDate(DateUtils.formatDate(d, DateUtils.YMD)+" 23:59:59", DateUtils.YMD_HMS);
	}
	public static Date getStartDate(Date d){
		if(d==null){
			d = new Date();
		}
		return DateUtils.parseDate(DateUtils.formatDate(d, DateUtils.YMD)+" 00:00:00", DateUtils.YMD_HMS);
	}
	/**
	 * 根据周的结束时间获取开始时间
	 * @param d
	 * @return
	 */
	public static Date getWeekStartDateByEndDate(Date d){
		Calendar c = Calendar.getInstance();
		c.setTime(d);
		c.add(Calendar.DAY_OF_MONTH, -6);
		return DateUtils.parseDate(DateUtils.formatDate(c.getTime(), DateUtils.YMD)+" 00:00:00", DateUtils.YMD_HMS);
	}
	/**
	 * 
	 * @param d
	 * @return
	 */
	public static Date getMonthStartDateByEndDate(Date d){
		Calendar c = Calendar.getInstance();
		c.setTime(d);
		c.add(Calendar.MONTH, -1);
		return DateUtils.parseDate(DateUtils.formatDate(c.getTime(), DateUtils.YMD)+" 00:00:00", DateUtils.YMD_HMS);
	}
	/**
	 * 获取昨天的时间
	 * @param d
	 * @return
	 */
	public static Date getLastDay(Date d){
		Calendar c = Calendar.getInstance();
		c.setTime(d);
		c.add(Calendar.DAY_OF_MONTH, -1);
		return c.getTime();
	}
	/**
	 * 获取数据对比时间
	 * @param date
	 * @param dateType
	 * @return
	 */
	public static Date getLastDate(Date date,String dateType){
		Date lastDate = ChartDateUtils.getLastDay(date);	//默认获取昨天日期
		if(ChartDateUtils.week.equals(dateType)){
			lastDate = ChartDateUtils.getLastWeek(date);
		}else if(ChartDateUtils.month.equals(dateType)){
			lastDate = ChartDateUtils.getLastMonth(date);
		}
		return lastDate;
	}
	/**
	 * 获取上周时间
	 * @param d
	 * @return
	 */
	public static Date getLastWeek(Date d){
		Calendar c = Calendar.getInstance();
		c.setTime(d);
		c.add(Calendar.DAY_OF_MONTH, -7);
		return c.getTime();
	}
	/**
	 * 获取上个月的时间
	 * @param d
	 * @return
	 */
	public static Date getLastMonth(Date d){
		Calendar c = Calendar.getInstance();
		c.setTime(d);
		c.add(Calendar.MONTH, -1);
		return c.getTime();
	}
	/**
	 * 判断是否为当天
	 * @param d
	 */
	@SuppressWarnings("deprecation")
	public static boolean validationToDay(Date d1){
		if(d1==null){
			return false;
		}
		Date d2 = new Date();
		int y1 = d1.getYear();
		int m1 = d1.getMonth();
		int day1 = d1.getDate();
		int y2 = d2.getYear();
		int m2 = d2.getMonth();
		int day2 = d2.getDate();
		if(y1==y2&&m1==m2&&day1==day2){
			return true;
		}else{
			return false;
		}
	}
	
	
	/*-------------------*/
	/**
	 * 获取当前季度开始时间
	 * @return
	 */
	@SuppressWarnings("deprecation")
	public static Date getCurrentQuarterStartTime() {
        return getQuarterStartTimeByMonth(new Date().getMonth()+1);
    }
	/**
	 * 获取当前季度结束时间
	 * @return
	 */
	@SuppressWarnings("deprecation")
	public static Date getCurrentQuarterEndTime() {
		return getQuarterEndTimeByMonth(new Date().getMonth()+1);
    }
	/**
	 * 根据月份获取季度开始时间
	 * @return
	 */
	public static Date getQuarterStartTimeByMonth(int currentMonth){
		Calendar c = Calendar.getInstance();
		Date now = null;
        try {
            if (currentMonth >= 1 && currentMonth <= 3)
                c.set(Calendar.MONTH, 0);
            else if (currentMonth >= 4 && currentMonth <= 6)
                c.set(Calendar.MONTH, 3);
            else if (currentMonth >= 7 && currentMonth <= 9)
                c.set(Calendar.MONTH, 4);
            else if (currentMonth >= 10 && currentMonth <= 12)
                c.set(Calendar.MONTH, 9);
            c.set(Calendar.DATE, 1);
            now = DateUtils.parseDate(DateUtils.formatDate(c.getTime(), DateUtils.YMD)+" 00:00:00", DateUtils.YMD_HMS);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return now;
	}
	/**
	 * 根据月份获取季度结束时间
	 * @param currentMonth
	 * @return
	 */
	public static Date getQuarterEndTimeByMonth(int currentMonth){
		Calendar c = Calendar.getInstance();
		Date now = null;
        try {
            if (currentMonth >= 1 && currentMonth <= 3) {
                c.set(Calendar.MONTH, 2);
                c.set(Calendar.DATE, 31);
            } else if (currentMonth >= 4 && currentMonth <= 6) {
                c.set(Calendar.MONTH, 5);
                c.set(Calendar.DATE, 30);
            } else if (currentMonth >= 7 && currentMonth <= 9) {
                c.set(Calendar.MONTH, 8);
                c.set(Calendar.DATE, 30);
            } else if (currentMonth >= 10 && currentMonth <= 12) {
                c.set(Calendar.MONTH, 11);
                c.set(Calendar.DATE, 31);
            }
            now = DateUtils.parseDate(DateUtils.formatDate(c.getTime(), DateUtils.YMD)+" 23:59:59", DateUtils.YMD_HMS);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return now;
	}
	/**
	 * 获取当前季度
	 * @return
	 */
	@SuppressWarnings("deprecation")
	public static int getCurrentQuarter(){
		return getQuarterByMonth(new Date().getMonth()+1);
	}
	/**
	 * 根据送进来的月份获取相应的季度
	 * @param currentMonth
	 * @return
	 */
	public static int getQuarterByMonth(int currentMonth){
		if (currentMonth >= 1 && currentMonth <= 3){
			return 1;
		}else if (currentMonth >= 4 && currentMonth <= 6){
			return 2;
		}else if (currentMonth >= 7 && currentMonth <= 9){
			return 3;
		}else{
			return 4;
		}
	}
	/**
	 * 根据现季度时间获取上一季度的开始日期
	 * @param startDate
	 * @return
	 */
	@SuppressWarnings("deprecation")
	public static Date getLastQuarterStartDateByDate(Date date){
		int currentQuarter = ChartDateUtils.getQuarterByMonth((date.getMonth()+1));	
		int yy = date.getYear();
		String dateStr="";
		if(currentQuarter==1){
			dateStr = (yy-1)+"-10-01 00:00:00";
		}else if(currentQuarter==2){
			dateStr = yy+"-01-01 00:00:00";
		}else if(currentQuarter==3){
			dateStr = yy+"-04-01 00:00:00";
		}else if(currentQuarter==4){
			dateStr = yy+"-07-01 00:00:00";
		}
		return DateUtils.parseDate(dateStr, DateUtils.YMD_HMS);
	}
	/**
	 * 根据现季度时间获取上一季度的结束日期
	 * @param date
	 * @return
	 */
	@SuppressWarnings("deprecation")
	public static Date getLastQuarterEndDateByDate(Date date){
		int currentQuarter = ChartDateUtils.getQuarterByMonth((date.getMonth()+1));	
		int yy = date.getYear();
		String dateStr="";
		if(currentQuarter==1){
			dateStr = (yy-1)+"-12-31 23:59:59";
		}else if(currentQuarter==2){
			dateStr = yy+"-03-31 23:59:59";
		}else if(currentQuarter==3){
			dateStr = yy+"-06-30 23:59:59";
		}else if(currentQuarter==4){
			dateStr = yy+"-09-30 23:59:59";
		}
		return DateUtils.parseDate(dateStr, DateUtils.YMD_HMS);
	}
	
	public static Date getThisSunday(){
		Calendar cal =Calendar.getInstance();
		cal.set(Calendar.DAY_OF_WEEK, Calendar.SUNDAY);
		cal.add(Calendar.DAY_OF_MONTH, 7);
		return cal.getTime();
	}
	/**
	 * @param args
	 * @throws ParseException
	 */
	public static void main(String[] args) throws ParseException {
		System.out.println(DateUtils.formatDateTime(getThisSunday()));
		System.out.println(Calendar.SUNDAY);
		
		
//		System.out.println(DateUtils.formatDateTime(getEndDateByWeek(3)));
//		System.out.println("getMonthEndDateByDay"+DateUtils.formatDateTime(getMonthEndDateByDay(10)));
//		System.out.println(DateUtils.formatDateTime(getWeekStartDateByEndDate(getEndDateByWeek(0))));
//		System.out.println(DateUtils.formatDateTime(getMonthStartDateByEndDate(getMonthEndDateByDay(8))));
//		System.out.println(DateUtils.formatDateTime(getLastDay(new Date())));
//		System.out.println(DateUtils.formatDateTime(getLastWeek(new Date())));
//		System.out.println(DateUtils.formatDateTime(getLastMonth(new Date())));
//		System.out.println(getDate("yyyy年MM月dd日 E"));
//		long time = new Date().getTime()-parseDate("2012-11-19").getTime();
//		System.out.println(time/(24*60*60*1000));
	}
}
