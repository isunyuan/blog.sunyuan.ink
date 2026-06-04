---
title: Promise到底解决了什么问题？
date: 2018-09-11
tags: ['JS', 'Promise']
---

# Promise到底解决了什么问题？

Promise作为一层语法糖，没有改动JS异步底层逻辑，却针对性的有效解决了传统回调模式的诸多问题。

## 回调地狱

在 Promise 出现之前，异步逻辑基本都靠回调函数实现。一旦出现串行依赖的多个异步操作，代码就会层层嵌套，形成大家常说的**回调地狱**。

```js
function getToken(cb) {
	/* 异步逻辑 */
}
function getUserInfo(token, cb) {
	/* 异步逻辑 */
}
function getOrderList(userId, cb) {
	/* 异步逻辑 */
}

/* 传统回调嵌套 */
getToken(
	(token) => {
		getUserInfo(
			token,
			(user) => {
				getOrderList(
					user.id,
					(orderList) => {
						console.log('订单数据：', orderList)
					},
					(err) => console.error('订单请求失败'),
				)
			},
			(err) => console.error('用户信息请求失败'),
		)
	},
	(err) => console.error('token 获取失败'),
)
```

回调地狱最直观的问题就是可读性差，复杂流程很难快速理清执行顺序。

嵌套层级越多，代码缩进越夸张，结构杂乱、耦合严重，难以维护。

Promise 提供**链式调用**能力，直接把纵向嵌套改为线性平铺写法，从结构上彻底规避回调地狱，**大幅提升代码可读性与可维护性**。

```js
// Promise 链式调用
getToken()
	.then((token) => getUserInfo(token))
	.then((user) => getOrderList(user.id))
	.then((orderList) => console.log('订单数据：', orderList))
	.catch((err) => console.error('请求失败', err))
```

## 组合能力

原生回调函数没有标准化的多任务处理方案，想要实现**并行执行、任务竞态、全部执行完毕监听**等场景，需要手动维护计数器、状态标记，代码冗余且极易出错。

Promise 内置了多个静态方法，标准化支持复杂异步组合场景：

- `Promise.all`：并行执行，**全部成功才返回结果**，任意一个失败则立即触发失败回调；
- `Promise.race`：任务竞态，取**第一个执行完成（成功 / 失败）** 的结果，常用来做接口超时拦截；
- `Promise.allSettled`（ES11）：等待所有任务执行完毕，**无论成功或失败**，统一返回每个任务的状态与结果。

```js
function getBannerList() {
	// 返回 Promise
}
function getRecommendList() {
	// 返回 Promise
}
function getHotGoods() {
	// 返回 Promise
}

// 1. 并行执行所有任务，全部成功后统一处理
Promise.all([getBannerList(), getRecommendList(), getHotGoods()])
	.then(([banner, recommend, hotGoods]) => {
		console.log('页面数据', banner, recommend, hotGoods)
	})
	.catch((err) => console.error('接口请求异常', err))

// 2. 任务竞态：实现接口超时控制
Promise.race([
	getBannerList(),
	new Promise((_, reject) => {
		setTimeout(() => reject(new Error('请求超时')), 1500)
	}),
])
	.then((res) => console.log('请求成功', res))
	.catch((err) => console.error(err.message))

// 3. 等待所有任务结束，不区分成功/失败
Promise.allSettled([getBannerList(), getRecommendList()]).then((results) => console.log('全部请求完成', results))
```

## async/await 的底层基础

`async/await` 是基于 Promise 实现的上层语法糖，进一步简化写法，让异步代码趋近同步风格，也是目前主流的编码方式

```js
function getToken() {
	// 返回 Promise 实例
}
function getUserInfo(token) {
	// 返回 Promise 实例
}
function getOrderList(userId) {
	// 返回 Promise 实例
}

// async/await 同步化写法
async function fetchData() {
	try {
		const token = await getToken()
		const user = await getUserInfo(token)
		const orderList = await getOrderList(user.id)
		console.log('订单数据：', orderList)
	} catch (err) {
		console.error('请求失败：', err)
	}
}

fetchData()
```

## UPDATE

2021.03.10：ES11正式发布 Promise.allSettled，补齐了「不中断、监听所有异步任务状态」的能力，进一步完善了 Promise 异步组合场景。
