Schema

#### 字段过滤：
  1. 影藏查询字段
    select: false
  2. 影藏 __v
    __v: {type: Number, select: false},
  3. 显示影藏字段
    通过select方法查询，参数为加号连接的字段
    fields='name+age+sex'
    await User.findById(id).select(fields)

### 关注与粉丝
#### 关注与粉丝功能
* 关注、取消关注
* 获取关注人、粉丝列表（用户-用户多对多关系）
#### 操作步骤
* 分析数据结构
* 设计Schema


### 话题功能模块
#### 话题模块功能点
* 话题的增改查
* 分页、模糊搜索
* 用户属性中的话题引用
* 关注/取消关注话题、用户关注的话题列表
#### 操作步骤
* 设计Schema
* 实现restful风格的增改查接口
* 使用postman测试
























end
