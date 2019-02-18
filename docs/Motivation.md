<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [动因](#%E5%8A%A8%E5%9B%A0)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# 动因

随着JavaScript单页面应用程序的要求变得越来越复杂，我们的代码必须管理比以往更多的状态。此状态可以包括服务器响应和缓存数据，以及尚未持久保存到服务器的本地创建的数据。UI状态的复杂性也在增加，因为我们需要管理活动路径，选定选项卡，微调器，分页控件等。

管理这个不断变化的状态很难。如果模型可以更新另一个模型，则视图可以更新模型，该模型会更新另一个模型，而这反过来可能会导致另一个视图更新。在某些时候，您不再理解您的应用中发生了什么，因为您已经失去了对其状态的时间，原因和方式的控制。当系统不透明且不确定时，很难重现错误或添加新功能。

好像这还不够糟糕，考虑新要求在前端产品开发中变得普遍。作为开发人员，我们期望处理乐观更新，服务器端呈现，在执行路由转换之前获取数据等等。我们发现自己试图管理以前从未处理过的复杂性，我们不可避免地提出这样一个问题：是时候放弃了吗？答案是否定的。

这种复杂性很难处理，因为我们混合了人类思维难以推理的两个概念：变异和异步性。我称他们为Mentos和Coke。两者在分离方面都很棒，但它们一起创造了一团糟。像React这样的库试图通过删除异步和直接DOM操作来解决视图层中的这个问题。但是，管理数据状态取决于您。这是Redux进入的地方。

在Flux，CQRS和Event Sourcing的步骤之后，Redux尝试通过对更新发生的方式和时间施加某些限制来使状态突变可预测。这些限制反映在Redux 的三个原则中。