<!--
 * @Author: your name
 * @Date: 2020-08-22 16:25:09
 * @LastEditTime: 2020-09-20 17:01:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Street-stall-weapp\README.md
-->
# 小程序云开发挑战赛#-迷你小摊-我的小摊

### 应用场景
迷你小摊是一款在地摊经济下提供地摊摊主、游客用户连接的一个连接桥梁，地摊摊主发布摊位信息，游客可浏览该地区的摊位信息，导航到想去的摊位。

### 目标用户
想要发布自己摊位信息的摊主和想逛地摊的用户。

### 实现思路
结合 Vant Weapp 搭建前端的显示页面，使用云函数、云开发数据库、云存储提供数据的存储服务，加上腾讯地图开放平台的web服务，坐标解析，距离计算， 地图导航等功能实现。

### 架构图
![](https://mmbiz.qpic.cn/mmbiz_png/dia4ITt3ia7OiaSC9MYLLicQ1Wc8pHyjjdU6D1lFWXlibibicF5sJxCDsuj8dbcA6iaG7cD4wgnNZF4XhUEchFeBCsbHkQ/0?wx_fmt=png)

### 效果截图
- 游客端截图

游客首页
![](https://mmbiz.qpic.cn/mmbiz_png/dia4ITt3ia7OiaSC9MYLLicQ1Wc8pHyjjdU6ejrxnJowfA1p0ZmUMlhcZYiaaPMYIad1kg1gxWuFTngZ8iaqOhO3HUMg/0?wx_fmt=png)

查看小摊
![](https://mmbiz.qpic.cn/mmbiz_png/dia4ITt3ia7OiaSC9MYLLicQ1Wc8pHyjjdU6ibnjsbgVic4Y0FH9HwLrcONp1tFoSYyw0B5CEgLE6v4eAic5rXc3ic3BGA/0?wx_fmt=png)

发布评分评论
![](https://mmbiz.qpic.cn/mmbiz_png/dia4ITt3ia7OiaSC9MYLLicQ1Wc8pHyjjdU6kjuldYgWn6XJpGkUeCX3hYfY1xnfuQT9IPSK7ujw8bGibmS6Kdn02nw/0?wx_fmt=png)

导航去到小摊
![](https://mmbiz.qpic.cn/mmbiz_png/dia4ITt3ia7OiaSC9MYLLicQ1Wc8pHyjjdU68GkXKyV7eqibPe0y98kDRvt0rT6KR9gpzLD1XSDmIyALSfMVib1iauJ0Q/0?wx_fmt=png)

游客我的页
![](https://mmbiz.qpic.cn/mmbiz_png/dia4ITt3ia7OiaSC9MYLLicQ1Wc8pHyjjdU6dFVYsVpWo22HNzPuT82oPOGeypniam7olVWRmSNMRLiaRvbz7PgiaBWsQ/0?wx_fmt=png)

游客历史记录页
![](https://mmbiz.qpic.cn/mmbiz_png/dia4ITt3ia7OiaSC9MYLLicQ1Wc8pHyjjdU6aPnyo8oOicYOdC9z9IRQksrXNfqQzCxXLXfQvpFAe9EVNR8tS08iatMg/0?wx_fmt=png)

游客收藏页
![](https://mmbiz.qpic.cn/mmbiz_png/dia4ITt3ia7OiaSC9MYLLicQ1Wc8pHyjjdU6RBicbdHxJJVVg2tdEeTE4xJeSwBIPZ51Xy56rTkJhAeID7Zr1TBnnzw/0?wx_fmt=png)

游客所有评论页
![](https://mmbiz.qpic.cn/mmbiz_png/dia4ITt3ia7OiaSC9MYLLicQ1Wc8pHyjjdU6b5Inm10Fah1zEH2Uqib5WjT2iaiam3KgSAJATtsB0tN0D2rGgae7iaEy0A/0?wx_fmt=png)

- 商家端截图
商家小摊位页
![](https://mmbiz.qpic.cn/mmbiz_png/dia4ITt3ia7OiaSC9MYLLicQ1Wc8pHyjjdU6PSFvIRrnYhE36EKADpIWXNkR2AulT9jQfgpUBvMLKV4ywSAhn4VLvg/0?wx_fmt=png)

商家小摊发布页
![](https://mmbiz.qpic.cn/mmbiz_png/dia4ITt3ia7OiaSC9MYLLicQ1Wc8pHyjjdU6YpZh1OdaISp4WtaYroyq0aoiaAzialzZ943TpmjicNRk8YSHvmgN63G8w/0?wx_fmt=png)

商家小摊修改页
![](https://mmbiz.qpic.cn/mmbiz_png/dia4ITt3ia7OiaSC9MYLLicQ1Wc8pHyjjdU6bTmXltNKbkibQuT23ia8Sqdpic0KHOVMnzQaOIEj2e5icZVGmW6WSAu8HA/0?wx_fmt=png)

商家摊位管理页
![](https://mmbiz.qpic.cn/mmbiz_png/dia4ITt3ia7OiaSC9MYLLicQ1Wc8pHyjjdU6xEnxUhBhc4WJmGbAy1HEWlxAJ1qKjxe8M2ic8HeqH2cuyElJxuJlR9g/0?wx_fmt=png)

切换商家摊位
![](https://mmbiz.qpic.cn/mmbiz_png/dia4ITt3ia7OiaSC9MYLLicQ1Wc8pHyjjdU6SrrrujOerlZyO8fUOSkVxc6vwE7Hm1Ow93o5G6roUSVL9AmgibZP3Mg/0?wx_fmt=png)

### 迷你小摊体验二维码
![](https://mmbiz.qpic.cn/mmbiz_jpg/dia4ITt3ia7OiaSC9MYLLicQ1Wc8pHyjjdU6xrbUdQo4oCibjExbOuLjZJ11mHX5EiaUswz7A9jaLI7J3quTs90ZmmuQ/0?wx_fmt=jpeg)

### 团队简介
两个大四的学生