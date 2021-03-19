---
layout: post
title:  "Spark Concept Interview Note"
date:   2021-03-19
desc: "Some notes on spark concepts for interview preparation"
keywords: "Spark,Work,Note,blog,Data Engineer"
categories: [Work]
tags: [Spark,Work,Interview,Note,Data]
icon: icon-cloud
---


# Spark Interview

## Partition

To distribute work across clusters and reduce the memory requirements of each node, Spark will split the data into smaller parts called Partitions. Each of these is then sent to an Executor to be processed. Only one partition is computer per executor thread at a time, therefore the size and quantity of partitions passed to an executor is directly porportional to the time it takes to complete. 

<img src="https://blog.scottlogic.com/mdebeneducci/assets/Ideal-Partitioning.png" width=500 margin-left=auto margin-right-auto>



## Data Skew

Data is often split by a key, if the split is not even, then one partition may end up having more or less data than the others. 

![Ideal Partitioning Diagram](https://blog.scottlogic.com/mdebeneducci/assets/Skewed-Partitions.png)

## Scheduling

If the data are splitted into too few partitions, some executor may become idle

![Ideal Partitioning Diagram](https://blog.scottlogic.com/mdebeneducci/assets/Inefficient-Scheduling.png)

By increasing the number of partitions used for computation, the performance can be increased as each executor will have similar amount of work to do without data skew or schedling problem.

## Shuffling

A **Shuffle** occurs when data is rearrange between partitions. This is required when a transformation requires information form other partitions, like summing all values in a column. Spark will father the required data from each partition and combine it into a new partition, likely on a different executor.

![Spark Shuffle Diagram](https://blog.scottlogic.com/mdebeneducci/assets/Shuffle-Diagram.png)

During a shuffle, spark writes data to disk and transform them across the network, this will stop processing the data in-memory and causing performance bottleneck. So try reduce the number of shuffling or reduce the amount of data bring shuffled.

## Map-Side Reduction

Before shuffling the data, it is prefered to combie the value in the current partitions and pass that aggregated value to shuffle, which is called **Map-Side Reduction** 

![Diagram of Map-side Reduction](https://blog.scottlogic.com/mdebeneducci/assets/Map-Side-Reduction.png)

Spark `groupBy` function will perform map-side reduction automatically where possible. 

## Persistence

This is an optimization technique in which saves the result of RDD evaluaton. By calling `cache()` or `persist()`, the RDD is stored in-memmory, which can be used efficiently across parallel operations. 

## Action

Action takes RDD, and returns a value to the Driver program

## Transformation

Spark Transformation builds lineage among RDDs, also known as RDD operator grah or RDD depdency graph. The transformations are lazy, meaning they are not executed until we call the action. Transformation takes a RDD, turns to another RDD

- Narrow Transformation - all the data required to compute the records are in a single partion

  ![Apache Spark Narrow Transformation Operation](https://d2h0cx97tjks2p.cloudfront.net/blogs/wp-content/uploads/sites/2/2017/08/spark-narrow-transformation-2.jpg)

- Wide Transformation - elements required are in many paritions 

  ![Spark Wide Transformation Operations](https://d2h0cx97tjks2p.cloudfront.net/blogs/wp-content/uploads/sites/2/2017/08/spark-wide-transformation-1.jpg)

## Resource Manager

- Yarn: each Spark executor runs as a Yarn container, spark can host multiple tasks within the same container, which saves startup time. 

  ![img](https://miro.medium.com/max/1388/1*bnW_o3Iz6dV2qR4G198cgQ.png)

- Spark Cluster vs Standalone: 

  - Standalone: use Master node to manage resource, FIFO, finite resource
  - HadoopYarn: Yarn Cluster with Dynamic Resource Management 
  - Mesos: Elastic reousrce management for Distributed System
  - K8S: using Docker as Runtime <img src="https://uploads-ssl.webflow.com/5e72486289a61e0d8c9dbb56/5f6a6dd4f194462e8f456cad_Apache%20Spark%20Architecture%20on%20Kubernetes%20Wireframe%20by%20Data%20Mechanics.png" width=700 margin-left=auto margin-right=auto>

  ##  Compared to Hive

- Less HDFS I/O: After each shuffle, spark doesn't have to write the shuffled data into the disk, but it can keep in memory
- Less MapReduce: RDD is more robust, so that nor every operation needs to I/O from disk
- JVM: Hadoop will start JVM every time a task starts because it's based on Process, while spark only starts JVM everytime an Executor is started, as it is based on Thread.

## Spark Pipeline

- Spark Context: the entry gate of Spark functionality, allowing application to access the spark cluster with resource manager. ![Learn SparkContext - Introduction and Functions](https://d2h0cx97tjks2p.cloudfront.net/blogs/wp-content/uploads/sites/2/2017/04/SparkContext-Apache-Spark-768x402-1.jpg)

- Cluster: A number of worker nodes

- Worker: a Worker node has a finite or fixed number of Executors allocated.

- Executor: distributed agent in responsible of executing tasks

- RDD: Resilient Distributed Dataset, RDD contains Partition contains Rows

- DAG: moels the dependency of the RDD

- Stage: A steps in the physical execution plan, a set of parallel tasks; in other words, each job which gets divided into smaller sets of task is a stage. 

  ![Directed Acyclic Graph DAG in Apache Spark](https://d2h0cx97tjks2p.cloudfront.net/blogs/wp-content/uploads/sites/2/2017/04/dag-visualization.jpg)

